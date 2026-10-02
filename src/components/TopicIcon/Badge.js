import React from 'react';
import TopicIcon from './index';
import styles from './badge.module.css';

/**
 * A circular, colored badge wrapping a TopicIcon — used at the top of
 * each lesson page as a lightweight visual header.
 * @param {{id: string, size?: number}} props
 */
export default function TopicIconBadge({id, size = 52}) {
  return (
    <div className={styles.badge} style={{width: size, height: size}}>
      <TopicIcon id={id} size={Math.round(size * 0.55)} />
    </div>
  );
}
