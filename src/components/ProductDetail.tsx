'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Check,
  Star,
  Shield,
  Zap,
  Crown,
  Sparkles,
  Flame,
} from 'lucide-react';

// Mock Data
const mockProduct = {
  id: 'prod-001',
  name: 'PUBG Premium Aimbot & ESP',
  slug: 'pubg-premium-aimbot',
  description: 'Advanced PUBG cheating software with aimbot, ESP, and more features',
  longDescription: `
    Experience the ultimate advantage in PUBG with our Premium Aimbot & ESP software.
    This powerful tool provides you with real-time game enhancements that give you
    the competitive edge you need to dominate every match.

    **Key Features:**
    • Smooth Aimbot with customizable FOV and smoothness
    • Player ESP with health bars and distance indicators
    • Item ESP with filtering options
    • Vehicle ESP and loot ESP
    • No recoil and no spread
    • HWID Spoofer included
    • Regular updates and 24/7 support

    **Compatibility:**
    • Windows 10/11 (64-bit)
    • Supports all PUBG versions
    • Undetected and safe to use
  `,
  basePrice: 29.99,
  game: 'PUBG',
  gameSlug: 'pubg',
  status: 'AVAILABLE',
  badge: 'BEST_SELLER',
  images: [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=150&fit=crop',
      alt: 'PUBG Gameplay Screenshot 1',
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=150&fit=crop',
      alt: 'PUBG Gameplay Screenshot 2',
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=150&fit=crop',
      alt: 'PUBG Gameplay Screenshot 3',
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=200&h=150&fit=crop',
      alt: 'PUBG Gameplay Screenshot 4',
    },
  ],
  features: [
    {
      icon: 'Zap',
      title: 'Instant Delivery',
      description: 'Get your license key immediately after purchase',
    },
    {
      icon: 'Shield',
      title: 'Undetected & Safe',
      description: 'Advanced anti-cheat bypass technology',
    },
    {
      icon: 'Crown',
      title: '24/7 Support',
      description: 'Our team is always ready to help you',
    },
    {
      icon: 'Sparkles',
      title: 'Regular Updates',
      description: 'Free lifetime updates included',
    },
  ],
  durations: [
    { id: 1, days: 1, label: '1 Day', multiplier: 1 },
    { id: 7, days: 7, label: '7 Days', multiplier: 3.5 },
    { id: 30, days: 30, label: '30 Days', multiplier: 8 },
    { id: 90, days: 90, label: '90 Days', multiplier: 15 },
  ],
};

const paymentMethods = {
  qris: {
    id: 'qris',
    label: 'QRIS',
    icon: '📱',
    description: 'Scan QR code to pay',
  },
  ewallet: {
    id: 'ewallet',
    label: 'E-Wallet',
    icon: '💳',
    description: 'Pay with your e-wallet',
    options: [
      { id: 'dana', label: 'DANA', icon: '🔵' },
      { id: 'gopay', label: 'GoPay', icon: '🟢' },
      { id: 'shopeepay', label: 'ShopeePay', icon: '🟠' },
    ],
  },
  bank: {
    id: 'bank',
    label: 'Bank Transfer',
    icon: '🏦',
    description: 'Transfer to our bank account',
    options: [
      { id: 'bri', label: 'BRI', icon: '🔵' },
      { id: 'bca', label: 'BCA', icon: '🔵' },
      { id: 'jago', label: 'Bank Jago', icon: '🟢' },
    ],
  },
};

interface ProductDetailProps {
  productId?: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  // State Management
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string>('');

  // Calculate price based on duration
  const durationData = mockProduct.durations.find((d) => d.days === selectedDuration);
  const currentPrice = mockProduct.basePrice * (durationData?.multiplier || 1);

