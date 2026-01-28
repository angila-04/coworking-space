'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Search,
    Filter,
    Users,
    Star,
    Wifi,
    Coffee,
    Monitor,
    MapPin,
    Clock
} from 'lucide-react';
import { mockSpaces, Space } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const spaceTypes = [
    { value: 'all', label: 'All Spaces' },
    { value: 'hot-desk', label: 'Hot Desk' },
    { value: 'private-suite', label: 'Private Suite' },
    { value: 'conference-room', label: 'Conference Room' },
];

export default function SpaceDiscoveryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const filteredSpaces = mockSpaces.filter(space => {
        const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            space.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'all' || space.type === selectedType;
        return matchesSearch && matchesType;
    });

    const getAmenityIcon = (amenity: string) => {
        if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-3 w-3" />;
        if (amenity.toLowerCase().includes('coffee') || amenity.toLowerCase().includes('fridge')) return <Coffee className="h-3 w-3" />;
        if (amenity.toLowerCase().includes('tv') || amenity.toLowerCase().includes('display')) return <Monitor className="h-3 w-3" />;
        return null;
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">Browse Spaces</h1>
                    <p className="text-[#64748B]">Find the perfect workspace for your needs</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                        <Input
                            placeholder="Search spaces..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {spaceTypes.map((type) => (
                            <Button
                                key={type.value}
                                variant={selectedType === type.value ? 'default' : 'outline'}
                                className={selectedType === type.value ? 'gradient-indigo text-white' : ''}
                                onClick={() => setSelectedType(type.value)}
                            >
                                {type.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-[#64748B]">
                        Showing <span className="font-medium text-[#1A1A1A]">{filteredSpaces.length}</span> spaces
                    </p>
                    <Button variant="ghost" size="sm" className="text-[#64748B] gap-2">
                        <Filter className="h-4 w-4" />
                        More Filters
                    </Button>
                </div>

                {/* Space Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpaces.map((space) => (
                        <SpaceCard key={space.id} space={space} />
                    ))}
                </div>

                {filteredSpaces.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[#64748B] mb-4">No spaces found matching your criteria</p>
                        <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedType('all'); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

function SpaceCard({ space }: { space: Space }) {
    return (
        <Link href={`/dashboard/spaces/${space.id}`}>
            <Card className="group overflow-hidden border-glow hover:border-glow-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                        <Badge className={space.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                            {space.available ? 'Available' : 'Occupied'}
                        </Badge>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{space.rating}</span>
                    </div>
                </div>

                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-lg text-[#1A1A1A] group-hover:text-[#6366F1] transition-colors">
                                {space.name}
                            </CardTitle>
                            <CardDescription className="capitalize">
                                {space.type.replace('-', ' ')}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-[#64748B] line-clamp-2">{space.description}</p>

                    <div className="flex items-center gap-4 text-sm text-[#64748B]">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{space.capacity} {space.capacity === 1 ? 'person' : 'people'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Floor 2</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {space.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs font-normal">
                                {getAmenityIcon(amenity)}
                                <span className="ml-1">{amenity}</span>
                            </Badge>
                        ))}
                        {space.amenities.length > 3 && (
                            <Badge variant="secondary" className="text-xs font-normal">
                                +{space.amenities.length - 3} more
                            </Badge>
                        )}
                    </div>

                    <div className="pt-2 border-t border-border flex items-center justify-between">
                        <div>
                            <p className="text-lg font-bold text-[#6366F1]">{formatCurrency(space.pricePerHour)}</p>
                            <p className="text-xs text-[#64748B]">per hour</p>
                        </div>
                        <Button size="sm" className="gradient-indigo text-white hover:opacity-90">
                            Book Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

function getAmenityIcon(amenity: string) {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-3 w-3" />;
    if (amenity.toLowerCase().includes('coffee') || amenity.toLowerCase().includes('fridge')) return <Coffee className="h-3 w-3" />;
    if (amenity.toLowerCase().includes('tv') || amenity.toLowerCase().includes('display')) return <Monitor className="h-3 w-3" />;
    return null;
}
