'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Printer, BookOpen, Copy, Check, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { getModuleById, ALL_MODULES } from '@/lib/content/modules';
import type { Module } from '@/lib/content/types';
import { Kuttan } from '@/components/character/Kuttan';

function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        });
      }}
      className="print:hidden opacity-40 hover:opacity-100 hover:text-[#d4a520] transition ml-1 inline-flex align-middle"
      aria-label="Copy"
    >
      {copied ? <Check className="w-3 h-3 text-[#27ae60]" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

function ModuleScript({ modules }: { modules: Module[] }) {
  return (
    <>
      {modules.map((mod) => (
        <div key={mod.id} className="module-section">
          {/* Module Header */}
          <div className="print-module-header">
            <h2 className="print-module-title">
              {mod.icon} Module {mod.id}: {mod.title}
            </h2>
            <p className="print-module-subtitle">{mod.titleGerman}</p>
            <p className="print-module-desc">{mod.description}</p>
            <div className="print-module-meta">
              {mod.lessons.length} Lessons · {mod.totalHours} Hours ·{' '}
              {mod.lessons.reduce((s, l) => s + l.vocabulary.length, 0)} Vocabulary ·{' '}
              {mod.lessons.reduce((s, l) => s + l.exercises.length, 0)} Exercises
            </div>
          </div>

          {mod.lessons.map((lesson, li) => (
            <div key={lesson.id} id={`lesson-${lesson.id}`} className="print-lesson scroll-mt-24">
              {/* Lesson Header */}
              <div className="print-lesson-header">
                <h3 className="print-lesson-title">
                  Lesson {li + 1}: {lesson.title}
                </h3>
                <p className="print-lesson-german">{lesson.titleGerman}</p>
                <p className="print-lesson-desc">{lesson.description}</p>
                <div className="print-lesson-meta">
                  Duration: {lesson.duration} · XP: {lesson.xpReward}
                </div>
              </div>

              {/* Videos / Script Outlines */}
              {lesson.videos.map((video) => (
                <div key={video.id} className="print-section">
                  <h4 className="print-section-title">📺 {video.title}</h4>
                  <p className="print-section-meta">Duration: {video.duration}</p>
                  <p className="print-section-desc">{video.description}</p>

                  <div className="print-subsection">
                    <h5 className="print-subsection-title">Script Outline</h5>
                    <ol className="print-list-numbered">
                      {video.scriptOutline.map((point, i) => (
                        <li key={i}>
                          {point}
                          <CopyLine text={point} />
                        </li>
                      ))}
                    </ol>
                  </div>

                  {video.keyVocabulary.length > 0 && (
                    <div className="print-subsection">
                      <h5 className="print-subsection-title">Key Vocabulary</h5>
                      <p className="print-inline-list">
                        {video.keyVocabulary.join(' · ')}
                      </p>
                    </div>
                  )}

                  <div className="print-subsection">
                    <h5 className="print-subsection-title">Learning Objectives</h5>
                    <ul className="print-list-bullet">
                      {video.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Vocabulary */}
              {lesson.vocabulary.length > 0 && (
                <div className="print-section">
                  <h4 className="print-section-title">📚 Vocabulary ({lesson.vocabulary.length} words)</h4>
                  <table className="print-vocab-table">
                    <thead>
                      <tr>
                        <th>German</th>
                        <th>English</th>
                        <th>Malayalam</th>
                        <th>Pronunciation</th>
                        <th>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.vocabulary.map((vocab) => (
                        <tr key={vocab.id}>
                          <td className="print-vocab-german">
                            {vocab.german}
                            <CopyLine text={vocab.german} />
                          </td>
                          <td>{vocab.english}</td>
                          <td className="print-vocab-malayalam">{vocab.malayalam}</td>
                          <td className="print-vocab-pron">{vocab.pronunciation}</td>
                          <td className="print-vocab-example">
                            {vocab.example}
                            <br />
                            <span className="print-vocab-trans">{vocab.exampleTranslation}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Exercises */}
              {lesson.exercises.length > 0 && (
                <div className="print-section">
                  <h4 className="print-section-title">✍️ Exercises ({lesson.exercises.length})</h4>
                  {lesson.exercises.map((ex, ei) => (
                    <div key={ex.id} className="print-exercise">
                      <div className="print-exercise-header">
                        <span className="print-exercise-num">Q{ei + 1}</span>
                        <span className="print-exercise-type">{ex.type}</span>
                      </div>
                      <p className="print-exercise-question">{ex.question}</p>

                      {ex.options && (
                        <div className="print-exercise-options">
                          {ex.options.map((opt, oi) => (
                            <span
                              key={oi}
                              className={`print-option ${
                                (Array.isArray(ex.correctAnswer)
                                  ? ex.correctAnswer.includes(opt)
                                  : opt === ex.correctAnswer)
                                  ? 'print-option-correct'
                                  : ''
                              }`}
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="print-exercise-answer">
                        <strong>Answer: </strong>
                        {Array.isArray(ex.correctAnswer)
                          ? ex.correctAnswer.join(' → ')
                          : ex.correctAnswer}
                      </div>

                      {ex.explanation && (
                        <p className="print-exercise-explanation">{ex.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default function ScriptPage() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const moduleId = params.moduleId as string;

  const isAll = moduleId === 'all';
  const modules = isAll
    ? ALL_MODULES
    : (() => {
        const mod = getModuleById(Number(moduleId));
        return mod ? [mod] : [];
      })();

  if (modules.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const title = isAll
    ? 'Complete Course Script — A1 to A2.1'
    : `Module ${modules[0].id}: ${modules[0].title}`;

  // Enable sticky TOC when the content is long (many lessons)
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const showStickyTOC = totalLessons > 6;

  const scrollToLesson = (lessonId: string) => {
    const el = document.getElementById(`lesson-${lessonId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      {/* Screen-only controls */}
      <div className="print:hidden px-4 py-4 sticky top-0 z-10 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/scripts')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Scripts
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#d4a520] text-black px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition"
          >
            <Printer className="w-4 h-4" /> Save as PDF
          </button>
        </div>
      </div>

      {/* Kuttan hero — screen only */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="print:hidden max-w-3xl mx-auto px-4 pt-5"
      >
        <div className="game-card p-4 flex items-center gap-3 border border-[#d4a520]/20">
          <Kuttan mood="thinking" size="sm" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Here&apos;s the full script, machaa.</p>
            <p className="text-xs text-[var(--foreground)]/60 leading-snug">
              Read along or just scan. Every line has a copy button — grab the German for flashcards.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Sticky quick-jump TOC (screen only, long files) */}
      {showStickyTOC && (
        <div className="print:hidden sticky top-[74px] z-[5] bg-[var(--background)]/90 backdrop-blur border-b border-[var(--card-border)]/60">
          <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            <span className="flex items-center gap-1 text-[11px] text-[var(--foreground)]/40 pr-1 flex-shrink-0">
              <List className="w-3 h-3" /> Jump:
            </span>
            {modules.flatMap((m) =>
              m.lessons.map((l, li) => (
                <button
                  key={l.id}
                  onClick={() => scrollToLesson(l.id)}
                  className="flex-shrink-0 text-[11px] px-2 py-1 rounded-full bg-[#d4a520]/10 text-[#d4a520] hover:bg-[#d4a520]/20 transition whitespace-nowrap"
                >
                  {isAll ? `M${m.id}·L${li + 1}` : `L${li + 1}`} {l.title.length > 18 ? l.title.slice(0, 18) + '…' : l.title}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Printable content */}
      <div ref={contentRef} className="print-content max-w-3xl mx-auto px-4 py-6">
        {/* Cover */}
        <div className="print-cover">
          <div className="print-cover-icon">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="print-cover-title">{title}</h1>
          <p className="print-cover-subtitle">
            German for Malayalees — CEFR A1 to A2.1
          </p>
          <div className="print-cover-stats">
            {modules.length} Modules · {modules.reduce((s, m) => s + m.lessons.length, 0)} Lessons ·{' '}
            {modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.vocabulary.length, 0), 0)} Vocabulary Items ·{' '}
            {modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.exercises.length, 0), 0)} Exercises
          </div>
        </div>

        {/* Table of Contents */}
        <div className="print-toc">
          <h2 className="print-toc-title">Table of Contents</h2>
          {modules.map((mod) => (
            <div key={mod.id} className="print-toc-module">
              <div className="print-toc-module-title">
                {mod.icon} Module {mod.id}: {mod.title} ({mod.titleGerman})
              </div>
              {mod.lessons.map((lesson, li) => (
                <div key={lesson.id} className="print-toc-lesson">
                  {li + 1}. {lesson.title} — {lesson.titleGerman}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Content */}
        <ModuleScript modules={modules} />

        {/* Footer */}
        <div className="print-footer">
          <p>Adipoli German-Malayalam Course</p>
          <p>Generated from adipoli-german-malayalam app</p>
        </div>
      </div>
    </div>
  );
}
