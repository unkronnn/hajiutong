'use client';

import { useState } from 'react';
import { Check, AlertTriangle, RefreshCw, Clock, ArrowRight, Menu, X, Store, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type StatusType = 'undetected' | 'update' | 'risk' | 'closed';

interface ProductStatus {
  name: string;
  status: StatusType;
  lastUpdate: string;
}

interface GameStatus {
  name: string;
  icon: string;
  products: ProductStatus[];
}

const statusTypes = [
  {
    id: 'undetected',
    title: 'Undetected',
    icon: Check,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/30',
    description: 'Safe to use',
  },
  {
    id: 'update',
    title: 'On Update',
    icon: RefreshCw,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/30',
    description: 'Updating now',
  },
  {
    id: 'risk',
    title: 'At Risk',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    description: 'Use with caution',
  },
  {
    id: 'closed',
    title: 'Closed',
    icon: Clock,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/20',
    borderColor: 'border-slate-500/30',
    description: 'Not available',
  },
];

const games: GameStatus[] = [
  {
    name: 'Apex Legends',
    icon: '🎮',
    products: [
      { name: 'Phoenix Pro', status: 'undetected', lastUpdate: '2 hours ago' },
      { name: 'Mason Elite', status: 'undetected', lastUpdate: '5 hours ago' },
      { name: 'Stern Plus', status: 'update', lastUpdate: '1 day ago' },
    ],
  },
  {
    name: 'Valorant',
    icon: '🎯',
    products: [
      { name: 'Viper Aim', status: 'undetected', lastUpdate: '30 minutes ago' },
      { name: 'Spectre', status: 'undetected', lastUpdate: '1 hour ago' },
      { name: 'Jett ESP', status: 'risk', lastUpdate: '3 hours ago' },
    ],
  },
  {
    name: 'CS2',
    icon: '💣',
    products: [
      { name: 'Alpha CS2', status: 'undetected', lastUpdate: '45 minutes ago' },
      { name: 'Beta Wall', status: 'update', lastUpdate: '2 hours ago' },
    ],
  },
  {
    name: 'Mobile Legends',
    icon: '🎭',
    products: [
      { name: 'Titan ML', status: 'undetected', lastUpdate: '1 hour ago' },
      { name: 'Atlas ML', status: 'undetected', lastUpdate: '4 hours ago' },
    ],
  },
  {
    name: 'PUBG Mobile',
    icon: '🎪',
    products: [
      { name: 'Ninja PUBGM', status: 'undetected', lastUpdate: '2 hours ago' },
      { name: 'Ghost PUBGM', status: 'risk', lastUpdate: '6 hours ago' },
    ],
  },
];

export default function StatusPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getStatusInfo = (status: StatusType) => {
    return statusTypes.find((s) => s.id === status)!;
  };

  const getStatusColor = (status: StatusType) => {
    const colorMap: Record<StatusType, string> = {
      undetected: '#10b981',
      update: '#06b6d4',
      risk: '#f59e0b',
      closed: '#64748b',
    };
    return colorMap[status] || '#10b981';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar - Consistent with Homepage */}
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
              <Link
                href="/"
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/status"
                className="text-white font-semibold text-sm"
              >
                Status
              </Link>
              <Link
                href="/feedback"
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Feedback
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Terms
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/store">
                <Button
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-6"
                >
                  <Store className="h-4 w-4 mr-2" />
                  Browse Store
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-4">
              <Link href="/" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Home</Link>
              <Link href="/status" className="block text-white font-semibold text-lg py-3">Status</Link>
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
        {/* Subtle ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Real-time Status Monitoring</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Product
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
                {' '}Status
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Monitor all products in real-time with automatic updates every 5 minutes
            </p>

            {/* Auto Refresh Indicator */}
            <div className="inline-flex items-center gap-2 bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-2">
              <RefreshCw className="h-4 w-4 text-emerald-400 animate-spin" />
              <span className="text-sm text-slate-400">Auto-refreshes every 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Status Legend Section */}
      <section className="relative py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Status Guide
            </h2>
            <p className="text-base text-slate-400">
              Understanding our product status indicators
            </p>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statusTypes.map((status) => (
              <div
                key={status.id}
                className={`group relative bg-slate-800/30 backdrop-blur-xl border ${status.borderColor} rounded-3xl p-6 hover:border-opacity-50 hover:bg-slate-800/50 transition-all duration-500`}
              >
                {/* Icon Container */}
                <div className={`flex items-center justify-center w-14 h-14 ${status.bgColor} rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-500`}>
                  <status.icon className={`h-7 w-7 ${status.color}`} />
                </div>

                {/* Content */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    {status.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {status.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Status Section */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-slate-400">Live Status</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              All Products Status
            </h2>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <div
                key={game.name}
                className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500"
              >
                {/* Game Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-700/30">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{game.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{game.name}</h3>
                      <p className="text-sm text-slate-400">{game.products.length} products available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-700/30 rounded-full px-3 py-1">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-slate-400">Live</span>
                  </div>
                </div>

                {/* Products List */}
                <div className="space-y-3">
                  {game.products.map((product) => {
                    const statusInfo = getStatusInfo(product.status);
                    return (
                      <div
                        key={product.name}
                        className={`flex items-center justify-between p-4 border border-slate-700/30 rounded-2xl hover:border-slate-700/50 transition-all duration-300 ${statusInfo.bgColor}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-10 h-10 ${statusInfo.bgColor} rounded-xl`}>
                            <statusInfo.icon className={`h-5 w-5 ${statusInfo.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{product.name}</h4>
                            <p className="text-xs text-slate-400">{product.lastUpdate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center gap-1 ${statusInfo.color} text-xs font-bold px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                            {statusInfo.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mx-auto">
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white">Need Assistance?</h3>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                  Our support team is available 24/7 to help with any questions or issues
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-base"
                >
                  View Documentation
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 text-base shadow-lg shadow-emerald-500/25">
                  Contact Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Consistent with Homepage */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">HAJI</span>
                <span className="text-emerald-400">UTONG</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Premium gaming software with advanced security and regular updates.
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-white font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/store" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Store
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest updates and news
              </p>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/30 text-center">
            <p className="text-slate-400 text-sm">
              © 2026 HajiUtong. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
