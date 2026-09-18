export const INITIAL_FRIENDS = [
  { id: '1', name: 'Person A' },
  { id: '2', name: 'Person B' },
  { id: '3', name: 'Person C' },
  { id: '4', name: 'Person D' },
  { id: '5', name: 'Person E' },
  { id: '6', name: 'Person F' },
  { id: '7', name: 'Person G' },
  { id: '8', name: 'Person H' }
];

export const DEFAULT_CATEGORIES = [
  { id: 'food', name: 'Food & Meals 🍔', color: '#ff00ff' },
  { id: 'stay', name: 'Stay & Hotel 🏨', color: '#00d4ff' },
  { id: 'travel', name: 'Travel & Fuel ⛽', color: '#00ff88' },
  { id: 'tickets', name: 'Sightseeing & Entry 🎟️', color: '#ffcc00' },
  { id: 'chai', name: 'Tea & Chocolates ☕', color: '#ff6600' },
  { id: 'snacks', name: 'Snacks & Drinks 🍿', color: '#cc00ff' },
  { id: 'misc', name: 'Misc & Shopping 🎒', color: '#6b7280' }
];

export const OOTY_SPOTS = [
  // --- METTUPALAYAM & EN ROUTE ---
  {
    id: 'black-thunder',
    name: 'Black Thunder Water Park (Mettupalayam)',
    category: 'Mettupalayam En Route 🚗',
    distanceKm: 52,
    isFamous: true,
    isUnderrated: false,
    rating: 4.5,
    description: 'Massive water theme park at the foot of Nilgiri hills with wave pools & adventure rides.',
    bestTime: '10 AM - 4 PM',
    price: '₹850 Entry',
    mapsUrl: 'https://maps.google.com/?q=Black+Thunder+Mettupalayam',
    tag: 'Water Park',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'burliyar-spices',
    name: 'Burliyar Spice Garden & Jackfruit Stall',
    category: 'Mettupalayam En Route 🚗',
    distanceKm: 42,
    isFamous: false,
    isUnderrated: true,
    rating: 4.6,
    description: 'En route mountain fruit stalls offering fresh mangosteen, durian, spices & herbal teas.',
    bestTime: 'En route stop',
    price: 'Varies',
    mapsUrl: 'https://maps.google.com/?q=Burliyar+Mettupalayam',
    tag: 'Fresh Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kallar-garden',
    name: 'Kallar Horticultural Farm',
    category: 'Mettupalayam En Route 🚗',
    distanceKm: 48,
    isFamous: false,
    isUnderrated: true,
    rating: 4.4,
    description: '1900-era government spice & exotic fruit research station at mountain foot.',
    bestTime: 'Morning',
    price: '₹20 Entry',
    mapsUrl: 'https://maps.google.com/?q=Kallar+Horticultural+Farm',
    tag: 'Nature',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'
  },

  // --- COONOOR SPOTS ---
  {
    id: 'sims-park',
    name: 'Sim\'s Park (Coonoor Botanical)',
    category: 'Coonoor Places 🌿',
    distanceKm: 19,
    isFamous: true,
    isUnderrated: false,
    rating: 4.6,
    description: '1874 Japanese style terraced garden in Coonoor with rare trees, rose garden & lake.',
    bestTime: '9:30 AM - 12 PM',
    price: '₹30 Entry',
    mapsUrl: 'https://maps.google.com/?q=Sims+Park+Coonoor',
    tag: 'Coonoor Classic',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dolphins-nose',
    name: 'Dolphin\'s Nose Viewpoint (Coonoor)',
    category: 'Coonoor Places 🌿',
    distanceKm: 28,
    isFamous: true,
    isUnderrated: false,
    rating: 4.7,
    description: 'Enormous cliff peak shaped like a dolphin\'s nose with view of Catherine Falls.',
    bestTime: ' Morning 9 AM - 11 AM',
    price: '₹15 Entry',
    mapsUrl: 'https://maps.google.com/?q=Dolphins+Nose+Coonoor',
    tag: 'Cliff View',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'lambs-rock',
    name: 'Lamb\'s Rock (Coonoor)',
    category: 'Coonoor Places 🌿',
    distanceKm: 25,
    isFamous: true,
    isUnderrated: false,
    rating: 4.7,
    description: 'Sheer vertical cliff drop overlooking Coimbatore plains and tea garden estates.',
    bestTime: '9 AM - 11 AM',
    price: '₹20 Entry',
    mapsUrl: 'https://maps.google.com/?q=Lambs+Rock+Coonoor',
    tag: 'Tea Estate Drop',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'highfield-tea',
    name: 'Highfield Tea Estate Factory',
    category: 'Coonoor Places 🌿',
    distanceKm: 20,
    isFamous: true,
    isUnderrated: false,
    rating: 4.5,
    description: '50-year-old tea estate in Coonoor offering tea, eucalyptus oil & chocolate making tours.',
    bestTime: '10 AM - 4 PM',
    price: '₹10 Entry',
    mapsUrl: 'https://maps.google.com/?q=Highfield+Tea+Factory+Coonoor',
    tag: 'Tea Tasting',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rallia-dam',
    name: 'Rallia Dam (Coonoor Hidden Gem)',
    category: 'Coonoor Places 🌿',
    distanceKm: 24,
    isFamous: false,
    isUnderrated: true,
    rating: 4.8,
    description: 'Secluded 1938 dam hidden inside dense forest trail. No crowds, pure tranquility.',
    bestTime: '10 AM - 3 PM',
    price: 'Free',
    mapsUrl: 'https://maps.google.com/?q=Rallia+Dam+Coonoor',
    tag: 'Hidden Gem',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ketti-valley',
    name: 'Ketti Valley Viewpoint',
    category: 'Coonoor Places 🌿',
    distanceKm: 12,
    isFamous: true,
    isUnderrated: false,
    rating: 4.6,
    description: 'Known as the "Switzerland of Nilgiris", 14-village sprawling valley view from highway.',
    bestTime: '4 PM (Sunset)',
    price: '₹10 Entry',
    mapsUrl: 'https://maps.google.com/?q=Ketti+Valley+Viewpoint',
    tag: 'Switzerland Vibe',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },

  // --- OOTY TOP SPOTS ---
  {
    id: 'doddabetta',
    name: 'Doddabetta Peak',
    category: 'Views & Sunset 🌅',
    distanceKm: 9,
    isFamous: true,
    isUnderrated: false,
    rating: 4.6,
    description: 'Highest mountain peak in Nilgiris (2,637m). Panoramic misty valley views & telescope house.',
    bestTime: '8 AM - 10 AM',
    price: '₹10 entry',
    mapsUrl: 'https://maps.google.com/?q=Doddabetta+Peak+Ooty',
    tag: 'Highest Peak',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kinnakorai',
    name: 'Kinnakorai Viewpoint',
    category: 'Underrated Gems 💎',
    distanceKm: 60,
    isFamous: false,
    isUnderrated: true,
    rating: 4.9,
    description: 'End-of-the-world cliff viewpoint surrounded by endless tea hills and deep mountain gorges.',
    bestTime: 'Sunrise 6 AM',
    price: 'Free',
    mapsUrl: 'https://maps.google.com/?q=Kinnakorai+Viewpoint+Ooty',
    tag: 'Ultimate View',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'emerald-lake',
    name: 'Emerald Lake',
    category: 'Sightseeing 🏞️',
    distanceKm: 22,
    isFamous: true,
    isUnderrated: false,
    rating: 4.8,
    description: 'Serene emerald blue lake nestled amidst silent tea plantations away from city rush.',
    bestTime: '3 PM - 5:30 PM',
    price: 'Free',
    mapsUrl: 'https://maps.google.com/?q=Emerald+Lake+Ooty',
    tag: 'Peaceful',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'needle-rock',
    name: 'Needle Rock Viewpoint (Gudalur)',
    category: 'Views & Sunset 🌅',
    distanceKm: 40,
    isFamous: false,
    isUnderrated: true,
    rating: 4.9,
    description: '360-degree mountain viewpoint offering dramatic 500-meter vertical drop cliffs & cloud beds.',
    bestTime: '4:30 PM (Sunset)',
    price: '₹15 entry',
    mapsUrl: 'https://maps.google.com/?q=Needle+Rock+Viewpoint',
    tag: '360° Sunset',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pykara',
    name: 'Pykara Lake & Waterfalls',
    category: 'Sightseeing 🏞️',
    distanceKm: 21,
    isFamous: true,
    isUnderrated: false,
    rating: 4.7,
    description: 'Forest lake with speed boating and roaring cascading waterfalls.',
    bestTime: '11 AM - 3 PM',
    price: '₹800 Speedboat',
    mapsUrl: 'https://maps.google.com/?q=Pykara+Lake+Ooty',
    tag: 'Speedboating',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'crown-bakery',
    name: 'Crown Bakery (Since 1880s)',
    category: 'Food & Tea ☕',
    distanceKm: 1.2,
    isFamous: true,
    isUnderrated: false,
    rating: 4.8,
    description: 'Historical vintage bakery famous for honey cakes, plum cake, fresh butter biscuits & tea.',
    bestTime: 'Morning / Evening',
    price: '₹50 - ₹200',
    mapsUrl: 'https://maps.google.com/?q=Crown+Bakery+Ooty',
    tag: 'Iconic Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'marlimund-lake',
    name: 'Marlimund Lake / Monica Lake',
    category: 'Underrated Gems 💎',
    distanceKm: 5,
    isFamous: false,
    isUnderrated: true,
    rating: 4.6,
    description: 'Quaint quiet reservoir surrounded by pine trees, perfect for peaceful group walks.',
    bestTime: '10 AM - 4 PM',
    price: 'Free',
    mapsUrl: 'https://maps.google.com/?q=Marlimund+Lake+Ooty',
    tag: 'Hidden Gem',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tiger-hill-cemetery',
    name: 'Tiger Hill British Cemetery',
    category: 'Underrated Gems 💎',
    distanceKm: 6,
    isFamous: false,
    isUnderrated: true,
    rating: 4.4,
    description: 'Colonial 19th-century cemetery surrounded by tall pine canopy, giving a gothic mountain vibe.',
    bestTime: '11 AM - 3 PM',
    price: 'Free',
    mapsUrl: 'https://maps.google.com/?q=Tiger+Hill+Cemetery+Ooty',
    tag: 'Heritage',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'avalanche',
    name: 'Avalanche Forest Sanctuary',
    category: 'Adventure & Treks 🥾',
    distanceKm: 28,
    isFamous: true,
    isUnderrated: false,
    rating: 4.9,
    description: 'Protected forest eco-bus safari with rivers, trout hatcheries & dense pine woods.',
    bestTime: '9 AM Eco Tour',
    price: '₹200 Safari',
    mapsUrl: 'https://maps.google.com/?q=Avalanche+Lake+Ooty',
    tag: 'Forest Safari',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'wenlock-downs',
    name: 'Wenlock Downs / 9th Mile Shooting Meadows',
    category: 'Views & Sunset 🌅',
    distanceKm: 15,
    isFamous: true,
    isUnderrated: false,
    rating: 4.8,
    description: 'Vast rolling green meadows featured in movie songs with sheep grazing & valley views.',
    bestTime: '3:30 PM - 5:30 PM',
    price: '₹20 Entry',
    mapsUrl: 'https://maps.google.com/?q=9th+Mile+Ooty',
    tag: 'Movie Meadows',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pine-forest',
    name: 'Pine Forest / Shooting Spot',
    category: 'Sightseeing 🏞️',
    distanceKm: 14,
    isFamous: true,
    isUnderrated: false,
    rating: 4.5,
    description: 'Towering pine forest on downhill slope leading to Kamraj Sagar Dam.',
    bestTime: '10 AM - 4 PM',
    price: '₹15 Entry',
    mapsUrl: 'https://maps.google.com/?q=Pine+Forest+Ooty',
    tag: 'Pine Trees',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rose-garden',
    name: 'Government Rose Garden',
    category: 'Sightseeing 🏞️',
    distanceKm: 3,
    isFamous: true,
    isUnderrated: false,
    rating: 4.5,
    description: 'Largest rose garden in India on Vijayanagaram hill slope with over 20,000 varieties.',
    bestTime: '10 AM - 1 PM',
    price: '₹40 Entry',
    mapsUrl: 'https://maps.google.com/?q=Government+Rose+Garden+Ooty',
    tag: 'Rose Paradise',
    image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'botanical-garden',
    name: 'Government Botanical Garden',
    category: 'Sightseeing 🏞️',
    distanceKm: 2,
    isFamous: true,
    isUnderrated: false,
    rating: 4.5,
    description: 'Established 1848, 55-acre terraced garden with 20-million-year-old fossilized tree.',
    bestTime: '9 AM - 12 PM',
    price: '₹50 Entry',
    mapsUrl: 'https://maps.google.com/?q=Government+Botanical+Garden+Ooty',
    tag: 'Historic Garden',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ooty-lake',
    name: 'Ooty Boat House & Lake',
    category: 'Sightseeing 🏞️',
    distanceKm: 2,
    isFamous: true,
    isUnderrated: false,
    rating: 4.3,
    description: 'Classic 65-acre lake with motor boats, pedal boats & eucalyptus trees shoreline.',
    bestTime: '10 AM - 5 PM',
    price: '₹240 Boating',
    mapsUrl: 'https://maps.google.com/?q=Ooty+Lake+Boat+House',
    tag: 'Boating',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tea-factory',
    name: 'Doddabetta Tea Factory & Chocolate Museum',
    category: 'Food & Tea ☕',
    distanceKm: 7,
    isFamous: true,
    isUnderrated: false,
    rating: 4.6,
    description: 'Live CTC tea processing factory tour + piping hot cardamom tea sampling.',
    bestTime: '10 AM - 4 PM',
    price: '₹10 Tea',
    mapsUrl: 'https://maps.google.com/?q=Doddabetta+Tea+Factory+Ooty',
    tag: 'Tea Factory',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kingstar-chocolates',
    name: 'Kingstar Original Chocolates',
    category: 'Food & Tea ☕',
    distanceKm: 1.5,
    isFamous: true,
    isUnderrated: false,
    rating: 4.7,
    description: 'First homemade chocolate manufacturer in Ooty (Operating since 1942).',
    bestTime: 'Anytime',
    price: '₹150+',
    mapsUrl: 'https://maps.google.com/?q=KingStar+Chocolates+Ooty',
    tag: 'Choco Shop',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mudumalai-safari',
    name: 'Mudumalai Tiger Reserve & Elephant Camp',
    category: 'Adventure & Treks 🥾',
    distanceKm: 36,
    isFamous: true,
    isUnderrated: false,
    rating: 4.8,
    description: 'Famous wildlife sanctuary at Tamil Nadu border featuring elephant feeding & jungle safari.',
    bestTime: '6:30 AM or 3:30 PM Safari',
    price: '₹350 Safari',
    mapsUrl: 'https://maps.google.com/?q=Theppakadu+Elephant+Camp',
    tag: 'Jungle Safari',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kalhatty-falls',
    name: 'Kalhatty Waterfalls (36 Hairpin Bends)',
    category: 'Adventure & Treks 🥾',
    distanceKm: 13,
    isFamous: false,
    isUnderrated: true,
    rating: 4.5,
    description: '100-foot waterfall on steep 36 hairpin bends road to Mysore. Great birdwatching.',
    bestTime: 'Morning',
    price: 'Free',
    mapsUrl: 'https://maps.google.com/?q=Kalhatty+Waterfalls+Ooty',
    tag: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_POLLS = [
  {
    id: 'poll-1',
    question: 'Where should we eat for dinner tonight? 🍔',
    options: [
      { id: 'opt-1', text: 'Crown Bakery & Cafe 🥐', votes: ['Person A', 'Person B'] },
      { id: 'opt-2', text: 'Traditional South Indian Thali 🍛', votes: ['Person C'] },
      { id: 'opt-3', text: 'Hot Chinese / Noodles near market 🍜', votes: ['Person D', 'Person E'] }
    ]
  },
  {
    id: 'poll-2',
    question: 'Which spot should we visit next? 🏞️',
    options: [
      { id: 'opt-10', text: 'Kinnakorai Viewpoint 🌄', votes: ['Person A', 'Person F', 'Person G'] },
      { id: 'opt-11', text: 'Emerald Lake 🌊', votes: ['Person B', 'Person H'] },
      { id: 'opt-12', text: 'Needle Rock 🪨', votes: ['Person D'] }
    ]
  },
  {
    id: 'poll-3',
    question: 'Morning Chai or Coffee before starting? ☕',
    options: [
      { id: 'opt-20', text: 'Hot Cardamom Chai ☕', votes: ['Person A', 'Person B', 'Person C', 'Person D'] },
      { id: 'opt-21', text: 'Nilgiri Filter Coffee ☕', votes: ['Person E', 'Person F'] }
    ]
  },
  {
    id: 'poll-4',
    question: 'Wake up time tomorrow morning? 😂',
    options: [
      { id: 'opt-30', text: '6:00 AM (Catch Sunrise!) 🌅', votes: ['Person A', 'Person C'] },
      { id: 'opt-31', text: '8:30 AM (Chill Sleep) 😴', votes: ['Person B', 'Person D', 'Person E', 'Person F', 'Person G'] }
    ]
  }
];

// UPDATED TO FRI, SAT, SUN (OCT 9 - OCT 11, 2026)
export const INITIAL_PLANNER = [
  {
    day: 'Day 1 (Fri, Oct 9)',
    items: [
      { id: 'p1', time: '06:00 AM', text: 'Start Road Trip from Mettupalayam Ghats 🚗', done: true },
      { id: 'p2', time: '08:30 AM', text: 'Burliyar Spice Stall & Hot Chai ☕', done: true },
      { id: 'p3', time: '11:00 AM', text: 'Sim\'s Park & Lamb\'s Rock (Coonoor) 🏞️', done: false },
      { id: 'p4', time: '01:30 PM', text: 'Lunch at Coonoor Town 🍛', done: false },
      { id: 'p5', time: '04:30 PM', text: 'Ketti Valley Viewpoint & Crown Bakery Snacks 📸', done: false },
      { id: 'p6', time: '07:30 PM', text: 'Check-in Ooty Hotel & Campfire Dinner 🏨', done: false }
    ]
  },
  {
    day: 'Day 2 (Sat, Oct 10)',
    items: [
      { id: 'p10', time: '06:00 AM', text: 'Kinnakorai Viewpoint Sunrise Expedition 🌅', done: false },
      { id: 'p11', time: '10:30 AM', text: 'Emerald Lake & Avalanche Forest Safari 🌲', done: false },
      { id: 'p12', time: '02:00 PM', text: 'Pykara Lake Speedboating & Waterfalls 🚤', done: false },
      { id: 'p13', time: '05:00 PM', text: 'Needle Rock 360° Sunset Viewpoint 🌅', done: false },
      { id: 'p14', time: '08:00 PM', text: 'Shopping for Homemade Chocolates & Dinner 🍫', done: false }
    ]
  },
  {
    day: 'Day 3 (Sun, Oct 11)',
    items: [
      { id: 'p20', time: '08:00 AM', text: 'Doddabetta Peak & Tea Factory Tour ☕', done: false },
      { id: 'p21', time: '11:00 AM', text: 'Nilgiri Toy Train Ride & Ooty Lake Boating 🚂', done: false },
      { id: 'p22', time: '02:00 PM', text: 'Farewell Lunch & Souvenir Shopping 🛍️', done: false },
      { id: 'p23', time: '04:00 PM', text: 'Return Journey via Mettupalayam 🚗', done: false }
    ]
  }
];

export const INITIAL_JOURNEY = {
  startLocation: 'Mettupalayam / Home City',
  currentDestination: 'Ooty Hill Town',
  totalDistanceKm: 420,
  distanceCoveredKm: 210,
  stopsCount: 6,
  fuelExpenses: 3200,
  tollExpenses: 520,
  foodStopsCount: 5,
  photosTakenCount: 180
};

export const TRIP_BINGO_ITEMS = [
  { id: 'b1', text: 'Drank steaming hot Ooty Cardamom Chai in thick mist ☕', badge: 'Chai Lord' },
  { id: 'b2', text: 'Bought at least 500g of Homemade Fudge Chocolates 🍫', badge: 'Choco Addict' },
  { id: 'b3', text: 'Took a group photo wearing winter jackets 🧥', badge: 'Cozy Squad' },
  { id: 'b4', text: 'Spotted wild bison or deer along the road 🦌', badge: 'Wilderness Explorer' },
  { id: 'b5', text: 'Got lost in Coonoor tea estate curves 🍃', badge: 'Navigator Fail' },
  { id: 'b6', text: 'Argued over who pays the fastag / toll bill 🚗', badge: 'Budget Cop' },
  { id: 'b7', text: 'Took toy train windows selfie 🚂', badge: 'Retro Rider' },
  { id: 'b8', text: 'Shivered and complained about cold water in room 🥶', badge: 'Frostbite Gang' },
  { id: 'b9', text: 'Someone fell asleep in the car back seat 😴', badge: 'Heavy Sleeper' },
  { id: 'b10', text: 'Ate hot Vada/Bajji near Doddabetta peak 🌶️', badge: 'Peak Foodie' },
  { id: 'b11', text: 'Played 90s songs loudly on mountain hairpin bends 🎶', badge: 'DJ Roadie' },
  { id: 'b12', text: 'Successfully settled all trip expenses on time! 💰', badge: 'Financial Wizard' }
];

export const LOFI_TRACKS = [
  { title: 'Nilgiri Misty Sunset', genre: 'Synthwave / Outrun', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3' },
  { title: 'Tea Estate Chill', genre: 'Vaporwave Lo-Fi', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a732ed.mp3?filename=chill-lofi-song-8444.mp3' },
  { title: 'Cyberpunk Drive 80s', genre: 'Cyber Synth', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=synthwave-80s-110045.mp3' }
];
