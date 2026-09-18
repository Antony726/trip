import React, { useState } from 'react';
import { PlusCircle, Trash2, Tag, Calendar, Store, User, DollarSign, ListFilter, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ExpenseTracker({
  friends,
  categories,
  expenses,
  onAddExpense,
  onDeleteExpense,
  onAddCategory,
  onRemoveCategory,
  theme
}) {
  // Form state
  const [payerId, setPayerId] = useState(friends[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'food');
  const [placeNote, setPlaceNote] = useState('');
  
  // Date time default auto current
  const getCurrentDateTimeString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [dateTime, setDateTime] = useState(getCurrentDateTimeString());
  
  // Category Manager modal state
  const [showCatManager, setShowCatManager] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Filter state for history
  const [filterFriend, setFilterFriend] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payerId || !amount || Number(amount) <= 0) return;

    const payer = friends.find(f => f.id === payerId);
    const category = categories.find(c => c.id === categoryId) || { id: 'misc', name: 'Misc 🎒' };

    const newExpense = {
      id: Date.now().toString(),
      payerId,
      payerName: payer ? payer.name : 'Unknown',
      amount: parseFloat(amount),
      categoryId: category.id,
      categoryName: category.name,
      placeNote: placeNote.trim() || 'General Expense',
      dateTime: dateTime || getCurrentDateTimeString(),
      createdAt: new Date().toISOString()
    };

    onAddExpense(newExpense);

    // Reset form
    setAmount('');
    setPlaceNote('');
    setDateTime(getCurrentDateTimeString());
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName.trim(),
      color: '#00ff88'
    };

    onAddCategory(newCat);
    setNewCatName('');
  };

  // Filtered expenses
  const filteredExpenses = expenses.filter(exp => {
    if (filterFriend !== 'ALL' && exp.payerId !== filterFriend) return false;
    if (filterCategory !== 'ALL' && exp.categoryId !== filterCategory) return false;
    return true;
  });

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  return (
    <div className="space-[#space] space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* ADD EXPENSE FORM PANEL */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-accent/40 cyber-chamfer shadow-[0_0_15px_rgba(0,255,136,0.1)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-cyan border-vapor-magenta/40 backdrop-blur shadow-[0_0_20px_rgba(255,0,255,0.15)]'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro'
      }`}>
        <div className="flex items-center justify-between mb-3 border-b pb-2 border-gray-700/40">
          <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${
            theme === 'cyber' ? 'font-heading text-cyber-accent' : theme === 'vapor' ? 'font-heading text-vapor-cyan' : 'font-impact text-retro-navy text-base'
          }`}>
            <PlusCircle className="w-4 h-4" /> Add Trip Expense
          </h2>
          
          {/* Manage Categories Trigger */}
          <button
            type="button"
            onClick={() => setShowCatManager(!showCatManager)}
            className={`text-xs px-2 py-0.5 uppercase tracking-wider font-mono flex items-center gap-1 ${
              theme === 'cyber'
                ? 'text-cyber-cyan border border-cyber-cyan/50 hover:bg-cyber-cyan/10 cyber-chamfer-sm'
                : theme === 'vapor'
                ? 'text-vapor-magenta border border-vapor-magenta/50 hover:bg-vapor-magenta/20 -skew-x-6'
                : 'bg-white text-black border border-black win95-outset active:win95-inset'
            }`}
          >
            <Tag className="w-3 h-3" /> Categories
          </button>
        </div>

        {/* DYNAMIC CATEGORY MANAGER (COLLAPSIBLE MODAL/PANEL) */}
        {showCatManager && (
          <div className={`mb-4 p-3 text-xs border ${
            theme === 'cyber' ? 'bg-cyber-bg border-cyber-magenta/50 text-cyber-text' : theme === 'vapor' ? 'bg-black/70 border-vapor-magenta' : 'bg-retro-yellow border-2 border-black text-black win95-inset'
          }`}>
            <h3 className="font-bold mb-2 flex items-center justify-between">
              <span>Manage Categories</span>
              <span className="text-[10px] text-gray-400">(Add or remove custom dropdown items)</span>
            </h3>
            
            {/* Category Add Input */}
            <form onSubmit={handleCreateCategory} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="New Category Name (e.g., Fuel ⛽)"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className={`flex-1 px-2 py-1 text-xs outline-none ${
                  theme === 'cyber' ? 'bg-cyber-card border border-cyber-border text-cyber-accent font-mono' : theme === 'vapor' ? 'bg-black border border-vapor-cyan text-vapor-cyan font-mono' : 'bg-white text-black border border-black'
                }`}
              />
              <button
                type="submit"
                className={`px-3 py-1 font-bold ${
                  theme === 'cyber' ? 'bg-cyber-accent text-black hover:brightness-110' : theme === 'vapor' ? 'bg-vapor-magenta text-white hover:brightness-110' : 'bg-retro-navy text-white win95-outset'
                }`}
              >
                Add
              </button>
            </form>

            {/* Existing Categories List */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <div 
                  key={cat.id}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-none text-[11px] ${
                    theme === 'cyber' ? 'bg-cyber-card border border-cyber-border' : theme === 'vapor' ? 'bg-vapor-purple border border-vapor-cyan/40' : 'bg-white border border-gray-400'
                  }`}
                >
                  <span>{cat.name}</span>
                  {categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveCategory(cat.id)}
                      className="text-red-400 hover:text-red-300 ml-1 font-bold"
                      title="Remove Category"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPENSE FORM */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          {/* Row 1: Who Paid? & Amount */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 font-mono uppercase tracking-wider text-[10px] opacity-80 flex items-center gap-1">
                <User className="w-3 h-3 text-cyber-accent" /> Who Paid?
              </label>
              <select
                value={payerId}
                onChange={(e) => setPayerId(e.target.value)}
                className={`w-full p-2 outline-none ${
                  theme === 'cyber'
                    ? 'bg-cyber-bg border border-cyber-border text-cyber-accent font-mono cyber-chamfer-sm focus:border-cyber-accent'
                    : theme === 'vapor'
                    ? 'bg-black/80 border border-vapor-magenta text-vapor-cyan font-mono focus:border-vapor-cyan'
                    : 'bg-white text-black border-2 border-black win95-inset font-retro'
                }`}
              >
                {friends.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-mono uppercase tracking-wider text-[10px] opacity-80 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-cyber-accent" /> Amount (₹)
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="₹ 500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full p-2 outline-none font-bold ${
                  theme === 'cyber'
                    ? 'bg-cyber-bg border border-cyber-border text-cyber-accent font-mono cyber-chamfer-sm focus:border-cyber-accent'
                    : theme === 'vapor'
                    ? 'bg-black/80 border border-vapor-magenta text-vapor-cyan font-mono focus:border-vapor-cyan'
                    : 'bg-white text-black border-2 border-black win95-inset font-retro'
                }`}
              />
            </div>
          </div>

          {/* Row 2: Category & Place / Shop Note */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 font-mono uppercase tracking-wider text-[10px] opacity-80 flex items-center gap-1">
                <Tag className="w-3 h-3 text-cyber-cyan" /> Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={`w-full p-2 outline-none ${
                  theme === 'cyber'
                    ? 'bg-cyber-bg border border-cyber-border text-cyber-text font-mono cyber-chamfer-sm focus:border-cyber-cyan'
                    : theme === 'vapor'
                    ? 'bg-black/80 border border-vapor-magenta text-vapor-text font-mono focus:border-vapor-cyan'
                    : 'bg-white text-black border-2 border-black win95-inset font-retro'
                }`}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-mono uppercase tracking-wider text-[10px] opacity-80 flex items-center gap-1">
                <Store className="w-3 h-3 text-cyber-cyan" /> Shop / Note
              </label>
              <input
                type="text"
                placeholder="e.g. Kingstar Chai"
                value={placeNote}
                onChange={(e) => setPlaceNote(e.target.value)}
                className={`w-full p-2 outline-none ${
                  theme === 'cyber'
                    ? 'bg-cyber-bg border border-cyber-border text-cyber-text font-mono cyber-chamfer-sm focus:border-cyber-cyan'
                    : theme === 'vapor'
                    ? 'bg-black/80 border border-vapor-magenta text-vapor-text font-mono focus:border-vapor-cyan'
                    : 'bg-white text-black border-2 border-black win95-inset font-retro'
                }`}
              />
            </div>
          </div>

          {/* Row 3: Auto Date & Time */}
          <div>
            <label className="block mb-1 font-mono uppercase tracking-wider text-[10px] opacity-80 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cyber-yellow" /> Date & Time
              </span>
              <button
                type="button"
                onClick={() => setDateTime(getCurrentDateTimeString())}
                className="text-[9px] underline text-cyber-cyan"
              >
                Set Now (Auto)
              </button>
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className={`w-full p-2 outline-none font-mono ${
                theme === 'cyber'
                  ? 'bg-cyber-bg border border-cyber-border text-cyber-text cyber-chamfer-sm focus:border-cyber-accent'
                  : theme === 'vapor'
                  ? 'bg-black/80 border border-vapor-magenta text-vapor-text focus:border-vapor-cyan'
                  : 'bg-white text-black border-2 border-black win95-inset font-retro'
              }`}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className={`w-full py-2.5 font-bold uppercase tracking-widest text-xs transition-all ${
              theme === 'cyber'
                ? 'bg-cyber-accent text-black hover:bg-cyber-accent/90 cyber-chamfer-sm shadow-[0_0_10px_#00ff88]'
                : theme === 'vapor'
                ? 'bg-gradient-to-r from-vapor-orange via-vapor-magenta to-vapor-cyan text-black font-heading shadow-[0_0_15px_#FF00FF]'
                : 'bg-retro-navy text-white border-2 border-black win95-outset active:win95-inset font-impact text-sm'
            }`}
          >
            Record Expense 💸
          </button>
        </form>
      </div>

      {/* EXPENSE HISTORY & FILTERS */}
      <div className={`p-3 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card/80 border border-cyber-border'
          : theme === 'vapor'
          ? 'bg-vapor-card/80 border border-vapor-purple'
          : 'bg-retro-bg border-2 border-black win95-outset'
      }`}>
        <div className="flex items-center justify-between mb-3 border-b pb-2 border-gray-700/30">
          <h3 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1 font-mono">
            <ListFilter className="w-3.5 h-3.5 text-cyber-accent" /> Expense Feed ({filteredExpenses.length})
          </h3>

          {/* Filter Dropdowns */}
          <div className="flex gap-1.5">
            <select
              value={filterFriend}
              onChange={(e) => setFilterFriend(e.target.value)}
              className={`text-[10px] p-1 ${
                theme === 'cyber' ? 'bg-cyber-bg border border-cyber-border text-cyber-accent font-mono' : theme === 'vapor' ? 'bg-black border border-vapor-cyan text-vapor-cyan font-mono' : 'bg-white text-black border border-black'
              }`}
            >
              <option value="ALL">All Friends</option>
              {friends.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`text-[10px] p-1 ${
                theme === 'cyber' ? 'bg-cyber-bg border border-cyber-border text-cyber-text font-mono' : theme === 'vapor' ? 'bg-black border border-vapor-magenta text-vapor-text font-mono' : 'bg-white text-black border border-black'
              }`}
            >
              <option value="ALL">All Cats</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* FEED ITEMS */}
        {filteredExpenses.length === 0 ? (
          <div className="py-8 text-center text-xs opacity-60 font-mono">
            No expenses logged yet. Add your first Ooty bill above! 🌲
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filteredExpenses.map((exp) => (
              <div
                key={exp.id}
                className={`p-2.5 flex items-center justify-between text-xs transition-all ${
                  theme === 'cyber'
                    ? 'bg-cyber-bg/90 border-l-2 border-l-cyber-accent border border-cyber-border/50 hover:border-cyber-accent/60'
                    : theme === 'vapor'
                    ? 'bg-black/60 border-l-2 border-l-vapor-magenta border border-vapor-purple/40 hover:border-vapor-cyan/60'
                    : 'bg-white text-black border border-gray-400 win95-outset'
                }`}
              >
                <div className="space-y-0.5 max-w-[65%]">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className={`px-1.5 py-0.2 text-[9px] uppercase tracking-wider ${
                      theme === 'cyber' ? 'bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30' : theme === 'vapor' ? 'bg-vapor-magenta/20 text-vapor-magenta border border-vapor-magenta/40' : 'bg-retro-navy text-white'
                    }`}>
                      {exp.payerName}
                    </span>
                    <span className="truncate">{exp.placeNote}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] opacity-70 font-mono">
                    <span>{exp.categoryName}</span>
                    <span>•</span>
                    <span>{exp.dateTime ? new Date(exp.dateTime).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold text-sm ${
                    theme === 'cyber' ? 'text-cyber-accent' : theme === 'vapor' ? 'text-vapor-cyan' : 'text-retro-navy'
                  }`}>
                    {formatCurrency(exp.amount)}
                  </span>
                  
                  <button
                    onClick={() => onDeleteExpense(exp.id)}
                    className="text-gray-500 hover:text-red-400 p-1"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
