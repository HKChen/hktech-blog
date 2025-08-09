import React from 'react';
import styles from './styles.module.css';

const TVNoiseBackground: React.FC = () => {
  return (
    <>
      <div className={styles.tvNoiseOverlay}></div>
      <div className={styles.crtEffect}></div>
      <div className={styles.enhancedScanlines}></div>
    </>
  );
};

export default TVNoiseBackground;