'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Plus,
    Megaphone,
    Trash2,
    Send
} from 'lucide-react';
import { mockAnnouncements, Announcement } from '@/lib/mock-data';

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState(mockAnnouncements);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        message: '',
        priority: 'normal' as 'normal' | 'important'
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const announcement: Announcement = {
            id: `AN${(announcements.length + 1).toString().padStart(3, '0')}`,
            title: newAnnouncement.title,
            message: newAnnouncement.message,
            priority: newAnnouncement.priority,
            createdAt: new Date().toISOString(),
            author: 'Admin'
        };
        setAnnouncements([announcement, ...announcements]);
        setNewAnnouncement({ title: '', message: '', priority: 'normal' });
        setShowNewModal(false);
    };

    const handleDelete = (id: string) => {
        setAnnouncements(announcements.filter(a => a.id !== id));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">Announcements</h1>
                        <p className="text-[#64748B]">Broadcast notifications to all SPACETRIX members</p>
                    </div>
                    <Button
                        className="gradient-indigo text-white hover:opacity-90 gap-2"
                        onClick={() => setShowNewModal(true)}
                    >
                        <Plus className="h-4 w-4" />
                        New Announcement
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Card className="border-glow">
                        <CardContent className="pt-6 text-center">
                            <div className="h-12 w-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-3">
                                <Megaphone className="h-6 w-6 text-[#6366F1]" />
                            </div>
                            <p className="text-2xl font-bold text-[#1A1A1A]">{announcements.length}</p>
                            <p className="text-sm text-[#64748B]">Total Announcements</p>
                        </CardContent>
                    </Card>
                    <Card className="border-glow">
                        <CardContent className="pt-6 text-center">
                            <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mx-auto mb-3">
                                <Megaphone className="h-6 w-6 text-red-600" />
                            </div>
                            <p className="text-2xl font-bold text-[#1A1A1A]">
                                {announcements.filter(a => a.priority === 'important').length}
                            </p>
                            <p className="text-sm text-[#64748B]">Important</p>
                        </CardContent>
                    </Card>
                    <Card className="border-glow">
                        <CardContent className="pt-6 text-center">
                            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
                                <Send className="h-6 w-6 text-green-600" />
                            </div>
                            <p className="text-2xl font-bold text-[#1A1A1A]">524</p>
                            <p className="text-sm text-[#64748B]">Members Reached</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Announcements List */}
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <Card key={announcement.id} className="border-glow hover:border-glow-hover transition-all">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold text-lg text-[#1A1A1A]">{announcement.title}</h3>
                                            {announcement.priority === 'important' && (
                                                <Badge variant="destructive">Important</Badge>
                                            )}
                                        </div>
                                        <p className="text-[#64748B]">{announcement.message}</p>
                                        <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
                                            <span>By {announcement.author}</span>
                                            <span>•</span>
                                            <span>{formatDate(announcement.createdAt)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(announcement.id)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {announcements.length === 0 && (
                        <Card className="border-glow">
                            <CardContent className="text-center py-12">
                                <Megaphone className="h-12 w-12 text-[#64748B] mx-auto mb-4" />
                                <p className="text-[#64748B]">No announcements yet</p>
                                <Button
                                    className="mt-4 gradient-indigo text-white hover:opacity-90"
                                    onClick={() => setShowNewModal(true)}
                                >
                                    Create First Announcement
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* New Announcement Modal */}
            <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Create Announcement</DialogTitle>
                        <DialogDescription>
                            This will be sent to all SPACETRIX members
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={newAnnouncement.title}
                                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                placeholder="Announcement title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                value={newAnnouncement.priority}
                                onValueChange={(value: 'normal' | 'important') =>
                                    setNewAnnouncement({ ...newAnnouncement, priority: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="important">Important</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                value={newAnnouncement.message}
                                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                                placeholder="Write your announcement..."
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="gradient-indigo text-white hover:opacity-90 gap-2">
                                <Send className="h-4 w-4" />
                                Broadcast
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setShowNewModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
