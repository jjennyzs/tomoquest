'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
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
import useProfile from "@/hooks/useProfile";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

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

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const router = useRouter();
    const friend = searchParams?.get('friend');

    const { data: friendProfile, isLoading, error } = useProfile(friend);


    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) return null;

    return (
        <GameProvider>
            <div className="flex items-center justify-center flex-col p-12 gap-8">
                <div className="p-4 bg-white rounded-lg relative">
                    {/* <QRCodeSVG value={`http://localhost:3000/dashboard?friend=${user?.id}`} */}
                    <QRCodeSVG value={`https://interplacental-marcelene-superchivalrously.ngrok-free.dev/dashboard?friend=${user?.id}`}
                        size={250}
                        bgColor="#ffffff"
                        fgColor="#444444"
                        level="M"
                    />
                    <Image src={'/tomoquest_logo.svg'} alt="Tomo quest logo svg" height={60} width={60} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h1 className="text-4xl font-bold">This is a dashboard</h1>
                <p>Hello, {user?.user_metadata.full_name}</p>
                {
                    friendProfile && user?.id !== friendProfile.id &&
                    <div>Congratulations!🎉 You now are friend with {friendProfile.full_name}</div>
                }
            </div>
            <AppContent />
        </GameProvider>
    );
}
