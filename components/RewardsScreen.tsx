'use client';

import { useGame } from "@/contexts/GameContext";
import { Coffee, Sparkles, Shirt, Battery, Crown, UtensilsCrossed, ShoppingBag, Check, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Coffee, Sparkles, Shirt, Battery, Crown, UtensilsCrossed,
};

const RewardsScreen = () => {
  const { points, rewards, redeemReward } = useGame();

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24">
      <div className="pt-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag size={18} className="text-neon-blue" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Reward Shop
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <h1 className="text-3xl font-display font-bold neon-text-blue">{points}</h1>
          <span className="text-sm text-muted-foreground">pts available</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {rewards.map((reward) => {
          const Icon = iconMap[reward.icon] || Coffee;
          const canAfford = points >= reward.cost && !reward.redeemed;
          const isDisabled = !canAfford && !reward.redeemed;

          return (
            <button
              key={reward.id}
              onClick={() => canAfford && redeemReward(reward.id)}
              disabled={isDisabled || reward.redeemed}
              className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                reward.redeemed
                  ? "bg-primary/5 border-primary/30"
                  : canAfford
                  ? "glass-surface neon-border hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                  : "bg-muted/20 border-border/30 opacity-50"
              }`}
            >
              {reward.redeemed && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check size={12} className="text-primary-foreground" />
                </div>
              )}

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  reward.redeemed
                    ? "bg-primary/20"
                    : canAfford
                    ? "bg-neon-blue/10 border border-neon-blue/30"
                    : "bg-muted"
                }`}
              >
                <Icon
                  size={20}
                  className={
                    reward.redeemed
                      ? "text-primary"
                      : canAfford
                      ? "text-neon-blue"
                      : "text-muted-foreground"
                  }
                />
              </div>

              <h3 className="font-semibold text-sm">{reward.title}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                {reward.description}
              </p>
              <p
                className={`text-xs font-display font-bold mt-2 ${
                  reward.redeemed
                    ? "text-primary"
                    : canAfford
                    ? "text-neon-blue neon-text-blue"
                    : "text-muted-foreground"
                }`}
              >
                {reward.redeemed ? "Redeemed" : `${reward.cost} pts`}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RewardsScreen;
