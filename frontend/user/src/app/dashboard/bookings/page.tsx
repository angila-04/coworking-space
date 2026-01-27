'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
    Calendar,
    Clock,
    MapPin,
    QrCode,
    Download,
    X
} from 'lucide-react';
import { mockBookings } from '@/lib/mock-data';
import { formatDate, formatTime, formatCurrency, getStatusColor } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';

export default function MyBookingsPage() {
    const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);
    const [showQRModal, setShowQRModal] = useState(false);

    const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
    const pastBookings = mockBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

    const openQRModal = (booking: typeof mockBookings[0]) => {
        setSelectedBooking(booking);
        setShowQRModal(true);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">My Bookings</h1>
                    <p className="text-[#64748B]">Manage your workspace reservations and check-in</p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="upcoming" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="upcoming">
                            Upcoming ({upcomingBookings.length})
                        </TabsTrigger>
                        <TabsTrigger value="past">
                            Past ({pastBookings.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onShowQR={() => openQRModal(booking)}
                                    showQRButton={true}
                                />
                            ))
                        ) : (
                            <Card className="border-glow">
                                <CardContent className="text-center py-12">
                                    <p className="text-[#64748B] mb-4">No upcoming bookings</p>
                                    <Button className="gradient-indigo text-white hover:opacity-90">
                                        Book a Space
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="past" className="space-y-4">
                        {pastBookings.length > 0 ? (
                            pastBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    showQRButton={false}
                                />
                            ))
                        ) : (
                            <Card className="border-glow">
                                <CardContent className="text-center py-12">
                                    <p className="text-[#64748B]">No past bookings</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* QR Code Modal */}
            <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Check-in QR Code</DialogTitle>
                        <DialogDescription>
                            Show this QR code at the entrance for quick check-in
                        </DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                        <div className="flex flex-col items-center py-6 space-y-6">
                            <div className="p-6 bg-white rounded-xl border-2 border-[#6366F1]/20 shadow-lg">
                                <QRCodeSVG
                                    value={`SPACETRIX-CHECKIN:${selectedBooking.qrCode}`}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                    fgColor="#1A1A1A"
                                />
                            </div>
                            <div className="text-center">
                                <p className="font-mono text-lg font-bold text-[#6366F1]">{selectedBooking.qrCode}</p>
                                <p className="text-sm text-[#64748B] mt-1">{selectedBooking.spaceName}</p>
                                <p className="text-sm text-[#64748B]">
                                    {formatDate(selectedBooking.date)} • {formatTime(selectedBooking.startTime)} - {formatTime(selectedBooking.endTime)}
                                </p>
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download QR Code
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

interface BookingCardProps {
    booking: typeof mockBookings[0];
    onShowQR?: () => void;
    showQRButton: boolean;
}

function BookingCard({ booking, onShowQR, showQRButton }: BookingCardProps) {
    return (
        <Card className="border-glow hover:border-glow-hover transition-all">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-40 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
                            alt={booking.spaceName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-lg text-[#1A1A1A]">{booking.spaceName}</h3>
                                <Badge variant="secondary" className="mt-1 capitalize">
                                    {booking.spaceType.replace('-', ' ')}
                                </Badge>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                            </Badge>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-3 text-sm text-[#64748B]">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-[#6366F1]" />
                                <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#6366F1]" />
                                <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#6366F1]" />
                                <span>SPACETRIX, Thrissur</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <p className="font-semibold text-[#6366F1]">{formatCurrency(booking.totalAmount)}</p>
                            <div className="flex gap-2">
                                {showQRButton && booking.status === 'confirmed' && (
                                    <Button
                                        size="sm"
                                        className="gradient-indigo text-white hover:opacity-90 gap-2"
                                        onClick={onShowQR}
                                    >
                                        <QrCode className="h-4 w-4" />
                                        Check-in QR
                                    </Button>
                                )}
                                <Button size="sm" variant="outline">
                                    View Details
                                </Button>
                                {booking.status === 'pending' && (
                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                        <X className="h-4 w-4 mr-1" />
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
