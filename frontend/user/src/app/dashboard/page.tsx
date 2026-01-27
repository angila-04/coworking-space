'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Calendar,
    Clock,
    MapPin,
    ArrowRight,
    TrendingUp,
    CreditCard,
    Star,
    Bell
} from 'lucide-react';
import Link from 'next/link';
import { mockBookings, mockAnnouncements, activityLog } from '@/lib/mock-data';
import { formatDate, formatTime, formatCurrency, getStatusColor } from '@/lib/utils';

export default function MemberDashboard() {
    const upcomingBooking = mockBookings.find(b => b.status === 'confirmed');
    const recentBookings = mockBookings.slice(0, 3);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">Welcome back, Arjun! 👋</h1>
                        <p className="text-[#64748B]">Here&apos;s what&apos;s happening with your workspace today.</p>
                    </div>
                    <Link href="/dashboard/spaces">
                        <Button className="gradient-indigo text-white hover:opacity-90 gap-2">
                            Book a Space
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Total Bookings</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">24</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-[#6366F1]" />
                                </div>
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                                <TrendingUp className="h-4 w-4" />
                                <span>+12% from last month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Hours Worked</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">186</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-[#64748B]">This month</p>
                        </CardContent>
                    </Card>

                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Total Spent</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">₹45,600</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                                    <CreditCard className="h-6 w-6 text-yellow-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-[#64748B]">Lifetime value</p>
                        </CardContent>
                    </Card>

                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Member Rating</p>
                                    <div className="flex items-center gap-1">
                                        <p className="text-2xl font-bold text-[#1A1A1A]">4.9</p>
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Star className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-[#64748B]">Gold Member</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Next Booking */}
                    <Card className="lg:col-span-2 border-glow">
                        <CardHeader>
                            <CardTitle className="text-lg">Next Booking</CardTitle>
                            <CardDescription>Your upcoming workspace reservation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcomingBooking ? (
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
                                            alt={upcomingBooking.spaceName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-[#1A1A1A]">{upcomingBooking.spaceName}</h3>
                                                <Badge variant="secondary" className="mt-1 capitalize">
                                                    {upcomingBooking.spaceType.replace('-', ' ')}
                                                </Badge>
                                            </div>
                                            <Badge className={getStatusColor(upcomingBooking.status)}>
                                                {upcomingBooking.status}
                                            </Badge>
                                        </div>
                                        <div className="space-y-2 text-sm text-[#64748B]">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(upcomingBooking.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{formatTime(upcomingBooking.startTime)} - {formatTime(upcomingBooking.endTime)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>SPACETRIX, Swaraj Round, Thrissur</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <Link href="/dashboard/bookings">
                                                <Button size="sm" className="gradient-indigo text-white hover:opacity-90">
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Button size="sm" variant="outline">
                                                Modify
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-[#64748B] mb-4">No upcoming bookings</p>
                                    <Link href="/dashboard/spaces">
                                        <Button className="gradient-indigo text-white hover:opacity-90">
                                            Book a Space
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Announcements */}
                    <Card className="border-glow">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Bell className="h-5 w-5 text-[#6366F1]" />
                                Announcements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockAnnouncements.map((announcement) => (
                                <div key={announcement.id} className="p-3 rounded-lg bg-slate-50 border border-border">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="font-medium text-sm text-[#1A1A1A]">{announcement.title}</h4>
                                        {announcement.priority === 'important' && (
                                            <Badge variant="destructive" className="text-xs">Important</Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{announcement.message}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="border-glow">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                        <CardDescription>Your latest bookings and transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-border">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-[#6366F1]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#1A1A1A]">{booking.spaceName}</p>
                                            <p className="text-sm text-[#64748B]">{formatDate(booking.date)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-[#1A1A1A]">{formatCurrency(booking.totalAmount)}</p>
                                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/dashboard/bookings" className="block mt-4">
                            <Button variant="outline" className="w-full gap-2">
                                View All Bookings
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
