import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import TerminalBanner from '@site/src/components/TerminalBanner';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <TerminalBanner />
        <Heading as="h1" className={clsx("hero__title", styles.terminalTitle)}>
          <span className={styles.prompt}>$</span> {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.terminalSubtitle)}>
          <span className={styles.comment}># </span>{siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            <span className={styles.buttonText}>./start_reading.sh</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`歡迎來到 ${siteConfig.title}`}
      description="HKTech - 分享技術與生活的部落格">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
