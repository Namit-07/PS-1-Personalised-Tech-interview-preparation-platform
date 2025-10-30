// Create a specific user for testing
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techprep');
    console.log('✅ Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'namittickoo2006@gmail.com' });
    
    if (existingUser) {
      console.log('\n⚠️  User already exists!');
      console.log('Email:', existingUser.email);
      console.log('Name:', existingUser.name);
      console.log('\n💡 Use this email to login: namittickoo2006@gmail.com');
      console.log('💡 If you forgot password, delete the user and run this script again');
      process.exit(0);
    }

    // Create new user
    const user = await User.create({
      name: 'Namit Tickoo',
      email: 'namittickoo2006@gmail.com',
      password: 'password123', // Will be hashed automatically
      role: 'student',
      roleSelected: true,
      onboardingComplete: true,
      targetCompany: 'Google',
      targetRole: 'Software Engineer',
      experienceLevel: 'intermediate',
      stats: {
        totalProblemsSolved: 25,
        currentStreak: 5,
        longestStreak: 10,
        xp: 2500,
        level: 3
      }
    });

    console.log('\n✅ User created successfully!');
    console.log('\n📧 Email:', user.email);
    console.log('🔑 Password: password123');
    console.log('👤 Name:', user.name);
    console.log('📊 Stats:', {
      problems: user.stats.totalProblemsSolved,
      streak: user.stats.currentStreak,
      level: user.stats.level
    });
    console.log('\n🚀 You can now login at http://localhost:3000/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createUser();
