'use client';

import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative w-full max-w-[400px] min-h-screen md:min-h-0 md:h-[812px] md:rounded-3xl md:border md:border-border md:shadow-2xl overflow-hidden bg-background flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
