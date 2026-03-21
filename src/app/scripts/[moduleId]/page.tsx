'use client';

import { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Printer, BookOpen } from 'lucide-react';
import { getModuleById, ALL_MODULES } from '@/lib/content/modules';
import type { Module } from '@/lib/content/types';

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
            <div key={lesson.id} className="print-lesson">
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
                        <li key={i}>{point}</li>
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
                          <td className="print-vocab-german">{vocab.german}</td>
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

  return (
    <div className="min-h-screen">
      {/* Screen-only controls */}
      <div className="print:hidden px-4 py-4 sticky top-0 z-10 bg-[var(--background)] border-b border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/scripts')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Scripts
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#d4a520] text-black px-4 py-2 rounded-lg font-bold text-sm"
          >
            <Printer className="w-4 h-4" /> Save as PDF
          </button>
        </div>
      </div>

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
