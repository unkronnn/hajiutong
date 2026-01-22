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

interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  game: string;
  price: number;
  status: string;
  sales: number;
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // In a real app, you would fetch this from the API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 1523,
        totalAdmins: 5,
        verifiedEmails: 1245,
        recentSignups: 89,
        totalProducts: 45,
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

      setProducts([
        { id: '1', name: 'Fortnite ESP', game: 'Fortnite', price: 29.99, status: 'AVAILABLE', sales: 245 },
        { id: '2', name: 'Valorant Aimbot', game: 'Valorant', price: 39.99, status: 'AVAILABLE', sales: 189 },
        { id: '3', name: 'PUBG Recoil', game: 'PUBG', price: 24.99, status: 'OUT_OF_STOCK', sales: 156 },
        { id: '4', name: 'Apex Legends Radar', game: 'Apex', price: 34.99, status: 'AVAILABLE', sales: 203 },
        { id: '5', name: 'Warzone ESP', game: 'Warzone', price: 44.99, status: 'COMING_SOON', sales: 0 },
      ]);

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
    setEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
      setEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== productId));
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
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">
                <Plus className="h-4 w-4 mr-2" />
                New User
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
      </nav>      </nav>

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
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 bg-slate-700/30 p-1 rounded-2xl">
                <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <Activity className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="users" className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Users
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
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
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
                            <TableCell className="font-medium text-white">{product.name}</TableCell>
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
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="bg-emerald-500 hover:bg-emerald-600">
              Save Changes
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
  );
}
