'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, ShoppingCart, User, Search, LogOut, History, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Store', href: '/store' },
    { name: 'Status', href: '/status' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Terms', href: '/terms' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.username) {
      return user.username.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-white">
              HAJI<span className="text-primary">UTONG</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-muted-foreground transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>

          {/* Conditional Rendering: Show different UI based on auth state */}
          {!user ? (
            // NOT LOGGED IN: Show Login and Sign Up buttons
            <>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-white"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>

              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-white"
                asChild
              >
                <Link href="/login">Sign Up</Link>
              </Button>

              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/store">Get Started</Link>
              </Button>
            </>
          ) : (
            // LOGGED IN: Show Profile Avatar with Dropdown Menu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary/20">
                    <AvatarImage src={user.image || undefined} alt={user.name || user.username || user.email} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* User Info Header */}
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-white">
                    {user.name || user.username || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>

                <DropdownMenuSeparator />

                {/* Dropdown Menu Items */}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/history" className="cursor-pointer">
                    <History className="mr-2 h-4 w-4" />
                    <span>History Pembelian</span>
                  </Link>
                </DropdownMenuItem>

                {user.role === 'ADMIN' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                {/* Logout Button */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium leading-7 text-muted-foreground hover:bg-white/5 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile menu conditional rendering */}
            <div className="border-t border-white/5 pt-4 mt-4 space-y-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium leading-7 text-muted-foreground hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
                    <Link href="/store">Get Started</Link>
                  </Button>
                </>
              ) : (
                <>
                  {/* Mobile: Show user info and menu items */}
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white">
                      {user.name || user.username || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium leading-7 text-muted-foreground hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      Profile
                    </div>
                  </Link>

                  <Link
                    href="/history"
                    className="block rounded-md px-3 py-2 text-base font-medium leading-7 text-muted-foreground hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      History Pembelian
                    </div>
                  </Link>

                  {user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="block rounded-md px-3 py-2 text-base font-medium leading-7 text-muted-foreground hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left rounded-md px-3 py-2 text-base font-medium leading-7 text-red-400 hover:bg-red-400/10"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
