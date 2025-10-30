const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/linkedin/callback';

// @route   POST /api/linkedin/exchange
// @desc    Exchange authorization code for access token and fetch profile
// @access  Public
router.post('/exchange', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code required' });
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: LINKEDIN_REDIRECT_URI,
          client_id: LINKEDIN_CLIENT_ID,
          client_secret: LINKEDIN_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch user profile from userinfo endpoint
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const linkedInProfile = profileResponse.data;

    // Fetch additional profile details from LinkedIn API v2
    let headline = '';
    let location = '';
    
    try {
      // Fetch profile details (requires r_liteprofile scope)
      const detailsResponse = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      headline = detailsResponse.data.headline || '';
      
      // Get location if available
      if (detailsResponse.data.locationName) {
        location = detailsResponse.data.locationName;
      }
    } catch (err) {
      console.log('Could not fetch additional profile details:', err.message);
      // Continue without additional details
    }

    // Transform LinkedIn data to our format
    const profile = {
      name: linkedInProfile.name || `${linkedInProfile.given_name || ''} ${linkedInProfile.family_name || ''}`.trim(),
      email: linkedInProfile.email,
      headline: headline || linkedInProfile.headline || '',
      summary: '', // Summary not available via API without additional permissions
      location: location || linkedInProfile.locale?.country || '',
      linkedin: linkedInProfile.sub ? `https://www.linkedin.com/in/${linkedInProfile.sub}` : '',
      linkedinId: linkedInProfile.sub,
      picture: linkedInProfile.picture || '',
    };

    res.json({
      success: true,
      profile,
      accessToken, // Send to frontend to store temporarily
    });
  } catch (error) {
    console.error('LinkedIn OAuth error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to exchange authorization code',
      message: error.response?.data?.error_description || error.message,
    });
  }
});

// @route   POST /api/linkedin/save
// @desc    Save LinkedIn profile data to user account
// @access  Private
router.post('/save', protect, async (req, res) => {
  try {
    const { profileData } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user with LinkedIn data
    if (profileData.name) user.name = profileData.name;
    if (profileData.headline) user.headline = profileData.headline;
    if (profileData.summary) user.summary = profileData.summary;
    if (profileData.location) user.location = profileData.location;
    if (profileData.linkedin) user.linkedin = profileData.linkedin;
    if (profileData.linkedinId) user.linkedinId = profileData.linkedinId;

    await user.save();

    res.json({
      success: true,
      message: 'LinkedIn profile imported successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        summary: user.summary,
        location: user.location,
        linkedin: user.linkedin,
      },
    });
  } catch (error) {
    console.error('Save LinkedIn profile error:', error);
    res.status(500).json({
      error: 'Failed to save profile',
      message: error.message,
    });
  }
});

module.exports = router;
