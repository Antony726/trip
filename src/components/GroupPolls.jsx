import React, { useState } from 'react';
import { Vote, PlusCircle, CheckCircle2, BarChart2, MessageSquare, Trash2 } from 'lucide-react';

export default function GroupPolls({ friends, polls, onAddPoll, onVotePoll, onDeletePoll, theme }) {
  const [showCreate, setShowCreate] = useState(false);
  const [question, setQuestion] = useState('');
  const [optionsText, setOptionsText] = useState('');
  const [currentVoter, setCurrentVoter] = useState(friends[0]?.name || 'Person A');

  const handleCreatePoll = (e) => {
    e.preventDefault();
    if (!question.trim() || !optionsText.trim()) return;

    const opts = optionsText
      .split('\n')
      .map(o => o.trim())
      .filter(Boolean)
      .map((o, idx) => ({ id: `opt-${Date.now()}-${idx}`, text: o, votes: [] }));

    if (opts.length < 2) return;

    const newPoll = {
      id: `poll-${Date.now()}`,
      question: question.trim(),
      options: opts
    };

    onAddPoll(newPoll);
    setQuestion('');
    setOptionsText('');
    setShowCreate(false);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* HEADER & VOTER SELECTOR */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-magenta/50 cyber-chamfer shadow-[0_0_15px_rgba(255,0,255,0.15)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-cyan border-vapor-magenta/40 backdrop-blur'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro text-black'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${
              theme === 'cyber' ? 'font-heading text-cyber-magenta' : theme === 'vapor' ? 'font-heading text-vapor-cyan' : 'font-impact text-retro-navy text-base'
            }`}>
              <Vote className="w-4 h-4" /> 🗳️ Group Polls & Decisions
            </h2>
            <p className="text-[10px] opacity-70 font-mono">Vote on dinner, wake up times & next spots</p>
          </div>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className={`px-2.5 py-1 text-xs uppercase font-bold flex items-center gap-1 ${
              theme === 'cyber'
                ? 'bg-cyber-magenta text-white cyber-chamfer-sm'
                : theme === 'vapor'
                ? 'bg-vapor-cyan text-black -skew-x-6'
                : 'bg-retro-navy text-white win95-outset'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" /> Create Poll
          </button>
        </div>

        {/* Voting As Selector */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 text-xs font-mono">
          <span className="opacity-80">Voting as:</span>
          <select
            value={currentVoter}
            onChange={(e) => setCurrentVoter(e.target.value)}
            className={`p-1 font-bold text-xs outline-none ${
              theme === 'cyber' ? 'bg-cyber-bg border border-cyber-border text-cyber-accent' : 'bg-black text-white border border-gray-600'
            }`}
          >
            {friends.map(f => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CREATE POLL FORM */}
      {showCreate && (
        <form onSubmit={handleCreatePoll} className={`p-3 text-xs border space-y-2.5 ${
          theme === 'cyber' ? 'bg-cyber-card border-cyber-accent' : 'bg-black/90 border-vapor-magenta text-white'
        }`}>
          <h3 className="font-bold flex items-center justify-between font-mono">
            <span>➕ Create New Group Poll</span>
            <button type="button" onClick={() => setShowCreate(false)} className="text-red-400 font-bold">✕</button>
          </h3>

          <input
            type="text"
            required
            placeholder="Poll Question (e.g. Best photo spot today?)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 bg-black/60 border border-gray-600 text-white outline-none font-mono"
          />

          <div>
            <label className="block text-[10px] opacity-70 mb-1">Enter Options (1 per line):</label>
            <textarea
              required
              rows={3}
              placeholder="Crown Bakery&#10;Traditional Thali&#10;Chinese Noodles"
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              className="w-full p-2 bg-black/60 border border-gray-600 text-white outline-none font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-cyber-magenta text-white font-bold uppercase tracking-wider"
          >
            Publish Poll 🗳️
          </button>
        </form>
      )}

      {/* POLLS LIST */}
      <div className="space-y-4">
        {polls.length === 0 ? (
          <div className="py-8 text-center text-xs opacity-60 font-mono">
            No active polls right now. Create one above! 🗳️
          </div>
        ) : (
          polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes ? opt.votes.length : 0), 0);

            return (
              <div
                key={poll.id}
                className={`p-4 space-y-3 transition-all ${
                  theme === 'cyber'
                    ? 'bg-cyber-card border border-cyber-border cyber-chamfer-sm'
                    : theme === 'vapor'
                    ? 'bg-vapor-card border border-vapor-purple'
                    : 'bg-white text-black border border-black win95-outset font-retro'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm text-cyber-cyan flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-cyber-magenta" /> {poll.question}
                  </h3>

                  {onDeletePoll && (
                    <button
                      onClick={() => onDeletePoll(poll.id)}
                      className="text-gray-500 hover:text-red-400 p-1"
                      title="Delete Poll"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {poll.options.map((opt) => {
                    const votesList = opt.votes || [];
                    const hasVoted = votesList.includes(currentVoter);
                    const percent = totalVotes > 0 ? Math.round((votesList.length / totalVotes) * 100) : 0;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => onVotePoll(poll.id, opt.id, currentVoter)}
                        className={`p-2.5 rounded-none cursor-pointer relative overflow-hidden transition-all border ${
                          hasVoted
                            ? 'border-cyber-accent bg-cyber-accent/10'
                            : 'border-gray-700/50 hover:border-gray-500 bg-black/40'
                        }`}
                      >
                        {/* Progress Bar Background */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-cyber-magenta/20 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />

                        <div className="relative z-10 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{opt.text}</span>
                            {hasVoted && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyber-accent" />
                            )}
                          </div>

                          <div className="font-mono text-[11px] font-bold text-cyber-yellow">
                            {votesList.length} votes ({percent}%)
                          </div>
                        </div>

                        {/* Voters tag list */}
                        {votesList.length > 0 && (
                          <div className="relative z-10 text-[9px] opacity-70 font-mono mt-1 flex flex-wrap gap-1">
                            {votesList.map(v => (
                              <span key={v} className="px-1 bg-gray-800 text-gray-300">
                                {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-[10px] opacity-60 font-mono text-right">
                  Total Votes: {totalVotes}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
