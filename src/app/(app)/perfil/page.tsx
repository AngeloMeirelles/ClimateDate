"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Bell,
  BellOff,
  Shield,
  Zap,
  Save,
  CheckCircle2,
  Info,
  Star,
  X,
  Calendar,
  Clock,
  BarChart3,
  FileText,
  MessageSquare,
  Download,
  AlertTriangle,
  Activity,
  Eye,
  EyeOff,
  Pencil,
  Camera,
  Moon,
  Sun,
  Globe,
  Trash2,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StatSummaryCard from "@/components/StatSummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import { riskLevelConfig, type Region } from "@/data/mockRegions";

const FAVORITES_KEY = "climatedate_favorites";
const OCCURRENCES_KEY = "climatedate_occurrences";
const EXPORT_KEY = "climatedate_export_count";
const NOTIF_KEY = "climatedate_notifications";

const regionNames = ["São Paulo", "Rio de Janeiro", "Brasília", "Manaus", "Porto Alegre", "Recife", "Salvador", "Curitiba", "Belo Horizonte", "Fortaleza"];

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-indigo-500 to-violet-600",
];

export default function PerfilPage() {
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [region, setRegion] = useState(user?.region ?? "São Paulo");
  const [notifications, setNotifications] = useState(user?.notifications ?? true);
  const [accountType, setAccountType] = useState(user?.accountType ?? "comum");
  const [saved, setSaved] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [avatarColorIdx, setAvatarColorIdx] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<"geral" | "preferencias" | "dados">("geral");

  // Stats
  const [favorites, setFavorites] = useState<Region[]>([]);
  const [occurrenceCount, setOccurrenceCount] = useState(0);
  const [exportCount, setExportCount] = useState(0);
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  useEffect(() => {
    try {
      const fav = localStorage.getItem(FAVORITES_KEY);
      if (fav) {
        const parsed = JSON.parse(fav);
        if (Array.isArray(parsed) && (parsed.length === 0 || (typeof parsed[0] === "object" && parsed[0].latlng))) {
          setFavorites(parsed);
        }
      }
    } catch { console.warn("Failed to load favorites"); }

    try {
      const occ = localStorage.getItem(OCCURRENCES_KEY);
      if (occ) { const parsed = JSON.parse(occ); if (Array.isArray(parsed)) setOccurrenceCount(parsed.length); }
    } catch { /* empty */ }

    try {
      const exp = localStorage.getItem(EXPORT_KEY);
      if (exp) setExportCount(parseInt(exp, 10) || 0);
    } catch { /* empty */ }

    try {
      const notif = localStorage.getItem(NOTIF_KEY);
      if (notif) { const parsed = JSON.parse(notif); if (Array.isArray(parsed)) setUnreadNotifs(parsed.filter((n: { read: boolean }) => !n.read).length); }
    } catch { /* empty */ }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const handleSave = () => {
    updateProfile({ name, email, region, notifications, accountType });
    setSaved(true);
    setEditingProfile(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearData = () => {
    localStorage.removeItem(FAVORITES_KEY);
    localStorage.removeItem(OCCURRENCES_KEY);
    localStorage.removeItem(EXPORT_KEY);
    localStorage.removeItem(NOTIF_KEY);
    setFavorites([]);
    setOccurrenceCount(0);
    setExportCount(0);
    setUnreadNotifs(0);
    setShowDeleteConfirm(false);
  };

  const initials = (name || user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = "Maio 2026";
  const isAdvanced = accountType === "avancada";

  const tabs = [
    { id: "geral" as const, label: "Geral", icon: User },
    { id: "preferencias" as const, label: "Preferências", icon: Activity },
    { id: "dados" as const, label: "Dados e Privacidade", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Perfil e Configurações"
        description="Gerencie suas informações pessoais, preferências e dados."
      />

      {/* ═══ PROFILE HEADER CARD ═══ */}
      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-violet-600/40 via-purple-600/30 to-cyan-600/20 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-50" />
        </div>

        {/* Profile info */}
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Avatar */}
            <div className="relative group">
              <div className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${avatarColors[avatarColorIdx]} flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-[#0f0a1e]`}>
                {initials}
              </div>
              <button
                onClick={() => setAvatarColorIdx((prev) => (prev + 1) % avatarColors.length)}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Trocar cor"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              {editingProfile ? (
                <div className="space-y-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xl font-bold text-white bg-white/[0.06] border border-white/10 rounded-xl px-3 py-1.5 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Seu nome"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm text-white/70 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-1.5 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Seu e-mail"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white">{name || user?.name || "Usuário"}</h2>
                  <div className="flex items-center gap-2 text-sm text-white/40 mt-0.5">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{email || user?.email || "email@exemplo.com"}</span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                  isAdvanced
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/20"
                    : "bg-white/[0.06] text-white/60 border border-white/10"
                }`}>
                  {isAdvanced ? <Zap className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
                  Conta {isAdvanced ? "Avançada" : "Comum"}
                </span>
                <span className="flex items-center gap-1 text-xs text-white/25">
                  <Calendar size={11} /> Membro desde {memberSince}
                </span>
              </div>
            </div>

            <button
              onClick={() => setEditingProfile(!editingProfile)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1] hover:text-white transition-all"
            >
              <Pencil size={13} />
              {editingProfile ? "Cancelar" : "Editar Perfil"}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ STATS ROW ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatSummaryCard title="Locais Monitorados" value={favorites.length} icon={<Star size={20} />} color="text-amber-400" />
        <StatSummaryCard title="Ocorrências" value={occurrenceCount} icon={<MessageSquare size={20} />} color="text-violet-400" />
        <StatSummaryCard title="Exportações" value={exportCount} icon={<Download size={20} />} color="text-cyan-400" />
        <StatSummaryCard title="Notif. não lidas" value={unreadNotifs} icon={<Bell size={20} />} color="text-red-400" />
      </div>

      {/* ═══ TABS ═══ */}
      <div className="flex gap-1 bg-white/[0.04] rounded-xl p-1 border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 flex-1 justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
            }`}
          >
            <tab.icon size={15} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ TAB: GERAL ═══ */}
      {activeTab === "geral" && (
        <div className="space-y-6">
          {/* Settings Form */}
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Activity size={16} className="text-violet-400" />
              Configurações da Conta
            </h3>

            {/* Region */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">
                <MapPin className="h-3.5 w-3.5 text-violet-400" />
                Região Principal
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition [&>option]:bg-gray-900 [&>option]:text-white"
              >
                {regionNames.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <p className="text-[10px] text-white/25 mt-1.5">Selecione sua cidade principal para receber alertas relevantes.</p>
            </div>

            {/* Notifications */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">
                {notifications ? <Bell className="h-3.5 w-3.5 text-violet-400" /> : <BellOff className="h-3.5 w-3.5 text-white/30" />}
                Notificações
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setNotifications((prev) => !prev)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${notifications ? "bg-violet-500" : "bg-white/20"}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${notifications ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <p className="text-xs text-white/40">
                  {notifications ? "Alertas climáticos e atualizações ativados." : "Notificações desativadas."}
                </p>
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">
                <User className="h-3.5 w-3.5 text-violet-400" />
                Tipo de Conta
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  onClick={() => setAccountType("comum")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all border ${
                    accountType === "comum"
                      ? "bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-violet-500/30 text-white ring-1 ring-violet-500/30"
                      : "bg-white/[0.03] border-white/10 text-white/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <Shield className="h-6 w-6" />
                  <span className="font-semibold">Comum</span>
                  <span className="text-[10px] text-white/30 text-center leading-tight">Dashboard, mapa, alertas, educação</span>
                </button>
                <button
                  onClick={() => setAccountType("avancada")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all border ${
                    accountType === "avancada"
                      ? "bg-gradient-to-br from-purple-600/20 to-violet-600/20 border-purple-500/30 text-white ring-1 ring-purple-500/30"
                      : "bg-white/[0.03] border-white/10 text-white/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <Zap className="h-6 w-6" />
                  <span className="font-semibold">Avançada</span>
                  <span className="text-[10px] text-white/30 text-center leading-tight">Tudo + relatórios, gestão pública</span>
                </button>
              </div>
            </div>

            {/* Save */}
            <div className="flex items-center gap-4 pt-2 border-t border-white/5">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all"
              >
                <Save className="h-4 w-4" />
                Salvar alterações
              </button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-300 font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  Salvo com sucesso!
                </span>
              )}
            </div>
          </div>

          {/* Favorite Regions */}
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Star size={16} className="text-amber-400" />
                Locais Monitorados ({favorites.length})
              </h3>
              <Link href="/mapa" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                + Adicionar no mapa
              </Link>
            </div>
            {favorites.length === 0 ? (
              <div className="text-center py-8 bg-white/[0.02] rounded-xl border border-dashed border-white/10">
                <Star size={28} className="text-white/15 mx-auto mb-3" />
                <p className="text-sm text-white/40">Nenhum local monitorado</p>
                <p className="text-xs text-white/20 mt-1 max-w-xs mx-auto">Acesse o Mapa Climático, busque uma cidade e clique na estrela para começar a monitorar.</p>
                <Link href="/mapa" className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl text-xs font-medium bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 transition-colors">
                  <MapPin size={13} />
                  Ir para o mapa
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {favorites.map((r) => {
                  const cfg = riskLevelConfig[r.riskLevel];
                  return (
                    <div key={r.id} className="flex items-center justify-between p-3 bg-white/[0.04] rounded-xl hover:bg-white/[0.06] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cfg?.mapColor || '#a78bfa'}20` }}>
                          <MapPin size={14} style={{ color: cfg?.mapColor || '#a78bfa' }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{r.name}</p>
                          <div className="flex items-center gap-2 text-[10px] text-white/30 mt-0.5">
                            <span>{r.temperature}°C</span>
                            <span>·</span>
                            <span>AQI {r.airQuality}</span>
                            <span>·</span>
                            <span className={cfg?.color || ""}>{cfg?.label || r.riskLevel}</span>
                            {r.alerts.length > 0 && (
                              <>
                                <span>·</span>
                                <span className="text-red-400 flex items-center gap-0.5"><AlertTriangle size={9} />{r.alerts.length} alerta(s)</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFavorite(r.id)}
                        className="p-1.5 rounded-lg bg-white/[0.04] text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                        title="Remover"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ TAB: PREFERÊNCIAS ═══ */}
      {activeTab === "preferencias" && (
        <div className="space-y-6">
          {/* Notification preferences */}
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Bell size={16} className="text-violet-400" />
              Preferências de Notificação
            </h3>
            {[
              { label: "Alertas climáticos críticos", desc: "Tempestades, enchentes, ondas de calor", enabled: true, icon: AlertTriangle },
              { label: "Atualizações de relatórios", desc: "Quando novos relatórios forem publicados", enabled: notifications, icon: FileText },
              { label: "Mudanças na qualidade do ar", desc: "Quando o AQI ultrapassar níveis seguros", enabled: true, icon: Activity },
              { label: "Riscos na região monitorada", desc: "Alertas para seus locais favoritos", enabled: notifications, icon: MapPin },
              { label: "Conteúdos educativos", desc: "Novos materiais de educação ambiental", enabled: false, icon: Globe },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-white/30" />
                  <div>
                    <p className="text-sm text-white/80 font-medium">{item.label}</p>
                    <p className="text-[10px] text-white/30">{item.desc}</p>
                  </div>
                </div>
                <div className={`w-9 h-5 rounded-full flex items-center transition-colors ${item.enabled ? "bg-violet-500" : "bg-white/15"}`}>
                  <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${item.enabled ? "translate-x-4.5 ml-auto mr-0.5" : "ml-0.5"}`} />
                </div>
              </div>
            ))}
            <p className="text-[10px] text-white/15 flex items-center gap-1 pt-1">
              <Info size={10} /> Configuração simulada — as notificações não são enviadas de fato.
            </p>
          </div>

          {/* Display preferences */}
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Eye size={16} className="text-violet-400" />
              Exibição
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-2">
                  <Moon size={14} className="text-violet-400" />
                  <span className="text-sm text-white/70">Tema Escuro</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md font-semibold">Ativo</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-violet-400" />
                  <span className="text-sm text-white/70">Idioma</span>
                </div>
                <span className="text-[10px] text-white/40 bg-white/[0.06] px-2 py-0.5 rounded-md font-semibold">Português (BR)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-violet-400" />
                  <span className="text-sm text-white/70">Fuso Horário</span>
                </div>
                <span className="text-[10px] text-white/40 bg-white/[0.06] px-2 py-0.5 rounded-md font-semibold">GMT-3 (Brasília)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-violet-400" />
                  <span className="text-sm text-white/70">Unidade de Temperatura</span>
                </div>
                <span className="text-[10px] text-white/40 bg-white/[0.06] px-2 py-0.5 rounded-md font-semibold">°C (Celsius)</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Activity size={16} className="text-violet-400" />
              Atalhos Rápidos
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Notificações", href: "/notificacoes", icon: Bell, count: unreadNotifs },
                { label: "Ocorrências", href: "/ocorrencias", icon: MessageSquare, count: occurrenceCount },
                { label: "Relatórios", href: "/relatorios", icon: FileText, count: null },
                { label: "Mapa", href: "/mapa", icon: MapPin, count: null },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-violet-500/20 transition-all text-center group"
                >
                  <div className="relative">
                    <link.icon size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                    {link.count !== null && link.count > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 flex items-center justify-center text-[9px] font-bold bg-red-500 text-white rounded-full px-1">{link.count}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-white/40 group-hover:text-white/70 transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB: DADOS E PRIVACIDADE ═══ */}
      {activeTab === "dados" && (
        <div className="space-y-6">
          {/* Stored data summary */}
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Shield size={16} className="text-violet-400" />
              Dados Armazenados Localmente
            </h3>
            <p className="text-xs text-white/30">Todos os seus dados são armazenados apenas no navegador (localStorage). Nenhum dado é enviado para servidores externos.</p>

            <div className="space-y-2">
              {[
                { label: "Dados do perfil", key: "climatedate_user", desc: "Nome, e-mail, região, tipo de conta" },
                { label: "Locais monitorados", key: FAVORITES_KEY, desc: `${favorites.length} local(is) salvo(s)` },
                { label: "Ocorrências registradas", key: OCCURRENCES_KEY, desc: `${occurrenceCount} ocorrência(s)` },
                { label: "Notificações", key: NOTIF_KEY, desc: `${unreadNotifs} não lida(s)` },
                { label: "Exportações", key: EXPORT_KEY, desc: `${exportCount} exportação(ões) realizada(s)` },
              ].map((item) => {
                const hasData = !!localStorage.getItem(item.key);
                return (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl">
                    <div>
                      <p className="text-sm text-white/70 font-medium">{item.label}</p>
                      <p className="text-[10px] text-white/25">{item.desc}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${hasData ? "bg-emerald-500/15 text-emerald-400" : "bg-white/[0.06] text-white/20"}`}>
                      {hasData ? "Salvo" : "Vazio"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-red-400/80 flex items-center gap-2">
              <AlertTriangle size={16} />
              Zona de Perigo
            </h3>

            <div className="space-y-3">
              {/* Clear local data */}
              <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
                <div>
                  <p className="text-sm text-white/70 font-medium">Limpar dados locais</p>
                  <p className="text-[10px] text-white/25">Remove favoritos, ocorrências, notificações e exportações. O perfil é mantido.</p>
                </div>
                {showDeleteConfirm ? (
                  <div className="flex items-center gap-2">
                    <button onClick={handleClearData} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-500 transition-colors">
                      Confirmar
                    </button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-white/50 hover:bg-white/[0.1] transition-colors">
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={12} />
                    Limpar
                  </button>
                )}
              </div>

              {/* Logout */}
              <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
                <div>
                  <p className="text-sm text-white/70 font-medium">Sair da conta</p>
                  <p className="text-[10px] text-white/25">Encerrar sessão e voltar à tela de login.</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                  <LogOut size={12} />
                  Sair
                </button>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-3 bg-violet-500/5 border border-violet-500/15 rounded-2xl p-4">
            <Info className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-violet-200/70 font-medium">Protótipo Acadêmico</p>
              <p className="text-xs text-white/30 mt-1">
                Este é um protótipo de demonstração. Todos os dados são fictícios e armazenados apenas no seu navegador.
                Alterne entre conta comum e avançada na aba Geral para testar funcionalidades diferentes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
