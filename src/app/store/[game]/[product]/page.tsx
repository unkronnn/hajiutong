'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Check, X, Clock, Shield, Cpu, Download, HelpCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { LightRays } from '@/components/LightRays';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { gamesData, productsByGame } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface ProductPageProps {
  params: Promise<{
    game: string;
    product: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { game: gameSlug, product: productId } = use(params);
  const game = gamesData.find((g) => g.slug === gameSlug);
  const products = productsByGame[gameSlug] || [];
  const product = products.find((p) => p.id === productId);

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  if (!game || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <LightRays color="green" />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
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

  const handlePurchase = () => {
    // In a real app, this would create an order and redirect to invoice
    setShowPurchaseModal(true);
    // Simulate redirect after 2 seconds
    setTimeout(() => {
      alert('Purchase successful! You will receive an email with your product key.');
      setShowPurchaseModal(false);
    }, 2000);
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
                <BreadcrumbLink href={`/store/${game.slug}`}>{game.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Product Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Button variant="ghost" asChild className="mb-4 text-muted-foreground hover:text-white">
                <Link href={`/store/${game.slug}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to {game.name}
                </Link>
              </Button>
              <div className="flex items-start gap-6 mb-4">
                <div className="text-8xl">{game.icon}</div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                  <p className="text-muted-foreground text-lg">
                    Premium enhancement software for {game.name}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    {getStatusBadge(product.status)}
                    <Badge variant="outline" className="border-white/10">
                      {game.platform}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <GlassCard className="p-6 h-fit">
              <div className="mb-4">
                <div className="text-4xl font-bold text-primary mb-2">${product.price}</div>
                <p className="text-sm text-muted-foreground">One-time purchase, lifetime access</p>
              </div>

              {product.status === 'available' ? (
                <Button onClick={handlePurchase} className="w-full bg-primary text-white hover:bg-primary/90 text-lg py-6">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Purchase Now
                </Button>
              ) : (
                <Button disabled className="w-full text-lg py-6">
                  {product.status === 'coming-soon' ? 'Coming Soon' : 'Out of Stock'}
                </Button>
              )}

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Instant delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>24/7 support</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Product Information Tabs */}
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-fit">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Shield, title: 'Anti-Detection', desc: 'Advanced protection against anti-cheat systems' },
                    { icon: Cpu, title: 'Optimized Performance', desc: 'Minimal system resource usage' },
                    { icon: Download, title: 'Auto-Update', desc: 'Automatic updates when available' },
                    { icon: HelpCircle, title: 'Easy Setup', desc: 'Simple installation process' },
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-4 p-4 border border-white/5 rounded-lg hover:border-primary/30 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="requirements" className="mt-6">
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">System Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Minimum Requirements</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li>• Operating System: Windows 10 or later</li>
                      <li>• Processor: Intel Core i5 or equivalent</li>
                      <li>• Memory: 8 GB RAM</li>
                      <li>• Storage: 500 MB available space</li>
                    </ul>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <h4 className="font-semibold text-white mb-2">Recommended Requirements</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li>• Operating System: Windows 11</li>
                      <li>• Processor: Intel Core i7 or equivalent</li>
                      <li>• Memory: 16 GB RAM</li>
                      <li>• Storage: 1 GB available space</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="instructions" className="mt-6">
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Setup Instructions</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Download the Software</h4>
                      <p className="text-sm text-muted-foreground">
                        After purchase, download the software from your dashboard or email confirmation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Enter Your License Key</h4>
                      <p className="text-sm text-muted-foreground">
                        Launch the software and enter the product key you received in your email.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Configure Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Adjust the settings according to your preferences and game requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Enjoy Your Enhanced Experience</h4>
                      <p className="text-sm text-muted-foreground">
                        Start your game and enjoy the enhanced features. Updates are automatic.
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="support" className="mt-6">
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Support & Help</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Discord Community</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Join our Discord server for instant support and community discussions.
                    </p>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Join Discord
                    </Button>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <h4 className="font-semibold text-white mb-2">Email Support</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Send us an email for detailed inquiries and account issues.
                    </p>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      support@hajiutong.com
                    </Button>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <h4 className="font-semibold text-white mb-2">FAQ & Documentation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Check our comprehensive documentation for common questions and guides.
                    </p>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Link href="/terms">View FAQ</Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
