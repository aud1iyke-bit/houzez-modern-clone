'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, Property } from '@/types';

interface AppContextType {
  currentUser: UserSession;
  setCurrentUser: (user: UserSession) => void;
  usersList: UserSession[];
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  comparedProperties: string[];
  addToCompare: (propertyId: string) => void;
  removeFromCompare: (propertyId: string) => void;
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;
  currency: 'EUR' | 'USD';
  setCurrency: (c: 'EUR' | 'USD') => void;
  formatPrice: (price: number, suffix?: string) => string;
}

const mockUsers: UserSession[] = [
  {
    id: 'agent-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@houzez-realestate.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    agentId: 'agent-1'
  },
  {
    id: 'agent-2',
    name: 'Sofia Valenzuela',
    email: 'sofia.valenzuela@houzez-realestate.com',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    agentId: 'agent-2'
  },
  {
    id: 'buyer-1',
    name: 'Alejandro Gómez',
    email: 'alejandro.gomez@gmail.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserSession>(mockUsers[0]);
  const [favorites, setFavorites] = useState<string[]>(['prop-1', 'prop-2']);
  const [comparedProperties, setComparedProperties] = useState<string[]>(['prop-1']);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('houzez_favs');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      const storedCompare = localStorage.getItem('houzez_compare');
      if (storedCompare) setComparedProperties(JSON.parse(storedCompare));

      const storedUser = localStorage.getItem('houzez_user');
      if (storedUser) {
        const found = mockUsers.find(u => u.id === storedUser);
        if (found) setCurrentUser(found);
      }
    } catch (e) {
      // Ignore SSR / localStorage issues
    }
  }, []);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      try {
        localStorage.setItem('houzez_favs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const addToCompare = (propertyId: string) => {
    setComparedProperties(prev => {
      if (prev.includes(propertyId)) return prev;
      if (prev.length >= 4) {
        alert('Puedes comparar un máximo de 4 propiedades simultáneamente.');
        return prev;
      }
      const updated = [...prev, propertyId];
      try {
        localStorage.setItem('houzez_compare', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeFromCompare = (propertyId: string) => {
    setComparedProperties(prev => {
      const updated = prev.filter(id => id !== propertyId);
      try {
        localStorage.setItem('houzez_compare', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isInCompare = (propertyId: string) => comparedProperties.includes(propertyId);

  const clearCompare = () => {
    setComparedProperties([]);
    try {
      localStorage.removeItem('houzez_compare');
    } catch (e) {}
  };

  const handleSetCurrentUser = (user: UserSession) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('houzez_user', user.id);
    } catch (e) {}
  };

  const formatPrice = (price: number, suffix?: string) => {
    const symbol = currency === 'EUR' ? '€' : '$';
    const rate = currency === 'USD' ? 1.08 : 1;
    const finalAmount = Math.round(price * rate);
    const formatted = new Intl.NumberFormat('es-ES').format(finalAmount);
    return `${formatted} ${symbol}${suffix ? ` ${suffix}` : ''}`;
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser: handleSetCurrentUser,
      usersList: mockUsers,
      favorites,
      toggleFavorite,
      isFavorite,
      comparedProperties,
      addToCompare,
      removeFromCompare,
      isInCompare,
      clearCompare,
      currency,
      setCurrency,
      formatPrice
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
