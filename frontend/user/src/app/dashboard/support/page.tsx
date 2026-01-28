'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Plus,
    MessageCircle,
    Clock,
    CheckCircle
} from 'lucide-react';
import { mockTickets } from '@/lib/mock-data';
import { getStatusColor, getPriorityColor } from '@/lib/utils';

export default function SupportPage() {
    const [showNewTicket, setShowNewTicket] = useState(false);
    const [tickets, setTickets] = useState(mockTickets);
    const [newTicket, setNewTicket] = useState({
        subject: '',
        description: '',
        priority: 'medium'
    });

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();
        const ticket = {
            id: `TK${(tickets.length + 1).toString().padStart(3, '0')}`,
            subject: newTicket.subject,
            description: newTicket.description,
            status: 'open' as const,
            priority: newTicket.priority as 'low' | 'medium' | 'high',
            createdAt: new Date().toISOString(),
            userId: 'U001'
        };
        setTickets([ticket, ...tickets]);
        setNewTicket({ subject: '', description: '', priority: 'medium' });
        setShowNewTicket(false);
    };

    const openTickets = tickets.filter(t => t.status !== 'resolved');
    const resolvedTickets = tickets.filter(t => t.status === 'resolved');

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">Support</h1>
                        <p className="text-[#64748B]">Get help with your workspace experience</p>
                    </div>
                    <Button
                        className="gradient-indigo text-white hover:opacity-90 gap-2"
                        onClick={() => setShowNewTicket(!showNewTicket)}
                    >
                        <Plus className="h-4 w-4" />
                        Raise Ticket
                    </Button>
                </div>

                {/* New Ticket Form */}
                {showNewTicket && (
                    <Card className="border-glow border-[#6366F1]/30">
                        <CardHeader>
                            <CardTitle className="text-lg">Create Support Ticket</CardTitle>
                            <CardDescription>Describe your issue and we&apos;ll get back to you shortly</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitTicket} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Brief description of your issue"
                                        value={newTicket.subject}
                                        onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select
                                        value={newTicket.priority}
                                        onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low - General inquiry</SelectItem>
                                            <SelectItem value="medium">Medium - Minor issue</SelectItem>
                                            <SelectItem value="high">High - Urgent problem</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Provide details about your issue..."
                                        rows={4}
                                        value={newTicket.description}
                                        onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button type="submit" className="gradient-indigo text-white hover:opacity-90">
                                        Submit Ticket
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setShowNewTicket(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Help */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Card className="border-glow hover:border-glow-hover transition-all cursor-pointer">
                        <CardContent className="pt-6 text-center">
                            <div className="h-12 w-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-3">
                                <MessageCircle className="h-6 w-6 text-[#6366F1]" />
                            </div>
                            <h3 className="font-semibold text-[#1A1A1A]">Live Chat</h3>
                            <p className="text-sm text-[#64748B] mt-1">Chat with our support team</p>
                        </CardContent>
                    </Card>

                    <Card className="border-glow hover:border-glow-hover transition-all cursor-pointer">
                        <CardContent className="pt-6 text-center">
                            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
                                <Clock className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-[#1A1A1A]">Response Time</h3>
                            <p className="text-sm text-[#64748B] mt-1">Average: 15 minutes</p>
                        </CardContent>
                    </Card>

                    <Card className="border-glow hover:border-glow-hover transition-all cursor-pointer">
                        <CardContent className="pt-6 text-center">
                            <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h3 className="font-semibold text-[#1A1A1A]">Resolution Rate</h3>
                            <p className="text-sm text-[#64748B] mt-1">98% first-call resolution</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tickets */}
                <Tabs defaultValue="open" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="open">Open Tickets ({openTickets.length})</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved ({resolvedTickets.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="open" className="space-y-4">
                        {openTickets.length > 0 ? (
                            openTickets.map((ticket) => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))
                        ) : (
                            <Card className="border-glow">
                                <CardContent className="text-center py-12">
                                    <p className="text-[#64748B]">No open tickets</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="resolved" className="space-y-4">
                        {resolvedTickets.length > 0 ? (
                            resolvedTickets.map((ticket) => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))
                        ) : (
                            <Card className="border-glow">
                                <CardContent className="text-center py-12">
                                    <p className="text-[#64748B]">No resolved tickets</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}

function TicketCard({ ticket }: { ticket: typeof mockTickets[0] }) {
    const formatTicketDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className="border-glow hover:border-glow-hover transition-all">
            <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-mono text-[#64748B]">{ticket.id}</span>
                            <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                            <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </div>
                        <h3 className="font-semibold text-[#1A1A1A]">{ticket.subject}</h3>
                        <p className="text-sm text-[#64748B] line-clamp-2">{ticket.description}</p>
                        <p className="text-xs text-[#94A3B8]">Created: {formatTicketDate(ticket.createdAt)}</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                </div>
            </CardContent>
        </Card>
    );
}
