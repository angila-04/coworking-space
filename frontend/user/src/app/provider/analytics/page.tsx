'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
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
import {
    CheckCircle,
    Clock,
    AlertCircle,
    TrendingUp,
    Calendar
} from 'lucide-react';
import { mockTasks, activityLog } from '@/lib/mock-data';

export default function ProviderAnalyticsPage() {
    const tasksByStatus = [
        { name: 'Todo', value: mockTasks.filter(t => t.status === 'todo').length, color: '#94A3B8' },
        { name: 'In Progress', value: mockTasks.filter(t => t.status === 'in-progress').length, color: '#FBBF24' },
        { name: 'Done', value: mockTasks.filter(t => t.status === 'done').length, color: '#22C55E' },
    ];

    const weeklyData = [
        { day: 'Mon', completed: 5 },
        { day: 'Tue', completed: 7 },
        { day: 'Wed', completed: 4 },
        { day: 'Thu', completed: 8 },
        { day: 'Fri', completed: 6 },
        { day: 'Sat', completed: 2 },
        { day: 'Sun', completed: 1 },
    ];

    const stats = [
        {
            title: 'Tasks Completed',
            value: '23',
            change: '+5 this week',
            icon: CheckCircle,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Avg. Completion Time',
            value: '2.5h',
            change: '-0.5h from last week',
            icon: Clock,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Pending Tasks',
            value: String(mockTasks.filter(t => t.status !== 'done').length),
            change: '2 high priority',
            icon: AlertCircle,
            color: 'bg-yellow-100 text-yellow-600'
        },
        {
            title: 'Efficiency Score',
            value: '94%',
            change: '+2% from last week',
            icon: TrendingUp,
            color: 'bg-purple-100 text-purple-600'
        }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">Analytics & Activity</h1>
                    <p className="text-[#64748B]">Track your performance and activity logs</p>
                </div>

                {/* Stats */}
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
                                <p className="mt-2 text-sm text-[#64748B]">{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Weekly Performance */}
                    <Card className="lg:col-span-2 border-glow">
                        <CardHeader>
                            <CardTitle className="text-lg">Weekly Performance</CardTitle>
                            <CardDescription>Tasks completed per day this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                        <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                                        <YAxis stroke="#64748B" fontSize={12} />
                                        <Tooltip
                                            formatter={(value) => [`${value} tasks`, 'Completed']}
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Bar
                                            dataKey="completed"
                                            fill="#6366F1"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Task Distribution */}
                    <Card className="border-glow">
                        <CardHeader>
                            <CardTitle className="text-lg">Task Distribution</CardTitle>
                            <CardDescription>Current tasks by status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={tasksByStatus}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {tasksByStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`${value} tasks`, '']}
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
                                {tasksByStatus.map((status, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{ backgroundColor: status.color }}
                                            />
                                            <span className="text-sm text-[#64748B]">{status.name}</span>
                                        </div>
                                        <span className="text-sm font-medium text-[#1A1A1A]">{status.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Log */}
                <Card className="border-glow">
                    <CardHeader>
                        <CardTitle className="text-lg">Activity Log</CardTitle>
                        <CardDescription>Recent platform activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activityLog.map((activity, index) => (
                                <div key={activity.id} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="h-8 w-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
                                            <Calendar className="h-4 w-4 text-[#6366F1]" />
                                        </div>
                                        {index < activityLog.length - 1 && (
                                            <div className="w-px h-8 bg-border mt-2" />
                                        )}
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <p className="text-sm text-[#1A1A1A]">
                                            <span className="font-medium">{activity.action}</span>
                                            {' '}<span className="text-[#64748B]">by {activity.user}</span>
                                        </p>
                                        <p className="text-xs text-[#64748B] mt-0.5">{activity.details}</p>
                                    </div>
                                    <span className="text-xs text-[#94A3B8] pt-1">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
