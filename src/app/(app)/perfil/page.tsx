"use client";

import { useState } from "react";
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
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";

const regions = ["Centro", "Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste"];

export default function PerfilPage() {
  const { user, updateProfile } = useAuth();

  const [region, setRegion] = useState(user?.region ?? "Centro");
  const [notifications, setNotifications] = useState(user?.notifications ?? true);
  const [accountType, setAccountType] = useState(user?.accountType ?? "comum");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ region, notifications, accountType });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Perfil e Configurações"
        description="Gerencie suas informações pessoais e preferências do sistema."
      />

      {/* Profile Card */}
      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-violet-500/20">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white">{user?.name ?? "Usuário"}</h2>
            <div className="flex items-center gap-2 text-sm text-white/50 mt-1">
              <Mail className="h-4 w-4" />
              <span className="truncate">{user?.email ?? "email@exemplo.com"}</span>
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                  accountType === "avancada"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/20"
                    : "bg-white/[0.06] text-white/60 border border-white/10"
                }`}
              >
                {accountType === "avancada" ? (
                  <Zap className="h-3.5 w-3.5" />
                ) : (
                  <Shield className="h-3.5 w-3.5" />
                )}
                Conta {accountType === "avancada" ? "Avançada" : "Comum"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-white">Configurações</h3>

        {/* Region */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white/50 mb-2">
            <MapPin className="h-4 w-4 text-violet-400" />
            Região
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          >
            {regions.map((r) => (
              <option key={r} value={r} className="bg-gray-900 text-white">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white/50 mb-2">
            {notifications ? (
              <Bell className="h-4 w-4 text-violet-400" />
            ) : (
              <BellOff className="h-4 w-4 text-white/40" />
            )}
            Notificações
          </label>
          <button
            onClick={() => setNotifications((prev) => !prev)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              notifications ? "bg-violet-500" : "bg-white/20"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                notifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <p className="text-xs text-white/40 mt-1.5">
            {notifications
              ? "Você receberá alertas climáticos e atualizações."
              : "Notificações desativadas."}
          </p>
        </div>

        {/* Account Type Toggle */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white/50 mb-2">
            <User className="h-4 w-4 text-violet-400" />
            Tipo de Conta
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setAccountType("comum")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                accountType === "comum"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1]"
              }`}
            >
              <Shield className="h-4 w-4" />
              Comum
            </button>
            <button
              onClick={() => setAccountType("avancada")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                accountType === "avancada"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/20"
                  : "bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1]"
              }`}
            >
              <Zap className="h-4 w-4" />
              Avançada
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20 hover:opacity-90 transition-opacity"
          >
            <Save className="h-4 w-4" />
            Salvar alterações
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-300 font-medium animate-pulse">
              <CheckCircle2 className="h-4 w-4" />
              Salvo com sucesso!
            </span>
          )}
        </div>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
        <Info className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200">
          Este é um protótipo de demonstração. Alterne entre conta comum e avançada para testar
          funcionalidades diferentes.
        </p>
      </div>
    </div>
  );
}
