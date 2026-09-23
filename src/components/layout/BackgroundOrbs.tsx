import React from 'react';

export const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#090a14]">
      {/* Deep base atmospheric radiant background */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% -15%, rgba(124, 58, 237, 0.35), rgba(79, 70, 229, 0.2) 45%, rgba(15, 23, 42, 0.95) 85%)'
        }}
      />

      {/* Floating Orb 1: Upper-left Violet/Purple */}
      <div
        className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full animate-float-1 filter blur-[110px] opacity-45"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, #6366f1 50%, transparent 75%)'
        }}
      />

      {/* Floating Orb 2: Upper-right Deep Indigo/Blue */}
      <div
        className="absolute top-10 right-[-10%] w-[650px] h-[650px] rounded-full animate-float-2 filter blur-[130px] opacity-40"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, #8b5cf6 55%, transparent 75%)'
        }}
      />

      {/* Floating Orb 3: Center-bottom Electric Purple */}
      <div
        className="absolute bottom-[-15%] left-[20%] w-[700px] h-[600px] rounded-full animate-float-3 filter blur-[140px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, #4338ca 60%, transparent 80%)'
        }}
      />

      {/* Floating Orb 4: Subtle Cyan/Teal accent near center for depth */}
      <div
        className="absolute top-[45%] left-[-5%] w-[420px] h-[420px] rounded-full animate-float-1 filter blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #6366f1 70%, transparent 80%)'
        }}
      />

      {/* Fine architectural grid mesh */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
      />
    </div>
  );
};
