import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import TopicIcon from '@site/src/components/TopicIcon';
import {SALESFORCE_INTEGRATION_TOPICS, topicPath} from '@site/src/data/courseTopics';
import materials from '@site/src/data/generatedMaterials.json';
import styles from './materials.module.css';

export default function CourseMaterialsPage() {
  return (
    <Layout
      title="Course Materials"
      description="Downloadable slides and materials for the Salesforce Integration course.">
      <header className={styles.header}>
        <div className="container">
          <Heading as="h1">Course Materials</Heading>
          <p className={styles.subtitle}>
            Slides and downloads for Salesforce Integration, one row per lesson.
            Anything not uploaded yet is marked below.
          </p>
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          <ul className={styles.list}>
            {SALESFORCE_INTEGRATION_TOPICS.map((topic) => {
              const entry = materials[topic.id];
              const hasMaterial = Boolean(entry && (entry.pdf || entry.ppt));
              return (
                <li key={topic.id} className={styles.row}>
                  <Link to={topicPath(topic.id)} className={styles.rowTitle}>
                    <span className={styles.rowIcon}>
                      <TopicIcon id={topic.id} size={20} />
                    </span>
                    {topic.title}
                  </Link>
                  <div className={styles.rowLinks}>
                    {hasMaterial ? (
                      <>
                        {entry.pdf && (
                          <a href={entry.pdf} className={styles.downloadLink}>
                            PDF
                          </a>
                        )}
                        {entry.ppt && (
                          <a href={entry.ppt} className={styles.downloadLink}>
                            PPT
                          </a>
                        )}
                      </>
                    ) : (
                      <span className={styles.notYet}>Not uploaded yet</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className={styles.footnote}>
            Want to add material for a lesson? See "How to add course material" in
            the project README.
          </p>
        </div>
      </main>
    </Layout>
  );
}
