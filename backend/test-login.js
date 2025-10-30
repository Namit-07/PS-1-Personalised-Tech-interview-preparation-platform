// Test login credentials
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techprep');
    console.log('✅ Connected to MongoDB');

    const email = 'namittickoo2006@gmail.com';
    const testPasswords = ['password123', 'Password123', 'password', 'Namit123'];

    console.log(`\n🔍 Testing login for: ${email}\n`);

    // Find user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found in database!');
      console.log('💡 Run: node create-user.js to create this account');
      process.exit(1);
    }

    console.log('✅ User found in database');
    console.log('👤 Name:', user.name);
    console.log('📧 Email:', user.email);
    console.log('🎯 Role:', user.role);
    console.log('\n🔐 Testing common passwords...\n');

    // Test common passwords
    for (const pwd of testPasswords) {
      const isMatch = await user.comparePassword(pwd);
      if (isMatch) {
        console.log(`✅ ✅ ✅ CORRECT PASSWORD: "${pwd}" ✅ ✅ ✅\n`);
        console.log('🚀 Use these credentials to login:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${pwd}`);
        console.log('\n🌐 Login at: http://localhost:3000/login');
        process.exit(0);
      } else {
        console.log(`❌ Not: "${pwd}"`);
      }
    }

    console.log('\n⚠️  None of the common passwords worked!');
    console.log('\n💡 Options:');
    console.log('1. Try signing up with a different email at http://localhost:3000/signup');
    console.log('2. Use the demo account:');
    console.log('   Email: demo@example.com');
    console.log('   Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
