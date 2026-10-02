import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {SALESFORCE_INTEGRATION_TOPICS, topicPath} from '@site/src/data/courseTopics';
import {getCompletedTopics, subscribeToProgress} from '@site/src/utils/progressStore';
import TopicIcon from '@site/src/components/TopicIcon';
import styles from './styles.module.css';

export default function CourseProgress() {
  const [completed, setCompleted] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCompleted(getCompletedTopics());
    setMounted(true);
    return subscribeToProgress(() => setCompleted(getCompletedTopics()));
  }, []);

  const total = SALESFORCE_INTEGRATION_TOPICS.length;
  const doneCount = SALESFORCE_INTEGRATION_TOPICS.filter((t) => completed[t.id]).length;
  const pct = mounted && total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h3 className={styles.title}>Your progress</h3>
        <span className={styles.count}>
          {mounted ? `${doneCount} of ${total} lessons complete` : `0 of ${total} lessons complete`}
        </span>
      </div>
      <div className={styles.barTrack} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.barFill} style={{width: `${pct}%`}} />
      </div>
      <ul className={styles.list}>
        {SALESFORCE_INTEGRATION_TOPICS.map((topic) => {
          const isDone = mounted && Boolean(completed[topic.id]);
          return (
            <li key={topic.id} className={styles.item}>
              <Link to={topicPath(topic.id)} className={clsx(styles.itemLink, isDone && styles.itemLinkDone)}>
                <span className={styles.itemIcon}>
                  <TopicIcon id={topic.id} size={18} />
                </span>
                <span className={styles.itemTitle}>{topic.title}</span>
                <span className={clsx(styles.itemStatus, isDone && styles.itemStatusDone)}>
                  {isDone ? '✓' : ''}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={styles.note}>
        Tracked only in this browser — nothing is sent anywhere, no account needed.
      </p>
    </div>
  );
}
