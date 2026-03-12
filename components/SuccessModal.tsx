'use client';

import { useGame, iceBreakers } from "@/contexts/GameContext";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const confettiColors = [
  "hsl(150, 100%, 50%)",
  "hsl(195, 100%, 50%)",
  "hsl(45, 100%, 60%)",
  "hsl(0, 90%, 60%)",
  "hsl(170, 80%, 50%)",
  "hsl(120, 80%, 60%)",
];

const SuccessModal = () => {
  const { successModalOpen, lastScannedConnection, closeSuccessModal } = useGame();
  const [iceIndex, setIceIndex] = useState(0);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        size: 4 + Math.random() * 8,
        color: confettiColors[i % confettiColors.length],
        rotation: Math.random() * 360,
      })),
    []
  );

  if (!successModalOpen || !lastScannedConnection) return null;

  const initials = lastScannedConnection.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-scale-in">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPieces.map((p) => (
          <div
            key={p.id}
            className="absolute confetti-piece rounded-sm"
            style={{
              left: `${p.left}%`,
              top: -20,
              width: p.size,
              height: p.size * 1.5,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div className="glass-surface rounded-2xl p-6 mx-6 text-center relative neon-glow-box max-w-sm w-full">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto mb-3">
          <span className="text-lg font-bold text-primary">{initials}</span>
        </div>

        <div className="flex items-center justify-center gap-1 mb-1">
          <Sparkles size={16} className="text-primary" />
          <h2 className="font-display font-bold text-lg neon-text">Connection Made!</h2>
        </div>

        <p className="text-sm text-muted-foreground">
          You just met <span className="text-foreground font-semibold">{lastScannedConnection.name}</span>{" "}
          {lastScannedConnection.countryFlag}
        </p>

        {/* Ice-breaker carousel */}
        <div className="mt-4 bg-muted/40 rounded-xl p-4 relative">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Ice Breaker</p>
          <p className="text-sm text-foreground min-h-[40px] px-6">
            "{iceBreakers[iceIndex]}"
          </p>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => setIceIndex((i) => (i - 1 + iceBreakers.length) % iceBreakers.length)}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              {iceBreakers.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === iceIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIceIndex((i) => (i + 1) % iceBreakers.length)}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={closeSuccessModal}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm neon-glow-box hover:brightness-110 active:scale-[0.98] transition-all mt-4"
        >
          Add to Connections & Earn 50 pts
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
