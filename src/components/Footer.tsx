'use client';

import Link from 'next/link';
import { Mail, MessageCircle, Twitter, Github } from 'lucide-react';

export function Footer() {
  const navigation = {
    main: [
      { name: 'Store', href: '/store' },
      { name: 'Status', href: '/status' },
      { name: 'Feedback', href: '/feedback' },
      { name: 'Terms & FAQ', href: '/terms' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Refund Policy', href: '#' },
    ],
    social: [
      {
        name: 'Discord',
        href: '#',
        icon: MessageCircle,
      },
      {
        name: 'Twitter',
        href: '#',
        icon: Twitter,
      },
      {
        name: 'GitHub',
        href: '#',
        icon: Github,
      },
      {
        name: 'Email',
        href: 'mailto:support@hajiutong.com',
        icon: Mail,
      },
    ],
  };

  return (
    <footer className="mt-auto border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white">
              HAJI<span className="text-primary">UTONG</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground max-w-md">
              Premium game enhancement software for Desktop, Android, and iOS platforms.
              Real-time status monitoring, automated feedback, and comprehensive support.
            </p>
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Main navigation */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
            <ul role="list" className="mt-6 space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
            <ul role="list" className="mt-6 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-center text-sm leading-6 text-muted-foreground">
            &copy; {new Date().getFullYear()} HAJI UTONG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
