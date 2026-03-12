import { GameProvider, useGame } from "@/contexts/GameContext";
import MobileLayout from "@/components/MobileLayout";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import Dashboard from "@/components/Dashboard";
import ConnectionsScreen from "@/components/ConnectionsScreen";
import RewardsScreen from "@/components/RewardsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import ScannerOverlay from "@/components/ScannerOverlay";
import SuccessModal from "@/components/SuccessModal";

const AppContent = () => {
  const { currentTab } = useGame();

  return (
    <MobileLayout>
      <AppHeader />
      {currentTab === "dashboard" && <Dashboard />}
      {currentTab === "connections" && <ConnectionsScreen />}
      {currentTab === "rewards" && <RewardsScreen />}
      {currentTab === "profile" && <ProfileScreen />}
      <BottomNav />
      <ScannerOverlay />
      <SuccessModal />
    </MobileLayout>
  );
};

const Index = () => (
  <GameProvider>
    <AppContent />
  </GameProvider>
);

export default Index;
