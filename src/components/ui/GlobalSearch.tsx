'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Gamepad2, Languages } from 'lucide-react';
import { getAllVocabulary, ALL_MODULES } from '@/lib/content/modules';

// Hardcoded game list with display names and icons
const GAMES = [
  { id: 'scene-sort', name: 'Scene Sort', icon: '🎭' },
  { id: 'memory', name: 'Memory Cards', icon: '🃏' },
  { id: 'speed-quiz', name: 'Speed Quiz', icon: '🏆' },
  { id: 'greeting-time', name: 'Greeting Time', icon: '👋' },
  { id: 'sentence-builder', name: 'Sentence Builder', icon: '🧩' },
  { id: 'article-blitz', name: 'Article Blitz', icon: '⚡' },
  { id: 'verb-rush', name: 'Verb Rush', icon: '🔥' },
  { id: 'fill-the-gap', name: 'Fill the Gap', icon: '✏️' },
  { id: 'food-order', name: 'Food Order', icon: '🍽️' },
  { id: 'room-builder', name: 'Room Builder', icon: '🏠' },
  { id: 'time-attack', name: 'Time Attack', icon: '🕐' },
  { id: 'number-blitz', name: 'Number Blitz', icon: '🔢' },
  { id: 'dialogue-dash', name: 'Dialogue Dash', icon: '💬' },
  { id: 'story-builder', name: 'Story Builder', icon: '📖' },
];

interface SearchResult {
  type: 'vocab' | 'lesson' | 'game';
  title: string;
  subtitle: string;
  href: string;
  icon?: string;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load vocab once
  const allVocab = useMemo(() => getAllVocabulary(), []);

  // Build lesson lookup once
  const allLessons = useMemo(() => {
    const lessons: { moduleId: number; lessonId: string; title: string; titleGerman: string }[] = [];
    ALL_MODULES.forEach((mod) => {
      mod.lessons.forEach((lesson) => {
        lessons.push({
          moduleId: mod.id,
          lessonId: lesson.id,
          title: lesson.title,
          titleGerman: lesson.titleGerman,
        });
      });
    });
    return lessons;
  }, []);

  // Search results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return { vocab: [], lessons: [], games: [] };

    // Vocabulary matches
    const vocabResults: SearchResult[] = [];
    for (const v of allVocab) {
      if (vocabResults.length >= 5) break;
      if (
        v.german.toLowerCase().includes(q) ||
        v.english.toLowerCase().includes(q) ||
        v.malayalam.toLowerCase().includes(q)
      ) {
        vocabResults.push({
          type: 'vocab',
          title: v.german,
          subtitle: `${v.english} / ${v.malayalam}`,
          href: '/vocabulary',
        });
      }
    }

    // Lesson matches
    const lessonResults: SearchResult[] = [];
    for (const l of allLessons) {
      if (lessonResults.length >= 5) break;
      if (
        l.title.toLowerCase().includes(q) ||
        l.titleGerman.toLowerCase().includes(q)
      ) {
        lessonResults.push({
          type: 'lesson',
          title: l.title,
          subtitle: l.titleGerman,
          href: `/play/${l.moduleId}/${l.lessonId}`,
        });
      }
    }

    // Game matches
    const gameResults: SearchResult[] = [];
    for (const g of GAMES) {
      if (gameResults.length >= 5) break;
      if (
        g.name.toLowerCase().includes(q) ||
        g.id.toLowerCase().includes(q)
      ) {
        gameResults.push({
          type: 'game',
          title: g.name,
          subtitle: g.icon,
          href: `/games/${g.id}`,
          icon: g.icon,
        });
      }
    }

    return { vocab: vocabResults, lessons: lessonResults, games: gameResults };
  }, [query, allVocab, allLessons]);

  const hasResults = results.vocab.length > 0 || results.lessons.length > 0 || results.games.length > 0;
  const showNoResults = query.trim().length >= 2 && !hasResults;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let the animation start
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Close on click outside modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleResultClick = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setQuery('');
  };

  const isFocusedRoute =
    pathname === '/' ||
    pathname.startsWith('/preview') ||
    pathname.startsWith('/play') ||
    pathname.startsWith('/intro') ||
    pathname.startsWith('/missions') ||
    pathname === '/learn' ||
    pathname === '/learn/1' ||
    pathname === '/learn/2' ||
    pathname.startsWith('/onboarding') ||
    (pathname.startsWith('/tests/') && pathname !== '/tests') ||
    (pathname.startsWith('/practice/') && pathname !== '/practice') ||
    pathname.startsWith('/auth/');

  if (!mounted) return null;
  if (isFocusedRoute) return null;

  return (
    <>
      {/* Floating search button */}
      <button
        onClick={handleOpen}
        className="game-card fixed bottom-24 right-4 z-40 w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#d4a520]/40 shadow-lg shadow-black/30 hover:border-[#d4a520]/70 transition-all active:scale-95"
        aria-label="Search"
      >
        <Search className="w-5 h-5 text-[#d4a520]" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass-card w-full max-w-md p-4 shadow-2xl shadow-black/40"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-5 h-5 text-[#d4a520] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search words, lessons, games..."
                  className="flex-1 bg-transparent text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 outline-none text-base"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-[var(--foreground)]/50" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--foreground)]/10 mb-3" />

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto">
                {/* Vocabulary */}
                {results.vocab.length > 0 && (
                  <ResultGroup
                    label="Vocabulary"
                    icon={<Languages className="w-4 h-4" />}
                    results={results.vocab}
                    onSelect={handleResultClick}
                  />
                )}

                {/* Lessons */}
                {results.lessons.length > 0 && (
                  <ResultGroup
                    label="Lessons"
                    icon={<BookOpen className="w-4 h-4" />}
                    results={results.lessons}
                    onSelect={handleResultClick}
                  />
                )}

                {/* Games */}
                {results.games.length > 0 && (
                  <ResultGroup
                    label="Games"
                    icon={<Gamepad2 className="w-4 h-4" />}
                    results={results.games}
                    onSelect={handleResultClick}
                  />
                )}

                {/* No results */}
                {showNoResults && (
                  <p className="text-center text-sm text-[var(--foreground)]/40 py-6">
                    No results for &ldquo;{query.trim()}&rdquo;
                  </p>
                )}

                {/* Hint when empty */}
                {query.trim().length < 2 && (
                  <p className="text-center text-sm text-[var(--foreground)]/30 py-6">
                    Type at least 2 characters to search
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ResultGroup({
  label,
  icon,
  results,
  onSelect,
}: {
  label: string;
  icon: React.ReactNode;
  results: SearchResult[];
  onSelect: (href: string) => void;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#d4a520] uppercase tracking-wide mb-1.5 px-1">
        {icon}
        {label}
      </div>
      <ul>
        {results.map((r, i) => (
          <li key={`${r.type}-${i}`}>
            <button
              onClick={() => onSelect(r.href)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/8 transition-colors flex items-center gap-3"
            >
              {r.type === 'game' && r.icon && (
                <span className="text-lg shrink-0">{r.icon}</span>
              )}
              <div className="min-w-0">
                <div className="text-sm font-medium text-[var(--foreground)] truncate">
                  {r.title}
                </div>
                <div className="text-xs text-[var(--foreground)]/40 truncate">
                  {r.subtitle}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
