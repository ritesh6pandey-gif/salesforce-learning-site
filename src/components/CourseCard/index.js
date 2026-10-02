import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * @param {{
 *  title: string,
 *  description: string,
 *  to?: string,
 *  status: 'available' | 'coming-soon',
 * }} props
 */
export default function CourseCard({title, description, to, status}) {
  const isAvailable = status === 'available';
  const content = (
    <div className={clsx(styles.card, !isAvailable && styles.cardDisabled)}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span
          className={clsx(
            styles.badge,
            isAvailable ? styles.badgeAvailable : styles.badgeSoon,
          )}>
          {isAvailable ? 'Available' : 'Coming soon'}
        </span>
      </div>
      <p className={styles.cardDescription}>{description}</p>
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
