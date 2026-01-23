'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, UserCheck, Shield, TrendingUp, Edit, Trash2, Search,
  Menu, X, Store, LogIn, Package, ShoppingCart, Star,
  Settings, Download, Plus, Check, XCircle, Eye, ChevronRight,
  Activity, DollarSign, FileText, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProtectedRoute } from '@/components/protected-route';

interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
}

interface Game {
  id: string;
  name: string;
  slug: string;
  platform: string;
  icon: string; // URL/path to image
  productCount: number;
}

interface Product {
  id: string;
  name: string;
  game: string;
  gameId?: string;
  price: number;
  status: string;
  sales: number;
  description?: string;
  badge?: string;
  image?: string; // URL/path to product image
}

interface Order {
  id: string;
  orderNumber: string;
  user: string;
  amount: number;
  status: string;
  date: string;
}

interface Review {
  id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}

interface Stats {
  totalUsers: number;
  totalAdmins: number;
  verifiedEmails: number;
  recentSignups: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  avgRating: number;
}

export default function AdminPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // User Management States
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Product Management States
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  
  // Game Management States
  const [gameDialogOpen, setGameDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isEditingGame, setIsEditingGame] = useState(false);
  const [gameIconFile, setGameIconFile] = useState<File | null>(null);
  const [gameIconPreview, setGameIconPreview] = useState<string>('');
  
  // Product Management States - Add image states
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>('');
  
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalAdmins: 0,
    verifiedEmails: 0,
    recentSignups: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    avgRating: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch games and products from API
  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games');
      const data = await response.json();
      if (data.games) {
        setGames(data.games);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.products) {
        // Map products to match admin interface
        const mappedProducts = data.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          game: p.game?.name || '',
          gameId: p.gameId,
          price: p.price,
          status: p.status,
          sales: 0, // TODO: Calculate from orders
          description: p.description,
          badge: p.badge,
          image: p.image,
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchGames();
    fetchProducts();
  }, []);

  // Initialize with dummy data for other sections
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 1523,
        totalAdmins: 5,
        verifiedEmails: 1245,
        recentSignups: 89,
        totalProducts: products.length || 45,
        totalOrders: 3420,
        totalRevenue: 125840,
        avgRating: 4.7,
      });

      setUsers([
        {
          id: '1',
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          role: 'USER',
          emailVerified: true,
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          name: 'Jane Smith',
          username: 'janesmith',
          email: 'jane@example.com',
          role: 'ADMIN',
          emailVerified: true,
          createdAt: '2024-01-10',
        },
        {
          id: '3',
          name: 'Bob Wilson',
          username: 'bobwilson',
          email: 'bob@example.com',
          role: 'USER',
          emailVerified: false,
          createdAt: '2024-01-20',
        },
        {
          id: '4',
          name: 'Alice Brown',
          username: 'alicebrown',
          email: 'alice@example.com',
          role: 'USER',
          emailVerified: true,
          createdAt: '2024-01-18',
        },
        {
          id: '5',
          name: 'Charlie Davis',
          username: 'charliedavis',
          email: 'charlie@example.com',
          role: 'USER',
          emailVerified: true,
          createdAt: '2024-01-22',
        },
      ]);

      // Games and products are now fetched from API

      setOrders([
        { id: '1', orderNumber: 'ORD-2024-001', user: 'john@example.com', amount: 29.99, status: 'COMPLETED', date: '2024-01-22' },
        { id: '2', orderNumber: 'ORD-2024-002', user: 'jane@example.com', amount: 39.99, status: 'COMPLETED', date: '2024-01-22' },
        { id: '3', orderNumber: 'ORD-2024-003', user: 'bob@example.com', amount: 24.99, status: 'PENDING', date: '2024-01-21' },
        { id: '4', orderNumber: 'ORD-2024-004', user: 'alice@example.com', amount: 34.99, status: 'COMPLETED', date: '2024-01-20' },
        { id: '5', orderNumber: 'ORD-2024-005', user: 'charlie@example.com', amount: 29.99, status: 'CANCELLED', date: '2024-01-19' },
      ]);

      setReviews([
        { id: '1', user: 'johndoe', product: 'Fortnite ESP', rating: 5, comment: 'Amazing product! Works flawlessly.', date: '2024-01-22' },
        { id: '2', user: 'janesmith', product: 'Valorant Aimbot', rating: 4, comment: 'Good, but needs some improvements.', date: '2024-01-21' },
        { id: '3', user: 'bobwilson', product: 'PUBG Recoil', rating: 5, comment: 'Perfect! Highly recommend.', date: '2024-01-20' },
        { id: '4', user: 'alicebrown', product: 'Apex Legends Radar', rating: 4, comment: 'Great tool, easy to use.', date: '2024-01-19' },
        { id: '5', user: 'charliedavis', product: 'Fortnite ESP', rating: 5, comment: 'Best purchase ever!', date: '2024-01-18' },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter((review) =>
    review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
      setEditUserDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // Product Management Handlers
  const handleAddProduct = () => {
    setSelectedProduct({
      id: '',
      name: '',
      game: '',
      gameId: '',
      price: 0,
      status: 'AVAILABLE',
      sales: 0,
      description: '',
      badge: '',
      image: '',
    });
    setIsEditingProduct(false);
    setProductImageFile(null);
    setProductImagePreview('');
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditingProduct(true);
    setProductImageFile(null);
    setProductImagePreview(product.image || '');
    setProductDialogOpen(true);
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = async () => {
    if (selectedProduct) {
      const productToSave = {
        ...selectedProduct,
        image: productImagePreview || selectedProduct.image || '',
      };
      
      try {
        if (isEditingProduct) {
          // Update existing product
          const response = await fetch('/api/products', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToSave),
          });
          
          if (!response.ok) throw new Error('Failed to update product');
        } else {
          // Create new product - need to find gameId from game name
          const game = games.find(g => g.name === productToSave.game);
          if (!game) {
            alert('Please select a valid game');
            return;
          }
          
          const newProduct = {
            ...productToSave,
            gameId: game.id,
          };
          
          const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
          });
          
          if (!response.ok) throw new Error('Failed to create product');
          
          setStats(prev => ({ ...prev, totalProducts: prev.totalProducts + 1 }));
        }
        
        // Refresh products list
        await fetchProducts();
        await fetchGames(); // Update product counts
        
        setProductDialogOpen(false);
        setSelectedProduct(null);
        setProductImageFile(null);
        setProductImagePreview('');
      } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product');
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products?id=${productId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete product');
        
        setStats(prev => ({ ...prev, totalProducts: prev.totalProducts - 1 }));
        
        // Refresh products list
        await fetchProducts();
        await fetchGames(); // Update product counts
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  // Game Management Handlers
  const handleAddGame = () => {
    setSelectedGame({
      id: '',
      name: '',
      slug: '',
      platform: 'Desktop',
      icon: '',
      productCount: 0,
    });
    setIsEditingGame(false);
    setGameIconFile(null);
    setGameIconPreview('');
    setGameDialogOpen(true);
  };

  const handleEditGame = (game: Game) => {
    setSelectedGame(game);
    setIsEditingGame(true);
    setGameIconFile(null);
    setGameIconPreview(game.icon || '');
    setGameDialogOpen(true);
  };

  const handleGameIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGameIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGameIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGame = async () => {
    if (selectedGame) {
      const gameToSave = {
        ...selectedGame,
        icon: gameIconPreview || selectedGame.icon || '',
      };
      
      try {
        if (isEditingGame) {
          // Update existing game
          const response = await fetch('/api/games', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameToSave),
          });
          
          if (!response.ok) throw new Error('Failed to update game');
        } else {
          // Create new game
          const newGame = {
            ...gameToSave,
            slug: gameToSave.name.toLowerCase().replace(/\s+/g, '-'),
          };
          
          const response = await fetch('/api/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGame),
          });
          
          if (!response.ok) throw new Error('Failed to create game');
        }
        
        // Refresh games list
        await fetchGames();
        
        setGameDialogOpen(false);
        setSelectedGame(null);
        setGameIconFile(null);
        setGameIconPreview('');
      } catch (error) {
        console.error('Error saving game:', error);
        alert('Failed to save game');
      }
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    if (window.confirm('Are you sure you want to delete this game? All related products will be affected.')) {
      try {
        const response = await fetch(`/api/games?id=${gameId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete game');
        
        // Refresh games list
        await fetchGames();
      } catch (error) {
        console.error('Error deleting game:', error);
        alert('Failed to delete game');
      }
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter((o) => o.id !== orderId));
    }
  };

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter((r) => r.id !== reviewId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
      case 'COMPLETED':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'PENDING':
      case 'OUT_OF_STOCK':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'CANCELLED':
      case 'COMING_SOON':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <span className="text-2xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
                <span className="text-white">HAJI</span>
                <span className="text-emerald-400">UTONG</span>
                <span className="ml-2 text-sm text-slate-400">Admin</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Home</Link>
              <Link href="/store" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Store</Link>
              <Link href="/status" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Status</Link>
              <Link href="/feedback" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Feedback</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-6">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={handleAddGame} variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-6">
                <Plus className="h-4 w-4 mr-2" />
                Add Game
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-4">
              <Link href="/" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Home</Link>
              <Link href="/store" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Store</Link>
              <Link href="/status" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Status</Link>
              <Link href="/feedback" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Feedback</Link>
              <div className="pt-4 border-t border-slate-800/50 space-y-4 mt-6">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New User
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Admin <span className="text-emerald-400">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-xl">Manage your platform with full control</p>
            
            {/* Info Banner */}
            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-emerald-400">
                  <strong>Database Connected:</strong> All data is stored in SQLite database (dev.db). 
                  Use Prisma Studio or HeidiSQL to view/edit data directly. Changes persist across sessions.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-slate-400">Total Users</p>
              <div className="mt-2 flex items-center text-xs text-emerald-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{stats.recentSignups} this week
              </div>
            </div>

            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-blue-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stats.totalProducts}</p>
              <p className="text-sm text-slate-400">Total Products</p>
              <div className="mt-2 flex items-center text-xs text-blue-400">
                <Package className="h-3 w-3 mr-1" />
                Active marketplace
              </div>
            </div>

            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-purple-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl">
                  <ShoppingCart className="h-6 w-6 text-purple-400" />
                </div>
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stats.totalOrders.toLocaleString()}</p>
              <p className="text-sm text-slate-400">Total Orders</p>
              <div className="mt-2 flex items-center text-xs text-purple-400">
                <ShoppingCart className="h-3 w-3 mr-1" />
                All time
              </div>
            </div>

            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-amber-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-2xl">
                  <DollarSign className="h-6 w-6 text-amber-400" />
                </div>
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-slate-400">Total Revenue</p>
              <div className="mt-2 flex items-center text-xs text-amber-400">
                <DollarSign className="h-3 w-3 mr-1" />
                USD
              </div>
            </div>
          </div>

          {/* Tabs Management */}
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-slate-700/30 p-1 rounded-2xl">
                <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <Activity className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="users" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="games" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <Activity className="h-4 w-4 mr-2" />
                  Games
                </TabsTrigger>
                <TabsTrigger value="products" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <Package className="h-4 w-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="orders" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <Star className="h-4 w-4 mr-2" />
                  Reviews
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Users Stats</h3>
                      <Users className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Total</span>
                        <span className="text-white font-bold">{stats.totalUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Admins</span>
                        <span className="text-white font-bold">{stats.totalAdmins}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Verified</span>
                        <span className="text-white font-bold">{stats.verifiedEmails}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Products</h3>
                      <Package className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Total Products</span>
                        <span className="text-white font-bold">{stats.totalProducts}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Avg. Rating</span>
                        <span className="text-white font-bold">{stats.avgRating.toFixed(1)} ⭐</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Revenue</h3>
                      <DollarSign className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Total Orders</span>
                        <span className="text-white font-bold">{stats.totalOrders}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Revenue</span>
                        <span className="text-white font-bold">${stats.totalRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30">
                  <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                    <Button variant="outline" className="border-slate-600 hover:border-blue-500 hover:bg-blue-500/10">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                    <Button variant="outline" className="border-slate-600 hover:border-purple-500 hover:bg-purple-500/10">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="border-slate-600 hover:border-amber-500 hover:bg-amber-500/10">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">User Management</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-slate-700/30 border-slate-600"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-2xl border border-slate-600/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-600/30 hover:bg-transparent">
                          <TableHead className="text-white font-semibold">User</TableHead>
                          <TableHead className="text-white font-semibold">Email</TableHead>
                          <TableHead className="text-white font-semibold">Role</TableHead>
                          <TableHead className="text-white font-semibold">Status</TableHead>
                          <TableHead className="text-white font-semibold">Created</TableHead>
                          <TableHead className="text-white font-semibold text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                              No users found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id} className="border-slate-600/30 hover:bg-slate-700/30">
                              <TableCell>
                                <div>
                                  <div className="font-medium text-white">{user.name || 'N/A'}</div>
                                  <div className="text-sm text-slate-400">@{user.username || 'N/A'}</div>
                                </div>
                              </TableCell>
                              <TableCell className="text-white">{user.email}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    user.role === 'ADMIN'
                                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                  }
                                >
                                  <Shield className="h-3 w-3 mr-1" />
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {user.emailVerified ? (
                                  <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                    <Check className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-white">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                                    onClick={() => handleEditUser(user)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Games Tab */}
              <TabsContent value="games" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Games Management</h2>
                  <Button onClick={handleAddGame} className="bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Game
                  </Button>
                </div>

                <div className="bg-slate-700/30 rounded-2xl border border-slate-600/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-600/30 hover:bg-transparent">
                          <TableHead className="text-white font-semibold">Game</TableHead>
                          <TableHead className="text-white font-semibold">Slug</TableHead>
                          <TableHead className="text-white font-semibold">Platform</TableHead>
                          <TableHead className="text-white font-semibold">Products</TableHead>
                          <TableHead className="text-white font-semibold text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {games.map((game) => (
                          <TableRow key={game.id} className="border-slate-600/30 hover:bg-slate-700/30">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-600 bg-slate-800 flex items-center justify-center">
                                  <img 
                                    src={game.icon} 
                                    alt={game.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=No+Image';
                                    }}
                                  />
                                </div>
                                <span className="font-medium text-white">{game.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-400 font-mono">{game.slug}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                {game.platform}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white">{game.productCount} products</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                                  onClick={() => handleEditGame(game)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                  onClick={() => handleDeleteGame(game.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Product Management</h2>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-slate-700/30 border-slate-600"
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="bg-emerald-500 hover:bg-emerald-600">
                      <Plus className="h-4 w-4 mr-2" />
                      New Product
                    </Button>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-2xl border border-slate-600/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-600/30 hover:bg-transparent">
                          <TableHead className="text-white font-semibold">Product</TableHead>
                          <TableHead className="text-white font-semibold">Game</TableHead>
                          <TableHead className="text-white font-semibold">Price</TableHead>
                          <TableHead className="text-white font-semibold">Status</TableHead>
                          <TableHead className="text-white font-semibold">Sales</TableHead>
                          <TableHead className="text-white font-semibold text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id} className="border-slate-600/30 hover:bg-slate-700/30">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {product.image && (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-600 bg-slate-800 flex items-center justify-center">
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=No+Image';
                                      }}
                                    />
                                  </div>
                                )}
                                <span className="font-medium text-white">{product.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white">{product.game}</TableCell>
                            <TableCell className="text-emerald-400 font-semibold">${product.price}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(product.status)}>
                                {product.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white">{product.sales} sold</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Order Management</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-slate-700/30 border-slate-600"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-2xl border border-slate-600/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-600/30 hover:bg-transparent">
                          <TableHead className="text-white font-semibold">Order #</TableHead>
                          <TableHead className="text-white font-semibold">Customer</TableHead>
                          <TableHead className="text-white font-semibold">Amount</TableHead>
                          <TableHead className="text-white font-semibold">Status</TableHead>
                          <TableHead className="text-white font-semibold">Date</TableHead>
                          <TableHead className="text-white font-semibold text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id} className="border-slate-600/30 hover:bg-slate-700/30">
                            <TableCell className="font-mono text-white">{order.orderNumber}</TableCell>
                            <TableCell className="text-white">{order.user}</TableCell>
                            <TableCell className="text-emerald-400 font-semibold">${order.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white">
                              {new Date(order.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                  onClick={() => handleDeleteOrder(order.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Review Management</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-slate-700/30 border-slate-600"
                    />
                  </div>
                </div>

                <div className="grid gap-6">
                  {filteredReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30 hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-semibold">@{review.user}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-400 text-sm">{review.product}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-600'
                                }`}
                              />
                            ))}
                            <span className="text-slate-400 text-sm ml-2">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-slate-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Make changes to user account here.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={selectedUser.name || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserDialogOpen(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="bg-emerald-500 hover:bg-emerald-600">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Dialog (Add/Edit) */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {isEditingProduct ? 'Update product information' : 'Fill in the details to add a new product'}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name *</Label>
                  <Input
                    id="product-name"
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    placeholder="e.g., Fortnite ESP"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-game">Game *</Label>
                  <Select
                    value={selectedProduct.game}
                    onValueChange={(value) => setSelectedProduct({ ...selectedProduct, game: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Select game" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {games.map((game) => (
                        <SelectItem key={game.id} value={game.name}>
                          <div className="flex items-center gap-2">
                            <img src={game.icon} alt={game.name} className="w-5 h-5 object-cover rounded" />
                            {game.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-image">Product Image</Label>
                <Input
                  id="product-image"
                  type="file"
                  accept="image/*"
                  onChange={handleProductImageChange}
                  className="bg-slate-800 border-slate-700"
                />
                {(productImagePreview || selectedProduct.image) && (
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
                      <img 
                        src={productImagePreview || selectedProduct.image} 
                        alt="Product preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-slate-400">Image preview</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price ($) *</Label>
                  <Input
                    id="product-price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) || 0 })}
                    className="bg-slate-800 border-slate-700"
                    placeholder="29.99"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-status">Status *</Label>
                  <Select
                    value={selectedProduct.status}
                    onValueChange={(value) => setSelectedProduct({ ...selectedProduct, status: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="AVAILABLE">Available</SelectItem>
                      <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                      <SelectItem value="COMING_SOON">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-badge">Badge (Optional)</Label>
                <Select
                  value={selectedProduct.badge || 'none'}
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, badge: value === 'none' ? '' : value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue placeholder="No badge" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="none">No Badge</SelectItem>
                    <SelectItem value="BEST_SELLER">Best Seller</SelectItem>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="POPULAR">Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description (Optional)</Label>
                <Input
                  id="product-description"
                  value={selectedProduct.description || ''}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  placeholder="Product description"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setProductDialogOpen(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button onClick={handleSaveProduct} className="bg-emerald-500 hover:bg-emerald-600">
              {isEditingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Game Dialog (Add/Edit) */}
      <Dialog open={gameDialogOpen} onOpenChange={setGameDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{isEditingGame ? 'Edit Game' : 'Add New Game'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {isEditingGame ? 'Update game information' : 'Fill in the details to add a new game'}
            </DialogDescription>
          </DialogHeader>
          {selectedGame && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="game-name">Game Name *</Label>
                <Input
                  id="game-name"
                  value={selectedGame.name}
                  onChange={(e) => setSelectedGame({ ...selectedGame, name: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  placeholder="e.g., Fortnite"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="game-icon">Game Icon (Image) *</Label>
                <Input
                  id="game-icon"
                  type="file"
                  accept="image/*"
                  onChange={handleGameIconChange}
                  className="bg-slate-800 border-slate-700"
                />
                {(gameIconPreview || selectedGame.icon) && (
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
                      <img 
                        src={gameIconPreview || selectedGame.icon} 
                        alt="Game icon preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-slate-400">Image preview</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="game-platform">Platform *</Label>
                <Select
                  value={selectedGame.platform}
                  onValueChange={(value) => setSelectedGame({ ...selectedGame, platform: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="Desktop">Desktop</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isEditingGame && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mt-4">
                  <p className="text-sm text-blue-400">
                    💡 The slug will be auto-generated from the game name
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setGameDialogOpen(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button onClick={handleSaveGame} className="bg-emerald-500 hover:bg-emerald-600">
              {isEditingGame ? 'Update Game' : 'Add Game'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">HAJI</span>
              <span className="text-emerald-400">UTONG</span>
              <span className="text-slate-400 text-sm ml-2">Admin Panel</span>
            </div>
            <p className="text-slate-400 text-sm">© 2026 HajiUtong. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </ProtectedRoute>
  );
}
