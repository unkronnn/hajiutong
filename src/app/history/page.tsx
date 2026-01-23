'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShoppingBag,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Eye,
  Filter,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Mock order data - replace with actual API call
const mockOrders = [
  {
    id: 'ORD-2024-001',
    orderNumber: 'ORD-2024-001',
    productName: 'PUBG Premium Aimbot',
    game: 'PUBG',
    amount: 29.99,
    status: 'COMPLETED',
    date: '2024-01-15',
    productKey: 'XXXX-XXXX-XXXX-XXXX',
  },
  {
    id: 'ORD-2024-002',
    orderNumber: 'ORD-2024-002',
    productName: 'Valorant Wallhack',
    game: 'Valorant',
    amount: 49.99,
    status: 'COMPLETED',
    date: '2024-01-10',
    productKey: 'YYYY-YYYY-YYYY-YYYY',
  },
  {
    id: 'ORD-2024-003',
    orderNumber: 'ORD-2024-003',
    productName: 'Mobile Legends Script',
    game: 'Mobile Legends',
    amount: 19.99,
    status: 'PENDING',
    date: '2024-01-20',
    productKey: null,
  },
];

export default function HistoryPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING' | 'CANCELLED'>('ALL');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.game.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalSpent = mockOrders
    .filter((order) => order.status === 'COMPLETED')
    .reduce((sum, order) => sum + order.amount, 0);

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
                <h1 className="text-xl font-semibold">Purchase History</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{mockOrders.length}</div>
                  <p className="text-xs text-slate-400 mt-1">All time</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Spent</CardTitle>
                  <Package className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${totalSpent.toFixed(2)}</div>
                  <p className="text-xs text-slate-400 mt-1">Completed orders</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {mockOrders.filter((o) => o.status === 'COMPLETED').length}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Successful orders</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700/30 border-slate-600 focus:border-emerald-500"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                    <SelectTrigger className="w-[180px] bg-slate-700/30 border-slate-600">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Order History</CardTitle>
                <CardDescription className="text-slate-400">
                  View all your past purchases and their current status
                </CardDescription>
              </CardHeader>

              <CardContent>
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No orders found</h3>
                    <p className="text-sm text-slate-400 mb-6">
                      {searchTerm || statusFilter !== 'ALL'
                        ? 'Try adjusting your filters'
                        : 'You haven\'t made any purchases yet'}
                    </p>
                    <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      <Link href="/store">Browse Store</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700/50 hover:bg-slate-700/30">
                          <TableHead className="text-slate-400">Order ID</TableHead>
                          <TableHead className="text-slate-400">Product</TableHead>
                          <TableHead className="text-slate-400">Game</TableHead>
                          <TableHead className="text-slate-400">Date</TableHead>
                          <TableHead className="text-slate-400">Amount</TableHead>
                          <TableHead className="text-slate-400">Status</TableHead>
                          <TableHead className="text-slate-400">Product Key</TableHead>
                          <TableHead className="text-slate-400 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id} className="border-slate-700/50 hover:bg-slate-700/30">
                            <TableCell className="font-mono text-sm text-slate-300">
                              {order.orderNumber}
                            </TableCell>
                            <TableCell className="text-white font-medium">
                              {order.productName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                {order.game}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-300">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-500" />
                                {new Date(order.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </div>
                            </TableCell>
                            <TableCell className="text-white font-semibold">
                              ${order.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              {order.productKey ? (
                                <code className="px-2 py-1 bg-slate-700/50 rounded text-xs text-emerald-400 font-mono">
                                  {order.productKey}
                                </code>
                              ) : (
                                <span className="text-xs text-slate-500">N/A</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {order.productKey && (
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
