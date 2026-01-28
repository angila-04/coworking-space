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
    Search,
    Edit,
    Trash2,
    Users,
    Star,
    MoreHorizontal
} from 'lucide-react';
import { mockSpaces, Space } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function ManageSpacesPage() {
    const [spaces, setSpaces] = useState(mockSpaces);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingSpace, setEditingSpace] = useState<Space | null>(null);

    const filteredSpaces = spaces.filter(space =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        setSpaces(spaces.filter(s => s.id !== id));
    };

    const handleEdit = (space: Space) => {
        setEditingSpace(space);
        setShowAddModal(true);
    };

    const handleSave = (spaceData: Partial<Space>) => {
        if (editingSpace) {
            setSpaces(spaces.map(s => s.id === editingSpace.id ? { ...s, ...spaceData } : s));
        } else {
            const newSpace: Space = {
                id: String(spaces.length + 1),
                name: spaceData.name || '',
                type: spaceData.type || 'hot-desk',
                capacity: spaceData.capacity || 1,
                pricePerHour: spaceData.pricePerHour || 0,
                pricePerDay: spaceData.pricePerDay || 0,
                amenities: spaceData.amenities || [],
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
                available: true,
                rating: 0,
                description: spaceData.description || ''
            };
            setSpaces([...spaces, newSpace]);
        }
        setShowAddModal(false);
        setEditingSpace(null);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">Manage Spaces</h1>
                        <p className="text-[#64748B]">Add, edit, or remove workspace inventory</p>
                    </div>
                    <Button
                        className="gradient-indigo text-white hover:opacity-90 gap-2"
                        onClick={() => { setEditingSpace(null); setShowAddModal(true); }}
                    >
                        <Plus className="h-4 w-4" />
                        Add Space
                    </Button>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                    <Input
                        placeholder="Search spaces..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Spaces Table */}
                <Card className="border-glow">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-border">
                                    <tr>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Space</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Type</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Capacity</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Price/Hour</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Status</th>
                                        <th className="text-left text-sm font-medium text-[#64748B] px-6 py-4">Rating</th>
                                        <th className="text-right text-sm font-medium text-[#64748B] px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredSpaces.map((space) => (
                                        <tr key={space.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={space.image}
                                                        alt={space.name}
                                                        className="h-10 w-14 rounded-lg object-cover"
                                                    />
                                                    <span className="font-medium text-[#1A1A1A]">{space.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="secondary" className="capitalize">
                                                    {space.type.replace('-', ' ')}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-[#64748B]">
                                                    <Users className="h-4 w-4" />
                                                    {space.capacity}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                                                {formatCurrency(space.pricePerHour)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge className={space.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                                    {space.available ? 'Available' : 'Occupied'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-[#1A1A1A]">{space.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEdit(space)}
                                                    >
                                                        <Edit className="h-4 w-4 text-[#64748B]" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(space.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredSpaces.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-[#64748B]">No spaces found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Add/Edit Modal */}
            <SpaceFormModal
                open={showAddModal}
                onOpenChange={setShowAddModal}
                space={editingSpace}
                onSave={handleSave}
            />
        </DashboardLayout>
    );
}

interface SpaceFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    space: Space | null;
    onSave: (data: Partial<Space>) => void;
}

function SpaceFormModal({ open, onOpenChange, space, onSave }: SpaceFormModalProps) {
    const [formData, setFormData] = useState({
        name: space?.name || '',
        type: space?.type || 'hot-desk',
        capacity: space?.capacity || 1,
        pricePerHour: space?.pricePerHour || 0,
        pricePerDay: space?.pricePerDay || 0,
        description: space?.description || '',
        amenities: space?.amenities?.join(', ') || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{space ? 'Edit Space' : 'Add New Space'}</DialogTitle>
                    <DialogDescription>
                        {space ? 'Update the space details below' : 'Fill in the details for the new workspace'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Space Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value as Space['type'] })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hot-desk">Hot Desk</SelectItem>
                                    <SelectItem value="private-suite">Private Suite</SelectItem>
                                    <SelectItem value="conference-room">Conference Room</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input
                                id="capacity"
                                type="number"
                                min="1"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pricePerHour">Price/Hour (₹)</Label>
                            <Input
                                id="pricePerHour"
                                type="number"
                                min="0"
                                value={formData.pricePerHour}
                                onChange={(e) => setFormData({ ...formData, pricePerHour: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pricePerDay">Price/Day (₹)</Label>
                            <Input
                                id="pricePerDay"
                                type="number"
                                min="0"
                                value={formData.pricePerDay}
                                onChange={(e) => setFormData({ ...formData, pricePerDay: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                        <Input
                            id="amenities"
                            value={formData.amenities}
                            onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                            placeholder="WiFi, Coffee, Whiteboard..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" className="gradient-indigo text-white hover:opacity-90">
                            {space ? 'Update' : 'Add'} Space
                        </Button>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
