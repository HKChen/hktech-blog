import React from 'react';
import styles from './styles.module.css';

interface TerminalLogoProps {
  title?: string;
}

const TerminalLogo: React.FC<TerminalLogoProps> = ({ title = 'HKTech' }) => {
  return (
    <div className={styles.terminalLogo}>
      <span className={styles.prompt}>$</span>
      <span className={styles.command}>cat</span>
      <span className={styles.filename}>{title.toLowerCase().replace(' ', '_')}.txt</span>
      <div className={styles.cursor}></div>
    </div>
  );
};

export default TerminalLogo;