'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const companies = [
  { name: 'Google', logo: 'https://img.icons8.com/color/96/google-logo.png', color: 'from-blue-500 to-green-500' },
  { name: 'Amazon', logo: 'https://img.icons8.com/color/96/amazon.png', color: 'from-orange-500 to-yellow-500' },
  { name: 'Microsoft', logo: 'https://img.icons8.com/color/96/microsoft.png', color: 'from-blue-600 to-cyan-500' },
  { name: 'Meta', logo: 'https://img.icons8.com/color/96/meta.png', color: 'from-blue-500 to-purple-500' },
  { name: 'Apple', logo: 'https://img.icons8.com/ios-filled/100/mac-os.png', color: 'from-gray-600 to-gray-800' },
  { name: 'Netflix', logo: 'https://img.icons8.com/color/96/netflix.png', color: 'from-red-600 to-red-800' },
  { name: 'Tesla', logo: 'https://img.icons8.com/color/96/tesla.png', color: 'from-red-500 to-gray-700' },
  { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com', color: 'from-black to-gray-700' },
  { name: 'Airbnb', logo: 'https://img.icons8.com/color/96/airbnb.png', color: 'from-pink-500 to-red-500' },
  { name: 'Stripe', logo: 'https://img.icons8.com/color/96/stripe.png', color: 'from-purple-600 to-blue-600' },
  { name: 'Other', icon: '🎯', color: 'from-indigo-500 to-purple-500' }
];

const topics = [
  { name: 'Arrays & Strings', icon: '📚', color: 'bg-blue-500' },
  { name: 'Linked Lists', icon: '🔗', color: 'bg-green-500' },
  { name: 'Trees & Graphs', icon: '🌳', color: 'bg-emerald-500' },
  { name: 'Dynamic Programming', icon: '⚡', color: 'bg-yellow-500' },
  { name: 'Hash Tables', icon: '#️⃣', color: 'bg-orange-500' },
  { name: 'Sorting & Searching', icon: '🔍', color: 'bg-red-500' },
  { name: 'Recursion', icon: '🔄', color: 'bg-purple-500' },
  { name: 'Bit Manipulation', icon: '0️⃣', color: 'bg-pink-500' },
  { name: 'System Design', icon: '🏗️', color: 'bg-indigo-500' },
  { name: 'Database & SQL', icon: '💾', color: 'bg-cyan-500' }
];

const experienceLevels = [
  { 
    name: 'Beginner', 
    icon: '🌱', 
    description: 'Just starting my coding journey',
    color: 'from-green-400 to-emerald-500'
  },
  { 
    name: 'Intermediate', 
    icon: '🚀', 
    description: 'Comfortable with basics, ready to level up',
    color: 'from-blue-400 to-cyan-500'
  },
  { 
    name: 'Advanced', 
    icon: '⭐', 
    description: 'Experienced coder, preparing for FAANG',
    color: 'from-purple-400 to-pink-500'
  }
];

const domains = [
  { 
    name: 'Student', 
    icon: '🎓', 
    description: 'Currently studying CS/Engineering',
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    name: 'Recent Graduate', 
    icon: '🎉', 
    description: 'Fresh grad looking for first role',
    color: 'from-green-500 to-teal-500'
  },
  { 
    name: 'Working Professional', 
    icon: '💼', 
    description: 'Currently employed, seeking growth',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Career Switcher', 
    icon: '🔄', 
    description: 'Transitioning into tech',
    color: 'from-orange-500 to-red-500'
  }
];

export default function OnboardingWizard({ onComplete, userName }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    targetCompanies: [],
    practiceTopics: [],
    experienceLevel: '',
    domain: ''
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleCompanyToggle = (company) => {
    setFormData(prev => ({
      ...prev,
      targetCompanies: prev.targetCompanies.includes(company)
        ? prev.targetCompanies.filter(c => c !== company)
        : [...prev.targetCompanies, company]
    }));
  };

  const handleTopicToggle = (topic) => {
    setFormData(prev => ({
      ...prev,
      practiceTopics: prev.practiceTopics.includes(topic)
        ? prev.practiceTopics.filter(t => t !== topic)
        : [...prev.practiceTopics, topic]
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.targetCompanies.length > 0;
      case 2:
        return formData.practiceTopics.length > 0;
      case 3:
        return formData.experienceLevel !== '';
      case 4:
        return formData.domain !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              key={step}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2"
            >
              {step === 1 && `Hey ${userName}! 👋`}
              {step === 2 && "What do you want to master? 🎯"}
              {step === 3 && "What's your coding level? 💪"}
              {step === 4 && "Tell us about yourself 🌟"}
            </motion.h2>
            <motion.p
              key={`desc-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400"
            >
              {step === 1 && "Which companies are you targeting? (Select all that apply)"}
              {step === 2 && "Pick the topics you want to focus on"}
              {step === 3 && "Help us customize your experience"}
              {step === 4 && "Just one more thing..."}
            </motion.p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              Step {step} of {totalSteps}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {/* Step 1: Target Companies */}
              {step === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {companies.map((company) => (
                    <motion.button
                      key={company.name}
                      onClick={() => handleCompanyToggle(company.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        formData.targetCompanies.includes(company.name)
                          ? `border-transparent bg-linear-to-br ${company.color} text-white shadow-xl`
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                        formData.targetCompanies.includes(company.name) 
                          ? 'bg-white/20' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        {company.logo ? (
                          <img 
                            src={company.logo} 
                            alt={`${company.name} logo`}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <div className="text-4xl">{company.icon}</div>
                        )}
                      </div>
                      <div className="font-semibold text-sm">{company.name}</div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 2: Practice Topics */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topics.map((topic) => (
                    <motion.button
                      key={topic.name}
                      onClick={() => handleTopicToggle(topic.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        formData.practiceTopics.includes(topic.name)
                          ? `border-transparent ${topic.color} text-white shadow-xl`
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{topic.icon}</div>
                        <div className="font-semibold">{topic.name}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 3: Experience Level */}
              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {experienceLevels.map((level) => (
                    <motion.button
                      key={level.name}
                      onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level.name }))}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-8 rounded-2xl border-2 transition-all ${
                        formData.experienceLevel === level.name
                          ? `border-transparent bg-linear-to-br ${level.color} text-white shadow-2xl`
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500'
                      }`}
                    >
                      <div className="text-5xl mb-4">{level.icon}</div>
                      <div className="font-bold text-xl mb-2">{level.name}</div>
                      <div className={`text-sm ${
                        formData.experienceLevel === level.name 
                          ? 'text-white/90' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {level.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 4: Domain */}
              {step === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {domains.map((dom) => (
                    <motion.button
                      key={dom.name}
                      onClick={() => setFormData(prev => ({ ...prev, domain: dom.name }))}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-8 rounded-2xl border-2 transition-all ${
                        formData.domain === dom.name
                          ? `border-transparent bg-linear-to-br ${dom.color} text-white shadow-2xl`
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500'
                      }`}
                    >
                      <div className="text-5xl mb-4">{dom.icon}</div>
                      <div className="font-bold text-xl mb-2">{dom.name}</div>
                      <div className={`text-sm ${
                        formData.domain === dom.name 
                          ? 'text-white/90' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {dom.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-0 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {step === totalSteps ? '✨ Complete Setup' : 'Next →'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
