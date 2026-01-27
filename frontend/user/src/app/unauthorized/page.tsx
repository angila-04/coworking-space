import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, Home, ShieldX } from 'lucide-react';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
            <div className="text-center">
                <div className="flex justify-center mb-8">
                    <div className="h-20 w-20 rounded-2xl bg-red-100 flex items-center justify-center">
                        <ShieldX className="h-10 w-10 text-red-600" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">Access Denied</h1>
                <p className="text-[#64748B] max-w-md mx-auto mb-8">
                    You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/">
                        <Button className="gradient-indigo text-white hover:opacity-90 gap-2">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" className="gap-2">
                            <Building2 className="h-4 w-4" />
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
