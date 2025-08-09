import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function About(): React.ReactNode {
  return (
    <Layout
      title="關於我們"
      description="HKTech 關於頁面">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Heading as="h1" className="terminal-text">
              關於 HKTech
            </Heading>
            <div style={{ 
              background: 'var(--terminal-black)', 
              border: '2px solid var(--terminal-green)',
              padding: '2rem',
              marginTop: '2rem',
              fontFamily: 'var(--ifm-font-family-monospace)',
              color: 'var(--terminal-green)',
              textShadow: '0 0 10px currentColor'
            }}>
              <p>
                <span style={{ color: 'var(--terminal-orange)' }}>$</span> cat about.md
              </p>
              <p>
                <span style={{ color: 'var(--terminal-orange)' }}>#</span> HKTech - Terminal 16bit 風格部落格
              </p>
              <p>
                這是一個採用復古終端機風格設計的部落格平台，
                帶你回到程式設計的黃金年代。
              </p>
              <p>
                <span style={{ color: 'var(--terminal-amber)' }}>特色：</span>
              </p>
              <ul>
                <li>✓ 經典綠色螢光文字</li>
                <li>✓ 黑色終端機背景</li>
                <li>✓ 復古電視雜訊效果</li>
                <li>✓ CRT 螢幕掃描線</li>
                <li>✓ 16bit 像素化設計</li>
              </ul>
              <p>
                <span style={{ color: 'var(--terminal-gray)' }}>
                  /* 在這裡，每個頁面都有完整的電視雜訊背景效果 */
                </span>
              </p>
              <p>
                <span style={{ color: 'var(--terminal-orange)' }}>$</span> 
                <span className="terminal-cursor">█</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}