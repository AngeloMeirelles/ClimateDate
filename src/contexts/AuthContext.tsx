"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string, accountType: AccountType) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("climatedate_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const persist = (u: User | null) => {
    if (u) {
      localStorage.setItem("climatedate_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("climatedate_user");
    }
    setUser(u);
  };

  const login = (email: string, _password: string) => {
    const u: User = {
      name: email.split("@")[0],
      email,
      accountType: "comum",
      region: "Centro",
      notifications: true,
    };
    persist(u);
  };

  const register = (name: string, email: string, _password: string, accountType: AccountType) => {
    const u: User = { name, email, accountType, region: "Centro", notifications: true };
    persist(u);
  };

  const logout = () => persist(null);

  const updateProfile = (updates: Partial<User>) => {
    if (user) persist({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
