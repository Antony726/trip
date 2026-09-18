import React, { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';

export default function TripPlanner({ planner, onUpdatePlanner, theme }) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [time, setTime] = useState('02:00 PM');
  const [activity, setActivity] = useState('');

  const currentDayPlan = planner[activeDayIdx] || { day: 'Day 1', items: [] };

  const handleToggleItem = (itemId) => {
    const updated = planner.map((dayGroup, idx) => {
      if (idx !== activeDayIdx) return dayGroup;
      return {
        ...dayGroup,
        items: dayGroup.items.map(item => item.id === itemId ? { ...item, done: !item.done } : item)
      };
    });
    onUpdatePlanner(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!activity.trim()) return;

    const newItem = {
      id: `p-${Date.now()}`,
      time: time || '12:00 PM',
      text: activity.trim(),
      done: false
    };

    const updated = planner.map((dayGroup, idx) => {
      if (idx !== activeDayIdx) return dayGroup;
      return {
        ...dayGroup,
        items: [...dayGroup.items, newItem]
      };
    });

    onUpdatePlanner(updated);
    setActivity('');
    setShowAdd(false);
  };

  const handleDeleteItem = (itemId) => {
    const updated = planner.map((dayGroup, idx) => {
      if (idx !== activeDayIdx) return dayGroup;
      return {
        ...dayGroup,
        items: dayGroup.items.filter(item => item.id !== itemId)
      };
    });
    onUpdatePlanner(updated);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* HEADER & DAY TABS */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-accent/50 cyber-chamfer shadow-[0_0_15px_rgba(0,255,136,0.15)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-orange border-vapor-magenta/40 backdrop-blur'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro text-black'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${
              theme === 'cyber' ? 'font-heading text-cyber-accent' : theme === 'vapor' ? 'font-heading text-vapor-orange' : 'font-impact text-retro-navy text-base'
            }`}>
              <Calendar className="w-4 h-4" /> 📅 Ooty Trip Itinerary Planner
            </h2>
            <p className="text-[10px] opacity-70 font-mono">Real-time editable schedule for the group</p>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`px-2.5 py-1 text-xs uppercase font-bold flex items-center gap-1 ${
              theme === 'cyber'
                ? 'bg-cyber-accent text-black cyber-chamfer-sm'
                : theme === 'vapor'
                ? 'bg-vapor-cyan text-black -skew-x-6'
                : 'bg-retro-navy text-white win95-outset'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Add Activity
          </button>
        </div>

        {/* Day Selector Pills */}
        <div className="flex gap-2">
          {planner.map((dayGroup, idx) => (
            <button
              key={dayGroup.day}
              onClick={() => setActiveDayIdx(idx)}
              className={`flex-1 py-1.5 text-xs font-bold font-mono uppercase transition-all ${
                activeDayIdx === idx
                  ? 'bg-cyber-cyan text-black font-extrabold shadow-[0_0_10px_#00d4ff]'
                  : 'bg-gray-800/80 text-gray-300 hover:text-white'
              }`}
            >
              {dayGroup.day}
            </button>
          ))}
        </div>
      </div>

      {/* ADD ITEM FORM */}
      {showAdd && (
        <form onSubmit={handleAddItem} className={`p-3 text-xs border space-y-2 ${
          theme === 'cyber' ? 'bg-cyber-card border-cyber-accent' : 'bg-black/90 border-vapor-cyan text-white'
        }`}>
          <h3 className="font-bold flex items-center justify-between font-mono">
            <span>➕ Add Timeline Activity ({currentDayPlan.day})</span>
            <button type="button" onClick={() => setShowAdd(false)} className="text-red-400 font-bold">✕</button>
          </h3>

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Time (e.g. 04:00 PM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-1.5 bg-black/60 border border-gray-600 text-white font-mono outline-none col-span-1"
            />
            <input
              type="text"
              required
              placeholder="Activity (e.g. 📸 Photography at Pine Forest)"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="p-1.5 bg-black/60 border border-gray-600 text-white font-mono outline-none col-span-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 bg-cyber-accent text-black font-bold uppercase tracking-wider"
          >
            Save to Itinerary 📅
          </button>
        </form>
      )}

      {/* TIMELINE LIST */}
      <div className={`p-4 transition-all ${
        theme === 'cyber' ? 'bg-cyber-card/80 border border-cyber-border' : 'bg-vapor-card border border-vapor-purple'
      }`}>
        <h3 className="font-bold text-xs uppercase tracking-wider mb-4 flex items-center justify-between font-mono text-cyber-cyan">
          <span>Timeline View - {currentDayPlan.day}</span>
          <span className="text-[10px] text-gray-400">
            {currentDayPlan.items.filter(i => i.done).length} / {currentDayPlan.items.length} Complete
          </span>
        </h3>

        <div className="relative pl-4 border-l-2 border-cyber-accent/40 space-y-4">
          {currentDayPlan.items.length === 0 ? (
            <div className="py-6 text-center text-xs opacity-60 font-mono">
              No schedule added for {currentDayPlan.day} yet. Add one above!
            </div>
          ) : (
            currentDayPlan.items.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  onClick={() => handleToggleItem(item.id)}
                  className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    item.done
                      ? 'bg-cyber-accent text-black shadow-[0_0_8px_#00ff88]'
                      : 'bg-gray-800 border border-cyber-cyan/50 text-gray-400'
                  }`}
                >
                  {item.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-2 h-2" />}
                </div>

                {/* Timeline item content */}
                <div className={`p-2.5 ml-2 border transition-all flex items-center justify-between ${
                  item.done
                    ? 'bg-emerald-950/20 border-emerald-800 opacity-60 line-through'
                    : 'bg-black/60 border-gray-700/60 hover:border-cyber-cyan'
                }`}>
                  <div>
                    <div className="text-[10px] font-mono text-cyber-yellow font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </div>
                    <div className="text-xs font-bold font-mono mt-0.5">{item.text}</div>
                  </div>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-gray-500 hover:text-red-400 p-1"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
