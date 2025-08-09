import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const TerminalBanner: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Welcome to HKTech Terminal';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className={styles.terminalBanner}>
      <div className={styles.scanlines}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.prompt}>user@hktech:~$</span>
        </div>
        <div className={styles.welcomeText}>
          {displayText}
          <span className={styles.cursor}>█</span>
        </div>
        <div className={styles.systemInfo}>
          <div>System: HKTech Terminal v1.0</div>
          <div>Status: Online</div>
          <div>Mode: 16-bit Terminal</div>
        </div>
      </div>
    </div>
  );
};

export default TerminalBanner;