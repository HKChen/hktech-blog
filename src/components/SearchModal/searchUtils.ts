import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export interface SearchResult {
  title: string;
  url: string;
  content: string;
  type: string;
}

// 搜索功能的實現
export async function performSearch(query: string): Promise<SearchResult[]> {
  if (!ExecutionEnvironment.canUseDOM || !query.trim()) {
    return [];
  }

  try {
    // 嘗試使用現有的搜索索引
    const results = await searchWithExistingIndex(query);
    if (results.length > 0) {
      return results;
    }

    // 嘗試使用 DOM 搜索
    const domResults = await performDOMSearch(query);
    if (domResults.length > 0) {
      return domResults;
    }

  } catch (error) {
    console.warn('搜索過程中發生錯誤:', error);
  }

  // 備用搜索邏輯：使用模擬數據
  return performMockSearch(query);
}

// 使用現有搜索索引進行搜索
async function searchWithExistingIndex(query: string): Promise<SearchResult[]> {
  try {
    // 檢查是否有全域搜索函數
    if (typeof (window as any).__DOCUSAURUS_SEARCH_LOCAL__ !== 'undefined') {
      const searchFunction = (window as any).__DOCUSAURUS_SEARCH_LOCAL__;
      const results = await searchFunction(query);
      return formatSearchResults(results);
    }

    // 檢查是否有搜索索引數據
    const searchIndex = (window as any).__SEARCH_INDEX__;
    if (searchIndex) {
      return searchInIndex(searchIndex, query);
    }

    // 檢查是否有 Lunr 索引
    const lunrIndex = (window as any).__LUNR_INDEX__;
    const documents = (window as any).__LUNR_DOCUMENTS__;
    if (lunrIndex && documents) {
      const searchResults = lunrIndex.search(query);
      return searchResults.map((result: any) => {
        const doc = documents[result.ref];
        return {
          title: doc.title || '無標題',
          url: doc.url || '#',
          content: extractContentMatch(doc.content || '', query),
          type: doc.type || '文章'
        };
      }).slice(0, 8);
    }

  } catch (error) {
    console.warn('使用現有索引搜索失敗:', error);
  }

  return [];
}

// 獲取基礎 URL
function getBaseUrl(): string {
  try {
    // 嘗試從 Docusaurus 配置獲取
    const siteConfig = (window as any).docusaurus?.siteConfig;
    if (siteConfig?.baseUrl) {
      return siteConfig.baseUrl;
    }
  } catch (error) {
    console.warn('無法獲取 baseUrl:', error);
  }
  
  // 備用方案
  return '/';
}

// 獲取當前搜索上下文
function getCurrentSearchContext(): string {
  try {
    // 從當前路徑推斷搜索上下文
    const pathname = window.location.pathname;
    
    // 檢查是否在部落格路徑下
    if (pathname.startsWith('/blog')) {
      return 'blog';
    }
    
    // 檢查是否有其他上下文
    const searchContextByPaths = (window as any).__SEARCH_CONTEXT_BY_PATHS__;
    if (Array.isArray(searchContextByPaths)) {
      for (const contextPath of searchContextByPaths) {
        const path = typeof contextPath === 'string' ? contextPath : contextPath.path;
        if (pathname.startsWith(`/${path}`)) {
          return path;
        }
      }
    }
  } catch (error) {
    console.warn('無法獲取搜索上下文:', error);
  }
  
  return '';
}

// 格式化 Docusaurus 搜索結果
function formatDocusaurusSearchResults(results: any[]): SearchResult[] {
  return results.map((result: any) => ({
    title: result.document?.t || result.title || '無標題',
    url: result.document?.u || result.url || '#',
    content: extractContentFromResult(result),
    type: getResultType(result)
  })).slice(0, 8);
}

// 從搜索結果中提取內容
function extractContentFromResult(result: any): string {
  // 嘗試不同的內容字段
  const content = result.document?.c || result.content || result.excerpt || '';
  
  if (typeof content === 'string') {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  }
  
  // 如果內容是陣列（可能是分段內容）
  if (Array.isArray(content)) {
    const textContent = content.join(' ');
    return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent;
  }
  
  return '無內容預覽';
}

// 獲取結果類型
function getResultType(result: any): string {
  if (result.document?.b) {
    return '部落格文章';
  }
  
  if (result.type) {
    return result.type;
  }
  
  // 根據 URL 推斷類型
  const url = result.document?.u || result.url || '';
  if (url.includes('/blog/')) {
    return '部落格文章';
  } else if (url.includes('/tags/')) {
    return '標籤';
  } else if (url.includes('/archive/')) {
    return '歸檔';
  }
  
  return '頁面';
}

// 獲取搜索索引數據
async function getSearchIndexData(): Promise<any> {
  try {
    // 嘗試從不同的全域變數獲取搜索索引
    if ((window as any).__SEARCH_INDEX__) {
      return (window as any).__SEARCH_INDEX__;
    }
    
    if ((window as any).searchIndex) {
      return (window as any).searchIndex;
    }

  } catch (error) {
    console.warn('無法獲取搜索索引:', error);
  }
  
  return null;
}

