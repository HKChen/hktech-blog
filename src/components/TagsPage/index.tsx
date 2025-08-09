import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useGlobalData from '@docusaurus/useGlobalData';
import TagCloud from '../TagCloud';
import styles from './styles.module.css';

interface TagInfo {
    name: string;
    label: string;
    count: number;
    permalink: string;
    description?: string;
}

export default function TagsPage(): JSX.Element {
    const globalData = useGlobalData();
    const blogData = globalData['docusaurus-plugin-content-blog']?.['default'] as any;

    // 從全域數據中獲取標籤
    const tags = blogData?.tags || {};

    // 轉換標籤數據格式
    const tagList: TagInfo[] = Object.entries(tags).map(([tagName, tagData]: [string, any]) => ({
        name: tagName,
        label: tagData.label || tagName,
        count: tagData.items?.length || 0,
        permalink: tagData.permalink || `/blog/tags/${tagName}`,
        description: `查看所有關於 ${tagData.label || tagName} 的文章`
    }));

    // 按文章數量排序
    const sortedTags = tagList.sort((a, b) => b.count - a.count);

    // 分類標籤
    const popularTags = sortedTags.filter(tag => tag.count >= 2);
    const allTags = sortedTags;

    return (
        <Layout
            title={translate({
                id: 'theme.tags.tagsPageTitle',
                message: '標籤',
                description: 'The title of the tag list page',
            })}
            description={translate({
                id: 'theme.tags.tagsPageDescription',
                message: '瀏覽所有文章標籤',
                description: 'The description of the tag list page',
            })}
        >
            <div className="container margin-vert--lg">
                <div className="row">
                    <div className="col col--8 col--offset-2">
                        <header className={styles.header}>
                            <h1 className={styles.title}>
                                {translate({
                                    id: 'theme.tags.tagsPageTitle',
                                    message: '文章標籤',
                                    description: 'The title of the tag list page',
                                })}
                            </h1>
                            <p className={styles.description}>
                                {translate({
                                    id: 'theme.tags.tagsPageDescription',
                                    message: '探索我們的文章標籤，找到你感興趣的主題',
                                    description: 'The description of the tag list page',
                                })}
                            </p>
                        </header>

                        {/* 標籤雲 */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>標籤雲</h2>
                            <TagCloud
                                tags={allTags}
                                maxTags={50}
                                showCount={true}
                                className={styles.tagCloud}
                            />
                        </section>

                        {/* 熱門標籤 */}
                        {popularTags.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    熱門標籤
                                    <span className={styles.badge}>{popularTags.length}</span>
                                </h2>
                                <div className={styles.popularTags}>
                                    {popularTags.map((tag) => (
                                        <Link
                                            key={tag.name}
                                            to={tag.permalink}
                                            className={styles.popularTag}
                                            title={tag.description}
                                        >
                                            <div className={styles.popularTagContent}>
                                                <h3 className={styles.popularTagName}>{tag.label}</h3>
                                                <p className={styles.popularTagCount}>
                                                    {tag.count} 篇文章
                                                </p>
                                            </div>
                                            <div className={styles.popularTagIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                                </svg>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 所有標籤列表 */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                所有標籤
                                <span className={styles.badge}>{allTags.length}</span>
                            </h2>
                            <div className={styles.tagsList}>
                                {allTags.map((tag) => (
                                    <Link
                                        key={tag.name}
                                        to={tag.permalink}
                                        className={styles.tagItem}
                                        title={tag.description}
                                    >
                                        <span className={styles.tagLabel}>{tag.label}</span>
                                        <span className={styles.tagCount}>{tag.count}</span>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* 統計信息 */}
                        <section className={styles.stats}>
                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>{allTags.length}</div>
                                    <div className={styles.statLabel}>總標籤數</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>
                                        {allTags.reduce((sum, tag) => sum + tag.count, 0)}
                                    </div>
                                    <div className={styles.statLabel}>總文章數</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>{popularTags.length}</div>
                                    <div className={styles.statLabel}>熱門標籤</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}