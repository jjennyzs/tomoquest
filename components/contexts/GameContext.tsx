'use client';

import React, { createContext, useContext, useState, useCallback } from "react";

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  status: "active" | "completed";
  type: "team" | "solo" | "location";
  stepsRequired: number;
  stepsCompleted: number;
  icon: string;
  event: string;
}

export interface Connection {
  id: string;
  name: string;
  avatar: string;
  country: string;
  countryFlag: string;
  bio: string;
  missionCompleted: string;
  event: string;
  memo: string;
  sns: { linkedin?: string; twitter?: string };
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  redeemed: boolean;
}

export interface UserProfile {
  name: string;
  id: string;
  avatar: string;
  bio: string;
  country: string;
  countryFlag: string;
  sns: { linkedin: string; twitter: string };
  events: { id: string; name: string; year: string }[];
}

interface GameState {
  points: number;
  missions: Mission[];
  connections: Connection[];
  rewards: RewardItem[];
  currentTab: "dashboard" | "connections" | "scanner" | "rewards" | "profile";
  scannerOpen: boolean;
  successModalOpen: boolean;
  lastScannedConnection: Connection | null;
  activeMissionId: string | null;
  profile: UserProfile;
  eventFilter: string | null;
  connectionDetailId: string | null;
}

interface GameContextType extends GameState {
  setTab: (tab: GameState["currentTab"]) => void;
  openScanner: (missionId?: string) => void;
  closeScanner: () => void;
  simulateScan: () => void;
  closeSuccessModal: () => void;
  redeemReward: (rewardId: string) => void;
  updateMemo: (connectionId: string, memo: string) => void;
  setEventFilter: (eventId: string | null) => void;
  openConnectionDetail: (id: string | null) => void;
}

const initialProfile: UserProfile = {
  name: "Yuki Tanaka",
  id: "TQ-2026-0042",
  avatar: "",
  bio: "UI/UX & Frontend",
  country: "Japan",
  countryFlag: "🇯🇵",
  sns: { linkedin: "linkedin.com/in/yukitanaka", twitter: "@yuki_dev" },
  events: [
    { id: "takeoff-tokyo", name: "Takeoff Tokyo 2026", year: "2026" },
    { id: "demola-event", name: "Demola Event 2026", year: "2026" },
  ],
};

const scannableConnections: Connection[] = [
  { id: "alex-1", name: "Alex Rivera", avatar: "", country: "USA", countryFlag: "🇺🇸", bio: "Full-Stack Developer", missionCompleted: "", event: "takeoff-tokyo", memo: "", sns: { linkedin: "linkedin.com/in/alexr", twitter: "@alexdev" } },
  { id: "sofia-2", name: "Sofia Chen", avatar: "", country: "Singapore", countryFlag: "🇸🇬", bio: "Product Designer", missionCompleted: "", event: "takeoff-tokyo", memo: "", sns: { linkedin: "linkedin.com/in/sofiac" } },
  { id: "marcus-3", name: "Marcus Okonkwo", avatar: "", country: "Nigeria", countryFlag: "🇳🇬", bio: "AI Researcher", missionCompleted: "", event: "demola-event", memo: "", sns: { twitter: "@marcusai" } },
  { id: "lina-4", name: "Lina Müller", avatar: "", country: "Germany", countryFlag: "🇩🇪", bio: "DevOps Engineer", missionCompleted: "", event: "takeoff-tokyo", memo: "", sns: { linkedin: "linkedin.com/in/linam" } },
  { id: "kenji-5", name: "Kenji Nakamura", avatar: "", country: "Japan", countryFlag: "🇯🇵", bio: "Backend Engineer", missionCompleted: "", event: "demola-event", memo: "", sns: { linkedin: "linkedin.com/in/kenjin", twitter: "@kenji_code" } },
];

const initialMissions: Mission[] = [
  { id: "diversity-triad", title: "The Diversity Triad", description: "Connect with people from 3 different countries.", points: 50, status: "active", type: "team", stepsRequired: 3, stepsCompleted: 0, icon: "Users", event: "takeoff-tokyo" },
  { id: "first-contact", title: "First Contact", description: "Make your very first connection at the event.", points: 20, status: "active", type: "solo", stepsRequired: 1, stepsCompleted: 0, icon: "Handshake", event: "takeoff-tokyo" },
  { id: "find-developer", title: "Find a Developer", description: "Connect with someone in a dev role.", points: 30, status: "active", type: "solo", stepsRequired: 1, stepsCompleted: 0, icon: "Code", event: "takeoff-tokyo" },
  { id: "keynote-crew", title: "Keynote Crew", description: "Find 2 people who attended the opening keynote.", points: 40, status: "active", type: "team", stepsRequired: 2, stepsCompleted: 0, icon: "Mic", event: "demola-event" },
  { id: "globe-trotter", title: "Globe Trotter", description: "Connect with people from 5 different countries.", points: 80, status: "active", type: "solo", stepsRequired: 5, stepsCompleted: 0, icon: "Globe", event: "takeoff-tokyo" },
];

