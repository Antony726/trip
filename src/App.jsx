import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ExpenseTracker from './components/ExpenseTracker';
import SettlementHub from './components/SettlementHub';
import OotyGuide from './components/OotyGuide';
import FunZone from './components/FunZone';
import GroupPolls from './components/GroupPolls';
import TripPlanner from './components/TripPlanner';
import JourneyPage from './components/JourneyPage';
import PlacesVisited from './components/PlacesVisited';
import FriendsModal from './components/FriendsModal';
import { INITIAL_FRIENDS, DEFAULT_CATEGORIES, INITIAL_POLLS, INITIAL_PLANNER, INITIAL_JOURNEY } from './data/ootyData';
import { firestoreDb, realtimeDb, collection, onSnapshot, doc, setDoc, deleteDoc, ref, set, onValue } from './services/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('expenses'); 
  const [theme, setTheme] = useState('cyber'); 
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);

  // 1. Friends State
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('ooty_friends');
    return saved ? JSON.parse(saved) : INITIAL_FRIENDS;
  });

  // 2. Categories State
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('ooty_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // 3. Expenses State
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('ooty_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Polls State
  const [polls, setPolls] = useState(() => {
    const saved = localStorage.getItem('ooty_polls');
    return saved ? JSON.parse(saved) : INITIAL_POLLS;
  });

  // 5. Planner State
  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem('ooty_planner');
    return saved ? JSON.parse(saved) : INITIAL_PLANNER;
  });

  // 6. Journey State
  const [journey, setJourney] = useState(() => {
    const saved = localStorage.getItem('ooty_journey');
    return saved ? JSON.parse(saved) : INITIAL_JOURNEY;
  });

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem('ooty_friends', JSON.stringify(friends)); }, [friends]);
  useEffect(() => { localStorage.setItem('ooty_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('ooty_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('ooty_polls', JSON.stringify(polls)); }, [polls]);
  useEffect(() => { localStorage.setItem('ooty_planner', JSON.stringify(planner)); }, [planner]);
  useEffect(() => { localStorage.setItem('ooty_journey', JSON.stringify(journey)); }, [journey]);

  // Firebase Realtime / Firestore Listeners
  useEffect(() => {
    if (!firestoreDb) return;
    try {
      const unsub = onSnapshot(collection(firestoreDb, "expenses"), (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        if (list.length > 0) setExpenses(list);
      }, () => {});
      return () => unsub();
    } catch (e) {}
  }, []);

  // Handlers for Expenses
  const handleAddExpense = async (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    if (firestoreDb) {
      try { await setDoc(doc(firestoreDb, "expenses", newExpense.id), newExpense); } catch(e){}
    }
    if (realtimeDb) {
      try { set(ref(realtimeDb, `expenses/${newExpense.id}`), newExpense).catch(()=>{}); } catch(e){}
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    setExpenses(expenses.filter(e => e.id !== expenseId));
    if (firestoreDb) {
      try { await deleteDoc(doc(firestoreDb, "expenses", expenseId)); } catch(e){}
    }
    if (realtimeDb) {
      try { set(ref(realtimeDb, `expenses/${expenseId}`), null).catch(()=>{}); } catch(e){}
    }
  };

  // Handlers for Polls
  const handleAddPoll = (newPoll) => {
    setPolls([newPoll, ...polls]);
  };

  const handleVotePoll = (pollId, optionId, voterName) => {
    const updated = polls.map(p => {
      if (p.id !== pollId) return p;
      const opts = p.options.map(opt => {
        // Remove voter from all options first, then add to selected
        const cleanVotes = (opt.votes || []).filter(v => v !== voterName);
        if (opt.id === optionId) {
          cleanVotes.push(voterName);
        }
        return { ...opt, votes: cleanVotes };
      });
      return { ...p, options: opts };
    });
    setPolls(updated);
  };

  const handleDeletePoll = (pollId) => {
    setPolls(polls.filter(p => p.id !== pollId));
  };

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 scanline-overlay ${
      theme === 'cyber'
        ? 'bg-cyber-bg text-cyber-text'
        : theme === 'vapor'
        ? 'bg-vapor-bg text-vapor-text'
        : 'bg-retro-bg text-black font-retro'
    }`}>
      
      {/* HEADER & TOP SCROLLABLE NAVIGATION */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalExpense={totalExpense}
        theme={theme}
        setTheme={setTheme}
        onOpenFriendsModal={() => setIsFriendsModalOpen(true)}
      />

      {/* MAIN CONTENT AREA */}
      <main className="pt-3 pb-12">
        {activeTab === 'expenses' && (
          <ExpenseTracker
            friends={friends}
            categories={categories}
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onAddCategory={(c) => setCategories([...categories, c])}
            onRemoveCategory={(id) => setCategories(categories.filter(c => c.id !== id))}
            theme={theme}
          />
        )}

        {activeTab === 'settlement' && (
          <SettlementHub
            friends={friends}
            expenses={expenses}
            totalExpense={totalExpense}
            theme={theme}
          />
        )}

        {activeTab === 'guide' && (
          <OotyGuide theme={theme} />
        )}

        {activeTab === 'polls' && (
          <GroupPolls
            friends={friends}
            polls={polls}
            onAddPoll={handleAddPoll}
            onVotePoll={handleVotePoll}
            onDeletePoll={handleDeletePoll}
            theme={theme}
          />
        )}

        {activeTab === 'planner' && (
          <TripPlanner
            planner={planner}
            onUpdatePlanner={setPlanner}
            theme={theme}
          />
        )}

        {activeTab === 'journey' && (
          <JourneyPage
            journey={journey}
            onUpdateJourney={setJourney}
            theme={theme}
          />
        )}

        {activeTab === 'visited' && (
          <PlacesVisited
            totalExpense={totalExpense}
            journey={journey}
            theme={theme}
          />
        )}

        {activeTab === 'fun' && (
          <FunZone
            friends={friends}
            expenses={expenses}
            theme={theme}
          />
        )}
      </main>

      {/* EDIT FRIENDS NAMES MODAL */}
      <FriendsModal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        friends={friends}
        onUpdateFriends={setFriends}
        theme={theme}
      />
    </div>
  );
}
