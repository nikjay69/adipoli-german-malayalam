// Lightweight analytics + error tracking
// Stores events in localStorage for now. Can be sent to a backend later.

const ANALYTICS_KEY = 'adipoli-analytics';
const ERROR_LOG_KEY = 'adipoli-errors';
const MAX_EVENTS = 500;
const MAX_ERRORS = 50;

interface AnalyticsEvent {
  type: string;
  data?: Record<string, unknown>;
  timestamp: number;
  page: string;
}

interface ErrorEntry {
  message: string;
  stack?: string;
  timestamp: number;
  page: string;
}

function getEvents(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveEvents(events: AnalyticsEvent[]) {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch { /* quota exceeded */ }
}

// ── Public API ──

export function trackEvent(type: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const event: AnalyticsEvent = {
    type,
    data,
    timestamp: Date.now(),
    page: window.location.pathname,
  };
  const events = getEvents();
  events.push(event);
  saveEvents(events);
}

export function trackPageView() {
  trackEvent('page_view');
}

export function trackLessonComplete(lessonId: string, score: number) {
  trackEvent('lesson_complete', { lessonId, score });
}

export function trackGamePlay(gameId: string) {
  trackEvent('game_play', { gameId });
}

export function trackSearch(query: string, resultCount: number) {
  trackEvent('search', { query, resultCount });
}

// ── Error Tracking ──

function getErrors(): ErrorEntry[] {
  try {
    const stored = localStorage.getItem(ERROR_LOG_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveErrors(errors: ErrorEntry[]) {
  try {
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(errors.slice(-MAX_ERRORS)));
  } catch { /* quota exceeded */ }
}

export function logError(error: Error | string) {
  if (typeof window === 'undefined') return;
  const entry: ErrorEntry = {
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'string' ? undefined : error.stack,
    timestamp: Date.now(),
    page: window.location.pathname,
  };
  const errors = getErrors();
  errors.push(entry);
  saveErrors(errors);
}

export function getRecentErrors(): ErrorEntry[] {
  return getErrors().slice(-10);
}

export function getAnalyticsSummary() {
  const events = getEvents();
  const now = Date.now();
  const last7Days = events.filter(e => now - e.timestamp < 7 * 24 * 60 * 60 * 1000);
  const pageViews = last7Days.filter(e => e.type === 'page_view').length;
  const lessonsCompleted = last7Days.filter(e => e.type === 'lesson_complete').length;
  const gamesPlayed = last7Days.filter(e => e.type === 'game_play').length;
  return { pageViews, lessonsCompleted, gamesPlayed, totalEvents: events.length };
}

// ── Global Error Handler ──

export function initErrorTracking() {
  if (typeof window === 'undefined') return;

  window.onerror = (message, source, lineno, colno, error) => {
    logError(error || String(message));
  };

  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason instanceof Error ? event.reason : String(event.reason));
  });
}
