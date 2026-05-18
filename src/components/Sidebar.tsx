"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Map, AlertTriangle, FileText, BookOpen,
  Phone, Recycle, UserCircle, LogOut, Menu, X, CloudSun, Lock, Zap,
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
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden glass-strong p-2.5 rounded-xl"
        aria-label="Menu"
      >
        {open ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "rgba(15, 10, 30, 0.85)", backdropFilter: "blur(24px)", borderRight: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/dashboard" className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <CloudSun size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">ClimateDate</h1>
            <p className="text-[10px] text-violet-300 font-medium tracking-wide uppercase">Monitoramento Climático</p>
          </div>
        </Link>

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
                    ? "bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white shadow-lg shadow-violet-500/20"
                    : locked
                    ? "text-white/25 hover:text-white/40 hover:bg-white/[0.03]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {locked && <Lock size={13} className="text-white/20" />}
                {item.advancedOnly && isAdvanced && !active && <Zap size={13} className="text-violet-400" />}
              </Link>
            );
          })}
        </nav>

        {user && (
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                isAdvanced ? "bg-gradient-to-br from-violet-500 to-purple-600" : "bg-gradient-to-br from-cyan-500 to-blue-600"
              }`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md ${
                  isAdvanced ? "bg-violet-500/20 text-violet-300" : "bg-white/10 text-white/40"
                }`}>
                  {isAdvanced ? <><Zap size={9} /> Avançada</> : "Comum"}
                </span>
              </div>
            </div>
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
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