  // Toggle accordion section
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection('');
    } else {
      setExpandedSection(section);
    }
  };

  // Handle payment selection
  const handlePaymentSelect = (method: string, subMethod?: string) => {
    if (subMethod) {
      setSelectedPayment(subMethod);
    } else {
      setSelectedPayment(method);
    }
    setExpandedSection('');
  };

  // Get icon component
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ElementType> = {
      Zap,
      Shield,
      Crown,
      Sparkles,
      Flame,
    };
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <span>Home</span>
          <span>/</span>
          <span>Store</span>
          <span>/</span>
          <span>{mockProduct.game}</span>
          <span>/</span>
          <span className="text-white">{mockProduct.name}</span>
        </div>

        {/* Product Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {mockProduct.game}
            </Badge>
            {mockProduct.badge && (
              <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                <Crown className="h-3 w-3 mr-1" />
                {mockProduct.badge.replace('_', ' ')}
              </Badge>
            )}
            <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Check className="h-3 w-3 mr-1" />
              {mockProduct.status}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{mockProduct.name}</h1>
          <p className="text-lg text-slate-400">{mockProduct.description}</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN (60-70%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Media Display */}
            <div className="relative aspect-video bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden group">
              {mockProduct.images[selectedMedia]?.type === 'image' ? (
                <Image
                  src={mockProduct.images[selectedMedia].url}
                  alt={mockProduct.images[selectedMedia].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              ) : (
                <video
                  src={mockProduct.images[selectedMedia].url}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                />
              )}

              {/* Media Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mockProduct.images.map((media, index) => (
                <button
                  key={media.id}
                  onClick={() => setSelectedMedia(index)}
                  className={`relative flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedMedia === index
                      ? 'border-emerald-500 scale-105 shadow-lg shadow-emerald-500/20'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <Image
                    src={media.thumbnail}
                    alt={media.alt}
                    fill
                    className="object-cover"
                  />
                  {selectedMedia === index && (
                    <div className="absolute inset-0 bg-emerald-500/20" />
                  )}
                </button>
              ))}
            </div>

            {/* Feature Description */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Flame className="h-6 w-6 text-emerald-400" />
                Product Features
              </h2>

              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {mockProduct.longDescription}
                </div>
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {mockProduct.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg flex items-center justify-center text-emerald-400">
                      {getIcon(feature.icon)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section (Mock) */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                Customer Reviews
              </h2>

              <div className="space-y-6">
                {/* Review 1 */}
                <div className="border-b border-slate-700/50 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-white">John Doe</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-sm text-slate-500">2 days ago</span>
                  </div>
                  <p className="text-slate-300">
                    Amazing product! Works exactly as described. The aimbot is smooth and the ESP is very helpful. Highly recommended!
                  </p>
                </div>

                {/* Review 2 */}
                <div className="border-b border-slate-700/50 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      AS
                    </div>
                    <div>
                      <p className="font-semibold text-white">Alice Smith</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-sm text-slate-500">1 week ago</span>
                  </div>
                  <p className="text-slate-300">
                    Great customer support and instant delivery. The software is undetected and I've been using it for months without issues.
                  </p>
                </div>

                {/* Review 3 */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      BJ
                    </div>
                    <div>
                      <p className="font-semibold text-white">Bob Johnson</p>
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-sm text-slate-500">2 weeks ago</span>
                  </div>
                  <p className="text-slate-300">
                    Very satisfied with my purchase. The features are top-notch and the price is reasonable. Would buy again!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (30-40%) - Sticky Transaction Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Transaction Panel */}
              <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
                {/* Price Display */}
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-1">Total Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-emerald-400">
                      ${currentPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-3">Select Duration</p>
                  <div className="grid grid-cols-2 gap-2">
                    {mockProduct.durations.map((duration) => (
                      <button
                        key={duration.id}
                        onClick={() => setSelectedDuration(duration.days)}
                        className={`relative px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                          selectedDuration === duration.days
                            ? 'border-emerald-500 bg-emerald-500/20 text-white'
                            : 'border-slate-700 bg-slate-700/30 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold">{duration.label}</div>
                          <div className="text-xs opacity-75 mt-1">
                            ${(mockProduct.basePrice * duration.multiplier).toFixed(2)}
                          </div>
                        </div>
                        {selectedDuration === duration.days && (
                          <div className="absolute top-2 right-2">
                            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Methods - Accordion */}
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-3">Payment Method</p>
                  <div className="space-y-2">
                    {/* QRIS - Single Option */}
                    <button
                      onClick={() => handlePaymentSelect('qris')}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedPayment === 'qris'
                          ? 'border-emerald-500 bg-emerald-500/20'
                          : 'border-slate-700 bg-slate-700/30 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{paymentMethods.qris.icon}</span>
                          <div>
                            <p className="font-semibold text-white">{paymentMethods.qris.label}</p>
                            <p className="text-xs text-slate-400">{paymentMethods.qris.description}</p>
                          </div>
                        </div>
                        {selectedPayment === 'qris' && (
                          <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>

                    {/* E-Wallet - Accordion */}
                    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-700/30">
                      <button
                        onClick={() => toggleSection('ewallet')}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{paymentMethods.ewallet.icon}</span>
                            <div>
                              <p className="font-semibold text-white">{paymentMethods.ewallet.label}</p>
                              <p className="text-xs text-slate-400">{paymentMethods.ewallet.description}</p>
                            </div>
                          </div>
                          {expandedSection === 'ewallet' ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* E-Wallet Sub-options */}
                      {expandedSection === 'ewallet' && (
                        <div className="border-t border-slate-700 divide-y divide-slate-700">
                          {paymentMethods.ewallet.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handlePaymentSelect('ewallet', option.id)}
                              className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors ${
                                selectedPayment === option.id ? 'bg-emerald-500/10' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{option.icon}</span>
                                  <span className="font-medium text-white">{option.label}</span>
                                </div>
                                {selectedPayment === option.id && (
                                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bank Transfer - Accordion */}
                    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-700/30">
                      <button
                        onClick={() => toggleSection('bank')}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{paymentMethods.bank.icon}</span>
                            <div>
                              <p className="font-semibold text-white">{paymentMethods.bank.label}</p>
                              <p className="text-xs text-slate-400">{paymentMethods.bank.description}</p>
                            </div>
                          </div>
                          {expandedSection === 'bank' ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Bank Transfer Sub-options */}
                      {expandedSection === 'bank' && (
                        <div className="border-t border-slate-700 divide-y divide-slate-700">
                          {paymentMethods.bank.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handlePaymentSelect('bank', option.id)}
                              className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors ${
                                selectedPayment === option.id ? 'bg-emerald-500/10' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{option.icon}</span>
                                  <span className="font-medium text-white">{option.label}</span>
                                </div>
                                {selectedPayment === option.id && (
                                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selected Payment Display */}
                {selectedPayment && (
                  <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <p className="text-sm text-emerald-400 font-medium mb-1">Selected Payment:</p>
                    <p className="text-white font-semibold">
                      {selectedPayment === 'qris' && 'QRIS'}
                      {['dana', 'gopay', 'shopeepay'].includes(selectedPayment) &&
                        paymentMethods.ewallet.options.find((o) => o.id === selectedPayment)?.label}
                      {['bri', 'bca', 'jago'].includes(selectedPayment) &&
                        paymentMethods.bank.options.find((o) => o.id === selectedPayment)?.label}
                    </p>
                  </div>
                )}

                {/* Purchase Button */}
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 text-base shadow-lg shadow-emerald-500/25"
                  disabled={!selectedPayment}
                  onClick={() => {
                    alert(`Purchase confirmed!\n\nProduct: ${mockProduct.name}\nDuration: ${selectedDuration} days\nPrice: $${currentPrice.toFixed(2)}\nPayment: ${selectedPayment}`);
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Purchase Now
                </Button>

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span>Secure payment powered by SSL</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
                <h3 className="font-semibold text-white mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-sm">Live Chat Support</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Crown className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm">Installation Guide</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-sm">FAQs</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
