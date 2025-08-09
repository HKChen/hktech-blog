import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

interface Author {
  name: string;
  title?: string;
  url?: string;
  imageURL?: string;
}

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags: Array<{
    label: string;
    permalink: string;
  }>;
  authors: Author[];
  permalink: string;
  readingTime?: number;
  image?: string;
}

export default function BlogPostCard({
  title,
  excerpt,
  date,
  tags,
  authors,
  permalink,
  readingTime,
  image,
}: BlogPostCardProps): JSX.Element {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className={styles.blogPostCard}>
      {image && (
        <div className={styles.imageContainer}>
          <Link to={permalink}>
            <img src={image} alt={title} className={styles.image} />
          </Link>
        </div>
      )}
      
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <Link to={permalink} className={styles.titleLink}>
              {title}
            </Link>
          </h2>
          
          <div className={styles.meta}>
            <time dateTime={date} className={styles.date}>
              {formatDate(date)}
            </time>
            
            {readingTime && (
              <>
                <span className={styles.separator}>•</span>
                <span className={styles.readingTime}>
                  {translate(
                    {
                      id: 'theme.blog.post.readingTime.plurals',
                      description: 'Pluralized label for "{readingTime} min read"',
                      message: '{readingTime} 分鐘閱讀',
                    },
                    { readingTime: Math.ceil(readingTime) }
                  )}
                </span>
              </>
            )}
          </div>
        </header>

        <div className={styles.excerpt}>
          {excerpt}
        </div>

        {authors && authors.length > 0 && (
          <div className={styles.authors}>
            {authors.map((author, index) => (
              <div key={index} className={styles.author}>
                {author.imageURL && (
                  <img
                    src={author.imageURL}
                    alt={author.name}
                    className={styles.authorImage}
                  />
                )}
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>
                    {author.url ? (
                      <Link to={author.url} className={styles.authorLink}>
                        {author.name}
                      </Link>
                    ) : (
                      author.name
                    )}
                  </div>
                  {author.title && (
                    <div className={styles.authorTitle}>{author.title}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <Link
                key={index}
                to={tag.permalink}
                className={styles.tag}
              >
                #{tag.label}
              </Link>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <Link to={permalink} className={styles.readMore}>
            {translate({
              id: 'theme.blog.post.readMore',
              description: 'The label used in blog post item excerpts to link to full blog posts',
              message: '閱讀更多',
            })}
            <span className={styles.readMoreArrow}>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}