import React, { useEffect, useState, useRef } from 'react';

interface LayitekLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'cac-recolored' | 'vector';
}

export const LayitekLogo: React.FC<LayitekLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  variant = 'cac-recolored',
}) => {
  const [recoloredUrl, setRecoloredUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Original logo path provided in prompt
  const originalLogoSrc = '/public/assets/aistudio/logo_combo_full_color_png_lateral_fbbf31f8.png';

  useEffect(() => {
    // Dynamically recolor the user's PNG using HTML5 Canvas to match CAC Brand Colors:
    // Primary CAC Green: #1c8512
    // Dark CAC Green: #18540e
    // Warm CAC Gold Accent: #ffc758
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = originalLogoSrc;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Iterate through pixels and transform blue to CAC green, red to CAC gold
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Skip transparent or near-white background
          if (a < 15 || (r > 240 && g > 240 && b > 240)) {
            continue;
          }

          // Detect blue tones (where blue dominates over red & green)
          const isBlue = b > 100 && b > r * 1.2 && b > g * 1.1;
          // Detect red tones (where red dominates)
          const isRed = r > 160 && r > g * 1.5 && r > b * 1.5;
          // Detect yellow tones
          const isYellow = r > 180 && g > 150 && b < 100;

          if (isBlue) {
            // Map blue to CAC primary green #1c8512 (rgb 28, 133, 18)
            // Preserve luminance factor
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            if (lum < 0.3) {
              // Dark forest green #18540e
              data[i] = Math.round(24 * (lum / 0.3));
              data[i + 1] = Math.round(84 * (lum / 0.3));
              data[i + 2] = Math.round(14 * (lum / 0.3));
            } else {
              // Vibrant CAC green #1c8512
              data[i] = Math.round(28 * (0.8 + lum * 0.4));
              data[i + 1] = Math.round(133 * (0.8 + lum * 0.3));
              data[i + 2] = Math.round(18 * (0.8 + lum * 0.4));
            }
          } else if (isRed) {
            // Map red to CAC gold #ffc758 (rgb 255, 199, 88)
            data[i] = 255;
            data[i + 1] = 199;
            data[i + 2] = 88;
          } else if (isYellow) {
            // Bright CAC warm gold #ffc758
            data[i] = 255;
            data[i + 1] = 205;
            data[i + 2] = 80;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setRecoloredUrl(canvas.toDataURL('image/png'));
      } catch {
        // Fallback to original if canvas tainted
        setRecoloredUrl(originalLogoSrc);
      }
    };

    img.onerror = () => {
      setRecoloredUrl(originalLogoSrc);
    };
  }, [originalLogoSrc]);

  // Dimension classes
  const heightClass =
    size === 'sm' ? 'h-7' : size === 'lg' ? 'h-11 sm:h-12' : 'h-8 sm:h-9';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* If canvas recolored is ready, display the exact branded logo */}
      {recoloredUrl ? (
        <img
          src={recoloredUrl}
          alt="Layitek Limited CAC Knowledge Base"
          className={`${heightClass} w-auto object-contain transition-opacity duration-300`}
        />
      ) : (
        /* Crisp inline vector fallback matching the Layitek monogram & CAC brand palette */
        <div className={`flex items-center gap-2.5 ${heightClass}`}>
          <svg
            viewBox="0 0 160 160"
            className="h-full w-auto aspect-square shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer CAC Green Ring */}
            <circle cx="80" cy="80" r="70" stroke="#1c8512" strokeWidth="16" />
            {/* Stylized L emblem with CAC colors */}
            <path
              d="M50 42H74V95H112V118H50V42Z"
              fill="#18540e"
            />
            {/* CAC Gold Accent Block */}
            <rect x="74" y="66" width="30" height="15" rx="3" fill="#ffc758" />
            {/* CAC Gold Secondary Accent */}
            <rect x="74" y="85" width="22" height="10" rx="2" fill="#ffb420" />
          </svg>
          <div className="flex flex-col">
            <span
              className="font-extrabold italic tracking-tight text-emerald-800 leading-none text-xl sm:text-2xl"
              style={{ color: '#1c8512' }}
            >
              Layitek
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-950 mt-0.5">
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
