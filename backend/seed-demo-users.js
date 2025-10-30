require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const User = require('./models/User');
const UserActivity = require('./models/UserActivity');
const UserProgress = require('./models/UserProgress');
const Problem = require('./models/Problem');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDemoUsers = async () => {
  try {
    console.log('🌱 Starting demo data seeding...\n');

    // Update existing user (namittickoo2006@gmail.com) to be a recruiter
    const existingUser = await User.findOne({ email: 'namittickoo2006@gmail.com' });
    if (existingUser) {
      existingUser.role = 'recruiter';
      existingUser.roleSelected = true;
      existingUser.headline = 'Technical Recruiter';
      existingUser.location = 'India';
      existingUser.onboardingComplete = true;
      await existingUser.save();
      console.log('✅ Updated your account (namittickoo2006@gmail.com) to RECRUITER role\n');
    }

    // Clear existing demo users
    await User.deleteMany({ email: { $regex: '@demo.com$' } });
    await UserActivity.deleteMany({});
    await UserProgress.deleteMany({});
    console.log('🗑️  Cleared existing demo data\n');

    // Create RECRUITER user
    const recruiter = await User.create({
      name: 'Sarah Recruiter',
      email: 'recruiter@demo.com',
      password: 'demo123',
      role: 'recruiter',
      roleSelected: true,
      headline: 'Senior Technical Recruiter at Google',
      location: 'San Francisco, CA',
      company: 'Google',
      position: 'Senior Technical Recruiter',
      linkedin: 'https://linkedin.com/in/sarah-recruiter',
      onboardingComplete: true
    });
    console.log('✅ Created RECRUITER user:');
    console.log('   📧 Email: recruiter@demo.com');
    console.log('   🔑 Password: demo123');
    console.log('   💼 Role: Recruiter\n');

    // Create STUDENT users with varying performance
    const students = [
      {
        name: 'Alex Johnson',
        email: 'alex@demo.com',
        password: 'demo123',
        role: 'student',
        roleSelected: true,
        headline: 'Full Stack Developer | MERN Stack',
        location: 'New York, NY',
        company: 'Meta',
        position: 'Software Engineer',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'System Design'],
        linkedin: 'https://linkedin.com/in/alex-johnson',
        github: 'https://github.com/alexj',
        portfolio: 'https://alexjohnson.dev',
        targetCompany: 'Google',
        targetRole: 'Senior Software Engineer',
        experienceLevel: 'Advanced',
        onboardingComplete: true,
        stats: {
          totalProblemsSolved: 245,
          currentStreak: 45,
          longestStreak: 67,
          xp: 15600,
          level: 12
        }
      },
      {
        name: 'Priya Sharma',
        email: 'priya@demo.com',
        password: 'demo123',
        role: 'student',
        roleSelected: true,
        headline: 'Backend Engineer | Java & Spring Boot',
        location: 'Bangalore, India',
        company: 'Amazon',
        position: 'Software Development Engineer II',
        skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'PostgreSQL'],
        linkedin: 'https://linkedin.com/in/priya-sharma',
        github: 'https://github.com/priyasharma',
        targetCompany: 'Amazon',
        targetRole: 'Senior SDE',
        experienceLevel: 'Advanced',
        onboardingComplete: true,
        stats: {
          totalProblemsSolved: 198,
          currentStreak: 38,
          longestStreak: 52,
          xp: 12400,
          level: 10
        }
      },
      {
        name: 'Michael Chen',
        email: 'michael@demo.com',
        password: 'demo123',
        role: 'student',
        roleSelected: true,
        headline: 'System Design Enthusiast | Ex-Netflix',
        location: 'Seattle, WA',
        company: 'Microsoft',
        position: 'Senior Software Engineer',
        skills: ['System Design', 'Distributed Systems', 'Python', 'Go', 'Kubernetes'],
        linkedin: 'https://linkedin.com/in/michael-chen',
        github: 'https://github.com/mchen',
        portfolio: 'https://michaelchen.io',
        targetCompany: 'Meta',
        targetRole: 'Staff Engineer',
        experienceLevel: 'Advanced',
        onboardingComplete: true,
        stats: {
          totalProblemsSolved: 312,
          currentStreak: 56,
          longestStreak: 89,
          xp: 18900,
          level: 15
        }
      },
      {
        name: 'Emma Davis',
        email: 'emma@demo.com',
        password: 'demo123',
        role: 'student',
        roleSelected: true,
        headline: 'Frontend Developer | React & TypeScript',
        location: 'Austin, TX',
        company: 'Uber',
        position: 'Software Engineer',
        skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Next.js'],
        linkedin: 'https://linkedin.com/in/emma-davis',
        github: 'https://github.com/emmadavis',
        targetCompany: 'Airbnb',
        targetRole: 'Software Engineer',
        experienceLevel: 'Intermediate',
        onboardingComplete: true,
        stats: {
          totalProblemsSolved: 156,
          currentStreak: 28,
          longestStreak: 41,
          xp: 9800,
          level: 8
        }
      },
      {
        name: 'Raj Patel',
        email: 'raj@demo.com',
        password: 'demo123',
        role: 'student',
        roleSelected: true,
        headline: 'Machine Learning Engineer | AI Enthusiast',
        location: 'Boston, MA',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Science'],
        linkedin: 'https://linkedin.com/in/raj-patel',
        github: 'https://github.com/rajpatel',
        targetCompany: 'OpenAI',
        targetRole: 'ML Engineer',
        experienceLevel: 'Intermediate',
        onboardingComplete: true,
        stats: {
          totalProblemsSolved: 134,
          currentStreak: 22,
          longestStreak: 35,
          xp: 8200,
          level: 7
        }
      },
      {
        name: 'Lisa Wong',
        email: 'lisa@demo.com',
        password: 'demo123',
        role: 'student',
        roleSelected: true,
        headline: 'DevOps Engineer | Cloud Architecture',
        location: 'San Jose, CA',
        company: 'Stripe',
        position: 'DevOps Engineer',
        skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
        linkedin: 'https://linkedin.com/in/lisa-wong',
        github: 'https://github.com/lisawong',
        targetCompany: 'Google Cloud',
        targetRole: 'Senior DevOps Engineer',
        experienceLevel: 'Advanced',
        onboardingComplete: true,
        stats: {
          totalProblemsSolved: 89,
          currentStreak: 15,
          longestStreak: 28,
          xp: 6400,
          level: 6
        }
      }
    ];

    console.log('✅ Created STUDENT users:');
    for (const studentData of students) {
      const student = await User.create(studentData);
      console.log(`   👤 ${student.name} (${student.email})`);
      console.log(`      📊 Problems: ${student.stats.totalProblemsSolved} | Streak: ${student.stats.currentStreak} days`);
      
      // Create activity data for the last N days (based on streak)
      const today = new Date();
      for (let i = 0; i < student.stats.currentStreak; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        await UserActivity.create({
          userId: student._id,
          date: date,
          activities: [
            {
              type: 'problem_solved',
              problemId: `problem-${Math.floor(Math.random() * 100)}`,
              category: ['dsa', 'system-design', 'lld'][Math.floor(Math.random() * 3)],
              difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
              timeSpent: Math.floor(Math.random() * 60) + 10,
              timestamp: date
            }
          ],
          count: Math.floor(Math.random() * 5) + 1
        });
      }
    }
    console.log('   ✅ Created activity data for all students\n');

    console.log('🎉 Demo data seeding completed!\n');
    console.log('📝 You can now login with any of these accounts:');
    console.log('   👔 Recruiter: recruiter@demo.com / demo123');
    console.log('   👨‍💻 Students: alex@demo.com, priya@demo.com, michael@demo.com, etc. / demo123');
    console.log('\n🏆 Leaderboard Rankings (by score):');
    
    // Calculate and display rankings
    const allStudents = await User.find({ role: 'student' }).sort({ 'stats.totalProblemsSolved': -1 });
    allStudents.forEach((s, index) => {
      const score = s.stats.totalProblemsSolved + (s.stats.currentStreak * 5);
      console.log(`   ${index + 1}. ${s.name}: ${score} points (${s.stats.totalProblemsSolved} problems + ${s.stats.currentStreak}×5 streak)`);
    });

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
};

// Run the seeding
connectDB().then(seedDemoUsers);
