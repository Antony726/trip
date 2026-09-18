import React, { useState } from 'react';
import { MapPin, Navigation, Star, Search, Compass, Plus, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { OOTY_SPOTS } from '../data/ootyData';

export default function OotyGuide({ theme }) {
  const [spots, setSpots] = useState(() => {
    const saved = localStorage.getItem('ooty_custom_spots');
    return saved ? [...OOTY_SPOTS, ...JSON.parse(saved)] : OOTY_SPOTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxRadius, setMaxRadius] = useState(65);
  const [filterType, setFilterType] = useState('ALL');

  // Custom Spot Adder Form modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSpotName, setNewSpotName] = useState('');
  const [newSpotCat, setNewSpotCat] = useState('Sightseeing 🏞️');
  const [newSpotRadius, setNewSpotRadius] = useState('10');
  const [newSpotDesc, setNewSpotDesc] = useState('');
  const [newSpotMaps, setNewSpotMaps] = useState('');
  const [newSpotImg, setNewSpotImg] = useState('');

  const handleAddCustomSpot = (e) => {
    e.preventDefault();
    if (!newSpotName.trim()) return;

    const customSpot = {
      id: `custom-${Date.now()}`,
      name: newSpotName.trim(),
      category: newSpotCat,
      distanceKm: parseFloat(newSpotRadius) || 10,
      isFamous: false,
      isUnderrated: true,
      rating: 4.8,
      description: newSpotDesc.trim() || 'Custom spot added by group.',
      bestTime: 'Anytime',
      price: 'Varies',
      mapsUrl: newSpotMaps.trim() || `https://maps.google.com/?q=${encodeURIComponent(newSpotName)}`,
      tag: 'Group Pick',
      image: newSpotImg.trim() || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    };

    const updated = [...spots, customSpot];
    setSpots(updated);
    
    // Save custom added spots to localStorage
    const customOnly = updated.filter(s => s.id.startsWith('custom-'));
    localStorage.setItem('ooty_custom_spots', JSON.stringify(customOnly));

    // Reset Form
    setNewSpotName('');
    setNewSpotDesc('');
    setNewSpotMaps('');
    setNewSpotImg('');
    setShowAddModal(false);
  };

  const categories = [
    'ALL',
    'Mettupalayam En Route 🚗',
    'Coonoor Places 🌿',
    'Sightseeing 🏞️',
    'Food & Tea ☕',
    'Adventure & Treks 🥾',
    'Views & Sunset 🌅',
    'Underrated Gems 💎'
  ];

  // Filter logic
  const filteredSpots = spots.filter((spot) => {
    if (searchQuery.trim() && !spot.name.toLowerCase().includes(searchQuery.toLowerCase()) && !spot.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'ALL' && spot.category !== selectedCategory) {
      return false;
    }
    if (spot.distanceKm > maxRadius) {
      return false;
    }
    if (filterType === 'FAMOUS' && !spot.isFamous) return false;
    if (filterType === 'UNDERRATED' && !spot.isUnderrated) return false;

    return true;
  });

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* GUIDE HEADER & SEARCH */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-cyan/40 cyber-chamfer shadow-[0_0_15px_rgba(0,212,255,0.15)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-orange border-vapor-magenta/40 backdrop-blur'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro text-black'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${
              theme === 'cyber' ? 'font-heading text-cyber-cyan' : theme === 'vapor' ? 'font-heading text-vapor-orange' : 'font-impact text-retro-navy text-base'
            }`}>
              <Compass className="w-4 h-4" /> 📸 Ooty, Coonoor & Mettupalayam Guide
            </h2>
            <p className="text-[10px] opacity-70 font-mono">Photo Guide of 40+ Famous & Underrated Spots</p>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className={`px-2.5 py-1 text-xs uppercase font-bold flex items-center gap-1 ${
              theme === 'cyber'
                ? 'bg-cyber-accent text-black cyber-chamfer-sm'
                : theme === 'vapor'
                ? 'bg-vapor-cyan text-black -skew-x-6'
                : 'bg-retro-navy text-white win95-outset'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Add Place
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 opacity-50" />
          <input
            type="text"
            placeholder="Search spot, Coonoor, bakery, lake..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-8 pr-3 py-1.5 text-xs outline-none ${
              theme === 'cyber'
                ? 'bg-cyber-bg border border-cyber-border text-cyber-cyan font-mono cyber-chamfer-sm focus:border-cyber-cyan'
                : theme === 'vapor'
                ? 'bg-black/80 border border-vapor-magenta text-vapor-cyan font-mono'
                : 'bg-white text-black border border-black win95-inset font-retro'
            }`}
          />
        </div>

        {/* Distance Radius Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono opacity-90">
            <span className="flex items-center gap-1">
              <Navigation className="w-3 h-3 text-cyber-accent" /> Distance Radius:
            </span>
            <span className="font-bold text-cyber-accent">{maxRadius} km from Ooty Town</span>
          </div>
          <input
            type="range"
            min="1"
            max="70"
            value={maxRadius}
            onChange={(e) => setMaxRadius(Number(e.target.value))}
            className="w-full accent-cyber-accent h-1.5 bg-gray-700 cursor-pointer"
          />
        </div>
      </div>

      {/* ADD SPOT MODAL FORM */}
      {showAddModal && (
        <form onSubmit={handleAddCustomSpot} className={`p-3 text-xs border space-y-2.5 ${
          theme === 'cyber' ? 'bg-cyber-card border-cyber-accent' : theme === 'vapor' ? 'bg-black/90 border-vapor-cyan' : 'bg-retro-yellow border-2 border-black win95-inset text-black'
        }`}>
          <h3 className="font-bold flex items-center justify-between font-mono">
            <span>➕ Add Custom Place to Guide</span>
            <button type="button" onClick={() => setShowAddModal(false)} className="text-red-400 font-bold">✕</button>
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder="Spot Name (e.g. Kinnakorai)"
              value={newSpotName}
              onChange={(e) => setNewSpotName(e.target.value)}
              className="p-1.5 bg-black/60 border border-gray-600 text-white outline-none"
            />
            <select
              value={newSpotCat}
              onChange={(e) => setNewSpotCat(e.target.value)}
              className="p-1.5 bg-black/60 border border-gray-600 text-white outline-none"
            >
              {categories.filter(c => c !== 'ALL').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Distance (km)"
              value={newSpotRadius}
              onChange={(e) => setNewSpotRadius(e.target.value)}
              className="p-1.5 bg-black/60 border border-gray-600 text-white outline-none"
            />
            <input
              type="url"
              placeholder="Image URL (Unsplash/Web)"
              value={newSpotImg}
              onChange={(e) => setNewSpotImg(e.target.value)}
              className="p-1.5 bg-black/60 border border-gray-600 text-white outline-none"
            />
          </div>

          <textarea
            placeholder="Description (e.g. Scenic tea estate drop)"
            value={newSpotDesc}
            onChange={(e) => setNewSpotDesc(e.target.value)}
            className="w-full p-1.5 bg-black/60 border border-gray-600 text-white outline-none h-12"
          />

          <button
            type="submit"
            className="w-full py-1.5 bg-cyber-accent text-black font-bold uppercase tracking-wider"
          >
            Save Place to Guide 📸
          </button>
        </form>
      )}

      {/* CATEGORY & TYPE FILTER BADGES */}
      <div className="space-y-2">
        {/* Type pills: ALL / FAMOUS / UNDERRATED */}
        <div className="flex gap-1.5">
          {['ALL', 'FAMOUS', 'UNDERRATED'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`flex-1 py-1 text-[10px] font-bold uppercase tracking-wider font-mono ${
                filterType === t
                  ? theme === 'cyber'
                    ? 'bg-cyber-accent text-black'
                    : theme === 'vapor'
                    ? 'bg-vapor-cyan text-black'
                    : 'bg-retro-navy text-white'
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {t === 'ALL' ? 'All Places' : t === 'FAMOUS' ? '🔥 Famous' : '💎 Underrated'}
            </button>
          ))}
        </div>

        {/* Category Pills horizontal scroll */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[10px] whitespace-nowrap font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-cyber-magenta text-white font-bold'
                  : 'bg-gray-800/60 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SPOTS CARDS WITH PHOTOS */}
      <div className="space-y-4">
        {filteredSpots.length === 0 ? (
          <div className="py-8 text-center text-xs opacity-60 font-mono">
            No places match your search or radius ({maxRadius} km). Expand slider above!
          </div>
        ) : (
          filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className={`transition-all overflow-hidden border ${
                theme === 'cyber'
                  ? 'bg-cyber-card border-cyber-border/80 hover:border-cyber-cyan cyber-chamfer-sm'
                  : theme === 'vapor'
                  ? 'bg-vapor-card border-vapor-purple hover:border-vapor-magenta'
                  : 'bg-white text-black border border-black win95-outset font-retro'
              }`}
            >
              {/* SPOT PHOTO IMAGE */}
              <div className="relative h-44 w-full bg-gray-900 overflow-hidden">
                <img
                  src={spot.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'}
                  alt={spot.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                
                {/* Image overlay badge */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {spot.tag && (
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-black/80 text-cyber-accent border border-cyber-accent/50 backdrop-blur">
                      {spot.tag}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-cyber-yellow font-bold flex items-center gap-1 border border-cyber-yellow/40 backdrop-blur">
                  <Star className="w-3 h-3 fill-cyber-yellow text-cyber-yellow" /> {spot.rating}
                </div>
              </div>

              {/* SPOT CONTENT */}
              <div className="p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-cyber-cyan">
                      {spot.name}
                    </h3>
                    <div className="text-[10px] opacity-70 font-mono flex items-center gap-2 mt-0.5">
                      <span>{spot.category}</span>
                      <span>•</span>
                      <span className="text-cyber-yellow font-bold flex items-center gap-0.5">
                        <Navigation className="w-2.5 h-2.5" /> {spot.distanceKm} km away
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs opacity-90 leading-relaxed font-mono">
                  {spot.description}
                </p>

                <div className="flex items-center justify-between text-[10px] opacity-75 pt-1.5 border-t border-gray-700/30 font-mono">
                  <span>⏰ {spot.bestTime}</span>
                  <span>🎟️ {spot.price}</span>
                </div>

                <div className="pt-1 flex justify-end">
                  <a
                    href={spot.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      theme === 'cyber'
                        ? 'bg-cyber-cyan text-black hover:bg-cyber-cyan/90 cyber-chamfer-sm'
                        : theme === 'vapor'
                        ? 'bg-vapor-magenta text-white hover:brightness-110 -skew-x-6'
                        : 'bg-retro-navy text-white win95-outset'
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" /> Open in Google Maps 🗺️
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
