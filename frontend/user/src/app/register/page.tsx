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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/lib/store';
import { Building2, Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useStore();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'member' | 'admin' | 'provider'>('member');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        login(role, formData.name);

        const redirects = {
            member: '/dashboard',
            admin: '/admin',
            provider: '/provider'
        };

        router.push(redirects[role]);
    };

    const benefits = [
        'Access to 50+ premium workspaces',
        'High-speed 1 Gbps WiFi',
        'Free coffee and refreshments',
        '24/7 building access',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            <div className="mx-auto max-w-6xl px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Benefits Section */}
                    <div className="hidden lg:block">
                        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">
                            Join Thrissur&apos;s Premier
                            <br />
                            <span className="text-gradient">Co-working Community</span>
                        </h1>
                        <p className="text-[#64748B] mb-8">
                            Get started with SPACETRIX and transform the way you work. Your first week is on us!
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
                                        <Check className="h-4 w-4 text-[#6366F1]" />
                                    </div>
                                    <span className="text-[#1A1A1A]">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 rounded-xl bg-[#1A1A1A] text-white">
                            <p className="text-lg font-medium mb-2">&quot;SPACETRIX transformed my productivity!&quot;</p>
                            <p className="text-[#94A3B8] text-sm">
                                The best decision I made for my freelance business. The community and amenities are unmatched.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center text-sm font-medium">
                                    PN
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Priya Nair</p>
                                    <p className="text-xs text-[#64748B]">Freelance Designer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <Card className="border-glow">
                        <CardHeader className="text-center pb-2">
                            <div className="flex justify-center mb-4">
                                <div className="h-14 w-14 rounded-xl gradient-indigo flex items-center justify-center">
                                    <Building2 className="h-7 w-7 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-[#1A1A1A]">Create Account</CardTitle>
                            <CardDescription className="text-[#64748B]">
                                Start your SPACETRIX journey today
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

                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            className="pl-10"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            className="pl-10"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="pl-10 pr-10"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                    {loading ? 'Creating account...' : 'Create Account'}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </Button>
                            </form>

                            <p className="mt-4 text-center text-xs text-[#64748B]">
                                By creating an account, you agree to our{' '}
                                <Link href="#" className="text-[#6366F1] hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="#" className="text-[#6366F1] hover:underline">Privacy Policy</Link>
                            </p>

                            <div className="mt-6 text-center text-sm text-[#64748B]">
                                Already have an account?{' '}
                                <Link href="/login" className="text-[#6366F1] hover:underline font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
