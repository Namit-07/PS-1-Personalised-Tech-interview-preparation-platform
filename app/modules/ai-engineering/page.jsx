'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

const aiTopics = [
  {
    category: 'Machine Learning',
    icon: '🤖',
    color: 'from-blue-600 to-cyan-600',
    topics: [
      'Supervised Learning (Regression, Classification)',
      'Unsupervised Learning (Clustering, PCA)',
      'Reinforcement Learning',
      'Feature Engineering',
      'Model Evaluation & Metrics',
      'Overfitting & Regularization'
    ]
  },
  {
    category: 'Deep Learning',
    icon: '🧠',
    color: 'from-purple-600 to-pink-600',
    topics: [
      'Neural Networks (ANN, CNN, RNN)',
      'Backpropagation & Gradient Descent',
      'Convolutional Neural Networks',
      'Recurrent Neural Networks & LSTM',
      'Transfer Learning',
      'Hyperparameter Tuning'
    ]
  },
  {
    category: 'Natural Language Processing',
    icon: '💬',
    color: 'from-green-600 to-emerald-600',
    topics: [
      'Tokenization & Embeddings (Word2Vec, GloVe)',
      'Transformers Architecture',
      'BERT, GPT, T5',
      'Text Classification',
      'Named Entity Recognition',
      'Sentiment Analysis'
    ]
  },
  {
    category: 'Large Language Models',
    icon: '🎯',
    color: 'from-orange-600 to-red-600',
    topics: [
      'GPT-3/4 & ChatGPT',
      'Prompt Engineering',
      'Fine-tuning LLMs',
      'RAG (Retrieval Augmented Generation)',
      'LangChain Framework',
      'Vector Databases (Pinecone, Weaviate)'
    ]
  },
  {
    category: 'Computer Vision',
    icon: '👁️',
    color: 'from-pink-600 to-rose-600',
    topics: [
      'Image Classification',
      'Object Detection (YOLO, R-CNN)',
      'Image Segmentation',
      'Face Recognition',
      'OpenCV',
      'Transfer Learning with Pre-trained Models'
    ]
  },
  {
    category: 'MLOps & Deployment',
    icon: '🚀',
    color: 'from-indigo-600 to-purple-600',
    topics: [
      'Model Deployment (FastAPI, Flask)',
      'Docker & Kubernetes',
      'CI/CD for ML',
      'Model Monitoring',
      'A/B Testing',
      'Cloud ML Services (AWS SageMaker, GCP AI)'
    ]
  }
];

const algorithms = [
  { name: 'Linear Regression', type: 'Supervised', use: 'Prediction' },
  { name: 'Logistic Regression', type: 'Supervised', use: 'Classification' },
  { name: 'Decision Trees', type: 'Supervised', use: 'Both' },
  { name: 'Random Forest', type: 'Ensemble', use: 'Both' },
  { name: 'SVM', type: 'Supervised', use: 'Classification' },
  { name: 'K-Means', type: 'Unsupervised', use: 'Clustering' },
  { name: 'KNN', type: 'Supervised', use: 'Both' },
  { name: 'Naive Bayes', type: 'Supervised', use: 'Classification' },
  { name: 'Neural Networks', type: 'Deep Learning', use: 'Complex Tasks' },
  { name: 'CNNs', type: 'Deep Learning', use: 'Computer Vision' },
  { name: 'RNNs', type: 'Deep Learning', use: 'Sequential Data' },
  { name: 'Transformers', type: 'Deep Learning', use: 'NLP' }
];

export default function AIEngineeringPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-pink-950 to-gray-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">🤖</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">AI & Machine Learning Engineering</h1>
              <p className="text-xl text-gray-400">Master AI, ML, and LLMs from scratch to production</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-pink-900/30 backdrop-blur border border-pink-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-pink-400">40+</p>
              <p className="text-sm text-gray-400 mt-1">Algorithms</p>
            </div>
            <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-purple-400">6</p>
              <p className="text-sm text-gray-400 mt-1">Core Areas</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400">LLMs</p>
              <p className="text-sm text-gray-400 mt-1">GPT & BERT</p>
            </div>
            <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-green-400">RAG</p>
              <p className="text-sm text-gray-400 mt-1">Vector DBs</p>
            </div>
          </div>
        </motion.div>

        {/* AI Topics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🎓 Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTopics.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-linear-to-br ${section.color} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{section.icon}</span>
                  <h3 className="text-xl font-bold text-white">{section.category}</h3>
                </div>
                <div className="space-y-2">
                  {section.topics.map((topic, tidx) => (
                    <div key={tidx} className="flex items-center gap-2 text-white/90 text-sm">
                      <span>✓</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Algorithms */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">⚙️ ML Algorithms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {algorithms.map((algo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-pink-500/50 rounded-xl p-4"
              >
                <h3 className="text-lg font-bold text-white mb-2">{algo.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2 py-1 bg-pink-600/20 text-pink-300 rounded">{algo.type}</span>
                  <span className="text-gray-400">{algo.use}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">💡 AI Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Image Classification with CNN', tech: 'TensorFlow, Keras', difficulty: 'Medium' },
              { title: 'Sentiment Analysis with BERT', tech: 'Transformers, PyTorch', difficulty: 'Medium' },
              { title: 'Chatbot with RAG', tech: 'LangChain, OpenAI, Pinecone', difficulty: 'Hard' },
              { title: 'Object Detection with YOLO', tech: 'OpenCV, PyTorch', difficulty: 'Hard' },
              { title: 'Recommendation System', tech: 'Collaborative Filtering', difficulty: 'Medium' },
              { title: 'Time Series Forecasting', tech: 'LSTM, Prophet', difficulty: 'Hard' }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-pink-500/50 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    project.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{project.tech}</p>
                <button className="w-full py-2 bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl">
                  View Project →
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-pink-900/30 to-purple-900/30 backdrop-blur border border-pink-800/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">📚 Top Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="https://www.deeplearning.ai/" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-pink-400 mb-2">DeepLearning.AI</h3>
              <p className="text-gray-300 text-sm">Andrew Ng's ML & Deep Learning courses</p>
            </a>
            <a href="https://www.fast.ai/" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Fast.ai</h3>
              <p className="text-gray-300 text-sm">Practical deep learning for coders</p>
            </a>
            <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Hugging Face</h3>
              <p className="text-gray-300 text-sm">NLP models and datasets</p>
            </a>
            <a href="https://python.langchain.com/" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-green-400 mb-2">LangChain</h3>
              <p className="text-gray-300 text-sm">Build LLM applications</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
