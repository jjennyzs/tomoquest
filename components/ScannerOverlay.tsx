'use client';

import { X, ScanLine } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

const ScannerOverlay = () => {
  const { scannerOpen, closeScanner, simulateScan, missions, activeMissionId } = useGame();
  const mission = missions.find((m) => m.id === activeMissionId);

  if (!scannerOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-background/95 flex flex-col animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="font-display font-bold text-sm">
            {mission ? mission.title : "Scan a Badge"}
          </h2>
          {mission && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Step {mission.stepsCompleted + 1} of {mission.stepsRequired}
            </p>
          )}
        </div>
        <button
          onClick={closeScanner}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Scanner area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="relative w-56 h-56 rounded-2xl border-2 border-secondary/50 scanner-frame">
          {/* Corner brackets - green neon */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary rounded-br-lg" />

          {/* Scan line */}
          <div className="absolute left-2 right-2 h-0.5 bg-secondary/80 scan-line rounded-full shadow-[0_0_8px_hsl(150_80%_50%/0.6)]" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ScanLine size={48} className="text-secondary/30" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          Point your camera at someone's QR badge
        </p>
      </div>

      {/* Simulate button */}
      <div className="p-6">
        <button
          onClick={simulateScan}
          className="w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm neon-glow-green hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Simulate Scan
        </button>
      </div>
    </div>
  );
};

export default ScannerOverlay;