// 在本地索引中搜索
async function searchInLocalIndex(indexData: any, query: string): Promise<SearchResult[]> {
  const searchTerm = query.toLowerCase();
  const results: SearchResult[] = [];

  // 如果索引是陣列格式
  if (Array.isArray(indexData)) {
    indexData.forEach((item) => {
      if (item.title?.toLowerCase().includes(searchTerm) || 
          item.content?.toLowerCase().includes(searchTerm)) {
        results.push({
          title: item.title || '無標題',
          url: item.url || '#',
          content: extractContentMatch(item.content || '', searchTerm),
          type: item.type || '文章'
        });
      }
    });
  }
  
  // 如果索引是物件格式
  else if (typeof indexData === 'object' && indexData.documents) {
    Object.values(indexData.documents).forEach((doc: any) => {
      if (doc.title?.toLowerCase().includes(searchTerm) || 
          doc.content?.toLowerCase().includes(searchTerm)) {
        results.push({
          title: doc.title || '無標題',
          url: doc.url || '#',
          content: extractContentMatch(doc.content || '', searchTerm),
          type: doc.type || '文章'
        });
      }
    });
  }

  return results.slice(0, 8);
}

// 使用 Lunr 搜索
async function performLunrSearch(query: string): Promise<SearchResult[]> {
  try {
    // 檢查是否有 lunr 索引
    const lunrIndex = (window as any).__LUNR_INDEX__;
    const documents = (window as any).__LUNR_DOCUMENTS__;
    
    if (lunrIndex && documents) {
      const searchResults = lunrIndex.search(query);
      return searchResults.map((result: any) => {
        const doc = documents[result.ref];
        return {
          title: doc.title || '無標題',
          url: doc.url || '#',
          content: extractContentMatch(doc.content || '', query),
          type: doc.type || '文章'
        };
      }).slice(0, 8);
    }
  } catch (error) {
    console.warn('Lunr 搜索失敗:', error);
  }
  
  return [];
}

// 格式化搜索結果
function formatSearchResults(results: any[]): SearchResult[] {
  return results.map((result: any) => ({
    title: result.title || result.document?.title || '無標題',
    url: result.url || result.document?.url || '#',
    content: extractContentMatch(
      result.content || result.document?.content || result.excerpt || '', 
      ''
    ),
    type: result.type || result.document?.type || '文章'
  })).slice(0, 8);
}

// 在搜索索引中搜索
function searchInIndex(index: any[], query: string): SearchResult[] {
  const searchTerm = query.toLowerCase();
  const results: SearchResult[] = [];

  index.forEach((item) => {
    if (item.title?.toLowerCase().includes(searchTerm) || 
        item.content?.toLowerCase().includes(searchTerm)) {
      results.push({
        title: item.title || '無標題',
        url: item.url || '#',
        content: extractContentMatch(item.content || '', searchTerm),
        type: item.type || '文章'
      });
    }
  });

  return results.slice(0, 8);
}

// 模擬搜索結果
function performMockSearch(query: string): SearchResult[] {
  const mockResults: SearchResult[] = [
    {
      title: `關於 "${query}" 的搜索結果`,
      url: '/blog',
      content: `這裡顯示包含 "${query}" 關鍵字的文章內容摘要...`,
      type: '部落格文章'
    },
    {
      title: `${query} 相關標籤`,
      url: '/blog/tags',
      content: `查看所有與 "${query}" 相關的標籤和分類...`,
      type: '標籤頁面'
    },
    {
      title: `${query} 歸檔`,
      url: '/blog/archive',
      content: `瀏覽按時間排序的 "${query}" 相關文章歸檔...`,
      type: '歸檔頁面'
    }
  ];

  return mockResults;
}

// DOM 搜索備用方案
async function performDOMSearch(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase();

  // 搜索當前頁面的內容
  const contentElements = document.querySelectorAll('article, .markdown, .blog-post, main');
  
  contentElements.forEach((element, index) => {
    const text = element.textContent || '';
    const titleElement = element.querySelector('h1, h2, .blog-post-title, title');
    const title = titleElement?.textContent || `搜索結果 ${index + 1}`;
    
    if (text.toLowerCase().includes(searchTerm)) {
      const contentMatch = extractContentMatch(text, searchTerm);
      results.push({
        title,
        url: window.location.pathname,
        content: contentMatch,
        type: '當前頁面'
      });
    }
  });

  // 嘗試從導航中搜索其他頁面
  const navLinks = document.querySelectorAll('nav a, .navbar a');
  navLinks.forEach((link) => {
    const linkElement = link as HTMLAnchorElement;
    const linkText = linkElement.textContent || '';
    const href = linkElement.href;
    
    if (linkText.toLowerCase().includes(searchTerm) && href) {
      results.push({
        title: linkText,
        url: new URL(href).pathname,
        content: `導航連結：${linkText}`,
        type: '導航頁面'
      });
    }
  });

  // 限制結果數量
  return results.slice(0, 8);
}

// 提取匹配內容的上下文
function extractContentMatch(text: string, searchTerm: string): string {
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(searchTerm.toLowerCase());
  
  if (index === -1) return text.substring(0, 100) + '...';
  
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + searchTerm.length + 50);
  
  let excerpt = text.substring(start, end);
  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';
  
  return excerpt;
}