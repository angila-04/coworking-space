'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Search,
    Calendar,
    Clock,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Edit
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockBookings } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatTime, getStatusColor } from '@/lib/utils';

export default function BookingsPage() {
    const [bookings, setBookings] = useState(mockBookings);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBookings = bookings.filter(booking =>
        booking.spaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApprove = (bookingId: string) => {
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'confirmed' as const } : b));
    };

    const handleCancel = (bookingId: string) => {
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">Booking Management</h1>
                    <p className="text-[#64748B]">View and manage all bookings</p>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-4 gap-4">
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <p className="text-sm text-[#64748B]">Total Bookings</p>
                            <p className="text-2xl font-bold text-[#1A1A1A]">{bookings.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <p className="text-sm text-[#64748B]">Confirmed</p>
                            <p className="text-2xl font-bold text-green-600">
                                {bookings.filter(b => b.status === 'confirmed').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <p className="text-sm text-[#64748B]">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {bookings.filter(b => b.status === 'pending').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <p className="text-sm text-[#64748B]">Total Revenue</p>
                            <p className="text-2xl font-bold text-[#6366F1]">
                                {formatCurrency(bookings.reduce((sum, b) => sum + b.totalAmount, 0))}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                    <Input
                        placeholder="Search bookings..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Bookings Table */}
                <Card className="border-glow">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-border">
                                    <tr>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Booking ID</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Space</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Date & Time</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Status</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Amount</th>
                                        <th className="text-right text-sm font-medium text-[#64748B] px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm text-[#6366F1]">{booking.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-[#1A1A1A]">{booking.spaceName}</p>
                                                    <Badge variant="secondary" className="mt-1 capitalize text-xs">
                                                        {booking.spaceType.replace('-', ' ')}
                                                    </Badge>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[#64748B]">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(booking.date)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge className={getStatusColor(booking.status)}>
                                                    {booking.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                                                {formatCurrency(booking.totalAmount)}
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
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit Booking
                                                        </DropdownMenuItem>
                                                        {booking.status === 'pending' && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleApprove(booking.id)}
                                                                className="text-green-600"
                                                            >
                                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(booking.status === 'confirmed' || booking.status === 'pending') && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleCancel(booking.id)}
                                                                className="text-red-600"
                                                            >
                                                                <XCircle className="h-4 w-4 mr-2" />
                                                                Cancel
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
