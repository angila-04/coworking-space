'use client';

import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useScrollAnimation, getScrollAnimationStyles } from '@/lib/motion-utils';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { ref: footerRef, isVisible } = useScrollAnimation<HTMLElement>();

    const footerLinks = {
        product: [
            { label: 'Hot Desks', href: '/dashboard/spaces?type=hot-desk' },
            { label: 'Private Suites', href: '/dashboard/spaces?type=private-suite' },
            { label: 'Conference Rooms', href: '/dashboard/spaces?type=conference-room' },
            { label: 'Virtual Office', href: '#' },
        ],
        company: [
            { label: 'About Us', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Press', href: '#' },
        ],
        support: [
            { label: 'Help Center', href: '#' },
            { label: 'Contact Us', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
        ],
    };

    return (
        <footer ref={footerRef} className="bg-[#1A1A1A] text-white" style={getScrollAnimationStyles(isVisible, 'fadeUp', 0)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-indigo">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">
                                SPACE<span className="text-[#6366F1]">TRIX</span>
                            </span>
                        </Link>
                        <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 max-w-sm">
                            Premium co-working spaces in the heart of Thrissur. Experience the perfect blend of
                            productivity and comfort at Kerala&apos;s finest workspace.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                                <MapPin className="h-4 w-4 text-[#6366F1]" />
                                <span>Swaraj Round, Thrissur, Kerala 680001</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                                <Phone className="h-4 w-4 text-[#6366F1]" />
                                <span>+91 487 2331000</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                                <Mail className="h-4 w-4 text-[#6366F1]" />
                                <span>hello@spacetrix.in</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Spaces</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[#94A3B8] hover:text-[#6366F1] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[#94A3B8] hover:text-[#6366F1] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[#94A3B8] hover:text-[#6366F1] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-[#2D2D2D] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[#64748B]">
                        © {currentYear} SPACETRIX. All rights reserved. Made with ❤️ in Thrissur.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-[#64748B] social-icon-hover">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-[#64748B] social-icon-hover">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-[#64748B] social-icon-hover">
                            <Instagram className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
