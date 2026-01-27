'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  useScrollAnimation,
  useParallax,
  useFloating,
  getScrollAnimationStyles,
} from '@/lib/motion-utils';
import {
  Zap,
  Shield,
  Users,
  Wifi,
  Coffee,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Check,
  Building2,
  Sparkles,
  Globe,
  HeadphonesIcon,
} from 'lucide-react';

// Scroll-animated section wrapper component
function AnimatedSection({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp' as const
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeScale';
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={getScrollAnimationStyles(isVisible, variant, delay)}
    >
      {children}
    </div>
  );
}

// Floating card component for ambient motion
function FloatingCard({
  children,
  className = '',
  amplitude = 12,
  duration = 6,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  const { ref, style, className: floatingClassName } = useFloating<HTMLDivElement>({ amplitude, duration, delay });

  return (
    <div ref={ref} className={`${className} ${floatingClassName}`} style={style}>
      {children}
    </div>
  );
}

export default function HomePage() {
  // Parallax effect for hero image
  const heroParallax = useParallax<HTMLDivElement>({ speed: 0.15 });

  // Scroll animations for each section
  const statsAnimation = useScrollAnimation<HTMLDivElement>();
  const featuresHeaderAnimation = useScrollAnimation<HTMLDivElement>();
  const pricingHeaderAnimation = useScrollAnimation<HTMLDivElement>();
  const ctaAnimation = useScrollAnimation<HTMLDivElement>();

  const features = [
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book your workspace in seconds with our seamless booking engine.',
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'QR code check-in system ensures only authorized members enter.',
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Enterprise-grade connectivity up to 1 Gbps for all members.',
    },
    {
      icon: Coffee,
      title: 'Premium Amenities',
      description: 'Complimentary coffee, snacks, and printing facilities included.',
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Work on your schedule with round-the-clock building access.',
    },
    {
      icon: Users,
      title: 'Community Events',
      description: 'Network with like-minded professionals at exclusive events.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Hot Desk',
      price: '₹8,000',
      period: '/month',
      description: 'Perfect for freelancers and remote workers.',
      features: [
        'Flexible seating in shared area',
        'High-speed WiFi',
        'Access to meeting rooms (2 hrs/month)',
        'Coffee & refreshments',
        'Business address',
      ],
      popular: false,
    },
    {
      name: 'Dedicated Desk',
      price: '₹15,000',
      period: '/month',
      description: 'Your own permanent desk with storage.',
      features: [
        'Fixed desk with personal locker',
        'Priority WiFi connection',
        'Access to meeting rooms (5 hrs/month)',
        'All beverages included',
        'Mail handling service',
        'Guest passes (5/month)',
      ],
      popular: true,
    },
    {
      name: 'Private Suite',
      price: '₹35,000',
      period: '/month',
      description: 'Complete privacy for your team.',
      features: [
        'Fully furnished private office',
        'Meeting room (10 hrs/month)',
        'Dedicated phone line',
        'Reception & admin support',
        'Unlimited guest access',
        'Priority event access',
      ],
      popular: false,
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Members' },
    { value: '50+', label: 'Workspaces' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] noise-texture">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0F] via-[#0F0F18] to-[#0A0A0F]">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute inset-0 bg-grid-pattern" />

        {/* Floating Gradient Orbs with gentle animation */}
        <div
          className="gradient-orb gradient-orb-indigo w-[600px] h-[600px] -top-40 -left-40 absolute animate-float-gentle"
          style={{ '--float-amplitude': '20px', '--float-duration': '10s' } as React.CSSProperties}
        />
        <div
          className="gradient-orb gradient-orb-violet w-[400px] h-[400px] top-20 right-0 absolute animate-float-gentle"
          style={{ '--float-amplitude': '15px', '--float-duration': '8s', '--float-delay': '2s' } as React.CSSProperties}
        />
        <div
          className="gradient-orb gradient-orb-cyan w-[300px] h-[300px] bottom-0 left-1/3 absolute animate-float-gentle"
          style={{ '--float-amplitude': '18px', '--float-duration': '12s', '--float-delay': '4s' } as React.CSSProperties}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge with cinematic text reveal */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-indigo-400 text-sm font-medium animate-text-reveal stagger-1">
                <Sparkles className="h-4 w-4" />
                Premium Co-working in Thrissur
              </div>

              {/* Heading with dramatic hero reveal - JeskoJets inspired */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-hero-title stagger-2">
                Work in the
                <br />
                <span className="text-gradient-animated">Heart of Thrissur</span>
              </h1>

              {/* Description with staggered reveal */}
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed animate-text-reveal stagger-3">
                Experience Kerala&apos;s finest co-working space. From hot desks to private suites,
                SPACETRIX offers premium workspaces designed for productivity and success.
              </p>

              {/* Buttons with staggered reveal and magnetic effect */}
              <div className="flex flex-wrap gap-4 animate-text-reveal stagger-4">
                <Link href="/register">
                  <Button size="lg" className="gradient-indigo-glow text-white btn-glow btn-magnetic gap-2">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/spaces">
                  <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-white/5 hover:border-indigo-500/50 hover:text-white transition-all duration-500">
                    Explore Spaces
                  </Button>
                </Link>
              </div>

              {/* Social proof with staggered reveal */}
              <div className="flex items-center gap-6 pt-4 animate-text-reveal stagger-5">
                <div className="flex -space-x-3">
                  {['AM', 'PN', 'VK', 'LD'].map((initials, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-[#0A0A0F] bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-medium hover:scale-110 hover:z-10 transition-transform duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">Loved by 500+ professionals</p>
                </div>
              </div>
            </div>

            {/* Hero Image with Parallax */}
            <div className="relative animate-text-reveal stagger-3" ref={heroParallax.ref} style={heroParallax.style}>
              <div className="relative rounded-2xl overflow-hidden border-glow hover:shadow-glow-lg transition-all duration-500 group">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                  alt="SPACETRIX Co-working Space"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 animate-image-reveal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-indigo-500/30 transition-colors duration-300">
                    <div className="h-12 w-12 rounded-lg gradient-indigo flex items-center justify-center shadow-glow-sm">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Swaraj Round, Thrissur</p>
                      <p className="text-sm text-slate-400">2 mins from Vadakkunnathan Temple</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating availability card */}
              <FloatingCard
                className="absolute -top-6 -right-6 glass-card rounded-xl p-4 border border-indigo-500/20"
                amplitude={10}
                duration={5}
                delay={1}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-white">15 spaces available now</span>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with scroll-triggered reveal */}
      <section className="py-16 bg-[#0F0F18] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div
          ref={statsAnimation.ref}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-110 transition-transform duration-300"
                style={getScrollAnimationStyles(statsAnimation.isVisible, 'fadeUp', index * 100)}
              >
                <p className="text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-2 text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with staggered reveals */}
      <section id="features" className="py-24 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div
          className="gradient-orb gradient-orb-indigo w-[500px] h-[500px] -top-40 right-0 opacity-20 absolute animate-float-gentle"
          style={{ '--float-amplitude': '25px', '--float-duration': '12s' } as React.CSSProperties}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header with scroll animation */}
          <div
            ref={featuresHeaderAnimation.ref}
            className="text-center max-w-2xl mx-auto mb-16"
            style={getScrollAnimationStyles(featuresHeaderAnimation.isVisible, 'fadeUp', 0)}
          >
            <Badge variant="secondary" className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to
              <br />
              <span className="text-gradient">Work Smarter</span>
            </h2>
            <p className="text-slate-400">
              From high-speed connectivity to premium amenities, we&apos;ve got you covered.
            </p>
          </div>

          {/* Feature cards with staggered scroll reveal and tilt effect */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="group glass-card-hover border-slate-800/50 bg-[#12121A]/80 card-tilt h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 icon-glow">
                      <feature.icon className="h-6 w-6 text-indigo-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with animated glow on popular card */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-[#0A0A0F] via-[#0F0F18] to-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-20" />
        <div
          className="gradient-orb gradient-orb-cyan w-[400px] h-[400px] top-0 left-0 opacity-10 absolute animate-float-gentle"
          style={{ '--float-amplitude': '20px', '--float-duration': '10s' } as React.CSSProperties}
        />
        <div
          className="gradient-orb gradient-orb-violet w-[400px] h-[400px] bottom-0 right-0 opacity-10 absolute animate-float-gentle"
          style={{ '--float-amplitude': '18px', '--float-duration': '11s', '--float-delay': '3s' } as React.CSSProperties}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header with scroll animation */}
          <div
            ref={pricingHeaderAnimation.ref}
            className="text-center max-w-2xl mx-auto mb-16"
            style={getScrollAnimationStyles(pricingHeaderAnimation.isVisible, 'fadeUp', 0)}
          >
            <Badge variant="secondary" className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent
              <br />
              <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-slate-400">
              Choose the plan that fits your work style. All plans include basic amenities.
            </p>
          </div>

          {/* Pricing cards with staggered reveal and glow effect */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <Card
                  className={`relative overflow-hidden transition-all duration-500 hover:-translate-y-3 bg-[#12121A]/80 backdrop-blur-xl h-full ${plan.popular
                    ? 'border-2 border-indigo-500 glow-pulse-border'
                    : 'border border-slate-800/50 hover:border-indigo-500/30'
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-8">
                    <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/register" className="block pt-4">
                      <Button
                        className={`w-full btn-magnetic transition-all duration-300 ${plan.popular
                          ? 'gradient-indigo text-white hover:shadow-glow-md'
                          : 'bg-slate-800/50 border border-indigo-500/30 text-white hover:bg-indigo-500 hover:border-indigo-500'
                          }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with scroll-triggered reveal */}
      <section id="contact" className="py-24 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={ctaAnimation.ref}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 p-12 lg:p-16 shadow-glow-xl"
            style={getScrollAnimationStyles(ctaAnimation.isVisible, 'fadeScale', 0)}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTJIMjR2MmgxMnpNMzYgMzB2LTJIMjR2MmgxMnpNMzYgMjZ2LTJIMjR2MmgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Workday?
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Join Thrissur&apos;s most vibrant professional community. Get your first week free!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 gap-2 btn-magnetic">
                      Start Free Trial
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                    Schedule a Tour
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: '50+ Workspaces' },
                  { icon: Globe, label: '1 Gbps WiFi' },
                  { icon: HeadphonesIcon, label: '24/7 Support' },
                  { icon: Coffee, label: 'Free Coffee' },
                ].map((item, index) => (
                  <AnimatedSection key={index} delay={index * 100} variant="fadeScale">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/10">
                      <item.icon className="h-8 w-8 text-white mx-auto mb-3" />
                      <p className="text-white font-semibold">{item.label}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
