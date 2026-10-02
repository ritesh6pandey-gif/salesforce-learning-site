import React from 'react';
import materials from '@site/src/data/generatedMaterials.json';
import styles from './styles.module.css';

/**
 * Shows download links for a lesson's slides, if any have been uploaded to
 * static/downloads/ (see scripts/generate-materials-manifest.mjs). Renders
 * nothing when no material exists for this topic yet.
 * @param {{topicId: string}} props
 */
export default function LessonDownloads({topicId}) {
  const entry = materials[topicId];
  if (!entry || (!entry.pdf && !entry.ppt)) return null;

  return (
    <div className={styles.box}>
      <span className={styles.label}>Course material for this lesson:</span>
      <span className={styles.links}>
        {entry.pdf && (
          <a href={entry.pdf} className={styles.link}>
            Download the slides (PDF)
          </a>
        )}
        {entry.ppt && (
          <a href={entry.ppt} className={styles.link}>
            Download the slides (PPT)
          </a>
        )}
      </span>
    </div>
  );
}
