import React, { useState, useEffect } from 'react';
import SearchModal from '../SearchModal';
import styles from './styles.module.css';

const SearchButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 鍵盤快捷鍵 (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        className={styles.searchButton}
        onClick={() => setIsModalOpen(true)}
        aria-label="搜尋"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.searchText}>搜尋...</span>
        <kbd className={styles.shortcut}>⌘K</kbd>
      </button>
      
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SearchButton;