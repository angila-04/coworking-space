'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    ArrowLeft,
    Users,
    Star,
    Wifi,
    Coffee,
    Monitor,
    MapPin,
    Clock,
    Calendar,
    Check,
    CreditCard,
    Shield
} from 'lucide-react';
import Link from 'next/link';
import { mockSpaces } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { useStore } from '@/lib/store';

export default function SpaceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useStore();

    const space = mockSpaces.find(s => s.id === params.id);

    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(false);

    if (!space) {
        return (
            <DashboardLayout>
                <div className="text-center py-12">
                    <p className="text-[#64748B]">Space not found</p>
                    <Link href="/dashboard/spaces">
                        <Button className="mt-4">Back to Spaces</Button>
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const calculateHours = () => {
        const start = parseInt(startTime.split(':')[0]);
        const end = parseInt(endTime.split(':')[0]);
        return end - start;
    };

    const calculateTotal = () => {
        const hours = calculateHours();
        return hours * space.pricePerHour;
    };

    const handleBooking = () => {
        setShowPaymentModal(true);
    };

    const handlePayment = () => {
        addToCart({
            spaceId: space.id,
            spaceName: space.name,
            date: selectedDate,
            startTime,
            endTime,
            price: calculateTotal()
        });
        setBookingComplete(true);
        setTimeout(() => {
            router.push('/dashboard/bookings');
        }, 2000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Back Button */}
                <Link href="/dashboard/spaces" className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#6366F1] transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Spaces
                </Link>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="rounded-xl overflow-hidden border-glow">
                            <img
                                src={space.image}
                                alt={space.name}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>

                        {/* Space Info */}
                        <Card className="border-glow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl text-[#1A1A1A]">{space.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-4 mt-2">
                                            <span className="capitalize">{space.type.replace('-', ' ')}</span>
                                            <span className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                {space.rating} rating
                                            </span>
                                        </CardDescription>
                                    </div>
                                    <Badge className={space.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                                        {space.available ? 'Available Now' : 'Occupied'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-[#64748B] leading-relaxed">{space.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                                        <Users className="h-5 w-5 mx-auto text-[#6366F1] mb-2" />
                                        <p className="text-sm text-[#64748B]">Capacity</p>
                                        <p className="font-semibold text-[#1A1A1A]">{space.capacity} people</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                                        <MapPin className="h-5 w-5 mx-auto text-[#6366F1] mb-2" />
                                        <p className="text-sm text-[#64748B]">Location</p>
                                        <p className="font-semibold text-[#1A1A1A]">Floor 2</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                                        <Clock className="h-5 w-5 mx-auto text-[#6366F1] mb-2" />
                                        <p className="text-sm text-[#64748B]">Hours</p>
                                        <p className="font-semibold text-[#1A1A1A]">24/7</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                                        <Wifi className="h-5 w-5 mx-auto text-[#6366F1] mb-2" />
                                        <p className="text-sm text-[#64748B]">WiFi</p>
                                        <p className="font-semibold text-[#1A1A1A]">1 Gbps</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#1A1A1A] mb-3">Amenities</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {space.amenities.map((amenity, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm font-normal py-1.5 px-3">
                                                <Check className="h-3 w-3 mr-1.5 text-green-600" />
                                                {amenity}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <Card className="border-glow sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-lg">Book This Space</CardTitle>
                                <CardDescription>Select your preferred date and time</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-[#6366F1]/5 border border-[#6366F1]/20">
                                    <div>
                                        <p className="text-2xl font-bold text-[#6366F1]">{formatCurrency(space.pricePerHour)}</p>
                                        <p className="text-sm text-[#64748B]">per hour</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-[#1A1A1A]">{formatCurrency(space.pricePerDay)}</p>
                                        <p className="text-sm text-[#64748B]">per day</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                        <Input
                                            id="date"
                                            type="date"
                                            className="pl-10"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="start">Start Time</Label>
                                        <Input
                                            id="start"
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end">End Time</Label>
                                        <Input
                                            id="end"
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#64748B]">{formatCurrency(space.pricePerHour)} × {calculateHours()} hours</span>
                                        <span className="text-[#1A1A1A]">{formatCurrency(calculateTotal())}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#64748B]">Service fee</span>
                                        <span className="text-[#1A1A1A]">{formatCurrency(0)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span className="text-[#6366F1]">{formatCurrency(calculateTotal())}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full gradient-indigo text-white hover:opacity-90"
                                    disabled={!selectedDate || !space.available}
                                    onClick={handleBooking}
                                >
                                    {space.available ? 'Proceed to Payment' : 'Space Not Available'}
                                </Button>

                                <p className="text-xs text-center text-[#64748B]">
                                    <Shield className="h-3 w-3 inline mr-1" />
                                    Free cancellation up to 24 hours before
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="sm:max-w-md">
                    {bookingComplete ? (
                        <div className="text-center py-8">
                            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <Check className="h-8 w-8 text-green-600" />
                            </div>
                            <DialogTitle className="text-xl mb-2">Booking Confirmed!</DialogTitle>
                            <DialogDescription>
                                Your booking for {space.name} has been confirmed. Redirecting to your bookings...
                            </DialogDescription>
                        </div>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>Complete Payment</DialogTitle>
                                <DialogDescription>
                                    Total: {formatCurrency(calculateTotal())} for {space.name}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card">Card Number</Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                        <Input id="card" placeholder="4242 4242 4242 4242" className="pl-10" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                                <Button
                                    className="w-full gradient-indigo text-white hover:opacity-90"
                                    onClick={handlePayment}
                                >
                                    Pay {formatCurrency(calculateTotal())}
                                </Button>
                                <p className="text-xs text-center text-[#64748B]">
                                    <Shield className="h-3 w-3 inline mr-1" />
                                    Secured by 256-bit SSL encryption
                                </p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
