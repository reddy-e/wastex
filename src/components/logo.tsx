import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0F382C] to-[#10B981] p-2 text-white shadow-md shadow-[#10B981]/20 ${iconSizes[size]}`}>
        {/* Custom SVG logo: Triangular Recycling arrows merged with interconnected network nodes */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          {/* Recycling Arrows Network */}
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.91 1.81 1.81 0 0 1-.05-1.81l3.106-5.44" />
          <path d="M11 19h8.185a1.83 1.83 0 0 0 1.57-.91 1.81 1.81 0 0 0 .05-1.81l-3.106-5.44" />
          <path d="M12 3.5l3.8 6.6h-7.6z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
          <circle cx="6" cy="17" r="1.5" fill="currentColor" />
          <circle cx="18" cy="17" r="1.5" fill="currentColor" />
          <path d="M12 8.5v4.5l3 2" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`tracking-tight text-slate-900 font-extrabold ${textSizes[size]}`}>
            Smart<span className="text-[#10B981]">Waste</span>
          </span>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#0F382C]/70">
            Exchange
          </span>
        </div>
      )}
    </div>
  );
}
