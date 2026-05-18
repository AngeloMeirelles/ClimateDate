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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-800">{user?.name ?? "Usuário"}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Mail className="h-4 w-4" />
              <span className="truncate">{user?.email ?? "email@exemplo.com"}</span>
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                  accountType === "avancada"
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h3 className="text-lg font-bold text-gray-800">Configurações</h3>

        {/* Region */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="h-4 w-4 text-teal-500" />
            Região
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            {notifications ? (
              <Bell className="h-4 w-4 text-teal-500" />
            ) : (
              <BellOff className="h-4 w-4 text-gray-400" />
            )}
            Notificações
          </label>
          <button
            onClick={() => setNotifications((prev) => !prev)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              notifications ? "bg-teal-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                notifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <p className="text-xs text-gray-400 mt-1.5">
            {notifications
              ? "Você receberá alertas climáticos e atualizações."
              : "Notificações desativadas."}
          </p>
        </div>

        {/* Account Type Toggle */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="h-4 w-4 text-teal-500" />
            Tipo de Conta
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setAccountType("comum")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                accountType === "comum"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Shield className="h-4 w-4" />
              Comum
            </button>
            <button
              onClick={() => setAccountType("avancada")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                accountType === "avancada"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-sm"
          >
            <Save className="h-4 w-4" />
            Salvar alterações
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium animate-pulse">
              <CheckCircle2 className="h-4 w-4" />
              Salvo com sucesso!
            </span>
          )}
        </div>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          Este é um protótipo de demonstração. Alterne entre conta comum e avançada para testar
          funcionalidades diferentes.
        </p>
      </div>
    </div>
  );
}
