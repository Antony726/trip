import React, { useState } from 'react';
import { Users, Save, X, Edit3 } from 'lucide-react';

export default function FriendsModal({ isOpen, onClose, friends, onUpdateFriends, theme }) {
  const [editedNames, setEditedNames] = useState(
    friends.reduce((acc, f) => ({ ...acc, [f.id]: f.name }), {})
  );

  if (!isOpen) return null;

  const handleChange = (id, name) => {
    setEditedNames((prev) => ({ ...prev, [id]: name }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = friends.map((f) => ({
      ...f,
      name: editedNames[f.id]?.trim() || f.name
    }));
    onUpdateFriends(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-sm p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border-2 border-cyber-accent cyber-chamfer text-cyber-text shadow-[0_0_25px_rgba(0,255,136,0.2)]'
          : theme === 'vapor'
          ? 'bg-vapor-bg border-2 border-vapor-magenta text-vapor-text shadow-[0_0_25px_rgba(255,0,255,0.25)]'
          : 'bg-retro-bg text-black border-2 border-black win95-outset font-retro'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 border-b pb-2 border-gray-700/40">
          <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${
            theme === 'cyber' ? 'font-heading text-cyber-accent' : theme === 'vapor' ? 'font-heading text-vapor-cyan' : 'font-impact text-retro-navy text-base'
          }`}>
            <Users className="w-4 h-4" /> Edit 8 Friends Names
          </h2>
          <button onClick={onClose} className="p-1 hover:text-red-400 font-bold">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] opacity-75 mb-3 font-mono">
          Customize your group members' names. Changes update everywhere across expenses & settlements!
        </p>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {friends.map((friend, index) => (
            <div key={friend.id} className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold w-6 opacity-60">#{index + 1}</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={editedNames[friend.id] || ''}
                  onChange={(e) => handleChange(friend.id, e.target.value)}
                  className={`w-full p-2 text-xs outline-none font-bold ${
                    theme === 'cyber'
                      ? 'bg-cyber-bg border border-cyber-border text-cyber-accent font-mono focus:border-cyber-accent'
                      : theme === 'vapor'
                      ? 'bg-black/80 border border-vapor-magenta text-vapor-cyan font-mono'
                      : 'bg-white text-black border border-black win95-inset'
                  }`}
                />
              </div>
            </div>
          ))}

          <div className="pt-3 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-bold uppercase tracking-wider bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${
                theme === 'cyber'
                  ? 'bg-cyber-accent text-black hover:brightness-110 cyber-chamfer-sm'
                  : theme === 'vapor'
                  ? 'bg-vapor-magenta text-white hover:brightness-110'
                  : 'bg-retro-navy text-white win95-outset'
              }`}
            >
              <Save className="w-3.5 h-3.5" /> Save Names
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
