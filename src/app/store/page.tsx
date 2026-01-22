'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Monitor, Smartphone, Tablet, Star, Menu, X, Store as StoreIcon, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gamesData, popularProducts } from '@/lib/data';

export default function StorePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'Desktop' | 'Android' | 'iOS'>('Desktop');

  const platforms: Array<{ name: 'Desktop' | 'Android' | 'iOS'; icon: any }> = [
    { name: 'Desktop', icon: Monitor },
    { name: 'Android', icon: Smartphone },
    { name: 'iOS', icon: Tablet },
  ];

  const filteredGames = gamesData.filter((game) => game.platform === selectedPlatform);

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
              </span>
            </Link>

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

            <div className="hidden md:flex items-center gap-4">
              <Link href="/store">
                <Button variant="ghost" className="text-white font-semibold hover:bg-slate-800/50 px-6">
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
              <Link href="/status" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Status</Link>
              <Link href="/feedback" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Feedback</Link>
              <Link href="/terms" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Terms</Link>
              <div className="pt-4 border-t border-slate-800/50 space-y-4 mt-6">
                <Link href="/login" className="block text-emerald-400 hover:text-emerald-300 text-lg font-semibold py-3">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <StoreIcon className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Premium Gaming Store</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Browse Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
                {' '}Products
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Discover premium enhancements for your favorite games
            </p>
          </div>
        </div>
      </section>

      {/* Popular Products Section - Running Text */}
      <section className="relative py-16 bg-slate-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-slate-400">Trending Products</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Most Popular This Week
            </h2>
          </div>

          {/* Running Text Container */}
          <div className="relative hover:pause-animation">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
            
            {/* Marquee Container */}
            <div className="flex overflow-hidden">
              <div className="flex animate-marquee">
                {popularProducts.map((product) => (
                  <div
                    key={`first-${product.id}`}
                    className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500 flex-shrink-0 w-80 mx-3"
                  >
                    {product.badge === 'best-seller' && (
                      <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Best Seller
                      </div>
                    )}

                    <div className="relative h-48 bg-slate-700/30 flex items-center justify-center">
                      <div className="text-6xl">
                        {gamesData.find((g) => g.slug === product.gameSlug)?.icon}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {gamesData.find((g) => g.slug === product.gameSlug)?.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                        <span className="text-2xl font-bold text-emerald-400">
                          ${product.price}
                        </span>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">
                          Buy Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Duplicate for seamless loop */}
              <div className="flex animate-marquee" aria-hidden="true">
                {popularProducts.map((product) => (
                  <div
                    key={`second-${product.id}`}
                    className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500 flex-shrink-0 w-80 mx-3"
                  >
                    {product.badge === 'best-seller' && (
                      <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Best Seller
                      </div>
                    )}

                    <div className="relative h-48 bg-slate-700/30 flex items-center justify-center">
                      <div className="text-6xl">
                        {gamesData.find((g) => g.slug === product.gameSlug)?.icon}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {gamesData.find((g) => g.slug === product.gameSlug)?.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                        <span className="text-2xl font-bold text-emerald-400">
                          ${product.price}
                        </span>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">
                          Buy Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Filter Section */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Browse by Platform
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              {platforms.map((platform) => (
                <Button
                  key={platform.name}
                  onClick={() => setSelectedPlatform(platform.name)}
                  variant="outline"
                  className={`min-w-[140px] gap-2 px-8 py-4 rounded-full text-base ${
                    selectedPlatform === platform.name
                      ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
                      : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <platform.icon className="h-5 w-5" />
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <Link key={game.id} href={`/store/${game.slug}`}>
                <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden h-80 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-30 group-hover:opacity-40 transition-opacity">
                      {game.icon}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-2xl mb-2">
                      {game.name}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {game.productCount} products available
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">
                No games available for {selectedPlatform} yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">HAJI</span>
                <span className="text-emerald-400">UTONG</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Premium gaming software with advanced security and regular updates.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">Home</Link></li>
                <li><Link href="/store" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">Store</Link></li>
                <li><Link href="/status" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">Status</Link></li>
                <li><Link href="/feedback" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">Feedback</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                <li><Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">Terms of Service</Link></li>
                <li><Link href="/admin" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">Admin</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
              <p className="text-slate-400 text-sm mb-4">Get the latest updates and news</p>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/30 text-center">
            <p className="text-slate-400 text-sm">© 2026 HajiUtong. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
