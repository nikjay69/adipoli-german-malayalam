'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'error' | 'success' | 'info';

interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

let toastId = 0;
const listeners: Set<(msg: ToastMessage) => void> = new Set();

// Call this from anywhere to show a toast
export function showToast(text: string, type: ToastType = 'error') {
  const msg: ToastMessage = { id: ++toastId, text, type };
  listeners.forEach(fn => fn(msg));
}

const icons: Record<ToastType, string> = {
  error: '⚠️',
  success: '✓',
  info: 'ℹ️',
};

const colors: Record<ToastType, string> = {
  error: 'border-[#c0392b]/40 bg-[#c0392b]/15 text-[#ff8a8a]',
  success: 'border-[#27ae60]/40 bg-[#27ae60]/15 text-[#86efac]',
  info: 'border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#93c5fd]',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((msg: ToastMessage) => {
    setToasts(prev => [...prev.slice(-2), msg]); // max 3 visible
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== msg.id));
    }, 3500);
  }, []);

  useEffect(() => {
    listeners.add(addToast);
    return () => { listeners.delete(addToast); };
  }, [addToast]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[90%] max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`pointer-events-auto rounded-xl border backdrop-blur-md px-4 py-3 text-sm font-medium shadow-lg ${colors[toast.type]}`}
          >
            <div className="flex items-center gap-2">
              <span>{icons[toast.type]}</span>
              <span>{toast.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
