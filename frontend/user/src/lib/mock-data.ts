// SPACETRIX Mock Data

export interface Space {
    id: string;
    name: string;
    type: 'hot-desk' | 'private-suite' | 'conference-room';
    capacity: number;
    pricePerHour: number;
    pricePerDay: number;
    amenities: string[];
    image: string;
    available: boolean;
    rating: number;
    description: string;
}

export interface Booking {
    id: string;
    spaceId: string;
    spaceName: string;
    spaceType: string;
    userId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
    totalAmount: number;
    qrCode: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'member' | 'admin' | 'provider';
    avatar: string;
    memberSince: string;
    status: 'active' | 'pending' | 'blocked';
    bookings: number;
    totalSpent: number;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignedTo: string;
    dueDate: string;
    location: string;
}

export interface Ticket {
    id: string;
    subject: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    userId: string;
}

export interface Announcement {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    author: string;
    priority: 'normal' | 'important';
}

// Mock Spaces
export const mockSpaces: Space[] = [
    {
        id: '1',
        name: 'Executive Hot Desk A1',
        type: 'hot-desk',
        capacity: 1,
        pricePerHour: 150,
        pricePerDay: 800,
        amenities: ['High-Speed WiFi', 'Power Outlets', 'Ergonomic Chair', 'Locker'],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
        available: true,
        rating: 4.8,
        description: 'Premium hot desk with panoramic views of Thrissur city. Perfect for focused work sessions.'
    },
    {
        id: '2',
        name: 'Creative Hot Desk B2',
        type: 'hot-desk',
        capacity: 1,
        pricePerHour: 120,
        pricePerDay: 650,
        amenities: ['High-Speed WiFi', 'Power Outlets', 'Standing Desk Option'],
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
        available: true,
        rating: 4.6,
        description: 'Vibrant creative space ideal for designers and freelancers in Thrissur.'
    },
    {
        id: '3',
        name: 'Private Suite - Sakthan',
        type: 'private-suite',
        capacity: 4,
        pricePerHour: 500,
        pricePerDay: 2500,
        amenities: ['Private Office', 'Meeting Table', 'Whiteboard', 'Video Conferencing', 'Mini Fridge'],
        image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=600',
        available: true,
        rating: 4.9,
        description: 'Named after Sakthan Thampuran, this private suite offers complete privacy for your team.'
    },
    {
        id: '4',
        name: 'Private Suite - Vadakkunnathan',
        type: 'private-suite',
        capacity: 6,
        pricePerHour: 700,
        pricePerDay: 3500,
        amenities: ['Private Office', 'Large Meeting Table', 'Smart TV', 'Video Conferencing', 'Kitchenette'],
        image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423571?w=600',
        available: false,
        rating: 5.0,
        description: 'Our premium private suite inspired by Vadakkunnathan Temple\'s grandeur.'
    },
    {
        id: '5',
        name: 'Pooram Conference Room',
        type: 'conference-room',
        capacity: 12,
        pricePerHour: 1200,
        pricePerDay: 6000,
        amenities: ['75" Smart Display', 'Video Conferencing', 'Surround Sound', 'Catering Available', 'Whiteboard'],
        image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600',
        available: true,
        rating: 4.9,
        description: 'Grand conference room celebrating Thrissur Pooram\'s magnificence. Perfect for important meetings.'
    },
    {
        id: '6',
        name: 'Thekkinkadu Boardroom',
        type: 'conference-room',
        capacity: 20,
        pricePerHour: 2000,
        pricePerDay: 10000,
        amenities: ['Dual 85" Displays', 'Premium AV System', 'Recording Equipment', 'Full Catering', 'Dedicated Support'],
        image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600',
        available: true,
        rating: 5.0,
        description: 'Our flagship boardroom named after Thekkinkadu Maidan. For your most important presentations.'
    }
];

// Mock Bookings
export const mockBookings: Booking[] = [
    {
        id: 'BK001',
        spaceId: '1',
        spaceName: 'Executive Hot Desk A1',
        spaceType: 'hot-desk',
        userId: 'U001',
        date: '2026-01-23',
        startTime: '09:00',
        endTime: '17:00',
        status: 'confirmed',
        totalAmount: 800,
        qrCode: 'SPTX-BK001-2026'
    },
    {
        id: 'BK002',
        spaceId: '5',
        spaceName: 'Pooram Conference Room',
        spaceType: 'conference-room',
        userId: 'U001',
        date: '2026-01-25',
        startTime: '14:00',
        endTime: '17:00',
        status: 'pending',
        totalAmount: 3600,
        qrCode: 'SPTX-BK002-2026'
    },
    {
        id: 'BK003',
        spaceId: '3',
        spaceName: 'Private Suite - Sakthan',
        spaceType: 'private-suite',
        userId: 'U001',
        date: '2026-01-20',
        startTime: '10:00',
        endTime: '18:00',
        status: 'completed',
        totalAmount: 2500,
        qrCode: 'SPTX-BK003-2026'
    }
];

