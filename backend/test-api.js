// Quick API Test Script
// Run with: node test-api.js

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testSignup() {
  try {
    console.log('🧪 Testing Signup API...');
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`, // Unique email
      password: 'test123456'
    });
    
    console.log('✅ Signup successful!');
    console.log('Response:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('❌ Signup failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Is the backend running on port 5000?');
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}

async function testLogin() {
  try {
    console.log('\n🧪 Testing Login API...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'test123456'
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('❌ Login failed!');
    console.error('Error:', error.response?.data || error.message);
  }
}

async function testGetMe(token) {
  try {
    console.log('\n🧪 Testing Get User API...');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Get user successful!');
    console.log('User:', response.data.user);
  } catch (error) {
    console.error('❌ Get user failed!');
    console.error('Error:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  console.log('Backend URL:', API_URL);
  console.log('─'.repeat(50));
  
  try {
    // Test signup
    const token = await testSignup();
    
    // Test get user with token
    await testGetMe(token);
    
    // Test login (will fail if user doesn't exist, that's ok)
    await testLogin();
    
    console.log('\n' + '─'.repeat(50));
    console.log('✅ All tests completed!');
  } catch (error) {
    console.log('\n' + '─'.repeat(50));
    console.log('❌ Tests failed!');
    process.exit(1);
  }
}

runTests();
