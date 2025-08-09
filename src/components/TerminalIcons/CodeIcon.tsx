import React from 'react';

interface CodeIconProps {
  className?: string;
}

const CodeIcon: React.FC<CodeIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Code Editor Window */}
      <rect
        x="20"
        y="15"
        width="160"
        height="120"
        fill="#000000"
        stroke="#ffb000"
        strokeWidth="3"
      />
      
      {/* Title Bar */}
      <rect
        x="20"
        y="15"
        width="160"
        height="18"
        fill="#ffb000"
        opacity="0.2"
      />
      
      {/* Window Title */}
      <text x="30" y="27" fill="#ffb000" fontSize="8" fontFamily="monospace">
        terminal_style.css
      </text>
      
      {/* Line Numbers */}
      <rect
        x="20"
        y="33"
        width="25"
        height="102"
        fill="#ffb000"
        opacity="0.1"
      />
      
      <text x="25" y="45" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">1</text>
      <text x="25" y="55" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">2</text>
      <text x="25" y="65" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">3</text>
      <text x="25" y="75" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">4</text>
      <text x="25" y="85" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">5</text>
      <text x="25" y="95" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">6</text>
      <text x="25" y="105" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">7</text>
      <text x="25" y="115" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">8</text>
      <text x="25" y="125" fill="#ffb000" fontSize="6" fontFamily="monospace" opacity="0.7">9</text>
      
      {/* Code Content */}
      <text x="50" y="45" fill="#ffff00" fontSize="6" fontFamily="monospace">:root &#123;</text>
      <text x="55" y="55" fill="#ffc649" fontSize="6" fontFamily="monospace">--terminal-amber: #ffb000;</text>
      <text x="55" y="65" fill="#ffc649" fontSize="6" fontFamily="monospace">--terminal-black: #000000;</text>
      <text x="50" y="75" fill="#ffff00" fontSize="6" fontFamily="monospace">&#125;</text>
      <text x="50" y="85" fill="#ffb000" fontSize="6" fontFamily="monospace">.terminal-text &#123;</text>
      <text x="55" y="95" fill="#ffc649" fontSize="6" fontFamily="monospace">color: var(--terminal-amber);</text>
      <text x="55" y="105" fill="#ffc649" fontSize="6" fontFamily="monospace">text-shadow: 0 0 10px;</text>
      <text x="50" y="115" fill="#ffb000" fontSize="6" fontFamily="monospace">&#125;</text>
      <text x="50" y="125" fill="#999999" fontSize="6" fontFamily="monospace">/* 16bit terminal style */</text>
      
      {/* Cursor */}
      <rect
        x="140"
        y="120"
        width="6"
        height="8"
        fill="#ffb000"
      >
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Brackets highlighting */}
      <path
        d="M 15 40 L 10 45 L 15 50"
        stroke="#ffff00"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 185 40 L 190 45 L 185 50"
        stroke="#ffff00"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Glow Effect */}
      <defs>
        <filter id="codeGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect
        x="20"
        y="15"
        width="160"
        height="120"
        fill="none"
        stroke="#ffb000"
        strokeWidth="1"
        filter="url(#codeGlow)"
        opacity="0.6"
      />
    </svg>
  );
};

export default CodeIcon;