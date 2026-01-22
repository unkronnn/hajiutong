'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, User, Lock, ArrowRight, Check, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/GlassCard';
import { GlowEffect } from '@/components/GlowEffect';
import { LightRays } from '@/components/LightRays';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      <LightRays color="green" />
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-6 lg:px-8">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
                HAJI<span className="text-emerald-400">UTONG</span>
              </span>
            </Link>
          </div>

          <GlowEffect>
            <GlassCard className="p-10">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="text-base font-medium">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-base font-medium">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email or Username</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="login-email"
                        type="text"
                        placeholder="Enter your email or username"
                        value={loginForm.emailOrUsername}
                        onChange={(e) => setLoginForm({ ...loginForm, emailOrUsername: e.target.value })}
                        className="pl-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="pl-12 pr-12"
                        required
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

                  <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 text-base">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="flex items-center justify-between pt-2">
                    <Link href="/terms" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      Forgot password?
                    </Link>
                    <Link href="/terms" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      Create account
                    </Link>
                  </div>
                </TabsContent>

                {/* Sign Up Form */}
                <TabsContent value="signup" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="Choose a username"
                        value={signupForm.username}
                        onChange={(e) => handleSignupChange('username', e.target.value)}
                        className="pl-12"
                        required
                      />
                    </div>
                    {signupErrors.username && (
                      <p className="text-xs text-red-500 mt-1">{signupErrors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) => handleSignupChange('email', e.target.value)}
                        className="pl-12"
                        required
                      />
                    </div>
                    {signupErrors.email && (
                      <p className="text-xs text-red-500 mt-1">{signupErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => handleSignupChange('password', e.target.value)}
                        className="pl-12 pr-12"
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
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-2">
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
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                        className="pl-12 pr-12"
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
                      <p className="text-xs text-red-500 mt-1">{signupErrors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 text-base"
                    disabled={!isSignupValid()}
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </TabsContent>
              </Tabs>
            </GlassCard>
          </GlowEffect>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <GlassCard className="p-6 hover:scale-105 transition-all duration-300">
              <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Secure Account</h3>
              <p className="text-sm text-slate-400">Advanced encryption and protection</p>
            </GlassCard>
            <GlassCard className="p-6 hover:scale-105 transition-all duration-300">
              <Zap className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Instant Access</h3>
              <p className="text-sm text-slate-400">Get started immediately after purchase</p>
            </GlassCard>
          </div>

          {/* Benefits */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Check className="h-5 w-5 text-emerald-400" />
              <span className="text-base text-slate-400">Lifetime updates & 24/7 support</span>
            </div>
            <p className="text-sm text-slate-400">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
