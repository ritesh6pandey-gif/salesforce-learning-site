import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {isTopicComplete, setTopicComplete} from '@site/src/utils/progressStore';
import styles from './styles.module.css';

/**
 * A "mark this lesson complete" toggle, stored in the browser only.
 * @param {{topicId: string}} props
 */
export default function LessonComplete({topicId}) {
  // Starts false so server-rendered and first-client-render markup match;
  // the real value (from localStorage) is applied right after mount.
  const [complete, setComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setComplete(isTopicComplete(topicId));
    setMounted(true);
  }, [topicId]);

  function toggle() {
    const next = !complete;
    setComplete(next);
    setTopicComplete(topicId, next);
  }

  if (!mounted) return null;

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={clsx(styles.toggle, complete && styles.toggleDone)}
        onClick={toggle}
        aria-pressed={complete}>
        <span className={styles.checkIcon}>{complete ? '✓' : ''}</span>
        {complete ? 'Lesson complete — nice work' : 'Mark this lesson complete'}
      </button>
    </div>
  );
}
