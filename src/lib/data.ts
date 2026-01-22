export interface Product {
  id: string;
  name: string;
  gameSlug: string;
  price: number;
  status: 'available' | 'out-of-stock' | 'coming-soon';
  badge?: 'best-seller' | 'new' | 'popular';
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  icon: string;
  platform: 'Desktop' | 'Android' | 'iOS';
  productCount: number;
}

export const gamesData: Game[] = [
  // Desktop Games
  { id: '1', name: 'Apex Legends', slug: 'apex-legends', icon: '/games/apex.png', platform: 'Desktop', productCount: 12 },
  { id: '2', name: 'Valorant', slug: 'valorant', icon: '/games/valorant.png', platform: 'Desktop', productCount: 15 },
  { id: '3', name: 'CS2', slug: 'cs2', icon: '/games/cs2.png', platform: 'Desktop', productCount: 18 },
  { id: '4', name: 'Fortnite', slug: 'fortnite', icon: '/games/fortnite.png', platform: 'Desktop', productCount: 10 },
  { id: '5', name: 'Rust', slug: 'rust', icon: '/games/rust.png', platform: 'Desktop', productCount: 8 },
  { id: '6', name: 'PUBG', slug: 'pubg', icon: '/games/pubg.png', platform: 'Desktop', productCount: 14 },

  // Android Games
  { id: '7', name: 'Mobile Legends', slug: 'mobile-legends', icon: '/games/mobile-legends.png', platform: 'Android', productCount: 20 },
  { id: '8', name: 'PUBG Mobile', slug: 'pubg-mobile', icon: '/games/pubg-mobile.png', platform: 'Android', productCount: 16 },
  { id: '9', name: 'Free Fire', slug: 'free-fire', icon: '/games/free-fire.png', platform: 'Android', productCount: 12 },
  { id: '10', name: 'Call of Duty Mobile', slug: 'cod-mobile', icon: '/games/cod-mobile.png', platform: 'Android', productCount: 14 },
  { id: '11', name: 'Genshin Impact', slug: 'genshin-impact', icon: '/games/genshin-impact.png', platform: 'Android', productCount: 8 },

  // iOS Games
  { id: '12', name: 'Clash Royale', slug: 'clash-royale', icon: '/games/clash-royale.png', platform: 'iOS', productCount: 10 },
  { id: '13', name: 'Brawl Stars', slug: 'brawl-stars', icon: '/games/brawl-stars.png', platform: 'iOS', productCount: 12 },
  { id: '14', name: 'Honor of Kings', slug: 'honor-of-kings', icon: '/games/honor-of-kings.png', platform: 'iOS', productCount: 8 },
];

export const popularProducts: Product[] = [
  { id: '1', name: 'Phoenix Pro', gameSlug: 'apex-legends', price: 49.99, status: 'available', badge: 'best-seller' },
  { id: '2', name: 'Mason Elite', gameSlug: 'apex-legends', price: 59.99, status: 'available', badge: 'popular' },
  { id: '3', name: 'Viper Aim', gameSlug: 'valorant', price: 44.99, status: 'available', badge: 'best-seller' },
  { id: '4', name: 'Spectre', gameSlug: 'valorant', price: 54.99, status: 'available', badge: 'new' },
  { id: '5', name: 'Alpha CS2', gameSlug: 'cs2', price: 39.99, status: 'available', badge: 'popular' },
  { id: '6', name: 'Omega ESP', gameSlug: 'fortnite', price: 49.99, status: 'available', badge: 'new' },
  { id: '7', name: 'Titan ML', gameSlug: 'mobile-legends', price: 29.99, status: 'available', badge: 'best-seller' },
  { id: '8', name: 'Ninja PUBGM', gameSlug: 'pubg-mobile', price: 34.99, status: 'available', badge: 'popular' },
];

export const productsByGame: Record<string, Product[]> = {
  'apex-legends': [
    { id: '1', name: 'Phoenix Pro', gameSlug: 'apex-legends', price: 49.99, status: 'available', badge: 'best-seller' },
    { id: '2', name: 'Mason Elite', gameSlug: 'apex-legends', price: 59.99, status: 'available', badge: 'popular' },
    { id: '3', name: 'Stern Plus', gameSlug: 'apex-legends', price: 39.99, status: 'coming-soon' },
    { id: '4', name: 'Apex Vision', gameSlug: 'apex-legends', price: 44.99, status: 'available' },
  ],
  'valorant': [
    { id: '5', name: 'Viper Aim', gameSlug: 'valorant', price: 44.99, status: 'available', badge: 'best-seller' },
    { id: '6', name: 'Spectre', gameSlug: 'valorant', price: 54.99, status: 'available', badge: 'new' },
    { id: '7', name: 'Jett ESP', gameSlug: 'valorant', price: 39.99, status: 'available' },
  ],
  'cs2': [
    { id: '8', name: 'Alpha CS2', gameSlug: 'cs2', price: 39.99, status: 'available', badge: 'popular' },
    { id: '9', name: 'Beta Wall', gameSlug: 'cs2', price: 49.99, status: 'available' },
  ],
  'mobile-legends': [
    { id: '10', name: 'Titan ML', gameSlug: 'mobile-legends', price: 29.99, status: 'available', badge: 'best-seller' },
    { id: '11', name: 'Atlas ML', gameSlug: 'mobile-legends', price: 34.99, status: 'available' },
  ],
  'pubg-mobile': [
    { id: '12', name: 'Ninja PUBGM', gameSlug: 'pubg-mobile', price: 34.99, status: 'available', badge: 'popular' },
    { id: '13', name: 'Ghost PUBGM', gameSlug: 'pubg-mobile', price: 39.99, status: 'available' },
  ],
};
