'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
            <div className="text-center">
                <div className="flex justify-center mb-8">
                    <div className="h-20 w-20 rounded-2xl gradient-indigo flex items-center justify-center">
                        <Building2 className="h-10 w-10 text-white" />
                    </div>
                </div>

                <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Page Not Found</h2>
                <p className="text-[#64748B] max-w-md mx-auto mb-8">
                    Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/">
                        <Button className="gradient-indigo text-white hover:opacity-90 gap-2">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
