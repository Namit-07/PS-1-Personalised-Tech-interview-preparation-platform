require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const User = require('./models/User');
const UserActivity = require('./models/UserActivity');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const updateMyStats = async () => {
  try {
    console.log('🔧 Updating your account stats and activity...\n');

    const user = await User.findOne({ email: 'namittickoo7@gmail.com' });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    // Update stats for testing
    user.stats = {
      totalProblemsSolved: 50,
      currentStreak: 10,
      longestStreak: 15,
      xp: 5000,
      level: 5
    };

    await user.save();

    console.log('✅ Updated your account stats:');
    console.log('   📊 Problems Solved: 50');
    console.log('   🔥 Current Streak: 10 days');
    console.log('   ⭐ Total XP: 5000');
    console.log('   📈 Level: 5\n');

    // Delete existing activity
    await UserActivity.deleteMany({ userId: user._id });
    console.log('�️  Cleared old activity data\n');

    // Create activity data for the last 10 days (matching current streak)
    const activities = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Format date as YYYY-MM-DD string
      const dateString = date.toISOString().split('T')[0];
      
      activities.push({
        userId: user._id,
        date: dateString,
        count: Math.floor(Math.random() * 5) + 1 // 1-5 problems per day
      });
    }

    await UserActivity.insertMany(activities);
    console.log('✅ Created activity data for the last 10 days\n');
    console.log('�💡 Now log out and log back in to see the stats and activity heatmap!');

  } catch (error) {
    console.error('❌ Error updating stats:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
};

connectDB().then(updateMyStats);
