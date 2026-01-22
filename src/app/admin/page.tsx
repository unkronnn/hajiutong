'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserCheck, Shield, TrendingUp, Edit, Trash2, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { LightRays } from '@/components/LightRays';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalAdmins: number;
  verifiedEmails: number;
  recentSignups: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalAdmins: 0,
    verifiedEmails: 0,
    recentSignups: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you would fetch this from the API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 1523,
        totalAdmins: 5,
        verifiedEmails: 1245,
        recentSignups: 89,
      });

      setUsers([
        {
          id: '1',
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          role: 'USER',
          emailVerified: true,
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          name: 'Jane Smith',
          username: 'janesmith',
          email: 'jane@example.com',
          role: 'ADMIN',
          emailVerified: true,
          createdAt: '2024-01-10',
        },
        {
          id: '3',
          name: 'Bob Wilson',
          username: 'bobwilson',
          email: 'bob@example.com',
          role: 'USER',
          emailVerified: false,
          createdAt: '2024-01-20',
        },
        {
          id: '4',
          name: 'Alice Brown',
          username: 'alicebrown',
          email: 'alice@example.com',
          role: 'USER',
          emailVerified: true,
          createdAt: '2024-01-18',
        },
        {
          id: '5',
          name: 'Charlie Davis',
          username: 'charliedavis',
          email: 'charlie@example.com',
          role: 'USER',
          emailVerified: true,
          createdAt: '2024-01-22',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // TODO: Call API to delete user
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleEditUser = (userId: string) => {
    // TODO: Open edit modal
    alert('Edit user functionality will be implemented');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <LightRays color="green" />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <LightRays color="green" />
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="ghost" asChild className="mb-2 text-muted-foreground hover:text-white">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-4xl font-bold text-white">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Create New User
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Admins</p>
                  <p className="text-3xl font-bold text-white">{stats.totalAdmins}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Verified Emails</p>
                  <p className="text-3xl font-bold text-white">{stats.verifiedEmails}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                  <UserCheck className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recent Signups (7d)</p>
                  <p className="text-3xl font-bold text-white">{stats.recentSignups}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* User Management */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5">
                    <TableHead className="text-white">User</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Role</TableHead>
                    <TableHead className="text-white">Email Verified</TableHead>
                    <TableHead className="text-white">Created</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-white/5 hover:bg-white/5">
                        <TableCell className="text-white">
                          <div className="font-medium">{user.name || 'N/A'}</div>
                          <div className="text-sm text-muted-foreground">@{user.username || 'N/A'}</div>
                        </TableCell>
                        <TableCell className="text-white">{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.role === 'ADMIN'
                                ? 'bg-purple-500/20 text-purple-500 border-purple-500/20'
                                : 'bg-blue-500/20 text-blue-500 border-blue-500/20'
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.emailVerified ? (
                            <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">
                              Unverified
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-white">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-muted-foreground hover:text-red-500"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
