'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Search,
    Calendar,
    LifeBuoy,
    Settings,
    Users,
    Building,
    Megaphone,
    BarChart3,
    ClipboardList,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const memberNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Spaces', href: '/dashboard/spaces', icon: Search },
    { label: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
    { label: 'Support', href: '/dashboard/support', icon: LifeBuoy },
];

const adminNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Spaces', href: '/admin/spaces', icon: Building },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

const providerNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/provider', icon: LayoutDashboard },
    { label: 'My Tasks', href: '/provider/tasks', icon: ClipboardList },
    { label: 'Analytics', href: '/provider/analytics', icon: BarChart3 },
];

export function Sidebar() {
    const pathname = usePathname();
    const { userRole, sidebarOpen, setSidebarOpen, logout } = useStore();

    const getNavItems = (): NavItem[] => {
        switch (userRole) {
            case 'admin': return adminNavItems;
            case 'provider': return providerNavItems;
            default: return memberNavItems;
        }
    };

    const navItems = getNavItems();

    return (
        <>
            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-white border-r border-border transition-all duration-300 flex flex-col',
                    sidebarOpen ? 'w-64' : 'w-16'
                )}
            >
                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && item.href !== '/admin' && item.href !== '/provider' && pathname.startsWith(item.href));

                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        'w-full justify-start gap-3 h-11 px-3',
                                        isActive && 'bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1]/15',
                                        !isActive && 'text-[#64748B] hover:text-[#1A1A1A] hover:bg-slate-50',
                                        !sidebarOpen && 'justify-center px-0'
                                    )}
                                >
                                    <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-[#6366F1]')} />
                                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-3 border-t border-border space-y-1">
                    <Link href="/dashboard/settings">
                        <Button
                            variant="ghost"
                            className={cn(
                                'w-full justify-start gap-3 h-11 px-3 text-[#64748B] hover:text-[#1A1A1A] hover:bg-slate-50',
                                !sidebarOpen && 'justify-center px-0'
                            )}
                        >
                            <Settings className="h-5 w-5 flex-shrink-0" />
                            {sidebarOpen && <span>Settings</span>}
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className={cn(
                            'w-full justify-start gap-3 h-11 px-3 text-red-600 hover:text-red-700 hover:bg-red-50',
                            !sidebarOpen && 'justify-center px-0'
                        )}
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </Button>
                </div>

                {/* Toggle Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-white shadow-sm hover:bg-slate-50"
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="h-3 w-3" />
                    ) : (
                        <ChevronRight className="h-3 w-3" />
                    )}
                </Button>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </>
    );
}
