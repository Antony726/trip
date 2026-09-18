import React, { useState } from 'react';
import { Users, ArrowRight, CheckCircle2, TrendingUp, TrendingDown, DollarSign, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettlementHub({ friends, expenses, totalExpense, theme }) {
  const [settledItems, setSettledItems] = useState({});

  // Calculate per person totals
  const numFriends = friends.length || 8;
  const perPersonShare = totalExpense > 0 ? totalExpense / numFriends : 0;

  const friendStats = friends.map((friend) => {
    const totalSpent = expenses
      .filter((exp) => exp.payerId === friend.id)
      .reduce((sum, exp) => sum + exp.amount, 0);

    const netBalance = totalSpent - perPersonShare;

    return {
      ...friend,
      totalSpent,
      netBalance
    };
  });

  // Calculate Minimal Debt Transfers algorithm (Greedy balance solver)
  const calculateTransfers = () => {
    let debtors = []; // People who owe money (netBalance < 0)
    let creditors = []; // People who are owed money (netBalance > 0)

    friendStats.forEach((f) => {
      if (f.netBalance < -0.5) {
        debtors.push({ ...f, amountOwed: Math.abs(f.netBalance) });
      } else if (f.netBalance > 0.5) {
        creditors.push({ ...f, amountDue: f.netBalance });
      }
    });

    debtors.sort((a, b) => b.amountOwed - a.amountOwed);
    creditors.sort((a, b) => b.amountDue - a.amountDue);

    let transfers = [];
    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      let debtor = debtors[i];
      let creditor = creditors[j];

      let settlementAmount = Math.min(debtor.amountOwed, creditor.amountDue);

      if (settlementAmount > 1) {
        transfers.push({
          id: `${debtor.id}-to-${creditor.id}-${Math.round(settlementAmount)}`,
          from: debtor.name,
          to: creditor.name,
          amount: Math.round(settlementAmount)
        });
      }

      debtor.amountOwed -= settlementAmount;
      creditor.amountDue -= settlementAmount;

      if (debtor.amountOwed < 0.5) i++;
      if (creditor.amountDue < 0.5) j++;
    }

    return transfers;
  };

  const transfers = calculateTransfers();

  const handleSettle = (id) => {
    setSettledItems((prev) => ({ ...prev, [id]: !prev[id] }));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3">
      
      {/* SUMMARY BANNER */}
      <div className={`p-4 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card border border-cyber-magenta/50 cyber-chamfer shadow-[0_0_15px_rgba(255,0,255,0.15)]'
          : theme === 'vapor'
          ? 'bg-vapor-card border-t-2 border-t-vapor-magenta border-vapor-cyan/40 backdrop-blur shadow-[0_0_20px_rgba(0,255,255,0.15)]'
          : 'bg-retro-bg border-2 border-black win95-outset font-retro text-black'
      }`}>
        <h2 className={`font-bold text-sm tracking-wider uppercase flex items-center justify-between mb-2 ${
          theme === 'cyber' ? 'font-heading text-cyber-magenta' : theme === 'vapor' ? 'font-heading text-vapor-magenta' : 'font-impact text-retro-navy text-base'
        }`}>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Subpage: Person Breakdown
          </span>
          <span className="text-[10px] font-mono opacity-80">{friends.length} Friends</span>
        </h2>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-gray-700/30 text-xs font-mono">
          <div className="p-2 bg-black/40 border border-gray-700/40">
            <div className="text-[9px] uppercase opacity-70">Total Trip Spent</div>
            <div className="font-bold text-sm text-cyber-accent">{formatCurrency(totalExpense)}</div>
          </div>
          <div className="p-2 bg-black/40 border border-gray-700/40">
            <div className="text-[9px] uppercase opacity-70">Fair Share / Person</div>
            <div className="font-bold text-sm text-cyber-cyan">{formatCurrency(perPersonShare)}</div>
          </div>
        </div>
      </div>

      {/* INDIVIDUAL SPENDING LIST */}
      <div className={`p-3 transition-all ${
        theme === 'cyber' ? 'bg-cyber-card/80 border border-cyber-border' : theme === 'vapor' ? 'bg-vapor-card/80 border border-vapor-purple' : 'bg-retro-bg border-2 border-black win95-outset'
      }`}>
        <h3 className="font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1 font-mono">
          <Award className="w-4 h-4 text-cyber-yellow" /> Individual Spending & Balance
        </h3>

        <div className="space-y-2">
          {friendStats.map((f) => {
            const isOwed = f.netBalance >= 0;
            return (
              <div
                key={f.id}
                className={`p-2.5 flex items-center justify-between text-xs transition-all ${
                  theme === 'cyber'
                    ? 'bg-cyber-bg border border-cyber-border/60 hover:border-cyber-cyan/50'
                    : theme === 'vapor'
                    ? 'bg-black/60 border border-vapor-purple/60 hover:border-vapor-magenta/50'
                    : 'bg-white border border-black win95-outset'
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>{f.name}</span>
                  </div>
                  <div className="text-[10px] opacity-70 font-mono">
                    Total Paid: <span className="font-bold">{formatCurrency(f.totalSpent)}</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className={`text-xs font-bold flex items-center justify-end gap-1 ${
                    isOwed ? 'text-cyber-accent' : 'text-red-400'
                  }`}>
                    {isOwed ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isOwed ? `+${formatCurrency(f.netBalance)}` : formatCurrency(f.netBalance)}
                  </div>
                  <div className="text-[9px] uppercase opacity-70">
                    {isOwed ? 'Gets Back' : 'Owes Group'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OPTIMAL SETTLEMENT CALCULATOR */}
      <div className={`p-3 transition-all ${
        theme === 'cyber'
          ? 'bg-cyber-card/90 border border-cyber-accent/50 cyber-chamfer'
          : theme === 'vapor'
          ? 'bg-vapor-card border border-vapor-cyan/50'
          : 'bg-retro-bg border-2 border-black win95-outset'
      }`}>
        <h3 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center justify-between font-mono">
          <span className="flex items-center gap-1 text-cyber-accent">
            <Sparkles className="w-4 h-4" /> Smart Settlements ({transfers.length})
          </span>
          <span className="text-[9px] text-gray-400">Minimal Transfers</span>
        </h3>

        {transfers.length === 0 ? (
          <div className="py-6 text-center text-xs opacity-70 font-mono">
            🎉 Everyone is perfectly settled up! No payments pending.
          </div>
        ) : (
          <div className="space-y-2">
            {transfers.map((t) => {
              const isSettled = settledItems[t.id];
              return (
                <div
                  key={t.id}
                  onClick={() => handleSettle(t.id)}
                  className={`p-2.5 flex items-center justify-between text-xs cursor-pointer transition-all ${
                    isSettled
                      ? 'opacity-40 line-through bg-emerald-950/30 border border-emerald-800'
                      : theme === 'cyber'
                      ? 'bg-cyber-bg border border-cyber-accent/40 hover:border-cyber-accent'
                      : theme === 'vapor'
                      ? 'bg-black/80 border border-vapor-magenta hover:border-vapor-cyan'
                      : 'bg-retro-yellow border border-black win95-outset'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-400">{t.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 text-cyber-cyan" />
                    <span className="font-bold text-emerald-400">{t.to}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm text-cyber-yellow">
                      {formatCurrency(t.amount)}
                    </span>
                    <CheckCircle2 className={`w-4 h-4 ${isSettled ? 'text-emerald-400' : 'text-gray-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
