import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

/**
 * Editable, syntax-highlighted Apex code box for live teaching demos.
 * Wrapped in BrowserOnly since the underlying editor/highlighter are
 * client-only (no SSR, no backend — this never sends code anywhere).
 * @param {{title?: string, initialCode: string}} props
 */
export default function CodeBuilder({title, initialCode}) {
  return (
    <BrowserOnly fallback={<div className={styles.loadingFallback}>Loading code editor…</div>}>
      {() => {
        const CodeBuilderEditor = require('./Editor').default;
        return <CodeBuilderEditor title={title} initialCode={initialCode} />;
      }}
    </BrowserOnly>
  );
}
