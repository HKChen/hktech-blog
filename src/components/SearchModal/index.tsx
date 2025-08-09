import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from '@docusaurus/router';
import { performSearch as searchFunction, type SearchResult } from './searchUtils';
import styles from './styles.module.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const history = useHistory();

  // 搜索功能
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchFunction(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('搜索錯誤:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 處理搜索輸入
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300); // 防抖

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  // 鍵盤導航
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          history.push(results[selectedIndex].url);
          onClose();
        }
        break;
    }
  }, [isOpen, results, selectedIndex, history, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 處理結果點擊
  const handleResultClick = (url: string) => {
    history.push(url);
    onClose();
  };

  // 重置狀態
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="搜尋文章..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={styles.searchInput}
            autoFocus
          />
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className={styles.results}>
          {isLoading && (
            <div className={styles.loading}>搜尋中...</div>
          )}
          
          {!isLoading && query && results.length === 0 && (
            <div className={styles.noResults}>沒有找到相關結果</div>
          )}
          
          {results.map((result, index) => (
            <div
              key={result.url}
              className={`${styles.resultItem} ${
                index === selectedIndex ? styles.selected : ''
              }`}
              onClick={() => handleResultClick(result.url)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className={styles.resultTitle}>{result.title}</div>
              <div className={styles.resultContent}>{result.content}</div>
              <div className={styles.resultType}>{result.type}</div>
            </div>
          ))}
        </div>
        
        <div className={styles.footer}>
          <div className={styles.shortcuts}>
            <span><kbd>↑</kbd><kbd>↓</kbd> 導航</span>
            <span><kbd>Enter</kbd> 選擇</span>
            <span><kbd>Esc</kbd> 關閉</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;