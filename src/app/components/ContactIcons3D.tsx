"use client";

import { useId } from "react";

function IconDefs({ id: suffix }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`cyan-3d-${suffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9" stopOpacity={1} />
        <stop offset="50%" stopColor="#22d3ee" stopOpacity={1} />
        <stop offset="100%" stopColor="#0891b2" stopOpacity={1} />
      </linearGradient>
      <filter id={`icon-shadow-3d-${suffix}`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#0e7490" floodOpacity="0.5" />
        <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
  );
}

const svgBase = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon3D({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const grad = `url(#cyan-3d-${id})`;
  const filt = `url(#icon-shadow-3d-${id})`;
  return (
    <svg
      {...svgBase}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: filt }}
    >
      <IconDefs id={id} />
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        fill={grad}
        fillOpacity={0.15}
        stroke={grad}
      />
    </svg>
  );
}

export function MailIcon3D({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const grad = `url(#cyan-3d-${id})`;
  const filt = `url(#icon-shadow-3d-${id})`;
  return (
    <svg
      {...svgBase}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: filt }}
    >
      <IconDefs id={id} />
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        fill={grad}
        fillOpacity={0.15}
        stroke={grad}
      />
      <path d="M22 6l-10 7L2 6" stroke={grad} fill="none" />
    </svg>
  );
}

export function ShareIcon3D({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const grad = `url(#cyan-3d-${id})`;
  const filt = `url(#icon-shadow-3d-${id})`;
  return (
    <svg
      {...svgBase}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: filt }}
    >
      <IconDefs id={id} />
      <circle cx="18" cy="5" r="3" fill={grad} fillOpacity={0.2} stroke={grad} />
      <circle cx="6" cy="12" r="3" fill={grad} fillOpacity={0.2} stroke={grad} />
      <circle cx="18" cy="19" r="3" fill={grad} fillOpacity={0.2} stroke={grad} />
      <path d="M8.59 13.51l6.82 3.98M15.41 6.51l-6.82 3.98" stroke={grad} fill="none" />
    </svg>
  );
}

export function ClockIcon3D({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const grad = `url(#cyan-3d-${id})`;
  const filt = `url(#icon-shadow-3d-${id})`;
  return (
    <svg
      {...svgBase}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: filt }}
    >
      <IconDefs id={id} />
      <circle cx="12" cy="12" r="10" fill={grad} fillOpacity={0.15} stroke={grad} />
      <path d="M12 6v6l4 2" stroke={grad} fill="none" />
    </svg>
  );
}

/** Wrapper that adds 3D perspective and hover tilt around the icon */
export function Icon3DWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center transition-transform duration-300 ease-out [transform-style:preserve-3d] hover:[transform:perspective(120px)_rotateX(-4deg)_rotateY(2deg)_scale(1.05)] ${className}`}
      style={{
        transform: "perspective(120px) rotateX(2deg) rotateY(-1deg)",
        boxShadow:
          "0 4px 14px rgba(6, 182, 212, 0.2), 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}
