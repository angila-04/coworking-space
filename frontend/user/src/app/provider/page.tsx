'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    ClipboardList,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowRight,
    Calendar
} from 'lucide-react';
import Link from 'next/link';
import { mockTasks } from '@/lib/mock-data';
import { getStatusColor, getPriorityColor } from '@/lib/utils';

export default function ProviderDashboard() {
    const todoTasks = mockTasks.filter(t => t.status === 'todo');
    const inProgressTasks = mockTasks.filter(t => t.status === 'in-progress');
    const doneTasks = mockTasks.filter(t => t.status === 'done');

    const completionRate = Math.round((doneTasks.length / mockTasks.length) * 100);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">Provider Dashboard</h1>
                        <p className="text-[#64748B]">Manage your assigned tasks and activities</p>
                    </div>
                    <Link href="/provider/tasks">
                        <Button className="gradient-indigo text-white hover:opacity-90 gap-2">
                            View All Tasks
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Total Tasks</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">{mockTasks.length}</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                                    <ClipboardList className="h-6 w-6 text-[#6366F1]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">To Do</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">{todoTasks.length}</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <AlertCircle className="h-6 w-6 text-slate-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">In Progress</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">{inProgressTasks.length}</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-yellow-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-glow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#64748B]">Completed</p>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">{doneTasks.length}</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress */}
                <Card className="border-glow">
                    <CardHeader>
                        <CardTitle className="text-lg">Today&apos;s Progress</CardTitle>
                        <CardDescription>Your task completion rate for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#64748B]">Completion Rate</span>
                                <span className="text-2xl font-bold text-[#6366F1]">{completionRate}%</span>
                            </div>
                            <Progress value={completionRate} className="h-3" />
                            <p className="text-sm text-[#64748B]">
                                {doneTasks.length} of {mockTasks.length} tasks completed
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Urgent Tasks */}
                <Card className="border-glow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Urgent Tasks</CardTitle>
                                <CardDescription>High priority tasks requiring immediate attention</CardDescription>
                            </div>
                            <Badge variant="destructive">{mockTasks.filter(t => t.priority === 'high' && t.status !== 'done').length} urgent</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockTasks
                                .filter(t => t.priority === 'high' && t.status !== 'done')
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-4 rounded-lg bg-red-50 border border-red-100"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-[#1A1A1A]">{task.title}</h4>
                                                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                            </div>
                                            <p className="text-sm text-[#64748B]">{task.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-sm text-[#64748B]">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(task.dueDate).toLocaleDateString('en-IN', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {mockTasks.filter(t => t.priority === 'high' && t.status !== 'done').length === 0 && (
                                <div className="text-center py-8">
                                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                    <p className="text-[#64748B]">No urgent tasks! Great job!</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Tasks */}
                <Card className="border-glow">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Tasks</CardTitle>
                        <CardDescription>Your recently assigned tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockTasks.slice(0, 4).map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-border hover:border-[#6366F1]/30 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <h4 className="font-medium text-[#1A1A1A]">{task.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Link href="/provider/tasks" className="block mt-4">
                            <Button variant="ghost" className="w-full text-[#6366F1]">
                                View All Tasks
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
