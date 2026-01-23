'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Check, X, Clock, Star, Flame, Sparkles, Crown, Menu, Store as StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface GamePageProps {
  params: Promise<{
    game: string;
  }>;
}

interface Game {
  id: string;
  name: string;
  slug: string;
  icon: string;
  platform: 'Desktop' | 'Android' | 'iOS';
  productCount: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  status: string;
  badge?: string;
  image?: string;
  description?: string;
}

export default function GamePage({ params }: GamePageProps) {
  const { game: gameSlug } = use(params);
  const [game, setGame] = useState<Game | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch game and products from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all games and find the current one
        const gamesResponse = await fetch('/api/games');
        const gamesData = await gamesResponse.json();
        const currentGame = gamesData.games.find((g: Game) => g.slug === gameSlug);

        if (!currentGame) {
          setLoading(false);
          return;
        }

        setGame(currentGame);

        // Fetch products for this game
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();

        // Filter products by gameId
        const gameProducts = productsData.products.filter(
          (p: any) => p.gameId === currentGame.id
        );

        setProducts(gameProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent mb-4"></div>
          <p className="text-slate-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link href="/">
                <span className="text-2xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
                  <span className="text-white">HAJI</span>
                  <span className="text-emerald-400">UTONG</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-10">
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Home</Link>
                <Link href="/store" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Store</Link>
                <Link href="/status" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Status</Link>
                <Link href="/feedback" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Feedback</Link>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms</Link>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <Link href="/store">
                  <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-6">
                    <StoreIcon className="h-4 w-4 mr-2" />
                    Browse Store
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Game Not Found</h1>
            <p className="text-slate-400 text-lg mb-8">The game you're looking for doesn't exist.</p>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
              <Link href="/store">Back to Store</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Check className="h-3 w-3 mr-1" />
            Available
          </Badge>
        );
      case 'OUT_OF_STOCK':
        return (
          <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
            <X className="h-3 w-3 mr-1" />
            Out of Stock
          </Badge>
        );
      case 'COMING_SOON':
        return (
          <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        );
      default:
        return null;
    }
  };

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case 'BEST_SELLER':
        return <Crown className="h-3 w-3" />;
      case 'NEW':
        return <Sparkles className="h-3 w-3" />;
      case 'POPULAR':
        return <Flame className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'BEST_SELLER':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'NEW':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'POPULAR':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar - Matching Landing Page */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <span className="text-2xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
                <span className="text-white">HAJI</span>
                <span className="text-emerald-400">UTONG</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                Home
              </Link>
              <Link href="/status" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                Status
              </Link>
              <Link href="/feedback" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                Feedback
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                Terms
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/store">
                <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-6">
                  <StoreIcon className="h-4 w-4 mr-2" />
                  Browse Store
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/store" className="hover:text-emerald-400 transition-colors">Store</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{game.name}</span>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-slate-400 hover:text-white hover:bg-slate-800/50">
              <Link href="/store">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Store
              </Link>
            </Button>
          </div>

          {/* Game Header */}
          <div className="mb-12 relative">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 h-64 rounded-3xl overflow-hidden -z-10">
              <img
                src={game.icon}
                alt={game.name}
                className="w-full h-full object-cover opacity-30"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x400?text=' + encodeURIComponent(game.name);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            <div className="relative flex items-center gap-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-800 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <img
                  src={game.icon}
                  alt={game.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96?text=' + encodeURIComponent(game.name[0]);
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-5xl font-bold text-white">{game.name}</h1>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-1 text-base">
                    {game.platform}
                  </Badge>
                </div>
                <p className="text-slate-400 text-lg">
                  {products.length} product{products.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500"
              >
                {/* Product Image */}
                {product.image && (
                  <div className="relative h-48 bg-slate-700/30 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=' + encodeURIComponent(product.name);
                      }}
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="outline" className={`text-xs ${getBadgeColor(product.badge)}`}>
                          {getBadgeIcon(product.badge)}
                          <span className="ml-1 capitalize">{product.badge.replace('_', ' ')}</span>
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                {/* Product Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-slate-400 line-clamp-2">{product.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {getStatusBadge(product.status)}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-emerald-400">
                      ${product.price}
                    </span>
                  </div>

                  {product.status === 'AVAILABLE' ? (
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium">
                      <Link href={`/store/${game.slug}/${product.id}`} className="flex items-center justify-center">
                        View Details
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-slate-700 text-slate-400 cursor-not-allowed">
                      {product.status === 'COMING_SOON' ? 'Coming Soon' : 'Out of Stock'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-16 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-full mb-4">
                <StoreIcon className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Products Yet</h3>
              <p className="text-slate-400 mb-6">
                No products available for {game.name} at the moment.
              </p>
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Link href="/admin">Add Product</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer - Matching Landing Page */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">HAJI</span>
              <span className="text-emerald-400">UTONG</span>
            </div>
            <p className="text-slate-400 text-sm">© 2026 HajiUtong. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
