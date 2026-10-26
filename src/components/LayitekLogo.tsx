import React, { useState } from 'react';
import { BrandLogoConfig } from '../types';
import layitekCacLogo from '../assets/layitek_cac_logo.png';

interface LayitekLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  target?: 'header' | 'footer';
  customUrl?: string;
  logoConfig?: BrandLogoConfig;
}

export const LayitekLogo: React.FC<LayitekLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  target = 'header',
  customUrl,
  logoConfig,
}) => {
  const [imageError, setImageError] = useState(false);

  // Active logo URL: prioritizes custom admin-uploaded logo, then official CAC Layitek logo
  const activeLogoUrl =
    customUrl ||
    (target === 'header'
      ? logoConfig?.headerLogoUrl || layitekCacLogo
      : logoConfig?.footerLogoUrl || layitekCacLogo);

  // Responsive height sizing for the horizontal 1031x380 (2.71:1) logo
  const defaultHeight =
    target === 'header'
      ? size === 'sm' ? 32 : size === 'lg' ? 48 : 42
      : size === 'sm' ? 34 : size === 'lg' ? 50 : 44;

  const customHeight =
    target === 'header'
      ? logoConfig?.headerHeight || defaultHeight
      : logoConfig?.footerHeight || defaultHeight;

  const heightStyle = { height: `${customHeight}px` };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 1. Official Attached CAC Logo (or Admin-Uploaded Custom Logo) */}
      {activeLogoUrl && !imageError ? (
        <img
          src={activeLogoUrl}
          alt="Layitek CAC Knowledge Base"
          style={heightStyle}
          className="w-auto object-contain max-w-[280px] shrink-0 transition-all duration-200"
          onError={() => setImageError(true)}
        />
      ) : (
        /* 2. Resilient In-DOM Vector CAC-Branded Layitek Monogram Fallback */
        <div className="flex items-center gap-2.5" style={heightStyle}>
          <svg
            viewBox="0 0 160 160"
            className="h-full w-auto aspect-square shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer CAC Green Ring */}
            <circle cx="80" cy="80" r="70" stroke="#1c8512" strokeWidth="15" />
            {/* Inner Stylized L Monogram in Dark CAC Green */}
            <path
              d="M48 42H74V95H112V118H48V42Z"
              fill="#18540e"
            />
            {/* CAC Golden Upper Accent Block */}
            <rect x="74" y="66" width="30" height="15" rx="3" fill="#ffc758" />
            {/* CAC Golden Lower Accent */}
            <rect x="74" y="85" width="22" height="10" rx="2" fill="#ffb420" />
          </svg>

          <div className="flex flex-col justify-center">
            <span
              className="font-extrabold italic tracking-tight leading-none text-xl sm:text-2xl"
              style={{ color: '#1c8512' }}
            >
              Layitek
            </span>
            <span
              className="text-[10px] uppercase font-bold tracking-widest mt-0.5 leading-none"
              style={{ color: '#18540e' }}
            >
              CAC Knowledge Base
            </span>
          </div>
        </div>
      )}

      {showTagline && (
        <span className="hidden sm:inline-block border-l border-emerald-300 pl-2.5 text-xs font-semibold text-emerald-900 tracking-wide uppercase">
          CAC Compliance
        </span>
      )}
    </div>
  );
};
