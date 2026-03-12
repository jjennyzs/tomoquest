'use client';

import { QRCodeSVG } from "qrcode.react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import MissionCard from "./MissionCard";

const Dashboard = () => {
  const { profile, missions } = useGame();
  const [copied, setCopied] = useState(false);

  const activeMissions = missions.filter((m) => m.status === "active");
  const completedMissions = missions.filter((m) => m.status === "completed");

  const copyId = () => {
    navigator.clipboard.writeText(profile.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-28">
      {/* Passport Section */}
      <div className="pt-5 pb-4">
        <div className="glass-surface rounded-2xl p-5 flex flex-col items-center neon-border">
          <div className="bg-foreground p-2 rounded-xl mb-3">
            <QRCodeSVG
              value={`tomoquest://user/${profile.id}`}
              size={120}
              bgColor="hsl(210, 20%, 95%)"
              fgColor="hsl(222, 47%, 11%)"
              level="M"
            />
          </div>
          <h2 className="font-display font-bold text-lg">{profile.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg">{profile.countryFlag}</span>
            <button
              onClick={copyId}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="font-mono">#{profile.id}</span>
              {copied ? <Check size={12} className="text-secondary" /> : <Copy size={12} />}
            </button>
          </div>
        </div>
      </div>

      {/* Active Quests */}
      <div className="mt-2">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Active Quests
        </h2>
        <div className="space-y-3">
          {activeMissions.map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
          {activeMissions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">All quests completed! 🎉</p>
          )}
        </div>
      </div>

      {completedMissions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Completed
          </h2>
          <div className="space-y-3">
            {completedMissions.map((m) => (
              <MissionCard key={m.id} mission={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
