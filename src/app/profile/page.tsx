'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  User,
  Mail,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Camera,
  Edit2,
  Check,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: '',
    location: '',
  });

  const handleSave = () => {
    // TODO: Implement API call to update user profile
    console.log('Saving profile:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: '',
      location: '',
    });
    setIsEditing(false);
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

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <div className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <span className="text-2xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
                    HAJI<span className="text-emerald-400">UTONG</span>
                  </span>
                </Link>
                <div className="h-6 w-px bg-slate-700" />
                <h1 className="text-xl font-semibold">Profile</h1>
              </div>

              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500"
              >
                {isEditing ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative group">
                      <Avatar className="h-32 w-32 border-4 border-emerald-500/30">
                        <AvatarImage src={user.image || undefined} alt={user.name || user.username || user.email} />
                        <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-4xl font-bold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-emerald-500 hover:bg-emerald-600"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <CardTitle className="text-2xl text-white">
                        {user.name || user.username || 'User'}
                      </CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        {user.email}
                      </CardDescription>
                    </div>

                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {user.role === 'ADMIN' ? 'Administrator' : 'Member'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>

                  {user.emailVerified && (
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <Check className="h-4 w-4" />
                      <span>Email Verified</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Details Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-400" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Update your personal details and profile information
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="name"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white">Username</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="username"
                          value={editedUser.username}
                          onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                          placeholder="Enter your username"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={editedUser.phone}
                          onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="location"
                          value={editedUser.location}
                          onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                          placeholder="Enter your location"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                      <Button
                        onClick={handleSave}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-slate-600 text-white hover:bg-slate-700/50"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Account Statistics</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-400">0</p>
                      <p className="text-sm text-slate-400 mt-1">Total Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-400">$0</p>
                      <p className="text-sm text-slate-400 mt-1">Total Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-400">0</p>
                      <p className="text-sm text-slate-400 mt-1">Products Owned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
