'use client';

import { useStore } from '@/lib/store';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { sidebarOpen } = useStore();

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main
                    className={cn(
                        'flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)]',
                        sidebarOpen ? 'ml-64' : 'ml-16'
                    )}
                >
                    <div className="p-6 page-enter">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
