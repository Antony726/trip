import React, { useState } from 'react';
import { Wallet, MapPin, Sparkles, Users, Layers, Cpu, Vote, Calendar, Navigation, CheckSquare, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  totalExpense, 
  theme, 
  setTheme, 
  onOpenFriendsModal 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const primaryTabs = [
    { id: 'expenses', label: 'Tracker', icon: Wallet },
    { id: 'settlement', label: 'Splitwise', icon: Users },
    { id: 'guide', label: 'Guide', icon: MapPin },
  ];

  const allSubpages = [
    { id: 'expenses', label: 'Expense Tracker', desc: 'Add bills & view group feed', icon: Wallet, emoji: '💳' },
    { id: 'settlement', label: 'Splitwise Settlements', desc: 'Who owes whom & minimal payments', icon: Users, emoji: '⚖️' },
    { id: 'guide', label: 'Ooty & Coonoor Guide', desc: '40+ Photo spots with Google Maps', icon: MapPin, emoji: '📸' },
    { id: 'polls', label: 'Group Polls', desc: 'Vote on food, spots & wake up times', icon: Vote, emoji: '🗳️' },
    { id: 'planner', label: 'Trip Itinerary', desc: 'Oct 9-11 Day-by-Day schedule', icon: Calendar, emoji: '📅' },
    { id: 'journey', label: 'Roadtrip Journey', desc: 'Distance, fuel, tolls & stops', icon: Navigation, emoji: '🚗' },
    { id: 'visited', label: 'Trail Path & Recap', desc: 'Interactive route & trip wrap', icon: CheckSquare, emoji: '📍' },
    { id: 'fun', label: 'Fun Zone', desc: 'Spin wheel, bingo, roast & lo-fi FM', icon: Sparkles, emoji: '⚡' },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* TOP HEADER */}
      <header className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
        theme === 'cyber' 
          ? 'bg-cyber-bg/95 border-cyber-accent/40 backdrop-blur shadow-[0_0_15px_rgba(0,255,136,0.15)]' 
          : theme === 'vapor'
          ? 'bg-vapor-bg/95 border-vapor-magenta/50 backdrop-blur shadow-[0_0_20px_rgba(255,0,255,0.2)]'
          : 'bg-retro-navy text-white border-b-2 border-retro-darkGray win95-outset'
      }`}>
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
          
          {/* App Branding */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs ${
              theme === 'cyber' 
                ? 'bg-cyber-card border border-cyber-accent text-cyber-accent cyber-chamfer-sm'
                : theme === 'vapor'
                ? 'bg-vapor-magenta/20 border border-vapor-cyan text-vapor-cyan -skew-x-6'
                : 'bg-retro-bg text-black border border-white win95-outset font-retro'
            }`}>
              🌲
            </div>
            <div>
              <h1 className={`font-black text-sm tracking-wider uppercase leading-none ${
                theme === 'cyber' 
                  ? 'font-heading text-cyber-accent glitch-text' 
                  : theme === 'vapor'
                  ? 'font-heading text-transparent bg-clip-text bg-gradient-to-r from-vapor-orange via-vapor-magenta to-vapor-cyan'
                  : 'font-impact text-white tracking-normal'
              }`} data-text="OOTY '26">
                OOTY '26
              </h1>
              <p className={`text-[10px] tracking-widest uppercase ${
                theme === 'cyber' ? 'font-mono text-cyber-cyan' : theme === 'vapor' ? 'font-mono text-vapor-text/70' : 'font-retro text-retro-yellow'
              }`}>
                Trip Hub
              </p>
            </div>
          </div>

          {/* TOTAL EXPENSE BADGE & ACTIONS */}
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-0.5 flex flex-col items-end ${
              theme === 'cyber'
                ? 'bg-cyber-card/90 border border-cyber-accent/60 text-cyber-accent cyber-chamfer-sm'
                : theme === 'vapor'
                ? 'bg-black/60 border border-vapor-magenta text-vapor-cyan shadow-[0_0_10px_#FF00FF]'
                : 'bg-white text-black border-2 border-black win95-inset font-retro'
            }`}>
              <span className="text-[8px] uppercase tracking-wider opacity-80">Trip Spent</span>
              <span className="text-xs font-bold font-mono leading-tight">
                {formatCurrency(totalExpense)}
              </span>
            </div>

            {/* Friends Edit Button */}
            <button
              onClick={onOpenFriendsModal}
              title="Edit Friends Names"
              className={`p-1.5 transition-all ${
                theme === 'cyber'
                  ? 'border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 cyber-chamfer-sm'
                  : 'bg-retro-bg text-black win95-outset'
              }`}
            >
              <Users className="w-4 h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                const nextTheme = theme === 'cyber' ? 'vapor' : theme === 'vapor' ? 'retro' : 'cyber';
                setTheme(nextTheme);
              }}
              title="Switch Visual Theme"
              className={`p-1.5 transition-all ${
                theme === 'cyber'
                  ? 'border border-cyber-magenta text-cyber-magenta hover:bg-cyber-magenta/10 cyber-chamfer-sm'
                  : 'bg-retro-bg text-black win95-outset'
              }`}
            >
              {theme === 'cyber' && <Cpu className="w-4 h-4 text-cyber-accent" />}
              {theme === 'vapor' && <Sparkles className="w-4 h-4 text-vapor-magenta" />}
              {theme === 'retro' && <Layers className="w-4 h-4 text-retro-navy" />}
            </button>
          </div>

        </div>
      </header>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-bg/95 border-cyber-accent/40 backdrop-blur shadow-[0_-5px_20px_rgba(0,255,136,0.1)]'
          : theme === 'vapor'
          ? 'bg-vapor-bg/95 border-vapor-magenta/50 backdrop-blur shadow-[0_-5px_25px_rgba(255,0,255,0.15)]'
          : 'bg-retro-bg border-t-2 border-white win95-outset'
      }`}>
        <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 transition-all ${
                  isActive
                    ? theme === 'cyber'
                      ? 'text-cyber-accent font-extrabold scale-105'
                      : theme === 'vapor'
                      ? 'text-vapor-cyan font-extrabold scale-105 drop-shadow-[0_0_8px_#00FFFF]'
                      : 'text-retro-navy font-bold bg-white/70 win95-inset'
                    : 'opacity-70 hover:opacity-100 text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] uppercase font-mono tracking-wider">{tab.label}</span>
              </button>
            );
          })}

          {/* MORE MENU DRAWER TRIGGER BUTTON */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              isMenuOpen || !['expenses', 'settlement', 'guide'].includes(activeTab)
                ? theme === 'cyber'
                  ? 'text-cyber-yellow font-extrabold scale-105'
                  : 'text-vapor-magenta font-extrabold scale-105'
                : 'opacity-70 hover:opacity-100 text-gray-400'
            }`}
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold">More ☰</span>
          </button>
        </div>
      </nav>

      {/* MOBILE SLIDE-UP MENU DRAWER MODAL */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md p-4 rounded-t-2xl max-h-[85vh] overflow-y-auto transition-all ${
            theme === 'cyber'
              ? 'bg-cyber-card border-t-2 border-cyber-accent text-cyber-text shadow-[0_-10px_30px_rgba(0,255,136,0.2)]'
              : theme === 'vapor'
              ? 'bg-vapor-bg border-t-2 border-vapor-magenta text-vapor-text shadow-[0_-10px_30px_rgba(255,0,255,0.25)]'
              : 'bg-retro-bg text-black border-2 border-black win95-outset font-retro'
          }`}>
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-700/50 mb-3">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-1.5 font-mono text-cyber-accent">
                  🗺️ Trip Feature Navigation
                </h3>
                <p className="text-[10px] opacity-70 font-mono">Tap any subpage to open</p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 bg-gray-800 text-gray-300 hover:text-white rounded-full font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subpages Menu Grid List */}
            <div className="space-y-2">
              {allSubpages.map((item) => {
                const Icon = item.icon;
                const isCurrent = activeTab === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`p-3 flex items-center justify-between cursor-pointer transition-all border ${
                      isCurrent
                        ? theme === 'cyber'
                          ? 'bg-cyber-accent/20 border-cyber-accent text-cyber-accent font-bold shadow-[0_0_10px_rgba(0,255,136,0.2)]'
                          : 'bg-vapor-magenta/20 border-vapor-magenta text-vapor-cyan font-bold'
                        : 'bg-black/50 border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{item.emoji}</div>
                      <div>
                        <div className="font-mono text-xs font-bold flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {isCurrent && <span className="text-[9px] px-1.5 py-0.2 bg-cyber-accent text-black font-extrabold uppercase">Active</span>}
                        </div>
                        <div className="text-[10px] opacity-60 font-mono mt-0.5">{item.desc}</div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
