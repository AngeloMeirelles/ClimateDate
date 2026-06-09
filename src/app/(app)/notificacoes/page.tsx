"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Inbox,
  Check,
  CheckCheck,
  AlertTriangle,
  FileText,
  Wind,
  MapPin,
  BookOpen,
  Clock,
  Filter,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatSummaryCard from "@/components/StatSummaryCard";
import EmptyState from "@/components/EmptyState";
import {
  defaultNotifications,
  notificationTypeConfig,
  priorityConfig,
  type Notification,
  type NotificationType,
  type NotificationPriority,
} from "@/data/mockNotifications";

const STORAGE_KEY = "climatedate_notifications";

const typeIcons: Record<NotificationType, React.ElementType> = {
  alerta_climatico: AlertTriangle,
  atualizacao_relatorio: FileText,
  qualidade_ar: Wind,
  risco_regiao: MapPin,
  aviso_educativo: BookOpen,
};

type StatusFilter = "todos" | "nao_lidas" | "lidas";

function loadNotifications(): Notification[] {
  if (typeof window === "undefined") return defaultNotifications;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].priority) {
        return parsed;
      }
    }
  } catch {
    console.warn("Failed to load notifications from localStorage");
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotifications));
  return defaultNotifications;
}

function saveNotifications(notifs: Notification[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs));
}

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [typeFilter, setTypeFilter] = useState<NotificationType | "todos">("todos");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [priorityFilter, setPriorityFilter] = useState<NotificationPriority | "todos">("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNotifications(loadNotifications());
    setLoading(false);
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const urgentCount = notifications.filter((n) => (n.priority === "urgente" || n.priority === "alta") && !n.read).length;

  const filtered = notifications.filter((n) => {
    if (typeFilter !== "todos" && n.type !== typeFilter) return false;
    if (statusFilter === "nao_lidas" && n.read) return false;
    if (statusFilter === "lidas" && !n.read) return false;
    if (priorityFilter !== "todos" && n.priority !== priorityFilter) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Notificações" />
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
              <div className="w-11 h-11 bg-white/10 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-white/10 rounded" />
                <div className="h-3 w-1/2 bg-white/[0.06] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Notificações"
        description="Acompanhe alertas, atualizações e avisos climáticos."
        action={
          unreadCount > 0 ? (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow"
            >
              <CheckCheck size={16} />
              Marcar todas como lidas
            </button>
          ) : null
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatSummaryCard title="Não lidas" value={unreadCount} icon={<Bell size={20} />} color="text-red-400" />
        <StatSummaryCard title="Total" value={notifications.length} icon={<Inbox size={20} />} color="text-violet-400" />
        <StatSummaryCard title="Urgentes" value={urgentCount} icon={<Zap size={20} />} color="text-orange-400" />
        <StatSummaryCard title="Regiões" value={new Set(notifications.map((n) => n.region)).size} icon={<MapPin size={20} />} color="text-cyan-400" />
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-5 space-y-4">
        {/* Status filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Eye size={14} className="text-white/40" />
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wide">Status</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {([
              { value: "todos" as StatusFilter, label: "Todos", icon: Inbox },
              { value: "nao_lidas" as StatusFilter, label: "Não lidas", icon: EyeOff },
              { value: "lidas" as StatusFilter, label: "Lidas", icon: Eye },
            ]).map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === s.value
                    ? "bg-violet-600 text-white"
                    : "bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.1]"
                }`}
              >
                <s.icon size={12} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-white/40" />
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wide">Prioridade</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPriorityFilter("todos")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                priorityFilter === "todos" ? "bg-violet-600 text-white" : "bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.1]"
              }`}
            >
              Todos
            </button>
            {(Object.keys(priorityConfig) as NotificationPriority[]).map((p) => {
              const cfg = priorityConfig[p];
              return (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    priorityFilter === p ? `${cfg.bg} ${cfg.color}` : "bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.1]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Type filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter size={14} className="text-white/40" />
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wide">Tipo</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTypeFilter("todos")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                typeFilter === "todos" ? "bg-violet-600 text-white" : "bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.1]"
              }`}
            >
              Todos
            </button>
            {(Object.keys(notificationTypeConfig) as NotificationType[]).map((type) => {
              const cfg = notificationTypeConfig[type];
              return (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    typeFilter === type ? `${cfg.bg} ${cfg.color}` : "bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.1]"
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/30">
          {filtered.length} {filtered.length === 1 ? "notificação" : "notificações"} encontrada{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Notification List */}
      {filtered.length === 0 ? (
        <EmptyState icon={<Bell size={28} className="text-white/40" />} title="Nenhuma notificação" description="Não há notificações para os filtros selecionados." />
      ) : (
        <div className="space-y-3">
          {filtered.map((notif) => {
            const cfg = notificationTypeConfig[notif.type];
            const pCfg = priorityConfig[notif.priority];
            const Icon = typeIcons[notif.type];
            return (
              <div key={notif.id} className={`glass rounded-2xl overflow-hidden transition-all ${!notif.read ? "ring-1 ring-violet-500/30 bg-white/[0.08]" : ""}`}>
                <div className={`h-0.5 ${!notif.read ? "bg-gradient-to-r from-violet-500 to-purple-500" : "bg-white/5"}`} />
                <div className="p-4 flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className={`text-sm font-semibold ${!notif.read ? "text-white" : "text-white/70"}`}>{notif.title}</h3>
                      {!notif.read && <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />}
                    </div>
                    <p className="text-sm text-white/50 mb-2 line-clamp-2">{notif.message}</p>
                    <div className="flex items-center gap-2 text-xs text-white/30 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${pCfg.bg} ${pCfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${pCfg.dot}`} />
                        {pCfg.label}
                      </span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {notif.region}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {notif.date} {notif.time}</span>
                    </div>
                  </div>
                  {!notif.read && (
                    <button onClick={() => markAsRead(notif.id)} className="shrink-0 p-2 rounded-lg bg-white/[0.06] hover:bg-violet-500/20 text-white/40 hover:text-violet-400 transition-all" title="Marcar como lida">
                      <Check size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