const initialRewards: RewardItem[] = [
  { id: "coffee", title: "Free Coffee", description: "Redeem at any café station", cost: 50, icon: "Coffee", redeemed: false },
  { id: "sticker", title: "Holo Sticker Pack", description: "Limited edition event stickers", cost: 30, icon: "Sparkles", redeemed: false },
  { id: "tshirt", title: "Event T-Shirt", description: "Exclusive conference merch", cost: 200, icon: "Shirt", redeemed: false },
  { id: "powerbank", title: "Power Bank", description: "Portable charger with logo", cost: 150, icon: "Battery", redeemed: false },
  { id: "vip", title: "VIP Lounge Pass", description: "Access to VIP networking lounge", cost: 100, icon: "Crown", redeemed: false },
  { id: "lunch", title: "Premium Lunch", description: "Gourmet lunch voucher", cost: 80, icon: "UtensilsCrossed", redeemed: false },
];

const iceBreakers = [
  "What's the best food you've had in Tokyo so far?",
  "What's a topic you could give a 30-min presentation on with zero prep?",
  "If you could swap jobs with anyone here for a day, who would it be?",
  "What's the most underrated tool in your tech stack?",
  "What's a hobby you picked up recently?",
];

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};

export { iceBreakers };

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scanIndex, setScanIndex] = useState(0);

  const [state, setState] = useState<GameState>({
    points: 0,
    missions: initialMissions,
    connections: [],
    rewards: initialRewards,
    currentTab: "dashboard",
    scannerOpen: false,
    successModalOpen: false,
    lastScannedConnection: null,
    activeMissionId: null,
    profile: initialProfile,
    eventFilter: null,
    connectionDetailId: null,
  });

  const setTab = useCallback((tab: GameState["currentTab"]) => {
    setState((s) => ({ ...s, currentTab: tab }));
  }, []);

  const openScanner = useCallback((missionId?: string) => {
    setState((s) => ({
      ...s,
      scannerOpen: true,
      activeMissionId: missionId || s.missions.find((m) => m.status === "active")?.id || null,
    }));
  }, []);

  const closeScanner = useCallback(() => {
    setState((s) => ({ ...s, scannerOpen: false }));
  }, []);

  const simulateScan = useCallback(() => {
    const newConnection = scannableConnections[scanIndex % scannableConnections.length];
    setScanIndex((i) => i + 1);

    setState((s) => {
      if (s.connections.find((c) => c.id === newConnection.id)) {
        // Already connected, pick next
        return s;
      }

      const mission = s.missions.find((m) => m.id === s.activeMissionId);
      let updatedMissions = s.missions;
      let bonusPoints = 0;

      if (mission && mission.status === "active") {
        const newSteps = mission.stepsCompleted + 1;
        const isComplete = newSteps >= mission.stepsRequired;
        updatedMissions = s.missions.map((m) =>
          m.id === mission.id
            ? { ...m, stepsCompleted: newSteps, status: isComplete ? ("completed" as const) : m.status }
            : m
        );
        if (isComplete) bonusPoints = mission.points;
      }

      const connWithMission = { ...newConnection, missionCompleted: mission?.title || "" };

      return {
        ...s,
        missions: updatedMissions,
        connections: [...s.connections, connWithMission],
        points: s.points + 50 + bonusPoints,
        scannerOpen: false,
        successModalOpen: true,
        lastScannedConnection: connWithMission,
      };
    });
  }, [scanIndex]);

  const closeSuccessModal = useCallback(() => {
    setState((s) => ({ ...s, successModalOpen: false, lastScannedConnection: null }));
  }, []);

  const redeemReward = useCallback((rewardId: string) => {
    setState((s) => {
      const reward = s.rewards.find((r) => r.id === rewardId);
      if (!reward || reward.redeemed || s.points < reward.cost) return s;
      return {
        ...s,
        points: s.points - reward.cost,
        rewards: s.rewards.map((r) => (r.id === rewardId ? { ...r, redeemed: true } : r)),
      };
    });
  }, []);

  const updateMemo = useCallback((connectionId: string, memo: string) => {
    setState((s) => ({
      ...s,
      connections: s.connections.map((c) => (c.id === connectionId ? { ...c, memo } : c)),
    }));
  }, []);

  const setEventFilter = useCallback((eventId: string | null) => {
    setState((s) => ({ ...s, eventFilter: eventId, currentTab: "connections" }));
  }, []);

  const openConnectionDetail = useCallback((id: string | null) => {
    setState((s) => ({ ...s, connectionDetailId: id }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        setTab,
        openScanner,
        closeScanner,
        simulateScan,
        closeSuccessModal,
        redeemReward,
        updateMemo,
        setEventFilter,
        openConnectionDetail,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
