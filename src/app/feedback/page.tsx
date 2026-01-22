'use client';

import { useState } from 'react';
import { Star, ArrowRight, Shield, Zap, Crown, Check, Menu, X, Store } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  rating: number;
  text: string;
  timestamp: string;
  verified: boolean;
  product: string;
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    text: "Phoenix Pro exceeded my expectations. The aim assist is subtle and undetectable. Customer support is excellent!",
    timestamp: "10 hours ago",
    verified: true,
    product: "Phoenix Pro",
  },
  {
    id: 2,
    rating: 5,
    text: "Viper Aim exceeded my expectations. The aim assist is subtle and undetectable. Customer support is excellent!",
    timestamp: "1 day ago",
    verified: true,
    product: "Viper Aim",
  },
  {
    id: 3,
    rating: 4,
    text: "Alpha CS2 works great overall. Sometimes there are minor glitches but team fixes them quickly. Good value for money.",
    timestamp: "2 days ago",
    verified: true,
    product: "Alpha CS2",
  },
  {
    id: 4,
    rating: 5,
    text: "Titan ML for Mobile Legends is incredible. Ranked up quickly without any issues. Highly recommended!",
    timestamp: "3 days ago",
    verified: true,
    product: "Titan ML",
  },
  {
    id: 5,
    rating: 5,
    text: "Mason Elite has been my go-to for Apex Legends. Never been detected and features are top-notch. Best purchase I've made!",
    timestamp: "4 days ago",
    verified: true,
    product: "Mason Elite",
  },
  {
    id: 6,
    rating: 4,
    text: "Ninja PUBGM is solid. Esp works perfectly, sometimes aimbot is a bit off but overall great software.",
    timestamp: "5 days ago",
    verified: true,
    product: "Ninja PUBGM",
  },
  {
    id: 7,
    rating: 5,
    text: "Spectre for Valorant is amazing. Clean interface, great features, and zero issues so far. 10/10!",
    timestamp: "1 week ago",
    verified: true,
    product: "Spectre",
  },
  {
    id: 8,
    rating: 4,
    text: "Using Jett ESP for a week now. The visual features are impressive and haven't had any detection issues. Love it!",
    timestamp: "1 week ago",
    verified: true,
    product: "Jett ESP",
  },
  {
    id: 9,
    rating: 4,
    text: "Beta Wall for CS2 is good value. Wallhack works as advertised. Could use some UI improvements but functionality is solid.",
    timestamp: "2 weeks ago",
    verified: true,
    product: "Beta Wall",
  },
];

export default function FeedbackPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 transition-all duration-300 ${
          i < rating ? 'fill-emerald-400 text-emerald-400' : 'text-slate-600'
        }`}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

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
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Home</Link>
              <Link href="/status" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Status</Link>
              <Link href="/feedback" className="text-white font-semibold text-sm">Feedback</Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/store">
                <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-6">
                  <Store className="h-4 w-4 mr-2" />
                  Browse Store
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">Sign Up</Button>
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
              <Link href="/feedback" className="block text-white font-semibold text-lg py-3">Feedback</Link>
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
              <Star className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Trusted by Gamers</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Customer
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
                {' '}Feedback
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Real reviews from verified customers
            </p>
          </div>
        </div>
      </section>

      {/* Aggregate Rating Section */}
      <section className="relative py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-7xl font-bold text-emerald-400">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-5xl font-bold text-slate-400">/5</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                {renderStars(Math.round(averageRating))}
              </div>
              
              <div className="space-y-2">
                <p className="text-xl font-semibold text-white">
                  {reviews.length} Verified Reviews
                </p>
                <p className="text-sm text-slate-400">
                  Collected automatically 7 days after purchase
                </p>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/20 rounded-full px-4 py-2">
                <Star className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mb-6">
                <Shield className="h-7 w-7 text-emerald-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Verified Reviews</h3>
                <p className="text-base text-slate-400 leading-relaxed">All reviews are from confirmed purchases</p>
              </div>
            </div>

            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mb-6">
                <Zap className="h-7 w-7 text-emerald-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Fast Updates</h3>
                <p className="text-base text-slate-400 leading-relaxed">Regular security patches and improvements</p>
              </div>
            </div>

            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mb-6">
                <Crown className="h-7 w-7 text-emerald-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Premium Quality</h3>
                <p className="text-base text-slate-400 leading-relaxed">Top-tier software with advanced features</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sort Options */}
      <section className="relative py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex gap-3 justify-center flex-wrap">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3">
              Most Recent
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white px-8 py-3">
              Highest Rated
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white px-8 py-3">
              Most Helpful
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">{renderStars(review.rating)}</div>
                    {review.verified && (
                      <div className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/20 rounded-full px-2 py-1">
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{review.timestamp}</p>
                </div>

                <div className="border-t border-slate-700/30 pt-6 space-y-4">
                  <p className="text-sm font-semibold text-white">{review.product}</p>
                  <p className="text-base text-slate-400 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Review CTA */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mx-auto">
                <Star className="h-8 w-8 text-emerald-400" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white">Had a Great Experience?</h3>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                  Share your thoughts and help others make informed decisions
                </p>
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 text-base shadow-lg shadow-emerald-500/25">
                Write a Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
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
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium">Contact Us</Button>
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
