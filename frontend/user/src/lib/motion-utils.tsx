'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ============================================================================
// CINEMATIC EASING CURVES
// ============================================================================
export const easing = {
    // Smooth expo-out style - the signature cinematic feel
    cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // Gentle ease for floating elements
    gentle: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Smooth entrance
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

// ============================================================================
// USE SCROLL ANIMATION HOOK
// Triggers animations when elements enter the viewport
// ============================================================================
interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: ScrollAnimationOptions = {}
) {
    const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIsVisible(true);
            setHasAnimated(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        setHasAnimated(true);
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce && !hasAnimated) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce, hasAnimated]);

    return { ref, isVisible };
}

// ============================================================================
// USE PARALLAX HOOK
// Creates scroll-based parallax effect
// ============================================================================
interface ParallaxOptions {
    speed?: number; // 0.1 = subtle, 0.5 = moderate, 1 = strong
    direction?: 'up' | 'down';
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
    options: ParallaxOptions = {}
) {
    const { speed = 0.15, direction = 'up' } = options;
    const ref = useRef<T>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let rafId: number;
        let isInView = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInView = entry.isIntersecting;
            },
            { threshold: 0 }
        );

        const handleScroll = () => {
            if (!isInView || !element) return;

            rafId = requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;
                const windowCenter = window.innerHeight / 2;
                const distanceFromCenter = elementCenter - windowCenter;
                const multiplier = direction === 'up' ? -1 : 1;

                setOffset(distanceFromCenter * speed * multiplier);
            });
        };

        observer.observe(element);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            observer.unobserve(element);
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [speed, direction]);

    const style = {
        transform: `translateY(${offset}px)`,
        willChange: 'transform' as const,
    };

    return { ref, style, offset };
}

// ============================================================================
// USE FLOATING HOOK
// Creates gentle floating animation with viewport awareness
// ============================================================================
interface FloatingOptions {
    amplitude?: number; // Pixels to float up/down
    duration?: number; // Duration in seconds
    delay?: number; // Initial delay in seconds
}

export function useFloating<T extends HTMLElement = HTMLDivElement>(
    options: FloatingOptions = {}
) {
    const { amplitude = 12, duration = 6, delay = 0 } = options;
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIsInView(false);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, []);

    const style = {
        '--float-amplitude': `${amplitude}px`,
        '--float-duration': `${duration}s`,
        '--float-delay': `${delay}s`,
        willChange: isInView ? 'transform' : 'auto',
    } as React.CSSProperties;

    // Return className to add instead of animation in style
    const className = isInView ? 'animate-float-gentle' : '';

    return { ref, style, isInView, className };
}

// ============================================================================
// USE MAGNETIC HOVER HOOK
// Creates subtle magnetic pull effect toward cursor on hover
// ============================================================================
interface MagneticOptions {
    strength?: number; // 0.1 = subtle, 0.3 = moderate, 0.5 = strong
    radius?: number; // Activation radius in pixels
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
    options: MagneticOptions = {}
) {
    const { strength = 0.2, radius = 100 } = options;
    const ref = useRef<T>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const element = ref.current;
            if (!element) return;

            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < radius) {
                setPosition({
                    x: distanceX * strength,
                    y: distanceY * strength,
                });
                setIsHovered(true);
            } else {
                setPosition({ x: 0, y: 0 });
                setIsHovered(false);
            }
        },
        [strength, radius]
    );

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const parent = element.parentElement || document;
        parent.addEventListener('mousemove', handleMouseMove as EventListener);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            parent.removeEventListener('mousemove', handleMouseMove as EventListener);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered
            ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
    };

    return { ref, style, isHovered };
}

// ============================================================================
// USE STAGGER CHILDREN HOOK
// Returns stagger delay values for animating lists of items
// ============================================================================
export function useStaggerDelay(
    index: number,
    baseDelay: number = 0,
    staggerAmount: number = 80
): number {
    return baseDelay + index * staggerAmount;
}

// ============================================================================
// SCROLL-TRIGGERED ANIMATION COMPONENT STYLES
// Utility function to generate animation styles
// ============================================================================
export function getScrollAnimationStyles(
    isVisible: boolean,
    variant: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeScale' = 'fadeUp',
    delay: number = 0
) {
    const variants = {
        fadeUp: {
            initial: { opacity: 0, transform: 'translateY(30px)' },
            animate: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeDown: {
            initial: { opacity: 0, transform: 'translateY(-30px)' },
            animate: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeLeft: {
            initial: { opacity: 0, transform: 'translateX(-30px)' },
            animate: { opacity: 1, transform: 'translateX(0)' },
        },
        fadeRight: {
            initial: { opacity: 0, transform: 'translateX(30px)' },
            animate: { opacity: 1, transform: 'translateX(0)' },
        },
        fadeScale: {
            initial: { opacity: 0, transform: 'scale(0.95)' },
            animate: { opacity: 1, transform: 'scale(1)' },
        },
    };

    const selected = variants[variant];

    return {
        ...(isVisible ? selected.animate : selected.initial),
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'transform, opacity',
    } as React.CSSProperties;
}

// ============================================================================
// USE SCROLL PROGRESS HOOK
// Returns scroll progress from 0 to 1 for the viewport
// ============================================================================
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(Math.min(1, Math.max(0, scrollProgress)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
}

// ============================================================================
// USE NAVBAR SCROLL EFFECT HOOK
// Returns scroll-based navbar styling values
// ============================================================================
export function useNavbarScroll(scrollThreshold: number = 50) {
    const [scrolled, setScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setScrolled(currentScrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollThreshold]);

    return { scrolled, scrollY };
}
