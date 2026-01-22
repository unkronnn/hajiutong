'use client';

import { use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Check, X, Clock, Star, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { GlowEffect } from '@/components/GlowEffect';
import { LightRays } from '@/components/LightRays';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { gamesData, productsByGame } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface GamePageProps {
  params: Promise<{
    game: string;
  }>;
}

export default function GamePage({ params }: GamePageProps) {
  const { game: gameSlug } = use(params);
  const game = gamesData.find((g) => g.slug === gameSlug);
  const products = productsByGame[gameSlug] || [];

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <LightRays color="green" />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
            <p className="text-muted-foreground mb-8">The game you're looking for doesn't exist.</p>
            <Button asChild className="bg-primary text-white hover:bg-primary/90">
              <Link href="/store">Back to Store</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
            <Check className="h-3 w-3 mr-1" />
            Available
          </Badge>
        );
      case 'out-of-stock':
        return (
          <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/20">
            <X className="h-3 w-3 mr-1" />
            Out of Stock
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">
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
      case 'best-seller':
        return <Star className="h-3 w-3" />;
      case 'new':
        return <Sparkles className="h-3 w-3" />;
      case 'popular':
        return <Flame className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'best-seller':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20';
      case 'new':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/20';
      case 'popular':
        return 'bg-red-500/20 text-red-500 border-red-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <LightRays color="green" />
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/store">Store</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{game.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Game Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4 text-muted-foreground hover:text-white">
              <Link href="/store">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Store
              </Link>
            </Button>
            <div className="flex items-center gap-6 mb-4">
              <div className="text-8xl">{game.icon}</div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{game.name}</h1>
                <p className="text-muted-foreground text-lg">
                  {products.length} products available for {game.platform}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <GlowEffect key={product.id}>
                <GlassCard className="group h-full p-6 hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Premium enhancement for {game.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {getStatusBadge(product.status)}
                      {product.badge && (
                        <Badge variant="outline" className={`text-xs ${getBadgeColor(product.badge)}`}>
                          {getBadgeIcon(product.badge)}
                          <span className="ml-1 capitalize">{product.badge.replace('-', ' ')}</span>
                        </Badge>
                      )}
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-primary">${product.price}</div>
                      </div>

                      {product.status === 'available' ? (
                        <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
                          <Link href={`/store/${game.slug}/${product.id}`}>
                            View Details
                          </Link>
                        </Button>
                      ) : (
                        <Button disabled className="w-full">
                          {product.status === 'coming-soon' ? 'Coming Soon' : 'Out of Stock'}
                        </Button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </GlowEffect>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available for {game.name} yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
