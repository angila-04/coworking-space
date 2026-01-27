'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type UserRole = 'member' | 'admin' | 'provider' | null;

interface CartItem {
    spaceId: string;
    spaceName: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
}

interface StoreContextType {
    // User
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    userName: string;
    setUserName: (name: string) => void;
    isAuthenticated: boolean;
    login: (role: UserRole, name: string) => void;
    logout: () => void;

    // Cart
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (spaceId: string) => void;
    clearCart: () => void;
    cartTotal: number;

    // UI State
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    // User State
    const [userRole, setUserRole] = useState<UserRole>('member');
    const [userName, setUserName] = useState('Arjun Menon');
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // Cart State
    const [cart, setCart] = useState<CartItem[]>([]);

    // UI State
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const login = (role: UserRole, name: string) => {
        setUserRole(role);
        setUserName(name);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUserRole(null);
        setUserName('');
        setIsAuthenticated(false);
        setCart([]);
    };

    const addToCart = (item: CartItem) => {
        setCart(prev => [...prev, item]);
    };

    const removeFromCart = (spaceId: string) => {
        setCart(prev => prev.filter(item => item.spaceId !== spaceId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <StoreContext.Provider value={{
            userRole,
            setUserRole,
            userName,
            setUserName,
            isAuthenticated,
            login,
            logout,
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            cartTotal,
            sidebarOpen,
            setSidebarOpen
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
