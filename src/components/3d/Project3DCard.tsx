import React, { useRef, useState } from 'react';

interface Project3DCardProps {
  children: React.ReactNode;
  className?: string;
}

export const Project3DCard: React.FC<Project3DCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; // Pitch
    const rotateY = ((x - centerX) / centerX) * 8;  // Yaw

    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShine(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.2s ease-out'
      }}
      className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] ${className}`}
    >
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(56, 189, 248, 0.2) 0%, transparent 60%)`,
          opacity: shine.opacity
        }}
      />
      {children}
    </div>
  );
};
