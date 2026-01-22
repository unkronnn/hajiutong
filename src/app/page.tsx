'use client';

import { useState } from 'react';
import { Menu, X, Shield, Zap, Clock, Facebook, Twitter, Instagram, Mail, ArrowRight, Store, Sparkles, Crown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Anti-Detection',
      description: 'Advanced protection with regular security updates',
    },
    {
      icon: Zap,
      title: 'Regular Updates',
      description: 'Stay ahead with frequent feature improvements',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all inquiries',
    },
  ];

  const products = [
    { name: 'Phoenix Pro', game: 'Apex Legends', price: '$49.99', badge: 'best-seller' },
    { name: 'Viper Elite', game: 'Valorant', price: '$44.99' },
    { name: 'Alpha CS2', game: 'CS2', price: '$39.99' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Navbar - Clean & Minimalist */}
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
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
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

      {/* Hero Section - Clean & Modern */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Premium Gaming Software</span>
            </div>

            {/* Main Headline - Bigger & Bolder */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Elevate Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500 bg-gradient-to-bl">
                Gaming Experience
              </span>
            </h1>

            {/* Subheadline - Better Typography Hierarchy */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Premium DLCs and game enhancements crafted with precision and security
            </p>

            {/* CTA Buttons - More Spaced */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/store">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 text-base shadow-lg shadow-emerald-500/25"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/status">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 px-8 py-4 text-base"
                >
                  Check Status
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid Style */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Why Choose Us
            </h2>
            <p className="text-base text-slate-400">
              Experience the difference with our premium features
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/30 hover:bg-slate-800/50 transition-all duration-500"
              >
                {/* Icon Container */}
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mb-6 group-hover:from-emerald-500/30 group-hover:to-emerald-500/10 transition-all duration-500">
                  <feature.icon className="h-7 w-7 text-emerald-400" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-base text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section - Card Style */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-slate-400">Trending Products</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Most Popular This Week
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500"
              >
                {/* Best Seller Badge */}
                {product.badge === 'best-seller' && (
                  <div className="absolute -top-2 -left-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Best Seller
                  </div>
                )}

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    {product.name}
                  </h3>
                  <p className="text-slate-400">
                    {product.game}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                    <span className="text-3xl font-bold text-emerald-400">
                      {product.price}
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

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/store">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-base"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Clean & Modern */}
      <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-slate-400 hover:text-emerald-400 transition-colors text-base">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-400" />
                  <span className="text-slate-400 text-base">support@hajiutong.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-400" />
                  <span className="text-slate-400 text-base">info@hajiutong.com</span>
                </li>
              </ul>
            </div>

            {/* Social Media Column */}
            <div>
              <h4 className="text-white font-semibold mb-6">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center bg-slate-800 hover:bg-emerald-500 rounded-xl transition-all duration-300"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center bg-slate-800 hover:bg-emerald-500 rounded-xl transition-all duration-300"
                >
                  <Twitter className="h-5 w-5 text-white" />
                </a>
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center bg-slate-800 hover:bg-emerald-500 rounded-xl transition-all duration-300"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-slate-800/30 text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} HAJI UTONG. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
