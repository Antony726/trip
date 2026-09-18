import React, { useState } from 'react';
import { Navigation, Fuel, DollarSign, Utensils, Camera, MapPin, Edit3, Save } from 'lucide-react';

export default function JourneyPage({ journey, onUpdateJourney, theme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(journey);

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateJourney(form);
    setIsEditing(false);
  };

  const percentComplete = form.totalDistanceKm > 0
    ? Math.min(100, Math.round((form.distanceCoveredKm / form.totalDistanceKm) * 100))
    : 0;

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* HEADER & EDIT BUTTON */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-accent/50 cyber-chamfer shadow-[0_0_15px_rgba(0,255,136,0.15)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-cyan border-vapor-magenta/40 backdrop-blur'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro text-black'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${
              theme === 'cyber' ? 'font-heading text-cyber-accent' : theme === 'vapor' ? 'font-heading text-vapor-cyan' : 'font-impact text-retro-navy text-base'
            }`}>
              <Navigation className="w-4 h-4" /> 🚗 Roadtrip Journey Tracker
            </h2>
            <p className="text-[10px] opacity-70 font-mono">Track distance, fuel, tolls & food pit stops</p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-2.5 py-1 text-xs uppercase font-bold flex items-center gap-1 ${
              theme === 'cyber'
                ? 'bg-cyber-cyan text-black cyber-chamfer-sm'
                : 'bg-retro-navy text-white win95-outset'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Stats'}
          </button>
        </div>

        {/* DISTANCE PROGRESS BAR */}
        <div className="space-y-1 mt-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-cyber-cyan font-bold">{form.startLocation}</span>
            <span className="text-cyber-yellow font-bold">➡️ {form.currentDestination}</span>
          </div>

          <div className="w-full bg-black/60 h-3 border border-gray-700 relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyber-accent via-cyber-cyan to-cyber-magenta h-full transition-all duration-700"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono opacity-80 pt-0.5">
            <span>{form.distanceCoveredKm} km covered</span>
            <span>{percentComplete}% of {form.totalDistanceKm} km</span>
          </div>
        </div>
      </div>

      {/* EDIT STATS FORM */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-3 bg-cyber-card border border-cyber-accent text-xs space-y-2 font-mono">
          <h3 className="font-bold text-cyber-accent mb-2">Edit Journey Metrics</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] opacity-70">Start Location:</label>
              <input
                type="text"
                value={form.startLocation}
                onChange={(e) => handleChange('startLocation', e.target.value)}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] opacity-70">Current Destination:</label>
              <input
                type="text"
                value={form.currentDestination}
                onChange={(e) => handleChange('currentDestination', e.target.value)}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] opacity-70">Km Covered:</label>
              <input
                type="number"
                value={form.distanceCoveredKm}
                onChange={(e) => handleChange('distanceCoveredKm', Number(e.target.value))}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] opacity-70">Total Km:</label>
              <input
                type="number"
                value={form.totalDistanceKm}
                onChange={(e) => handleChange('totalDistanceKm', Number(e.target.value))}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] opacity-70">Fuel Spent (₹):</label>
              <input
                type="number"
                value={form.fuelExpenses}
                onChange={(e) => handleChange('fuelExpenses', Number(e.target.value))}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] opacity-70">Toll Spent (₹):</label>
              <input
                type="number"
                value={form.tollExpenses}
                onChange={(e) => handleChange('tollExpenses', Number(e.target.value))}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] opacity-70">Food Pit Stops:</label>
              <input
                type="number"
                value={form.foodStopsCount}
                onChange={(e) => handleChange('foodStopsCount', Number(e.target.value))}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] opacity-70">Photos Taken:</label>
              <input
                type="number"
                value={form.photosTakenCount}
                onChange={(e) => handleChange('photosTakenCount', Number(e.target.value))}
                className="w-full p-1 bg-black border border-gray-700 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-1.5 bg-cyber-accent text-black font-bold uppercase tracking-wider"
          >
            Save Journey Metrics 💾
          </button>
        </form>
      )}

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`p-3 transition-all ${
          theme === 'cyber' ? 'bg-cyber-card border border-cyber-border' : 'bg-vapor-card border border-vapor-purple'
        }`}>
          <div className="flex items-center gap-2 text-cyber-accent text-xs font-mono font-bold mb-1">
            <Fuel className="w-4 h-4" /> Fuel Expenses
          </div>
          <div className="text-lg font-bold font-mono text-cyber-accent">
            {formatCurrency(form.fuelExpenses)}
          </div>
        </div>

        <div className={`p-3 transition-all ${
          theme === 'cyber' ? 'bg-cyber-card border border-cyber-border' : 'bg-vapor-card border border-vapor-purple'
        }`}>
          <div className="flex items-center gap-2 text-cyber-cyan text-xs font-mono font-bold mb-1">
            <DollarSign className="w-4 h-4" /> Toll Expenses
          </div>
          <div className="text-lg font-bold font-mono text-cyber-cyan">
            {formatCurrency(form.tollExpenses)}
          </div>
        </div>

        <div className={`p-3 transition-all ${
          theme === 'cyber' ? 'bg-cyber-card border border-cyber-border' : 'bg-vapor-card border border-vapor-purple'
        }`}>
          <div className="flex items-center gap-2 text-cyber-yellow text-xs font-mono font-bold mb-1">
            <Utensils className="w-4 h-4" /> Food Pit Stops
          </div>
          <div className="text-lg font-bold font-mono text-cyber-yellow">
            {form.foodStopsCount} Stops 🍔
          </div>
        </div>

        <div className={`p-3 transition-all ${
          theme === 'cyber' ? 'bg-cyber-card border border-cyber-border' : 'bg-vapor-card border border-vapor-purple'
        }`}>
          <div className="flex items-center gap-2 text-cyber-magenta text-xs font-mono font-bold mb-1">
            <Camera className="w-4 h-4" /> Group Photos
          </div>
          <div className="text-lg font-bold font-mono text-cyber-magenta">
            {form.photosTakenCount} Photos 📸
          </div>
        </div>
      </div>

    </div>
  );
}
