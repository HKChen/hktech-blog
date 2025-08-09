import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import { JSX } from 'react/jsx-runtime';

export interface TagInfo {
  name: string;
  label: string;
  count: number;
  permalink: string;
  description?: string;
}

interface TagCloudProps {
  tags: TagInfo[];
  maxTags?: number;
  showCount?: boolean;
  title?: string;
  className?: string;
}

export default function TagCloud({
  tags,
  maxTags = 20,
  showCount = true,
  title,
  className,
}: TagCloudProps): JSX.Element {
  // 按文章數量排序標籤
  const sortedTags = [...tags]
    .sort((a, b) => b.count - a.count)
    .slice(0, maxTags);

  // 計算標籤大小權重（基於文章數量）
  const maxCount = Math.max(...sortedTags.map(tag => tag.count));
  const minCount = Math.min(...sortedTags.map(tag => tag.count));

  const getTagSize = (count: number): string => {
    if (maxCount === minCount) return 'medium';

    const ratio = (count - minCount) / (maxCount - minCount);

    if (ratio >= 0.8) return 'large';
    if (ratio >= 0.6) return 'medium-large';
    if (ratio >= 0.4) return 'medium';
    if (ratio >= 0.2) return 'small-medium';
    return 'small';
  };

  const getTagColor = (count: number): string => {
    const ratio = (count - minCount) / (maxCount - minCount);

    if (ratio >= 0.8) return 'primary';
    if (ratio >= 0.6) return 'secondary';
    if (ratio >= 0.4) return 'tertiary';
    return 'quaternary';
  };

  if (sortedTags.length === 0) {
    return (
      <div className={`${styles.tagCloud} ${className || ''}`}>
        <p className={styles.emptyMessage}>
          {translate({
            id: 'theme.tags.tagsPageTitle',
            description: 'The title of the tag list page',
            message: '暫無標籤',
          })}
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.tagCloud} ${className || ''}`}>
      {title && (
        <h3 className={styles.title}>{title}</h3>
      )}

      <div className={styles.tagContainer}>
        {sortedTags.map((tag) => (
          <Link
            key={tag.name}
            to={tag.permalink}
            className={`${styles.tagItem} ${styles[getTagSize(tag.count)]} ${styles[getTagColor(tag.count)]}`}
            title={tag.description || `${tag.label} (${tag.count} 篇文章)`}
          >
            <span className={styles.tagLabel}>
              {tag.label}
            </span>
            {showCount && (
              <span className={styles.tagCount}>
                {tag.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {tags.length > maxTags && (
        <div className={styles.showMore}>
          <Link to="/blog/tags" className={styles.showMoreLink}>
            {translate({
              id: 'theme.tags.showMore',
              description: 'The label for show more tags link',
              message: '查看所有標籤 ({count})',
            }, { count: tags.length })}
          </Link>
        </div>
      )}
    </div>
  );
}