'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'from-green-500/90 to-emerald-500/90',
          icon: '✓',
          border: 'border-green-400/50'
        };
      case 'error':
        return {
          bg: 'from-red-500/90 to-rose-500/90',
          icon: '✕',
          border: 'border-red-400/50'
        };
      case 'warning':
        return {
          bg: 'from-orange-500/90 to-amber-500/90',
          icon: '⚠',
          border: 'border-orange-400/50'
        };
      case 'info':
        return {
          bg: 'from-blue-500/90 to-cyan-500/90',
          icon: 'ℹ',
          border: 'border-blue-400/50'
        };
      default:
        return {
          bg: 'from-gray-500/90 to-gray-600/90',
          icon: '•',
          border: 'border-gray-400/50'
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`fixed top-4 right-4 z-50 max-w-md`}
    >
      <div className={`bg-gradient-to-r ${styles.bg} backdrop-blur-xl border ${styles.border} rounded-xl shadow-2xl px-6 py-4 flex items-center gap-4`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
          className="text-2xl font-bold text-white"
        >
          {styles.icon}
        </motion.div>
        <p className="text-white font-medium flex-1">
          {typeof message === 'string' ? message : message?.message || 'Something happened'}
        </p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// Toast Container Component
export function ToastContainer({ toasts, removeToast }) {
  return (
    <AnimatePresence mode="popLayout">
      {toasts.map((toast, index) => (
        <motion.div
          key={toast.id}
          style={{ top: `${index * 80 + 16}px` }}
          className="fixed right-4 z-50"
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// Hook to use toasts
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
}
