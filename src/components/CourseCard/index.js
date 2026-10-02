import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import TopicIcon from '@site/src/components/TopicIcon';
import {SALESFORCE_INTEGRATION_TOPICS} from '@site/src/data/courseTopics';
import {getCompletedTopics, subscribeToProgress} from '@site/src/utils/progressStore';
import styles from './styles.module.css';

/**
 * @param {{
 *  title: string,
 *  description: string,
 *  to?: string,
 *  status: 'available' | 'coming-soon',
 *  iconId: string,
 *  trackProgress?: boolean,
 * }} props
 */
export default function CourseCard({title, description, to, status, iconId, trackProgress}) {
  const isAvailable = status === 'available';
  const [doneCount, setDoneCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!trackProgress) return undefined;
    const recalc = () => {
      const completed = getCompletedTopics();
      setDoneCount(SALESFORCE_INTEGRATION_TOPICS.filter((t) => completed[t.id]).length);
    };
    recalc();
    setMounted(true);
    return subscribeToProgress(recalc);
  }, [trackProgress]);

  const total = SALESFORCE_INTEGRATION_TOPICS.length;
  const pct = mounted && total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const content = (
    <div className={clsx(styles.card, !isAvailable && styles.cardDisabled)}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleRow}>
          <span className={styles.cardIcon}>
            <TopicIcon id={iconId} size={20} />
          </span>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        <span
          className={clsx(
            styles.badge,
            isAvailable ? styles.badgeAvailable : styles.badgeSoon,
          )}>
          {isAvailable ? 'Available' : 'Coming soon'}
        </span>
      </div>
      <p className={styles.cardDescription}>{description}</p>
      {trackProgress && mounted && doneCount > 0 && (
        <div className={styles.progressRow}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{width: `${pct}%`}} />
          </div>
          <span className={styles.progressLabel}>
            {doneCount} of {total} lessons complete
          </span>
        </div>
      )}
      {isAvailable && <span className={styles.cardCta}>Start learning →</span>}
    </div>
  );

  if (!isAvailable || !to) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link to={to} className={styles.cardLink}>
      {content}
    </Link>
  );
}
