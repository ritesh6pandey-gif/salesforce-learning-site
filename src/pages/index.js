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
      'Learn how Salesforce talks to the outside world: integration foundations, patterns, outbound and inbound APIs, authentication, Platform Events, async Apex, Salesforce Connect, and keeping it secure.',
    to: '/docs/salesforce-integration/inbound-vs-outbound',
    status: 'available',
    iconId: 'integration-patterns',
    trackProgress: true,
  },
  {
    title: 'Lightning Web Components (LWC)',
    description:
      'Build modern, reactive UI on the Salesforce platform with Lightning Web Components.',
    status: 'coming-soon',
    iconId: 'lwc',
  },
  {
    title: 'Agentforce',
    description:
      "Design and ground autonomous and assistive AI agents on Salesforce's Agentforce platform.",
    status: 'coming-soon',
    iconId: 'agentforce',
  },
];

// Decorative, original network illustration — nodes connected by lines,
// evoking "integration" without using any third-party or Salesforce imagery.
function HeroIllustration() {
  return (
    <svg
      className={styles.heroIllustration}
      viewBox="0 0 600 300"
      fill="none"
      aria-hidden="true">
      <g stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5">
        <path d="M30 60 L90 130" />
        <path d="M90 130 L40 220" />
        <path d="M90 130 L150 90" />
        <path d="M510 50 L560 110" />
        <path d="M560 110 L600 190" />
        <path d="M560 110 L500 150" />
        <path d="M40 220 L110 260" />
      </g>
      <g fill="#ffffff">
        <circle cx="30" cy="60" r="5" fillOpacity="0.55" />
        <circle cx="90" cy="130" r="8" fillOpacity="0.8" />
        <circle cx="150" cy="90" r="4" fillOpacity="0.45" />
        <circle cx="40" cy="220" r="6" fillOpacity="0.6" />
        <circle cx="510" cy="50" r="5" fillOpacity="0.5" />
        <circle cx="560" cy="110" r="8" fillOpacity="0.8" />
        <circle cx="600" cy="190" r="5" fillOpacity="0.5" />
        <circle cx="500" cy="150" r="4" fillOpacity="0.45" />
        <circle cx="110" cy="260" r="4" fillOpacity="0.4" />
        <circle cx="300" cy="250" r="5" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <HeroIllustration />
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
