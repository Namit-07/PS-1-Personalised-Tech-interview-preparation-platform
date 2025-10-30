// Reset password for specific user
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function resetPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techprep');
    console.log('✅ Connected to MongoDB');

    const email = 'namittickoo2006@gmail.com';
    const newPassword = 'password123';

    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ User with email ${email} not found!`);
      process.exit(1);
    }

    console.log('\n📧 Found user:', user.name);
    console.log('📊 Current stats:', {
      role: user.role,
      problems: user.stats?.totalProblemsSolved || 0,
      streak: user.stats?.currentStreak || 0,
      level: user.stats?.level || 1
    });

    // Update password (will be auto-hashed by the pre-save middleware)
    user.password = newPassword;
    await user.save();

    console.log('\n✅ Password reset successfully!\n');
    console.log('═══════════════════════════════════');
    console.log('  LOGIN CREDENTIALS');
    console.log('═══════════════════════════════════');
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${newPassword}`);
    console.log('═══════════════════════════════════\n');
    console.log('🚀 Login at: http://localhost:3000/login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetPassword();
