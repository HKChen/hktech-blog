import React, { JSX } from 'react';
import Head from '@docusaurus/Head';

export default function CustomHead(): JSX.Element {
  return (
    <Head>
      {/* Favicon and Icons */}
      <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />
      <link rel="icon" type="image/svg+xml" sizes="16x16" href="/img/favicon-16.svg" />
      <link rel="icon" type="image/svg+xml" sizes="32x32" href="/img/favicon-32.svg" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.svg" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#ffb000" />
      <meta name="msapplication-TileColor" content="#0a0a0a" />
      
      {/* Open Graph / Social Media */}
      <meta property="og:image" content="/img/apple-touch-icon.svg" />
      <meta name="twitter:image" content="/img/apple-touch-icon.svg" />
      
      {/* Terminal Theme Meta */}
      <meta name="description" content="HKTech - Terminal 16bit 風格技術部落格" />
      <meta name="keywords" content="HKTech, Terminal, 16bit, 技術部落格, 琥珀色, CRT" />
    </Head>
  );
}