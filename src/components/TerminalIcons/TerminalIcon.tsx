import React from 'react';

interface TerminalIconProps {
  className?: string;
}

const TerminalIcon: React.FC<TerminalIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Terminal Window */}
      <rect
        x="10"
        y="20"
        width="180"
        height="120"
        fill="#000000"
        stroke="#ffb000"
        strokeWidth="3"
      />
      
      {/* Title Bar */}
      <rect
        x="10"
        y="20"
        width="180"
        height="20"
        fill="#ffb000"
        opacity="0.2"
      />
      
      {/* Window Controls */}
      <circle cx="25" cy="30" r="3" fill="#ffb000" />
      <circle cx="35" cy="30" r="3" fill="#ffb000" />
      <circle cx="45" cy="30" r="3" fill="#ffb000" />
      
      {/* Terminal Text Lines */}
      <text x="20" y="55" fill="#ffb000" fontSize="8" fontFamily="monospace">$ cat tech_blog.md</text>
      <text x="20" y="70" fill="#ffb000" fontSize="8" fontFamily="monospace"># 技術分享</text>
      <text x="20" y="85" fill="#ffb000" fontSize="8" fontFamily="monospace">分享程式開發經驗...</text>
      <text x="20" y="100" fill="#ffb000" fontSize="8" fontFamily="monospace">&gt; 持續學習中</text>
      <text x="20" y="115" fill="#ffb000" fontSize="8" fontFamily="monospace">$ █</text>
      
      {/* Glow Effect */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect
        x="10"
        y="20"
        width="180"
        height="120"
        fill="none"
        stroke="#ffb000"
        strokeWidth="2"
        filter="url(#glow)"
        opacity="0.7"
      />
    </svg>
  );
};

export default TerminalIcon;