import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { TerminalIcon, ComputerIcon, CodeIcon } from '@site/src/components/TerminalIcons';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '技術分享',
    Icon: TerminalIcon,
    description: (
      <>
        分享程式開發、系統架構、工具使用等技術文章，
        讓知識在終端機的綠光中傳遞。
      </>
    ),
  },
  {
    title: '生活記錄',
    Icon: ComputerIcon,
    description: (
      <>
        記錄日常生活中的點點滴滴，用 <code>16bit</code> 的復古風格
        呈現現代生活的美好時光。
      </>
    ),
  },
  {
    title: 'Terminal 風格',
    Icon: CodeIcon,
    description: (
      <>
        採用經典的終端機介面設計，綠色螢光文字配上黑色背景，
        帶你回到程式設計的黃金年代。
      </>
    ),
  },
];

function Feature({ title, Icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureHeader}>
          <span className={styles.prompt}>$</span>
          <span className={styles.command}>cat</span>
          <span className={styles.filename}>{title.toLowerCase().replace(' ', '_').replace('terminal_風格', 'terminal_style')}.md</span>
        </div>
        <div className="text--center">
          <Icon className={styles.featureSvg} />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
