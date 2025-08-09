import React from 'react';

interface ComputerIconProps {
  className?: string;
}

const ComputerIcon: React.FC<ComputerIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Monitor */}
      <rect
        x="30"
        y="20"
        width="140"
        height="90"
        fill="#000000"
        stroke="#ffb000"
        strokeWidth="3"
      />
      
      {/* Screen */}
      <rect
        x="40"
        y="30"
        width="120"
        height="70"
        fill="#000000"
        stroke="#ffb000"
        strokeWidth="1"
      />
      
      {/* Screen Content - Life Blog */}
      <text x="50" y="45" fill="#ffb000" fontSize="6" fontFamily="monospace">LIFE_BLOG.EXE</text>
      <text x="50" y="55" fill="#ffb000" fontSize="5" fontFamily="monospace">┌─────────────────┐</text>
      <text x="50" y="65" fill="#ffb000" fontSize="5" fontFamily="monospace">│ 今日心情: 😊    │</text>
      <text x="50" y="75" fill="#ffb000" fontSize="5" fontFamily="monospace">│ 學習進度: 80%   │</text>
      <text x="50" y="85" fill="#ffb000" fontSize="5" fontFamily="monospace">│ 咖啡杯數: 3     │</text>
      <text x="50" y="95" fill="#ffb000" fontSize="5" fontFamily="monospace">└─────────────────┘</text>
      
      {/* Monitor Stand */}
      <rect
        x="90"
        y="110"
        width="20"
        height="15"
        fill="#ffb000"
        opacity="0.3"
      />
      
      {/* Base */}
      <rect
        x="70"
        y="125"
        width="60"
        height="8"
        fill="#ffb000"
        opacity="0.3"
      />
      
      {/* Keyboard */}
      <rect
        x="50"
        y="135"
        width="100"
        height="10"
        fill="#000000"
        stroke="#ffb000"
        strokeWidth="1"
      />
      
      {/* Keyboard Keys */}
      <rect x="55" y="138" width="4" height="4" fill="#ffb000" opacity="0.5" />
      <rect x="62" y="138" width="4" height="4" fill="#ffb000" opacity="0.5" />
      <rect x="69" y="138" width="4" height="4" fill="#ffb000" opacity="0.5" />
      <rect x="76" y="138" width="4" height="4" fill="#ffb000" opacity="0.5" />
      <rect x="83" y="138" width="4" height="4" fill="#ffb000" opacity="0.5" />
      
      {/* Glow Effect */}
      <defs>
        <filter id="computerGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect
        x="30"
        y="20"
        width="140"
        height="90"
        fill="none"
        stroke="#ffb000"
        strokeWidth="1"
        filter="url(#computerGlow)"
        opacity="0.6"
      />
    </svg>
  );
};

export default ComputerIcon;