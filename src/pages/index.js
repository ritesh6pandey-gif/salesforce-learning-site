import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CourseCard from '@site/src/components/CourseCard';
import styles from './index.module.css';

const COURSES = [
  {
    title: 'Salesforce Integration',
    description:
      'Learn how Salesforce talks to the outside world: integration patterns, outbound and inbound APIs, authentication, Platform Events, async Apex, Salesforce Connect, and keeping it secure.',
    to: '/docs/salesforce-integration/integration-patterns',
    status: 'available',
  },
  {
    title: 'Lightning Web Components (LWC)',
    description:
      'Build modern, reactive UI on the Salesforce platform with Lightning Web Components.',
    status: 'coming-soon',
  },
  {
    title: 'Agentforce',
    description:
      "Design and ground autonomous and assistive AI agents on Salesforce's Agentforce platform.",
    status: 'coming-soon',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroNote}>
          Free, self-paced lessons with diagrams, code samples, and quizzes.
          No ads, no logins, no tracking.
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Free, independent Salesforce courses for admins and developers.">
      <HomepageHeader />
      <main>
        <section className={styles.courseSection}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              Courses
            </Heading>
            <div className={styles.courseGrid}>
              {COURSES.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
