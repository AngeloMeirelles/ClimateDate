"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  AlertTriangle,
  FileText,
  BookOpen,
  Phone,
  Recycle,
  UserCircle,
  LogOut,
  Menu,
  X,
  CloudSun,
  Lock,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, advancedOnly: false },
  { href: "/mapa", label: "Mapa Climático", icon: Map, advancedOnly: false },
  { href: "/alertas", label: "Alertas", icon: AlertTriangle, advancedOnly: false },
  { href: "/relatorios", label: "Relatórios", icon: FileText, advancedOnly: true },
  { href: "/educacao", label: "Educação Ambiental", icon: BookOpen, advancedOnly: false },
  { href: "/contatos", label: "Contatos Públicos", icon: Phone, advancedOnly: false },
  { href: "/reciclagem", label: "Reciclagem", icon: Recycle, advancedOnly: false },
  { href: "/perfil", label: "Perfil", icon: UserCircle, advancedOnly: false },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isAdvanced = user?.accountType === "avancada";

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg border border-emerald-100"
        aria-label="Menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-md border-r border-emerald-100 shadow-xl z-40 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 px-6 py-5 border-b border-emerald-50">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
            <CloudSun size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">ClimateDate</h1>
            <p className="text-[10px] text-teal-600 font-medium tracking-wide uppercase">Monitoramento Climático</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const locked = item.advancedOnly && !isAdvanced;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-200"
                    : locked
                    ? "text-gray-400 hover:bg-gray-50"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-teal-700"
                }`}
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {locked && <Lock size={13} className="text-gray-300" />}
                {item.advancedOnly && isAdvanced && !active && (
                  <Zap size={13} className="text-purple-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        {user && (
          <div className="p-4 border-t border-emerald-50">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                isAdvanced
                  ? "bg-gradient-to-br from-purple-500 to-indigo-500"
                  : "bg-gradient-to-br from-teal-400 to-emerald-400"
              }`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md ${
                  isAdvanced
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {isAdvanced ? <><Zap size={9} /> Avançada</> : "Comum"}
                </span>
              </div>
            </div>
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
