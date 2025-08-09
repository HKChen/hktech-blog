import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export interface CategoryInfo {
  name: string;
  label: string;
  count: number;
  permalink: string;
  description?: string;
  posts: Array<{
    title: string;
    permalink: string;
    date: string;
    authors: string[];
  }>;
}

interface CategoriesPageProps {
  categories: CategoryInfo[];
  title?: string;
  className?: string;
}

export default function CategoriesPage({
  categories,
  title = '文章分類',
  className,
}: CategoriesPageProps): JSX.Element {
  // 按文章數量排序分類
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  if (sortedCategories.length === 0) {
    return (
      <div className={`${styles.categoriesPage} ${className || ''}`}>
        <div className={styles.emptyMessage}>
          <h2>{title}</h2>
          <p>
            {translate({
              id: 'theme.categories.noCategories',
              message: '暫無分類',
              description: 'No categories message',
            })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.categoriesPage} ${className || ''}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>
          {translate({
            id: 'theme.categories.subtitle',
            message: '探索不同主題的文章內容',
            description: 'Categories page subtitle',
          })}
        </p>
      </div>

      <div className={styles.categoriesGrid}>
        {sortedCategories.map((category) => (
          <div key={category.name} className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryName}>
                <Link to={category.permalink} className={styles.categoryLink}>
                  {category.label}
                </Link>
              </h3>
              <span className={styles.categoryCount}>
                {category.count} 篇文章
              </span>
            </div>
            
            {category.description && (
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
            )}

            <div className={styles.recentPosts}>
              <h4 className={styles.recentPostsTitle}>最新文章</h4>
              <ul className={styles.postsList}>
                {category.posts.slice(0, 3).map((post, index) => (
                  <li key={index} className={styles.postItem}>
                    <Link to={post.permalink} className={styles.postLink}>
                      <span className={styles.postTitle}>{post.title}</span>
                      <span className={styles.postDate}>{post.date}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {category.posts.length > 3 && (
                <Link to={category.permalink} className={styles.viewAllLink}>
                  查看全部 {category.count} 篇文章 →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link to="/blog" className={styles.backToBlogLink}>
          ← 返回部落格首頁
        </Link>
      </div>
    </div>
  );
}