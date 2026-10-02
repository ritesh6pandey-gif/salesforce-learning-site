// Per-viewer lesson-completion tracking, stored only in this browser
// (localStorage) — nothing is sent anywhere, no account needed.
const STORAGE_KEY = 'rlp:progress:salesforce-integration';
const EVENT_NAME = 'rlp-progress-changed';

export function getCompletedTopics() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function isTopicComplete(topicId) {
  return Boolean(getCompletedTopics()[topicId]);
}

export function setTopicComplete(topicId, isComplete) {
  if (typeof window === 'undefined') return;
  try {
    const current = getCompletedTopics();
    if (isComplete) {
      current[topicId] = true;
    } else {
      delete current[topicId];
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch (e) {
    // localStorage unavailable (private browsing, storage blocked) — fail silently
  }
}

// Notifies callers when progress changes, whether from this tab (custom event)
// or another tab with the same site open (native "storage" event).
export function subscribeToProgress(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}
