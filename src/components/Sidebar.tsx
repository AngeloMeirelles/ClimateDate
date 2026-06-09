"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Map, AlertTriangle, BookOpen,
  Phone, LogOut, Menu, X, CloudSun, Lock, Zap,
  Bell, ArrowLeftRight, Calendar, Shield, MessageSquare, Search,
  Sun, FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SearchModal from "@/components/SearchModal";
import { defaultNotifications } from "@/data/mockNotifications";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  advancedOnly: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  advancedOnly?: boolean;
}

const navGroups: NavGroup[] = [
  {
    title: "Principal",
    items: [
      { href: "/dashboard", label: "Hoje", icon: Sun, advancedOnly: false },
      { href: "/mapa", label: "Mapa", icon: Map, advancedOnly: false },
      { href: "/alertas", label: "Alertas", icon: AlertTriangle, advancedOnly: false },
      { href: "/notificacoes", label: "Notificações", icon: Bell, advancedOnly: false },
    ],
  },
  {
    title: "Explorar",
    items: [
      { href: "/historico", label: "Histórico Climático", icon: Calendar, advancedOnly: false },
      { href: "/comparador", label: "Comparador", icon: ArrowLeftRight, advancedOnly: false },
    ],
  },
  {
    title: "Comunidade",
    items: [
      { href: "/ocorrencias", label: "Reportar Ocorrência", icon: MessageSquare, advancedOnly: false },
      { href: "/educacao", label: "Educação Ambiental", icon: BookOpen, advancedOnly: false },
      { href: "/contatos", label: "Contatos Públicos", icon: Phone, advancedOnly: false },
    ],
  },
  {
    title: "Central Técnica",
    advancedOnly: true,
    items: [
      { href: "/relatorios", label: "Relatórios", icon: FileText, advancedOnly: true },
      { href: "/gestao", label: "Gestão Pública", icon: Shield, advancedOnly: true },
    ],
  },
];

const NOTIF_KEY = "climatedate_notifications";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const isAdvanced = user?.accountType === "avancada";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function updateCount() {
      try {
        const stored = localStorage.getItem(NOTIF_KEY);
        if (stored) {
          const notifs = JSON.parse(stored) as { read: boolean }[];
          if (Array.isArray(notifs)) {
            setUnreadCount(notifs.filter((n) => !n.read).length);
          }
        } else {
          setUnreadCount(defaultNotifications.filter((n) => !n.read).length);
        }
      } catch {
        setUnreadCount(0);
      }
    }
    updateCount();

    const onStorage = (e: StorageEvent) => {
      if (e.key === NOTIF_KEY) updateCount();
    };
    window.addEventListener("storage", onStorage);
    const interval = setInterval(updateCount, 10000);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

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

      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "rgba(15, 10, 30, 0.85)", backdropFilter: "blur(24px)", borderRight: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/dashboard" className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <CloudSun size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">ClimateDate</h1>
            <p className="text-[10px] text-violet-300 font-medium tracking-wide uppercase">Assistente Climático</p>
          </div>
        </Link>

        {/* Search Button */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/40 bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] hover:text-white/60 transition-all"
          >
            <Search size={15} />
            <span className="flex-1 text-left text-xs">Buscar...</span>
            <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/20 font-mono">Ctrl+K</kbd>
          </button>
        </div>

        <nav className="flex-1 py-2 px-3 overflow-y-auto">
          {navGroups.map((group) => {
            // Hide advanced-only groups from basic users
            if (group.advancedOnly && !isAdvanced) return null;

            return (
              <div key={group.title} className="mb-4">
                <h3 className="px-3 py-2 text-[10px] font-bold text-white/30 uppercase tracking-wider">
                  {group.title}
                  {group.advancedOnly && (
                    <Zap size={9} className="inline ml-1.5 text-violet-400" />
                  )}
                </h3>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const locked = item.advancedOnly && !isAdvanced;
                    const isNotif = item.href === "/notificacoes";

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          active
                            ? "bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white shadow-lg shadow-violet-500/20"
                            : locked
                            ? "text-white/25 hover:text-white/40 hover:bg-white/[0.03]"
                            : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                        }`}
                      >
                        <item.icon size={17} />
                        <span className="flex-1 truncate">{item.label}</span>
                        {isNotif && unreadCount > 0 && (
                          <span className="min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full px-1.5">
                            {unreadCount}
                          </span>
                        )}
                        {locked && <Lock size={13} className="text-white/20" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Section */}
        {user && (
          <div className="p-4 border-t border-white/5">
            <Link
              href="/perfil"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 mb-3 px-2 hover:bg-white/[0.04] rounded-xl py-1.5 transition-colors"
            >
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
                  {isAdvanced ? <><Zap size={9} /> Pro</> : "Básica"}
                </span>
              </div>
            </Link>
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

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
