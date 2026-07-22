'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send, MessageCircle, Sparkles, Clock } from 'lucide-react';
import { Nivin } from '@/components/character/Nivin';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  'How do I introduce myself?',
  'Explain der/die/das',
  "What's the difference between du and Sie?",
  'How to order food in German?',
  'Help me practice Perfekt tense',
  'Ich bin aus Kerala. Is this correct?',
];

const SESSION_LIMIT = 20;

const PEER_GREETING =
  "Hallo machaa! Njan Nivin aanu, your German tutor. Ask me anything about German -- vocab, grammar, pronunciation, A1 tips, whatever! Let's start?";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'assistant',
      text: PEER_GREETING,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userMessageCount, setUserMessageCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input on mount (desktop)
  useEffect(() => {
    if (window.innerWidth > 768) {
      inputRef.current?.focus();
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (userMessageCount >= SESSION_LIMIT) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setUserMessageCount((c) => c + 1);
    setIsLoading(true);

    // Build the API payload (skip the greeting message)
    const apiMessages = newMessages
      .filter((m) => m.id !== 'greeting')
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        text: m.text,
      }));

    // Include the greeting as the first assistant message for context
    apiMessages.unshift({ role: 'assistant', text: PEER_GREETING });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try again!');
        setIsLoading(false);
        return;
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setError('Network error. Check your connection!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  const limitReached = userMessageCount >= SESSION_LIMIT;
  const showMeterWarning =
    !limitReached && userMessageCount > SESSION_LIMIT * 0.6;
  const messagesLeft = Math.max(0, SESSION_LIMIT - userMessageCount);
  const showSuggestions =
    !isLoading &&
    !limitReached &&
    (messages.length === 1 ||
      error !== null ||
      (userMessageCount > 0 && userMessageCount % 5 === 0));

  return (
    <div className="flex flex-col h-screen bg-[#1b2d1b]">
      {/* Header */}
      <div className="flex-shrink-0 safe-top">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#1b2d1b]/90 backdrop-blur-md">
          <Link
            href="/practice"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
          >
            <ArrowLeft size={18} className="text-[#f5f0e8]" />
          </Link>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4a520] to-[#b8891a] flex items-center justify-center text-lg flex-shrink-0">
              <span role="img" aria-label="Nivin">
                👦
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="text-[#f5f0e8] font-bold text-base leading-tight truncate">
                Ask Nivin
              </h1>
              <p className="text-[#f5f0e8]/40 text-xs leading-tight">
                Your German tutor
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#f5f0e8]/40 flex-shrink-0">
            <MessageCircle size={13} />
            <span>
              {userMessageCount}/{SESSION_LIMIT}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Nivin avatar - shown on every assistant message */}
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-9 h-9 overflow-hidden flex items-center justify-center -mt-1">
                  <div className="scale-[0.45] origin-center">
                    <Nivin size="sm" mood="happy" entrance={false} />
                  </div>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#c0392b] to-[#962d22] text-white rounded-br-md font-medium shadow-sm shadow-[#c0392b]/20'
                    : 'bg-[#f5f0e8]/10 text-[#f5f0e8] rounded-bl-md border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator - Nivin thinking */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5 justify-start"
          >
            <div className="flex-shrink-0 w-9 h-9 overflow-hidden flex items-center justify-center -mt-1">
              <div className="scale-[0.45] origin-center">
                <Nivin size="sm" mood="thinking" entrance={false} />
              </div>
            </div>
            <div className="bg-[#f5f0e8]/10 rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
              <div className="flex gap-1.5 items-center h-4">
                <span
                  className="w-2 h-2 rounded-full bg-[#d4a520] animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[#d4a520] animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[#d4a520] animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="bg-[#c0392b]/20 border border-[#c0392b]/30 text-[#f5f0e8]/80 text-xs rounded-xl px-4 py-2.5 max-w-[85%] text-center">
              {error}
            </div>
          </motion.div>
        )}

        {/* Suggested questions - on first msg, after error, or every 5 messages */}
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="pt-2"
          >
            <div className="flex items-center gap-1.5 mb-2.5 text-[#f5f0e8]/40 text-xs font-medium">
              <Sparkles size={12} />
              <span>
                {messages.length === 1
                  ? 'Quick questions'
                  : error
                    ? 'Try one of these instead'
                    : 'More ideas to try'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestionClick(q)}
                  className="text-xs bg-[#f5f0e8]/8 hover:bg-[#f5f0e8]/14 border border-white/10 hover:border-[#d4a520]/40 text-[#f5f0e8]/70 hover:text-[#f5f0e8] rounded-full px-3.5 py-2 transition-all duration-200 active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Session limit reached - urgent pulsing banner */}
        {limitReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex justify-center pt-2"
          >
            <div className="animate-pulse border-2 border-[#d4a520]/50 bg-[#d4a520]/10 rounded-2xl px-5 py-4 text-center max-w-[90%] shadow-lg shadow-[#d4a520]/10">
              <p className="text-[#d4a520] font-bold text-base mb-1.5 flex items-center justify-center gap-2">
                <span role="img" aria-label="alarm clock">
                  ⏰
                </span>
                Session ended!
              </p>
              <p className="text-[#f5f0e8]/70 text-xs leading-relaxed">
                You hit the {SESSION_LIMIT}-message limit. Refresh the page to
                start a fresh chat with Nivin.
              </p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sticky session warning bar - pulses as count climbs */}
      <AnimatePresence>
        {showMeterWarning && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 px-4 pt-2"
          >
            <div
              className={`flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 border text-xs font-medium ${
                messagesLeft <= 3
                  ? 'bg-[#c0392b]/15 border-[#c0392b]/40 text-[#f5a09a] animate-pulse'
                  : messagesLeft <= 6
                    ? 'bg-[#d4a520]/15 border-[#d4a520]/40 text-[#d4a520] animate-pulse'
                    : 'bg-[#d4a520]/10 border-[#d4a520]/25 text-[#d4a520]/80'
              }`}
            >
              <Clock size={13} />
              <span>
                {messagesLeft} message{messagesLeft === 1 ? '' : 's'} left today
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div className="flex-shrink-0 safe-bottom border-t border-white/10 bg-[#1b2d1b]/95 backdrop-blur-md">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2.5 px-4 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              limitReached
                ? 'Session limit reached'
                : 'Ask Nivin anything about German...'
            }
            disabled={isLoading || limitReached}
            className="flex-1 bg-[#f5f0e8]/8 border border-white/10 focus:border-[#d4a520]/50 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/30 outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || limitReached}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a520] to-[#b8891a] text-[#1b2d1b] disabled:opacity-30 disabled:cursor-not-allowed transition-opacity active:scale-95 flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
