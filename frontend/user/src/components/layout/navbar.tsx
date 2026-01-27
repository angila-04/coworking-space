'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useNavbarScroll, useMagnetic } from '@/lib/motion-utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Building2,
    User,
    LogOut,
    Settings,
    Bell,
    ShoppingCart,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
    const pathname = usePathname();
    const { userRole, userName, isAuthenticated, logout, cart, setUserRole } = useStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrolled } = useNavbarScroll(50);

    const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/#features', label: 'Features' },
        { href: '/#pricing', label: 'Pricing' },
        { href: '/#contact', label: 'Contact' },
    ];

    const getDashboardLink = () => {
        switch (userRole) {
            case 'admin': return '/admin';
            case 'provider': return '/provider';
            default: return '/dashboard';
        }
    };

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'navbar-scrolled' : 'navbar-top'}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-indigo group-hover:shadow-glow-sm group-hover:scale-110 transition-all duration-300">
                            <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            SPACE<span className="text-gradient">TRIX</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    {isPublicPage && (
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-slate-400 hover:text-white nav-link-animated transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated && !isPublicPage && (
                            <>
                                {/* Cart */}
                                {cart.length > 0 && (
                                    <Button variant="ghost" size="icon" className="relative hover:bg-white/10 transition-all duration-300">
                                        <ShoppingCart className="h-5 w-5 text-slate-400 hover:text-white" />
                                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-indigo-500 text-[10px] font-medium text-white flex items-center justify-center animate-pulse-ring">
                                            {cart.length}
                                        </span>
                                    </Button>
                                )}

                                {/* Notifications */}
                                <Button variant="ghost" size="icon" className="relative hover:bg-white/10 transition-all duration-300">
                                    <Bell className="h-5 w-5 text-slate-400 hover:text-white" />
                                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                </Button>
                            </>
                        )}

                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                        <Avatar className="h-9 w-9 border-2 border-[#6366F1]/20">
                                            <AvatarFallback className="bg-[#6366F1]/10 text-[#6366F1] font-medium">
                                                {userName.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{userName}</p>
                                            <p className="text-xs leading-none text-muted-foreground capitalize">
                                                {userRole}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={getDashboardLink()} className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                                        Switch Role (Demo)
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => setUserRole('member')}>
                                        Member View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setUserRole('admin')}>
                                        Admin View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setUserRole('provider')}>
                                        Provider View
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="gradient-indigo text-white hover:shadow-glow-md btn-glow btn-magnetic transition-all duration-300">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        {isPublicPage && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && isPublicPage && (
                <div className="md:hidden border-t border-indigo-500/20 glass-card animate-slide-in-down">
                    <div className="px-4 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-sm font-medium text-slate-400 hover:text-white hover:pl-2 transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