// Mock Users
export const mockUsers: User[] = [
    {
        id: 'U001',
        name: 'Arjun Menon',
        email: 'arjun@example.com',
        role: 'member',
        avatar: 'AM',
        memberSince: '2025-06-15',
        status: 'active',
        bookings: 24,
        totalSpent: 45600
    },
    {
        id: 'U002',
        name: 'Priya Nair',
        email: 'priya@example.com',
        role: 'member',
        avatar: 'PN',
        memberSince: '2025-08-22',
        status: 'active',
        bookings: 18,
        totalSpent: 32400
    },
    {
        id: 'U003',
        name: 'Vishnu Kumar',
        email: 'vishnu@example.com',
        role: 'member',
        avatar: 'VK',
        memberSince: '2025-11-01',
        status: 'pending',
        bookings: 0,
        totalSpent: 0
    },
    {
        id: 'U004',
        name: 'Lakshmi Devi',
        email: 'lakshmi@example.com',
        role: 'member',
        avatar: 'LD',
        memberSince: '2025-09-10',
        status: 'blocked',
        bookings: 5,
        totalSpent: 8200
    }
];

// Mock Tasks
export const mockTasks: Task[] = [
    {
        id: 'T001',
        title: 'Clean Conference Room - Pooram',
        description: 'Deep cleaning after client meeting',
        status: 'todo',
        priority: 'high',
        assignedTo: 'Suresh',
        dueDate: '2026-01-22',
        location: 'Pooram Conference Room'
    },
    {
        id: 'T002',
        title: 'Replace AC Filter - Suite Sakthan',
        description: 'Scheduled maintenance',
        status: 'in-progress',
        priority: 'medium',
        assignedTo: 'Ramesh',
        dueDate: '2026-01-23',
        location: 'Private Suite - Sakthan'
    },
    {
        id: 'T003',
        title: 'Restock Coffee Station',
        description: 'Order and restock coffee supplies',
        status: 'done',
        priority: 'low',
        assignedTo: 'Anil',
        dueDate: '2026-01-21',
        location: 'Common Area'
    },
    {
        id: 'T004',
        title: 'Fix WiFi in Hot Desk Zone B',
        description: 'Members reporting slow connectivity',
        status: 'todo',
        priority: 'high',
        assignedTo: 'IT Team',
        dueDate: '2026-01-22',
        location: 'Hot Desk Zone B'
    }
];

// Mock Tickets
export const mockTickets: Ticket[] = [
    {
        id: 'TK001',
        subject: 'Air conditioning too cold',
        description: 'The AC in Hot Desk A zone is set too cold. Please adjust.',
        status: 'open',
        priority: 'low',
        createdAt: '2026-01-22T09:30:00',
        userId: 'U001'
    },
    {
        id: 'TK002',
        subject: 'Printer not working',
        description: 'The shared printer on Floor 2 is showing offline.',
        status: 'in-progress',
        priority: 'medium',
        createdAt: '2026-01-21T14:15:00',
        userId: 'U002'
    }
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
    {
        id: 'AN001',
        title: 'Thrissur Pooram Special Hours',
        message: 'SPACETRIX will have extended hours during Thrissur Pooram festival. Enjoy 24/7 access from April 15-20!',
        createdAt: '2026-01-20T10:00:00',
        author: 'Admin',
        priority: 'important'
    },
    {
        id: 'AN002',
        title: 'New Coffee Machine',
        message: 'We have installed a premium espresso machine in the common area. Enjoy complimentary coffee!',
        createdAt: '2026-01-18T15:30:00',
        author: 'Admin',
        priority: 'normal'
    }
];

// Analytics Data
export const revenueData = [
    { month: 'Aug', revenue: 285000 },
    { month: 'Sep', revenue: 320000 },
    { month: 'Oct', revenue: 358000 },
    { month: 'Nov', revenue: 412000 },
    { month: 'Dec', revenue: 389000 },
    { month: 'Jan', revenue: 445000 },
];

export const occupancyData = [
    { day: 'Mon', hotDesk: 85, privateSuite: 70, conferenceRoom: 45 },
    { day: 'Tue', hotDesk: 90, privateSuite: 80, conferenceRoom: 60 },
    { day: 'Wed', hotDesk: 88, privateSuite: 85, conferenceRoom: 75 },
    { day: 'Thu', hotDesk: 92, privateSuite: 75, conferenceRoom: 55 },
    { day: 'Fri', hotDesk: 78, privateSuite: 65, conferenceRoom: 40 },
    { day: 'Sat', hotDesk: 45, privateSuite: 30, conferenceRoom: 20 },
    { day: 'Sun', hotDesk: 30, privateSuite: 20, conferenceRoom: 15 },
];

export const bookingsByType = [
    { name: 'Hot Desk', value: 45, color: '#6366F1' },
    { name: 'Private Suite', value: 35, color: '#818CF8' },
    { name: 'Conference Room', value: 20, color: '#C7D2FE' },
];

// Activity Log
export const activityLog = [
    { id: 1, action: 'New booking', user: 'Arjun Menon', details: 'Executive Hot Desk A1', time: '10 mins ago' },
    { id: 2, action: 'Payment received', user: 'Priya Nair', details: '₹3,600', time: '25 mins ago' },
    { id: 3, action: 'Check-in', user: 'Vishnu Kumar', details: 'Private Suite - Sakthan', time: '1 hour ago' },
    { id: 4, action: 'New member', user: 'Lakshmi Devi', details: 'Pending approval', time: '2 hours ago' },
    { id: 5, action: 'Booking cancelled', user: 'Rahul Krishnan', details: 'Pooram Conference Room', time: '3 hours ago' },
];
