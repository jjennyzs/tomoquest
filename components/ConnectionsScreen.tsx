'use client';

import { useState } from "react";
import { useGame, type Connection } from "@/contexts/GameContext";
import { ChevronDown, ChevronUp, X, Linkedin, Twitter, StickyNote } from "lucide-react";

const ConnectionCard = ({ connection }: { connection: Connection }) => {
  const { updateMemo, openConnectionDetail } = useGame();
  const [expanded, setExpanded] = useState(false);
  const [localMemo, setLocalMemo] = useState(connection.memo);

  const initials = connection.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="glass-surface rounded-xl border border-border/50 animate-fade-in-up">
      <button
        onClick={() => openConnectionDetail(connection.id)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-primary">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm truncate">{connection.name}</h3>
            <span>{connection.countryFlag}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{connection.bio}</p>
        </div>
      </button>

      {/* Memo toggle */}
      <div className="px-4 pb-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <StickyNote size={12} />
          <span>Personal Memo</span>
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {expanded && (
          <textarea
            value={localMemo}
            onChange={(e) => setLocalMemo(e.target.value)}
            onBlur={() => updateMemo(connection.id, localMemo)}
            placeholder="Add a note about this person..."
            className="mt-2 w-full bg-muted/50 border border-border rounded-lg p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            rows={2}
          />
        )}
      </div>
    </div>
  );
};

const ConnectionDetailModal = ({ connection }: { connection: Connection }) => {
  const { openConnectionDetail } = useGame();

  const initials = connection.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="absolute inset-0 z-[55] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-scale-in">
      <div className="glass-surface rounded-2xl p-6 mx-6 max-w-sm w-full neon-glow-box relative">
        <button
          onClick={() => openConnectionDetail(null)}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mb-3">
            <span className="text-xl font-bold text-primary">{initials}</span>
          </div>
          <h2 className="font-display font-bold text-lg">{connection.name}</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span>{connection.countryFlag}</span>
            <span className="text-sm text-muted-foreground">{connection.country}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{connection.bio}</p>

          {connection.missionCompleted && (
            <div className="mt-4 w-full bg-primary/10 border border-primary/30 rounded-lg px-3 py-2">
              <p className="text-xs text-muted-foreground">Quest completed together</p>
              <p className="text-sm font-semibold text-primary mt-0.5">{connection.missionCompleted}</p>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            {connection.sns.linkedin && (
              <a href="#" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-muted rounded-lg px-3 py-2">
                <Linkedin size={14} /> LinkedIn
              </a>
            )}
            {connection.sns.twitter && (
              <a href="#" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-muted rounded-lg px-3 py-2">
                <Twitter size={14} /> X/Twitter
              </a>
            )}
          </div>

          {connection.memo && (
            <div className="mt-4 w-full text-left bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Your memo:</p>
              <p className="text-xs">{connection.memo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConnectionsScreen = () => {
  const { connections, eventFilter, setEventFilter, connectionDetailId } = useGame();

  const filtered = eventFilter
    ? connections.filter((c) => c.event === eventFilter)
    : connections;

  const detailConnection = connectionDetailId
    ? connections.find((c) => c.id === connectionDetailId)
    : null;

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-28">
      <div className="pt-5 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg">Connections</h2>
          <span className="text-xs text-muted-foreground">{connections.length} people</span>
        </div>
        {eventFilter && (
          <button
            onClick={() => setEventFilter(null)}
            className="mt-2 flex items-center gap-1.5 text-xs bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5 text-primary hover:bg-primary/20 transition-colors"
          >
            <X size={12} />
            Clear filter
          </button>
        )}
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <ConnectionCard key={c.id} connection={c} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">
              {connections.length === 0
                ? "No connections yet. Start scanning! 📱"
                : "No connections for this event filter."}
            </p>
          </div>
        )}
      </div>

      {detailConnection && <ConnectionDetailModal connection={detailConnection} />}
    </div>
  );
};

export default ConnectionsScreen;
