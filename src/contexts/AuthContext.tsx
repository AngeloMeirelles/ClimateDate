"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type AccountType = "comum" | "avancada";

interface User {
  name: string;
  email: string;
  accountType: AccountType;
  region: string;
  notifications: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string, accountType: AccountType) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const STORAGE_KEY = "climatedate_user";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const persist = useCallback((u: User | null) => {
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(u);
  }, []);

  const login = useCallback((email: string, _password: string) => {
    const u: User = {
      name: email.split("@")[0],
      email,
      accountType: "comum",
      region: "Centro",
      notifications: true,
    };
    persist(u);
  }, [persist]);

  const register = useCallback((name: string, email: string, _password: string, accountType: AccountType) => {
    const u: User = { name, email, accountType, region: "Centro", notifications: true };
    persist(u);
  }, [persist]);

  const logout = useCallback(() => persist(null), [persist]);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
