'use client';

import { useGame } from "@/contexts/GameContext";

const AppHeader = () => {
  const { points } = useGame();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
      <div>
        <h1 className="font-display font-bold text-base neon-text">TomoQuest</h1>
        <span className="text-[10px] text-muted-foreground tracking-wider">トモクエスト</span>
      </div>
      <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5">
        <span className="text-sm">🌟</span>
        <span className="text-xs font-semibold text-primary">{points} pts</span>
      </div>
    </header>
  );
};

export default AppHeader;
