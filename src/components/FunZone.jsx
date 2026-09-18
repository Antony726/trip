import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, Trophy, Music, CheckSquare, Award, Flame, Play, Pause, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRIP_BINGO_ITEMS, LOFI_TRACKS } from '../data/ootyData';

export default function FunZone({ friends, expenses, theme }) {
  // Wheel State
  const [selectedTask, setSelectedTask] = useState('Who buys next Chai/Snack? ☕');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelWinner, setWheelWinner] = useState(null);

  // Bingo State
  const [completedBingo, setCompletedBingo] = useState(() => {
    const saved = localStorage.getItem('ooty_bingo_items');
    return saved ? JSON.parse(saved) : {};
  });

  // Audio Player State
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio(LOFI_TRACKS[0].url));

  useEffect(() => {
    audio.src = LOFI_TRACKS[currentTrackIdx].url;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
    return () => {
      audio.pause();
    };
  }, [currentTrackIdx]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(err => console.log('Audio autoplay blocked', err));
    }
  };

  // Spin Wheel logic
  const handleSpin = () => {
    if (isSpinning || friends.length === 0) return;

    setIsSpinning(true);
    setWheelWinner(null);

    let duration = 3000;
    let startTime = Date.now();

    const spinInterval = setInterval(() => {
      const randomFriend = friends[Math.floor(Math.random() * friends.length)];
      setWheelWinner(randomFriend.name);

      if (Date.now() - startTime >= duration) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
    }, 100);
  };

  // Toggle Bingo Item
  const toggleBingoItem = (id) => {
    const nextState = { ...completedBingo, [id]: !completedBingo[id] };
    setCompletedBingo(nextState);
    localStorage.setItem('ooty_bingo_items', JSON.stringify(nextState));

    if (!completedBingo[id]) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    }
  };

  // Compute Friend Roast titles from actual expense data
  const computeRoastLeaderboard = () => {
    if (expenses.length === 0) return [];

    const stats = friends.map((f) => {
      const userExps = expenses.filter((e) => e.payerId === f.id);
      const totalAmount = userExps.reduce((sum, e) => sum + e.amount, 0);
      const count = userExps.length;
      const foodSpent = userExps.filter(e => e.categoryId === 'food' || e.categoryId === 'chai').reduce((sum, e) => sum + e.amount, 0);

      return {
        ...f,
        totalAmount,
        count,
        foodSpent
      };
    });

    stats.sort((a, b) => b.totalAmount - a.totalAmount);

    return stats.map((item, index) => {
      let badge = 'Roadie 🎒';
      let title = 'Member of the Ooty Squad';

      if (index === 0 && item.totalAmount > 0) {
        badge = '👑 The Sponsor';
        title = 'Highest Spender of the Trip!';
      } else if (index === stats.length - 1 && item.totalAmount === 0) {
        badge = '🥷 Thrifty Ninja';
        title = 'Has paid ₹0 so far (Living freely!)';
      } else if (item.foodSpent > 500) {
        badge = '🍩 Snack Monster';
        title = 'Paid the most for Chai & Snacks!';
      } else if (item.count >= 3) {
        badge = '💳 Fast Swiper';
        title = 'Logged the most number of transactions!';
      }

      return {
        ...item,
        badge,
        title
      };
    });
  };

  const leaderboard = computeRoastLeaderboard();
  const bingoCount = Object.values(completedBingo).filter(Boolean).length;

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* SECTION 1: "WHO PAYS NEXT?" WHEEL OF FORTUNE RANDOMIZER */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-yellow/60 cyber-chamfer shadow-[0_0_15px_rgba(255,204,0,0.15)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-cyan border-vapor-magenta/40 backdrop-blur'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro text-black'
      }`}>
        <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center justify-between mb-2 ${
          theme === 'cyber' ? 'font-heading text-cyber-yellow' : theme === 'vapor' ? 'font-heading text-vapor-cyan' : 'font-impact text-retro-navy text-base'
        }`}>
          <span className="flex items-center gap-1.5">
            <Dices className="w-4 h-4" /> Who Pays / Does Duty Next? 🎰
          </span>
          <span className="text-[10px] font-mono opacity-80">Randomizer</span>
        </h2>

        {/* Task selector */}
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className={`w-full p-2 mb-3 text-xs outline-none font-mono ${
            theme === 'cyber'
              ? 'bg-cyber-bg border border-cyber-border text-cyber-yellow cyber-chamfer-sm'
              : theme === 'vapor'
              ? 'bg-black/80 border border-vapor-magenta text-vapor-cyan'
              : 'bg-white text-black border border-black win95-inset'
          }`}
        >
          <option value="Who buys next Chai/Snack? ☕">Who buys next Chai & Snacks? ☕</option>
          <option value="Who drives mountain hairpin bends? 🚗">Who drives hairpin bends next? 🚗</option>
          <option value="Who sits in car middle seat? 💺">Who sits in middle seat? 💺</option>
          <option value="Who picks dinner restaurant? 🍕">Who picks dinner spot? 🍕</option>
          <option value="Who carries the luggage? 🎒">Who carries heavy bags? 🎒</option>
        </select>

        {/* WINNER DISPLAY BOX */}
        <div className={`p-4 text-center my-3 transition-all ${
          theme === 'cyber'
            ? 'bg-cyber-bg border-2 border-cyber-yellow text-cyber-yellow shadow-[0_0_15px_rgba(255,204,0,0.2)]'
            : theme === 'vapor'
            ? 'bg-black/80 border-2 border-vapor-magenta text-vapor-cyan shadow-[0_0_20px_#FF00FF]'
            : 'bg-retro-yellow border-2 border-black win95-inset text-black'
        }`}>
          <div className="text-[10px] uppercase tracking-widest font-mono opacity-80 mb-1">
            {isSpinning ? 'HACKING SYSTEM RANDOMIZER...' : 'CHOSEN ONE'}
          </div>
          <div className={`text-2xl font-black uppercase ${isSpinning ? 'animate-pulse text-cyber-accent' : ''}`}>
            {wheelWinner || 'Tap Spin Below!'}
          </div>
        </div>

        {/* SPIN BUTTON */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`w-full py-2.5 font-bold uppercase tracking-widest text-xs transition-all ${
            theme === 'cyber'
              ? 'bg-cyber-yellow text-black hover:brightness-110 cyber-chamfer-sm shadow-[0_0_10px_#ffcc00]'
              : theme === 'vapor'
              ? 'bg-gradient-to-r from-vapor-cyan via-vapor-magenta to-vapor-orange text-black font-heading'
              : 'bg-retro-navy text-white border-2 border-black win95-outset font-impact text-sm'
          }`}
        >
          {isSpinning ? 'Spinning Wheel... 🎲' : 'Spin Wheel of Destiny! 🎰'}
        </button>
      </div>

      {/* SECTION 2: RETRO OOTY BINGO & ACHIEVEMENTS */}
      <div className={`p-4 transition-all ${
        theme === 'cyber' ? 'bg-cyber-card border border-cyber-accent/50' : theme === 'vapor' ? 'bg-vapor-card border border-vapor-purple' : 'bg-retro-bg border-2 border-black win95-outset'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <CheckSquare className="w-4 h-4 text-cyber-accent" /> Ooty Trip Bingo & Badges
          </h2>
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/40">
            {bingoCount} / {TRIP_BINGO_ITEMS.length} Unlocked
          </span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {TRIP_BINGO_ITEMS.map((item) => {
            const isDone = completedBingo[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleBingoItem(item.id)}
                className={`p-2.5 flex items-center justify-between text-xs cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-950/40 border border-emerald-500/70 text-emerald-300'
                    : theme === 'cyber'
                    ? 'bg-cyber-bg border border-cyber-border/50 hover:border-cyber-accent/50'
                    : theme === 'vapor'
                    ? 'bg-black/60 border border-vapor-purple'
                    : 'bg-white text-black border border-black win95-outset'
                }`}
              >
                <div className="flex items-center gap-2 max-w-[75%]">
                  <input
                    type="checkbox"
                    checked={!!isDone}
                    onChange={() => {}}
                    className="accent-cyber-accent w-3.5 h-3.5"
                  />
                  <span className={isDone ? 'line-through opacity-80' : ''}>{item.text}</span>
                </div>

                <span className={`text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider ${
                  isDone ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400'
                }`}>
                  {item.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: FRIEND ROAST & LEADERBOARD */}
      <div className={`p-4 transition-all ${
        theme === 'cyber' ? 'bg-cyber-card border border-cyber-magenta/50' : theme === 'vapor' ? 'bg-vapor-card border border-vapor-cyan/50' : 'bg-retro-bg border-2 border-black win95-outset'
      }`}>
        <h2 className="font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono text-cyber-magenta">
          <Flame className="w-4 h-4" /> Friend Roast & Titles Leaderboard 🔥
        </h2>

        {leaderboard.length === 0 ? (
          <div className="py-4 text-center text-xs opacity-60 font-mono">
            Log some expenses to auto-generate funny titles & badges for your 8 friends!
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((f, idx) => (
              <div
                key={f.id}
                className={`p-2 flex items-center justify-between text-xs border ${
                  idx === 0
                    ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                    : 'bg-cyber-bg border-cyber-border'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold font-mono text-cyber-yellow">#{idx + 1}</span>
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      <span>{f.name}</span>
                      <span className="text-[10px] text-cyber-cyan font-normal">({f.badge})</span>
                    </div>
                    <div className="text-[9px] opacity-70 font-mono">{f.title}</div>
                  </div>
                </div>

                <div className="text-right font-mono font-bold">
                  ₹{f.totalAmount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 4: VAPORWAVE ROADTRIP FM & AMBIENCE PLAYER */}
      <div className={`p-4 transition-all ${
        theme === 'cyber' ? 'bg-cyber-card border border-cyber-cyan/40' : theme === 'vapor' ? 'bg-vapor-card border border-vapor-magenta' : 'bg-retro-navy text-white border-2 border-black win95-outset'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Music className="w-4 h-4 text-cyber-cyan" /> Ooty Roadtrip FM 🎵
          </h2>
          <span className="text-[9px] font-mono opacity-80">{LOFI_TRACKS[currentTrackIdx].genre}</span>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-black/60 border border-gray-700/50 my-2">
          <div className="truncate max-w-[65%]">
            <div className="font-bold text-xs text-cyber-cyan truncate">{LOFI_TRACKS[currentTrackIdx].title}</div>
            <div className="text-[9px] opacity-60 font-mono">Mountain Mist Lo-Fi Vibes</div>
          </div>

          <button
            onClick={toggleAudio}
            className={`p-2 font-bold flex items-center justify-center transition-all ${
              isPlaying ? 'bg-cyber-magenta text-white' : 'bg-cyber-accent text-black'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex justify-between text-[10px] font-mono opacity-70">
          {LOFI_TRACKS.map((t, i) => (
            <button
              key={t.title}
              onClick={() => setCurrentTrackIdx(i)}
              className={`underline ${currentTrackIdx === i ? 'text-cyber-accent font-bold' : ''}`}
            >
              Track {i + 1}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
