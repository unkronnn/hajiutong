'use client';

import { useState } from 'react';
import { Shield, Lock, RefreshCw, AlertTriangle, Mail, MessageCircle, ArrowRight, Menu, X, Store } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const terms = [
  {
    number: '01',
    title: 'Access Restrictions',
    description: 'Employees of anti-cheat companies and their affiliates are strictly prohibited from purchasing or using our products. Any violation will result in immediate termination of service and potential legal action.',
    icon: Shield,
  },
  {
    number: '02',
    title: 'All Sales Are Final',
    description: 'Due to the digital nature of our products, all sales are final. No refunds will be issued except in cases where the product is non-functional upon delivery. Each purchase is verified for authenticity.',
    icon: Lock,
  },
  {
    number: '03',
    title: 'Usage Risk & Liability',
    description: 'Using game enhancement software carries risk of account bans. We are not responsible for any account suspensions, bans, or penalties. Users accept full responsibility and should use alternate accounts when possible.',
    icon: AlertTriangle,
  },
  {
    number: '04',
    title: 'HWID & License Restrictions',
    description: 'Each license is bound to a single hardware ID (HWID). Transfers are not permitted except in cases of hardware upgrades with proper verification. This measure ensures security and prevents unauthorized usage.',
    icon: RefreshCw,
  },
  {
    number: '05',
    title: 'Support & Updates',
    description: 'Our products include lifetime updates and support. Updates are released automatically to maintain compatibility and security. Support is available through Discord and email with typical response times under 24 hours.',
    icon: Mail,
  },
  {
    number: '06',
    title: 'Anti-Virus False Positives',
    description: 'Some security software may flag our software as a potential threat due to its nature. These are false positives caused by obfuscation techniques used to protect our code. Please whitelist our software in your antivirus.',
    icon: AlertTriangle,
  },
];

const faqs = [
  {
    question: 'Where do I get my product key?',
    answer: 'Your product key is delivered immediately via email after purchase. You can also find it in your account dashboard. If you don\'t see the email within 5 minutes, check your spam folder or contact support.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'All sales are final. Refunds are only issued if the product is non-functional upon delivery. In such cases, please contact support within 24 hours of purchase with proof of the issue.',
  },
  {
    question: 'Is there a risk of getting banned?',
    answer: 'Yes, there is always a risk when using game enhancement software. While we employ advanced anti-detection measures, we cannot guarantee 100% safety. We recommend using alternate accounts and staying updated on product status.',
  },
  {
    question: 'Can I use my key on a different computer?',
    answer: 'Each key is locked to a single hardware ID (HWID). If you upgrade your hardware, you can request a reset by contacting support with proof of purchase. Transfers to other users are not permitted.',
  },
  {
    question: 'Why is the loader detected as a virus?',
    answer: 'This is a false positive. Our software uses code obfuscation and protection techniques that may trigger antivirus heuristics. We can assure you that our software is safe. Please whitelist it in your antivirus software.',
  },
  {
    question: 'Is a Windows Reset/Reinstall required?',
    answer: 'While not strictly required, a fresh Windows installation is recommended for optimal performance and to minimize detection risks. Ensure all unnecessary software is closed before running our products.',
  },
];

export default function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link href="/feedback" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Feedback</Link>
              <Link href="/terms" className="text-white font-semibold text-sm">Terms</Link>
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
              <Link href="/feedback" className="block text-slate-400 hover:text-white text-lg font-medium py-3">Feedback</Link>
              <Link href="/terms" className="block text-white font-semibold text-lg py-3">Terms</Link>
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
              <Lock className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Secure & Protected</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Terms &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
                {' '}FAQ
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know before purchasing
            </p>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="relative py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Terms of Purchase
            </h2>
            <p className="text-base text-slate-400">
              Important information about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terms.map((term) => (
              <div
                key={term.number}
                className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 text-xl font-bold">
                    {term.number}
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl">
                    <term.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{term.title}</h3>
                  <p className="text-base text-slate-400 leading-relaxed">
                    {term.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-400">
              Common questions about our products and services
            </p>
          </div>

          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-slate-700/30">
                  <AccordionTrigger className="text-left hover:text-emerald-400 transition-colors px-8 py-6 text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 pt-2 text-base text-slate-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mx-auto">
                <MessageCircle className="h-8 w-8 text-emerald-400" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white">Still Have Questions?</h3>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                  Our support team is available to assist you with any inquiries
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-base">
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
