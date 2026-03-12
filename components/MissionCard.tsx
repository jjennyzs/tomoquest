'use client';

import { Users, Code, MapPin, Mic, Globe, Handshake, ChevronRight, CheckCircle2, Zap, type LucideIcon } from "lucide-react";
import type { Mission } from "@/contexts/GameContext";
import { useGame } from "@/contexts/GameContext";

const iconMap: Record<string, LucideIcon> = {
  Users, Code, MapPin, Mic, Globe, Handshake,
};

const MissionCard = ({ mission }: { mission: Mission }) => {
  const { openScanner } = useGame();
  const Icon = iconMap[mission.icon] || Zap;
  const isCompleted = mission.status === "completed";
  const progress = (mission.stepsCompleted / mission.stepsRequired) * 100;

  return (
    <button
      onClick={() => !isCompleted && openScanner(mission.id)}
      disabled={isCompleted}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 animate-fade-in-up ${
        isCompleted
          ? "bg-muted/30 border-border/50 opacity-70"
          : "glass-surface neon-border hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            isCompleted ? "bg-muted" : "bg-primary/10 border border-primary/30"
          }`}
        >
          <Icon size={20} className={isCompleted ? "text-muted-foreground" : "text-primary"} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm truncate">{mission.title}</h3>
            {isCompleted && <CheckCircle2 size={14} className="text-secondary shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{mission.description}</p>
          
          {/* Always show progress bar for active missions */}
          {!isCompleted && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full progress-bar-fill rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">
                {mission.stepsCompleted}/{mission.stepsRequired}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-xs font-bold font-display ${isCompleted ? "text-muted-foreground" : "text-primary neon-text"}`}>
            +{mission.points}
          </span>
          <span className="text-[10px] text-muted-foreground">pts</span>
          {!isCompleted && <ChevronRight size={14} className="text-muted-foreground mt-1" />}
        </div>
      </div>
    </button>
  );
};

export default MissionCard;
