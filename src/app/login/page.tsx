'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, User, Lock, ArrowRight, Check, Shield, Zap, Menu, X, Store, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const [loginForm, setLoginForm] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  const validateUsername = (username: string) => {
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username must be at most 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));

    let error = '';
    switch (field) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(signupForm.password, value);
        break;
    }

    setSignupErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const isSignupValid = () => {
    return (
      signupForm.username &&
      signupForm.email &&
      signupForm.password &&
      signupForm.confirmPassword &&
      !signupErrors.username &&
      !signupErrors.email &&
      !signupErrors.password &&
      !signupErrors.confirmPassword
    );
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: 'Weak', color: 'text-red-500', width: '33%' };
    if (strength <= 3) return { label: 'Medium', color: 'text-amber-500', width: '66%' };
    return { label: 'Strong', color: 'text-emerald-500', width: '100%' };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailOrUsername: loginForm.emailOrUsername,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || 'Login failed');
        return;
      }

      // Redirect based on role
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/store');
      }
    } catch (error) {
      setLoginError('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    setSignupError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: signupForm.username,
          email: signupForm.email,
          password: signupForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignupError(data.error || 'Signup failed');
        return;
      }

      // Redirect to store after successful signup
      router.push('/store');
    } catch (error) {
      setSignupError('Network error. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsSigningUp(false);
    }
  };

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
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
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
                <Link href="/login" className="block text-emerald-400 hover:text-emerald-300 text-lg font-semibold py-3">Sign In</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto px-6 lg:px-8 w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
                HAJI<span className="text-emerald-400">UTONG</span>
              </span>
            </Link>
            <p className="text-slate-400 mt-2">Welcome back! Sign in to continue</p>
          </div>

          {/* Login/Signup Card */}
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/40 transition-all duration-500">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-700/30">
                <TabsTrigger value="login" className="text-base font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-base font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  {loginError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
                      <p className="text-red-400 text-sm">{loginError}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email or Username</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="login-email"
                        type="text"
                        placeholder="Enter your email or username"
                        value={loginForm.emailOrUsername}
                        onChange={(e) => setLoginForm({ ...loginForm, emailOrUsername: e.target.value })}
                        className="pl-12 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                        required
                        disabled={isLoggingIn}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="pl-12 pr-12 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                        required
                        disabled={isLoggingIn}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 text-base shadow-lg shadow-emerald-500/25"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? 'Signing in...' : 'Sign In'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="flex items-center justify-between pt-2">
                    <Link href="/terms" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      Forgot password?
                    </Link>
                    <Link href="#signup" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      Create account
                    </Link>
                  </div>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="space-y-6">
                <form onSubmit={handleSignup} className="space-y-6">
                  {signupError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
                      <p className="text-red-400 text-sm">{signupError}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                  <Label htmlFor="signup-username" className="text-white">Username</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="Choose a username"
                      value={signupForm.username}
                      onChange={(e) => handleSignupChange('username', e.target.value)}
                      className="pl-12 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                      required
                    />
                  </div>
                  {signupErrors.username && (
                    <p className="text-xs text-red-400 mt-1">{signupErrors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => handleSignupChange('email', e.target.value)}
                      className="pl-12 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                      required
                    />
                  </div>
                  {signupErrors.email && (
                    <p className="text-xs text-red-400 mt-1">{signupErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={signupForm.password}
                      onChange={(e) => handleSignupChange('password', e.target.value)}
                      className="pl-12 pr-12 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupForm.password && (
                    <>
                      <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full transition-all ${getPasswordStrength(signupForm.password).color.replace('text-', 'bg-')}`}
                          style={{ width: getPasswordStrength(signupForm.password).width }}
                        />
                      </div>
                      <p className={`text-xs ${getPasswordStrength(signupForm.password).color}`}>
                        Password strength: {getPasswordStrength(signupForm.password).label}
                      </p>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                      className="pl-12 pr-12 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupErrors.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1">{signupErrors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 text-base shadow-lg shadow-emerald-500/25"
                  disabled={!isSignupValid() || isSigningUp}
                >
                  {isSigningUp ? 'Creating account...' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 text-center hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mb-4 mx-auto">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Secure Account</h3>
              <p className="text-sm text-slate-400">Advanced encryption and protection</p>
            </div>
            
            <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 text-center hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all duration-500">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl mb-4 mx-auto">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Access</h3>
              <p className="text-sm text-slate-400">Get started immediately after purchase</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Check className="h-5 w-5 text-emerald-400" />
              <span className="text-base text-slate-400">Lifetime updates & 24/7 support</span>
            </div>
            <p className="text-sm text-slate-400">
              By creating an account, you agree to our <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">Terms of Service</Link>
            </p>
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
