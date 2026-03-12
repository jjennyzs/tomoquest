'use client';

import { LayoutDashboard, Users, Gift, User, ScanLine } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

const tabs = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "connections" as const, label: "Connect", icon: Users },
  { id: "scanner" as const, label: "", icon: ScanLine },
  { id: "rewards" as const, label: "Rewards", icon: Gift },
  { id: "profile" as const, label: "Profile", icon: User },
];

const BottomNav = () => {
  const { currentTab, setTab, openScanner } = useGame();

  return (
    <nav className="relative flex items-end justify-around px-2 pb-4 pt-2 bg-card border-t border-border">
      {tabs.map((tab) => {
        if (tab.id === "scanner") {
          return (
            <button
              key={tab.id}
              onClick={() => openScanner()}
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-2 border-neon-green text-neon-green flex items-center justify-center shadow-lg neon-glow-green hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              <ScanLine size={28} strokeWidth={2.5} />
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
              currentTab === tab.id
                ? "text-primary neon-text"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
          </button>
        );
      })}
      {/* Spacer for center FAB */}
      <div className="w-16 order-3 hidden" />
    </nav>
  );
};

export default BottomNav;
