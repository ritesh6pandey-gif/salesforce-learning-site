import React, {useState} from 'react';
import clsx from 'clsx';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import {registerApexLanguage} from './apexPrism';
import styles from './styles.module.css';

registerApexLanguage(Prism);

function highlight(code) {
  return Prism.highlight(code, Prism.languages.apex, 'apex');
}

/**
 * An editable, syntax-highlighted code box — not a live Apex runtime (Apex
 * only runs inside a Salesforce org), just a live-editable teaching aid:
 * tweak the sample during a lesson, reset back to the original any time.
 * @param {{title?: string, initialCode: string}} props
 */
export default function CodeBuilderEditor({title, initialCode}) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  function handleReset() {
    setCode(initialCode);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Clipboard API unavailable — nothing to fall back to, fail quietly.
    }
  }

  const isEdited = code !== initialCode;

  return (
    <div className={styles.box}>
      <div className={styles.toolbar}>
        <span className={styles.title}>{title ?? 'Code builder'}</span>
        <div className={styles.toolbarActions}>
          <button type="button" className={styles.toolbarButton} onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            className={clsx(styles.toolbarButton, isEdited && styles.toolbarButtonActive)}
            onClick={handleReset}
            disabled={!isEdited}>
            Reset
          </button>
        </div>
      </div>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlight}
        padding={14}
        textareaClassName={styles.textarea}
        preClassName={styles.pre}
        className={styles.editorArea}
        style={{
          fontFamily: 'var(--ifm-font-family-monospace)',
          fontSize: '0.88rem',
        }}
      />
    </div>
  );
}
