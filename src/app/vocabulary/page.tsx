'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Volume2,
  RefreshCw,
  Search,
  CheckCircle,
  Shuffle
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, ALL_MODULES, type VocabItem } from '@/lib/content/modules';
import { playVocabAudio } from '@/lib/audio';

type ViewMode = 'flashcards' | 'list';
type FilterMode = 'all' | 'learned' | 'unlearned';

export default function VocabularyPage() {
  const { userProgress, learnVocabulary, addXP } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('flashcards');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabulary, setVocabulary] = useState<VocabItem[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shuffleVocab = useCallback(() => {
    const allVocab = getAllVocabulary();
    const shuffled = [...allVocab].sort(() => Math.random() - 0.5);
    setVocabulary(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, []);

  useEffect(() => {
    shuffleVocab();
  }, [shuffleVocab]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  const allVocab = getAllVocabulary();
  const learnedCount = userProgress.learnedVocabulary.length;
  const totalCount = allVocab.length;
  const progressPercentage = (learnedCount / totalCount) * 100;

  // Filter vocabulary
  const filteredVocab = vocabulary.filter(word => {
    const isLearned = userProgress.learnedVocabulary.includes(word.id);

    // Filter by learned status
    if (filterMode === 'learned' && !isLearned) return false;
    if (filterMode === 'unlearned' && isLearned) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        word.german.toLowerCase().includes(query) ||
        word.english.toLowerCase().includes(query) ||
        word.malayalam.includes(searchQuery)
      );
    }

    return true;
  });

  const currentCard = filteredVocab[currentCardIndex];

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev > 0 ? prev - 1 : filteredVocab.length - 1));
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev < filteredVocab.length - 1 ? prev + 1 : 0));
  };

  const handleMarkLearned = () => {
    if (currentCard && !userProgress.learnedVocabulary.includes(currentCard.id)) {
      learnVocabulary(currentCard.id);
      addXP(5);
    }
    handleNextCard();
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vocabulary</h1>
            <p className="text-gray-500 dark:text-gray-400">Review and learn German words</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Words Learned</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {learnedCount}/{totalCount}
            </span>
          </div>
          <ProgressBar progress={progressPercentage} color="success" size="md" />
        </Card>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('flashcards')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'flashcards'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              List
            </button>
          </div>

          {/* Filter */}
          <select
            value={filterMode}
            onChange={(e) => { setFilterMode(e.target.value as FilterMode); setCurrentCardIndex(0); }}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="all">All Words</option>
            <option value="learned">Learned</option>
            <option value="unlearned">Not Learned</option>
          </select>

          {/* Shuffle */}
          <Button variant="ghost" size="sm" onClick={shuffleVocab}>
            <Shuffle className="w-4 h-4" />
            Shuffle
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search words..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentCardIndex(0); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
        </div>
      </motion.div>

      {/* Flashcard View */}
      {viewMode === 'flashcards' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          {filteredVocab.length > 0 && currentCard ? (
            <>
              {/* Card Counter */}
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {currentCardIndex + 1} of {filteredVocab.length}
              </div>

              {/* Flashcard */}
              <motion.div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full max-w-md cursor-pointer perspective-1000 mb-6"
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full aspect-[3/2]"
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl p-6 flex flex-col items-center justify-center text-white backface-hidden shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentCard.german}</h2>
                    <p className="text-white/70 text-lg">/{currentCard.pronunciation}/</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); playVocabAudio(currentCard.id); }}
                      className="mt-3 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto hover:bg-white/20 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-[#d4a520]" />
                    </button>
                    <p className="text-white/50 text-sm mt-3">Tap to flip</p>

                    {userProgress.learnedVocabulary.includes(currentCard.id) && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      </div>
                    )}
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden shadow-xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {currentCard.english}
                    </h3>
                    <p className="text-lg text-[#e94560] mb-4">{currentCard.malayalam}</p>
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                      <p className="italic mb-1">"{currentCard.example}"</p>
                      <p>{currentCard.exampleTranslation}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center gap-4 w-full max-w-md">
                <Button variant="ghost" onClick={handlePrevCard} className="flex-1">
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </Button>

                {!userProgress.learnedVocabulary.includes(currentCard.id) ? (
                  <Button onClick={handleMarkLearned} variant="success" className="flex-1">
                    <CheckCircle className="w-5 h-5" />
                    Learned (+5 XP)
                  </Button>
                ) : (
                  <Button onClick={handleNextCard} className="flex-1">
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            <Card className="text-center py-12 w-full">
              <p className="text-gray-500 dark:text-gray-400">No words match your filter</p>
              <Button variant="ghost" onClick={() => { setFilterMode('all'); setSearchQuery(''); }} className="mt-4">
                Reset Filters
              </Button>
            </Card>
          )}
        </motion.div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          {filteredVocab.length > 0 ? (
            filteredVocab.map((word) => {
              const isLearned = userProgress.learnedVocabulary.includes(word.id);
              return (
                <Card key={word.id} padding="sm" className={isLearned ? 'border-l-4 border-emerald-500' : ''}>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => playVocabAudio(word.id)}
                      className="w-9 h-9 rounded-full bg-[#d4a520]/10 border border-[#d4a520]/20 flex items-center justify-center flex-shrink-0 hover:bg-[#d4a520]/20 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-[#d4a520]" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {word.german}
                        </h3>
                        <span className="text-sm text-gray-400">/{word.pronunciation}/</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{word.english}</p>
                      <p className="text-sm text-[#e94560]">{word.malayalam}</p>
                    </div>
                    {isLearned ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 animate-lamp" />
                    ) : (
                      <button
                        onClick={() => { learnVocabulary(word.id); addXP(5); }}
                        className="text-sm text-[#e94560] font-medium hover:underline flex-shrink-0"
                      >
                        Mark Learned
                      </button>
                    )}
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No words match your filter</p>
              <Button variant="ghost" onClick={() => { setFilterMode('all'); setSearchQuery(''); }} className="mt-4">
                Reset Filters
              </Button>
            </Card>
          )}
        </motion.div>
      )}

      {/* Vocabulary by Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">By Module</h2>
        <div className="space-y-3">
          {ALL_MODULES.map(module => {
            const moduleVocab = module.lessons.flatMap(l => l.vocabulary);
            const learnedModuleVocab = moduleVocab.filter(v =>
              userProgress.learnedVocabulary.includes(v.id)
            ).length;

            return (
              <Card key={module.id} padding="sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: module.color + '20' }}
                  >
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Module {module.id}: {module.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {learnedModuleVocab}/{moduleVocab.length} words learned
                    </p>
                  </div>
                  <ProgressBar
                    progress={(learnedModuleVocab / moduleVocab.length) * 100}
                    color="success"
                    size="sm"
                    className="w-24"
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
