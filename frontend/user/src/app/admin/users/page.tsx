'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Search,
    UserCheck,
    UserX,
    Mail,
    Calendar,
    MoreHorizontal
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockUsers } from '@/lib/mock-data';
import { formatCurrency, getStatusColor } from '@/lib/utils';

export default function UsersPage() {
    const [users, setUsers] = useState(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApprove = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' as const } : u));
    };

    const handleBlock = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'blocked' as const } : u));
    };

    const handleUnblock = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' as const } : u));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">User Management</h1>
                    <p className="text-[#64748B]">Manage member accounts and permissions</p>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Total Users</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">{users.length}</p>
                                </div>
                                <Badge className="bg-blue-100 text-blue-700">All</Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Active</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">
                                        {users.filter(u => u.status === 'active').length}
                                    </p>
                                </div>
                                <Badge className="bg-green-100 text-green-700">Active</Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Pending Approval</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">
                                        {users.filter(u => u.status === 'pending').length}
                                    </p>
                                </div>
                                <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                    <Input
                        placeholder="Search users..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Users Table */}
                <Card className="border-glow">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-border">
                                    <tr>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">User</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Role</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Status</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Member Since</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Bookings</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Total Spent</th>
                                        <th className="text-right text-sm font-medium text-[#64748B] px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback className="bg-[#6366F1]/10 text-[#6366F1] font-medium">
                                                            {user.avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-[#1A1A1A]">{user.name}</p>
                                                        <p className="text-sm text-[#64748B]">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="secondary" className="capitalize">
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge className={getStatusColor(user.status)}>
                                                    {user.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-[#64748B]">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(user.memberSince).toLocaleDateString('en-IN', {
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                                                {user.bookings}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                                                {formatCurrency(user.totalSpent)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Mail className="h-4 w-4 mr-2" />
                                                            Send Email
                                                        </DropdownMenuItem>
                                                        {user.status === 'pending' && (
                                                            <DropdownMenuItem onClick={() => handleApprove(user.id)}>
                                                                <UserCheck className="h-4 w-4 mr-2" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                        )}
                                                        {user.status === 'active' && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleBlock(user.id)}
                                                                className="text-red-600"
                                                            >
                                                                <UserX className="h-4 w-4 mr-2" />
                                                                Block User
                                                            </DropdownMenuItem>
                                                        )}
                                                        {user.status === 'blocked' && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleUnblock(user.id)}
                                                                className="text-green-600"
                                                            >
                                                                <UserCheck className="h-4 w-4 mr-2" />
                                                                Unblock User
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
