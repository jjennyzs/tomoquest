'use client';

import { useGame } from "@/contexts/GameContext";
import { Linkedin, Twitter, Edit, Award } from "lucide-react";

const ProfileScreen = () => {
  const { profile, setEventFilter, connections } = useGame();

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-28">
      <div className="pt-5 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mb-3">
          <span className="text-2xl font-bold text-primary">{initials}</span>
        </div>

        <h2 className="font-display font-bold text-xl">{profile.name}</h2>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-lg">{profile.countryFlag}</span>
          <span className="text-sm text-muted-foreground">{profile.country}</span>
        </div>

        <span className="mt-2 text-xs bg-primary/10 border border-primary/30 rounded-lg px-3 py-1 text-primary">
          {profile.bio}
        </span>

        {/* SNS Links */}
        <div className="flex gap-3 mt-4">
          <a href="#" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-muted rounded-lg px-4 py-2.5 transition-colors">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href="#" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-muted rounded-lg px-4 py-2.5 transition-colors">
            <Twitter size={14} /> X/Twitter
          </a>
        </div>

        <button className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Edit size={12} /> Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="glass-surface rounded-xl p-4 text-center">
          <p className="font-display font-bold text-2xl text-primary">{connections.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Connections</p>
        </div>
        <div className="glass-surface rounded-xl p-4 text-center">
          <p className="font-display font-bold text-2xl text-secondary">{profile.events.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Events</p>
        </div>
      </div>

      {/* Event Passports */}
      <div className="mt-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Event Passports
        </h3>
        <div className="space-y-3">
          {profile.events.map((event) => {
            const eventConnections = connections.filter((c) => c.event === event.id).length;
            return (
              <button
                key={event.id}
                onClick={() => setEventFilter(event.id)}
                className="w-full glass-surface rounded-xl p-4 flex items-center gap-3 neon-border hover:scale-[1.02] active:scale-[0.98] transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center float-animation">
                  <Award size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{event.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {eventConnections} connection{eventConnections !== 1 ? "s" : ""} made
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
