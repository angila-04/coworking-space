'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ClipboardList,
    Clock,
    CheckCircle,
    MapPin,
    Calendar,
    ChevronRight
} from 'lucide-react';
import { mockTasks, Task } from '@/lib/mock-data';
import { getStatusColor, getPriorityColor } from '@/lib/utils';

export default function TasksPage() {
    const [tasks, setTasks] = useState(mockTasks);

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const doneTasks = tasks.filter(t => t.status === 'done');

    const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const TaskCard = ({ task }: { task: Task }) => (
        <Card className="border-glow hover:border-glow-hover transition-all cursor-pointer">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <h4 className="font-medium text-[#1A1A1A] leading-tight">{task.title}</h4>
                    <Badge className={getPriorityColor(task.priority)} variant="secondary">
                        {task.priority}
                    </Badge>
                </div>

                <p className="text-sm text-[#64748B] line-clamp-2">{task.description}</p>

                <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {task.location}
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                    {task.status === 'todo' && (
                        <Button
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'in-progress'); }}
                        >
                            <Clock className="h-3 w-3" />
                            Start
                        </Button>
                    )}
                    {task.status === 'in-progress' && (
                        <Button
                            size="sm"
                            className="flex-1 gradient-indigo text-white hover:opacity-90 gap-1"
                            onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'done'); }}
                        >
                            <CheckCircle className="h-3 w-3" />
                            Complete
                        </Button>
                    )}
                    {task.status === 'done' && (
                        <Button size="sm" variant="outline" className="flex-1" disabled>
                            <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                            Completed
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">My Tasks</h1>
                    <p className="text-[#64748B]">Manage and update your assigned tasks</p>
                </div>

                {/* Kanban Board */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* To Do Column */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-slate-400" />
                                <h3 className="font-semibold text-[#1A1A1A]">To Do</h3>
                                <Badge variant="secondary">{todoTasks.length}</Badge>
                            </div>
                        </div>
                        <div className="space-y-3 min-h-[200px]">
                            {todoTasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                            {todoTasks.length === 0 && (
                                <div className="text-center py-12 text-[#64748B] text-sm">
                                    No pending tasks
                                </div>
                            )}
                        </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                <h3 className="font-semibold text-[#1A1A1A]">In Progress</h3>
                                <Badge variant="secondary">{inProgressTasks.length}</Badge>
                            </div>
                        </div>
                        <div className="space-y-3 min-h-[200px]">
                            {inProgressTasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                            {inProgressTasks.length === 0 && (
                                <div className="text-center py-12 text-[#64748B] text-sm">
                                    No tasks in progress
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Done Column */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-400" />
                                <h3 className="font-semibold text-[#1A1A1A]">Done</h3>
                                <Badge variant="secondary">{doneTasks.length}</Badge>
                            </div>
                        </div>
                        <div className="space-y-3 min-h-[200px]">
                            {doneTasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                            {doneTasks.length === 0 && (
                                <div className="text-center py-12 text-[#64748B] text-sm">
                                    No completed tasks
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Task Flow Guide */}
                <Card className="border-glow">
                    <CardContent className="py-6">
                        <div className="flex items-center justify-center gap-4 text-sm text-[#64748B]">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                                    <ClipboardList className="h-4 w-4 text-slate-600" />
                                </div>
                                <span>To Do</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                </div>
                                <span>In Progress</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <span>Done</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
