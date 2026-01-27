'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/lib/store';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useStore();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'member' | 'admin' | 'provider'>('member');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 1000));

        const names = {
            member: 'Arjun Menon',
            admin: 'Admin User',
            provider: 'Service Staff'
        };

        login(role, names[role]);

        const redirects = {
            member: '/dashboard',
            admin: '/admin',
            provider: '/provider'
        };

        router.push(redirects[role]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            <div className="flex items-center justify-center py-16 px-4">
                <Card className="w-full max-w-md border-glow">
                    <CardHeader className="text-center pb-2">
                        <div className="flex justify-center mb-4">
                            <div className="h-14 w-14 rounded-xl gradient-indigo flex items-center justify-center">
                                <Building2 className="h-7 w-7 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-[#1A1A1A]">Welcome Back</CardTitle>
                        <CardDescription className="text-[#64748B]">
                            Sign in to your SPACETRIX account
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <Tabs value={role} onValueChange={(v) => setRole(v as typeof role)} className="mb-6">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="member">Member</TabsTrigger>
                                <TabsTrigger value="admin">Admin</TabsTrigger>
                                <TabsTrigger value="provider">Provider</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" className="text-sm text-[#6366F1] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1A1A1A]"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full gradient-indigo text-white hover:opacity-90 gap-2"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                                {!loading && <ArrowRight className="h-4 w-4" />}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-[#64748B]">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-[#6366F1] hover:underline font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </div>
    );
}
