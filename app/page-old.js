import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personal
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AI Interview Coach
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Stop following generic SDE sheets. Get a personalized prep plan that adapts to YOUR goals, strengths, and target company.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Start Free Today 🚀
            </Link>
            <Link 
              href="/login"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 transform hover:scale-105 transition-all"
            >
              Log In
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                AI-Powered Hints
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get progressive hints without spoiling the solution. Learn the right way.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Smart Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Focus on your weak topics. Problems chosen based on your progress.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Success Probability
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time metric showing your chances of cracking target company.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Problems</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Topics</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">AI</div>
              <div className="text-gray-600 dark:text-gray-400">Powered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
