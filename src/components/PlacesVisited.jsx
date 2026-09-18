import React, { useState } from 'react';
import { MapPin, CheckCircle2, Navigation, Plus, Trash2, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OOTY_SPOTS } from '../data/ootyData';

export default function PlacesVisited({ totalExpense, journey, theme }) {
  // Trail items state (Prepopulated with spots, plus customizable by user!)
  const [trailItems, setTrailItems] = useState(() => {
    const saved = localStorage.getItem('ooty_custom_trail_list');
    return saved ? JSON.parse(saved) : OOTY_SPOTS.slice(0, 15);
  });

  const [visited, setVisited] = useState(() => {
    const saved = localStorage.getItem('ooty_visited_spots');
    return saved ? JSON.parse(saved) : { 'doddabetta': true, 'ooty-lake': true, 'tea-factory': true, 'crown-bakery': true };
  });

  // Custom Trail Stop Adder Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [customStopName, setCustomStopName] = useState('');
  const [customStopCat, setCustomStopCat] = useState('En Route Stop 🚗');

  const toggleVisited = (spotId) => {
    const nextState = { ...visited, [spotId]: !visited[spotId] };
    setVisited(nextState);
    localStorage.setItem('ooty_visited_spots', JSON.stringify(nextState));

    if (!visited[spotId]) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleAddCustomTrailStop = (e) => {
    e.preventDefault();
    if (!customStopName.trim()) return;

    const newTrailNode = {
      id: `custom-trail-${Date.now()}`,
      name: customStopName.trim(),
      category: customStopCat,
      distanceKm: 15
    };

    const updated = [...trailItems, newTrailNode];
    setTrailItems(updated);
    localStorage.setItem('ooty_custom_trail_list', JSON.stringify(updated));

    setCustomStopName('');
    setShowAddForm(false);
  };

  const handleDeleteTrailStop = (spotId) => {
    const updated = trailItems.filter(item => item.id !== spotId);
    setTrailItems(updated);
    localStorage.setItem('ooty_custom_trail_list', JSON.stringify(updated));
  };

  const visitedCount = trailItems.filter(item => visited[item.id]).length;
  const totalSpotsCount = trailItems.length;
  const progressPercent = totalSpotsCount > 0 ? Math.round((visitedCount / totalSpotsCount) * 100) : 0;

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* HEADER & SUMMARY PROGRESS */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-accent/50 cyber-chamfer shadow-[0_0_15px_rgba(0,255,136,0.15)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-magenta border-vapor-cyan/40 backdrop-blur'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro text-black'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${
              theme === 'cyber' ? 'font-heading text-cyber-accent' : theme === 'vapor' ? 'font-heading text-vapor-magenta' : 'font-impact text-retro-navy text-base'
            }`}>
              <MapPin className="w-4 h-4" /> 📍 Places Visited & Trail Path
            </h2>
            <p className="text-[10px] opacity-70 font-mono">Strava-style customizable group story path</p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`px-2.5 py-1 text-xs uppercase font-bold flex items-center gap-1 ${
              theme === 'cyber'
                ? 'bg-cyber-accent text-black cyber-chamfer-sm'
                : 'bg-retro-navy text-white win95-outset'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Add Stop
          </button>
        </div>

        {/* Trail Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono opacity-90">
            <span>Trail Completion:</span>
            <span className="font-extrabold text-cyber-accent">{visitedCount} / {totalSpotsCount} Places ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-black/60 h-2.5 border border-gray-700 relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyber-accent via-cyber-cyan to-cyber-yellow h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ADD CUSTOM TRAIL STOP FORM */}
      {showAddForm && (
        <form onSubmit={handleAddCustomTrailStop} className="p-3 bg-cyber-card border border-cyber-accent text-xs space-y-2 font-mono">
          <h3 className="font-bold text-cyber-accent flex items-center justify-between">
            <span>➕ Add Custom Stop to Trail Path</span>
            <button type="button" onClick={() => setShowAddForm(false)} className="text-red-400 font-bold">✕</button>
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder="Stop Name (e.g. Tea Estate)"
              value={customStopName}
              onChange={(e) => setCustomStopName(e.target.value)}
              className="p-1.5 bg-black border border-gray-700 text-white outline-none"
            />
            <input
              type="text"
              placeholder="Category / Tag"
              value={customStopCat}
              onChange={(e) => setCustomStopCat(e.target.value)}
              className="p-1.5 bg-black border border-gray-700 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 bg-cyber-accent text-black font-bold uppercase tracking-wider"
          >
            Add Node to Trail 📍
          </button>
        </form>
      )}

      {/* STRAVA-STYLE STORY TRAIL PATH */}
      <div className={`p-4 transition-all ${
        theme === 'cyber' ? 'bg-cyber-card/90 border border-cyber-border' : 'bg-vapor-card border border-vapor-purple'
      }`}>
        <h3 className="font-bold text-xs uppercase tracking-wider mb-4 flex items-center justify-between font-mono text-cyber-cyan">
          <span className="flex items-center gap-1">
            <Navigation className="w-4 h-4 text-cyber-accent" /> Group Trail Route
          </span>
          <span className="text-[10px] text-gray-400">Tap node to toggle visited</span>
        </h3>

        {/* Trail Nodes */}
        <div className="relative pl-6 border-l-2 border-dashed border-cyber-accent/60 space-y-3.5">
          {trailItems.map((spot, idx) => {
            const isChecked = !!visited[spot.id];
            return (
              <div key={spot.id} className="relative flex items-center justify-between group">
                {/* Strava Trail Node Indicator */}
                <div
                  onClick={() => toggleVisited(spot.id)}
                  className={`absolute -left-[33px] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-cyber-accent text-black shadow-[0_0_12px_#00ff88] scale-110'
                      : 'bg-black border border-cyber-cyan text-gray-500 hover:border-white'
                  }`}
                >
                  {isChecked ? <CheckCircle2 className="w-4 h-4 font-extrabold" /> : <span className="text-[10px] font-mono">{idx + 1}</span>}
                </div>

                {/* Spot card */}
                <div
                  className={`flex-1 p-2.5 ml-2 border cursor-pointer transition-all flex items-center justify-between ${
                    isChecked
                      ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200'
                      : 'bg-black/50 border-gray-700/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div onClick={() => toggleVisited(spot.id)} className="flex-1">
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span>{spot.name}</span>
                      {isChecked && <span className="text-[9px] bg-emerald-500 text-black px-1 font-mono">VISITED</span>}
                    </div>
                    <div className="text-[10px] opacity-70 font-mono">{spot.category}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span onClick={() => toggleVisited(spot.id)} className="text-xs font-mono font-bold text-cyber-yellow">
                      {isChecked ? '✓' : '+'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrailStop(spot.id);
                      }}
                      className="text-gray-500 hover:text-red-400 p-1"
                      title="Remove from Trail"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* END OF TRIP WRAP RECAP CARD */}
      <div className={`p-5 transition-all text-center relative overflow-hidden ${
        theme === 'cyber'
          ? 'bg-gradient-to-b from-cyber-card via-black to-cyber-card border-2 border-cyber-accent cyber-chamfer shadow-[0_0_25px_rgba(0,255,136,0.2)]'
          : theme === 'vapor'
          ? 'bg-gradient-to-b from-vapor-purple via-black to-vapor-bg border-2 border-vapor-magenta shadow-[0_0_25px_#FF00FF]'
          : 'bg-retro-yellow border-4 border-black win95-outset font-retro text-black'
      }`}>
        <div className="text-[10px] uppercase font-mono tracking-widest text-cyber-accent mb-1 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> OFFICIAL TRIP RECAP
        </div>

        <h3 className="font-black text-xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent via-cyber-cyan to-cyber-magenta mb-4">
          🌲 OOTY TRIP 2026 SUMMARY 🌲
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-left mb-4">
          <div className="p-2 bg-black/60 border border-gray-700">
            <span className="opacity-70 text-[9px] block">GROUP SQUAD</span>
            <span className="font-bold text-sm text-cyber-accent">👥 8 Friends</span>
          </div>

          <div className="p-2 bg-black/60 border border-gray-700">
            <span className="opacity-70 text-[9px] block">PLACES VISITED</span>
            <span className="font-bold text-sm text-cyber-cyan">📍 {visitedCount} / {totalSpotsCount} Places</span>
          </div>

          <div className="p-2 bg-black/60 border border-gray-700">
            <span className="opacity-70 text-[9px] block">TOTAL SPENT</span>
            <span className="font-bold text-sm text-cyber-yellow">💰 ₹{totalExpense.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-2 bg-black/60 border border-gray-700">
            <span className="opacity-70 text-[9px] block">DISTANCE TRAVELED</span>
            <span className="font-bold text-sm text-cyber-magenta">🚗 {journey.distanceCoveredKm || 380} km</span>
          </div>

          <div className="p-2 bg-black/60 border border-gray-700">
            <span className="opacity-70 text-[9px] block">FOOD PIT STOPS</span>
            <span className="font-bold text-sm text-cyber-accent">🍔 {journey.foodStopsCount || 12} Stops</span>
          </div>

          <div className="p-2 bg-black/60 border border-gray-700">
            <span className="opacity-70 text-[9px] block">PHOTOS TAKEN</span>
            <span className="font-bold text-sm text-cyber-cyan">📸 {journey.photosTakenCount || 250} Photos</span>
          </div>
        </div>

        <button
          onClick={() => {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          }}
          className="w-full py-2 bg-gradient-to-r from-cyber-accent via-cyber-cyan to-cyber-magenta text-black font-extrabold uppercase tracking-widest text-xs shadow-[0_0_15px_#00ff88]"
        >
          Celebrate Trip Recap! 🎉
        </button>
      </div>

    </div>
  );
}
