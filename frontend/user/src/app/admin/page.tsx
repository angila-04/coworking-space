'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Building,
    Calendar,
    DollarSign,
    ArrowRight,
    MoreHorizontal
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { revenueData, occupancyData, bookingsByType, activityLog } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboard() {
    const stats = [
        {
            title: 'Total Revenue',
            value: '₹4,45,000',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Active Members',
            value: '524',
            change: '+8.2%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Total Bookings',
            value: '1,247',
            change: '+15.3%',
            trend: 'up',
            icon: Calendar,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Occupancy Rate',
            value: '78%',
            change: '-2.1%',
            trend: 'down',
            icon: Building,
            color: 'bg-yellow-100 text-yellow-600'
        }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">Admin Dashboard</h1>
                        <p className="text-[#64748B]">Welcome back! Here&apos;s what&apos;s happening at SPACETRIX.</p>
                    </div>
                    <Button className="gradient-indigo text-white hover:opacity-90 gap-2">
                        Download Report
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="border-glow">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#64748B]">{stat.title}</p>
                                        <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`h-12 w-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className={`mt-2 flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                    <span>{stat.change} from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Revenue Chart */}
                    <Card className="lg:col-span-2 border-glow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">Revenue Overview</CardTitle>
                                    <CardDescription>Monthly revenue for the last 6 months</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                        <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                                        <YAxis
                                            stroke="#64748B"
                                            fontSize={12}
                                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip
                                            formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#6366F1"
                                            strokeWidth={3}
                                            dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, fill: '#6366F1' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bookings by Type */}
                    <Card className="border-glow">
                        <CardHeader>
                            <CardTitle className="text-lg">Bookings by Type</CardTitle>
                            <CardDescription>Distribution this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={bookingsByType}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {bookingsByType.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`${value}%`, 'Share']}
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-4">
                                {bookingsByType.map((type, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{ backgroundColor: type.color }}
                                            />
                                            <span className="text-sm text-[#64748B]">{type.name}</span>
                                        </div>
                                        <span className="text-sm font-medium text-[#1A1A1A]">{type.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Occupancy Chart & Activity Log */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Occupancy Chart */}
                    <Card className="lg:col-span-2 border-glow">
                        <CardHeader>
                            <CardTitle className="text-lg">Occupancy by Day</CardTitle>
                            <CardDescription>Average occupancy rate by space type</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={occupancyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                        <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                                        <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `${value}%`} />
                                        <Tooltip
                                            formatter={(value) => [`${value}%`, '']}
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Bar dataKey="hotDesk" name="Hot Desk" fill="#6366F1" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="privateSuite" name="Private Suite" fill="#818CF8" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="conferenceRoom" name="Conference Room" fill="#C7D2FE" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Log */}
                    <Card className="border-glow">
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Activity</CardTitle>
                            <CardDescription>Latest platform activity</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {activityLog.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center flex-shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-[#6366F1]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[#1A1A1A]">
                                                <span className="font-medium">{activity.action}</span>
                                                {' '}<span className="text-[#64748B]">by {activity.user}</span>
                                            </p>
                                            <p className="text-xs text-[#64748B] truncate">{activity.details}</p>
                                        </div>
                                        <span className="text-xs text-[#94A3B8] flex-shrink-0">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-4 text-[#6366F1]">
                                View All Activity
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
