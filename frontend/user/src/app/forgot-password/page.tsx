'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        setSent(true);
        setLoading(false);
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
                        <CardTitle className="text-2xl font-bold text-[#1A1A1A]">
                            {sent ? 'Check Your Email' : 'Reset Password'}
                        </CardTitle>
                        <CardDescription className="text-[#64748B]">
                            {sent
                                ? 'We\'ve sent a password reset link to your email'
                                : 'Enter your email to receive a reset link'
                            }
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {sent ? (
                            <div className="text-center space-y-6">
                                <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <p className="text-sm text-[#64748B]">
                                    If an account exists for <strong>{email}</strong>, you&apos;ll receive an email with instructions to reset your password.
                                </p>
                                <Link href="/login">
                                    <Button variant="outline" className="gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Login
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
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

                                <Button
                                    type="submit"
                                    className="w-full gradient-indigo text-white hover:opacity-90"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </Button>

                                <div className="text-center">
                                    <Link href="/login" className="text-sm text-[#6366F1] hover:underline inline-flex items-center gap-1">
                                        <ArrowLeft className="h-3 w-3" />
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </div>
    );
}
