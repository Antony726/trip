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

  // Backup LocalStorage sync
  useEffect(() => { localStorage.setItem('ooty_friends', JSON.stringify(friends)); }, [friends]);
  useEffect(() => { localStorage.setItem('ooty_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('ooty_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('ooty_polls', JSON.stringify(polls)); }, [polls]);
  useEffect(() => { localStorage.setItem('ooty_planner', JSON.stringify(planner)); }, [planner]);
  useEffect(() => { localStorage.setItem('ooty_journey', JSON.stringify(journey)); }, [journey]);

  // ==========================================
  // REALTIME FIREBASE LISTENERS (AUTO REFRESH)
  // ==========================================

  // A) Expenses Realtime Listener
  useEffect(() => {
    if (!firestoreDb) return;
    try {
      const unsub = onSnapshot(collection(firestoreDb, "expenses"), (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        setExpenses(list);
      }, (err) => console.log("Expenses sync info:", err));
      return () => unsub();
    } catch (e) {}
  }, []);

  // B) Friends Names Realtime Listener
  useEffect(() => {
    if (!firestoreDb) return;
    try {
      const unsub = onSnapshot(collection(firestoreDb, "friends"), (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        if (list.length > 0) {
          // Sort by id order
          list.sort((a, b) => parseInt(a.id) - parseInt(b.id));
          setFriends(list);
        }
      }, (err) => console.log("Friends sync info:", err));
      return () => unsub();
    } catch (e) {}
  }, []);

  // C) Categories Realtime Listener
  useEffect(() => {
    if (!firestoreDb) return;
    try {
      const unsub = onSnapshot(collection(firestoreDb, "categories"), (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        if (list.length > 0) setCategories(list);
      }, (err) => {});
      return () => unsub();
    } catch (e) {}
  }, []);

  // D) Polls Realtime Listener
  useEffect(() => {
    if (!firestoreDb) return;
    try {
      const unsub = onSnapshot(collection(firestoreDb, "polls"), (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        if (list.length > 0) setPolls(list);
      }, (err) => {});
      return () => unsub();
    } catch (e) {}
  }, []);

  // E) Planner Realtime Listener
  useEffect(() => {
    if (!firestoreDb) return;
    try {
      const unsub = onSnapshot(collection(firestoreDb, "planner"), (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        if (list.length > 0) {
          list.sort((a, b) => (a.dayIndex || 0) - (b.dayIndex || 0));
          setPlanner(list);
        }
      }, (err) => {});
      return () => unsub();
    } catch (e) {}
  }, []);

  // Realtime Database Fallback Listener for Expenses
  useEffect(() => {
    if (!realtimeDb) return;
    try {
      const expensesRef = ref(realtimeDb, 'expenses');
      const unsubscribe = onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setExpenses(list);
        }
      }, () => {});
      return () => unsubscribe();
    } catch (e) {}
  }, []);

  // ==========================================
  // SYNC ACTION HANDLERS
  // ==========================================

  // 1. Add Expense
  const handleAddExpense = async (newExpense) => {
    setExpenses(prev => [newExpense, ...prev.filter(e => e.id !== newExpense.id)]);
    
    if (firestoreDb) {
      try { await setDoc(doc(firestoreDb, "expenses", newExpense.id), newExpense); } catch(e){}
    }
    if (realtimeDb) {
      try { set(ref(realtimeDb, `expenses/${newExpense.id}`), newExpense).catch(()=>{}); } catch(e){}
    }
  };

  // 2. Delete Expense
  const handleDeleteExpense = async (expenseId) => {
    setExpenses(prev => prev.filter(e => e.id !== expenseId));

    if (firestoreDb) {
      try { await deleteDoc(doc(firestoreDb, "expenses", expenseId)); } catch(e){}
    }
    if (realtimeDb) {
      try { set(ref(realtimeDb, `expenses/${expenseId}`), null).catch(()=>{}); } catch(e){}
    }
  };

  // 3. Update Friends Names (Broadcasts live to all devices)
  const handleUpdateFriends = async (updatedFriends) => {
    setFriends(updatedFriends);

    if (firestoreDb) {
      try {
        for (const friend of updatedFriends) {
          await setDoc(doc(firestoreDb, "friends", friend.id), friend);
        }
      } catch (e) {}
    }
    if (realtimeDb) {
      try {
        for (const friend of updatedFriends) {
          set(ref(realtimeDb, `friends/${friend.id}`), friend).catch(()=>{});
        }
      } catch (e) {}
    }
  };

  // 4. Categories Handlers
  const handleAddCategory = async (newCat) => {
    if (categories.some(c => c.id === newCat.id)) return;
    const updated = [...categories, newCat];
    setCategories(updated);

    if (firestoreDb) {
      try { await setDoc(doc(firestoreDb, "categories", newCat.id), newCat); } catch(e){}
    }
  };

  const handleRemoveCategory = async (catId) => {
    if (categories.length <= 1) return;
    setCategories(prev => prev.filter(c => c.id !== catId));

    if (firestoreDb) {
      try { await deleteDoc(doc(firestoreDb, "categories", catId)); } catch(e){}
    }
  };

  // 5. Polls Handlers
  const handleAddPoll = async (newPoll) => {
    setPolls(prev => [newPoll, ...prev]);
    if (firestoreDb) {
      try { await setDoc(doc(firestoreDb, "polls", newPoll.id), newPoll); } catch(e){}
    }
  };

  const handleVotePoll = async (pollId, optionId, voterName) => {
    const targetPoll = polls.find(p => p.id === pollId);
    if (!targetPoll) return;

    const updatedOptions = targetPoll.options.map(opt => {
      const cleanVotes = (opt.votes || []).filter(v => v !== voterName);
      if (opt.id === optionId) {
        cleanVotes.push(voterName);
      }
      return { ...opt, votes: cleanVotes };
    });

    const updatedPoll = { ...targetPoll, options: updatedOptions };
    setPolls(prev => prev.map(p => p.id === pollId ? updatedPoll : p));

    if (firestoreDb) {
      try { await setDoc(doc(firestoreDb, "polls", pollId), updatedPoll); } catch(e){}
    }
  };

  const handleDeletePoll = async (pollId) => {
    setPolls(prev => prev.filter(p => p.id !== pollId));
    if (firestoreDb) {
      try { await deleteDoc(doc(firestoreDb, "polls", pollId)); } catch(e){}
    }
  };

  // 6. Planner Handler
  const handleUpdatePlanner = async (updatedPlanner) => {
    setPlanner(updatedPlanner);
    if (firestoreDb) {
      try {
        updatedPlanner.forEach(async (dayGroup, idx) => {
          const docId = `day-${idx + 1}`;
          await setDoc(doc(firestoreDb, "planner", docId), { ...dayGroup, id: docId, dayIndex: idx });
        });
      } catch (e) {}
    }
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
      
      {/* HEADER & TOP NAVIGATION */}
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
            onAddCategory={handleAddCategory}
            onRemoveCategory={handleRemoveCategory}
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
            onUpdatePlanner={handleUpdatePlanner}
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
        onUpdateFriends={handleUpdateFriends}
        theme={theme}
      />
    </div>
  );
}
