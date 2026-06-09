"use client";

import { useState, useEffect } from "react";
import {
  Send,
  Plus,
  Waves,
  TreePine,
  Mountain,
  Flame,
  ZapOff,
  HelpCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatSummaryCard from "@/components/StatSummaryCard";
import EmptyState from "@/components/EmptyState";
import {
  occurrenceTypeConfig,
  occurrenceStatusConfig,
  urgencyConfig,
  regionOptions,
  type Occurrence,
  type OccurrenceType,
  type OccurrenceStatus,
  type UrgencyLevel,
} from "@/data/mockOccurrences";

const STORAGE_KEY = "climatedate_occurrences";

const iconMap: Record<string, React.ElementType> = {
  Waves,
  TreePine,
  Mountain,
  Flame,
  ZapOff,
  HelpCircle,
};

function loadOccurrences(): Occurrence[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    console.warn("Failed to load occurrences from localStorage");
  }
  return [];
}

function saveOccurrences(occs: Occurrence[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(occs));
}

export default function OcorrenciasPage() {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formType, setFormType] = useState<OccurrenceType>("alagamento");
  const [formRegion, setFormRegion] = useState("Centro");
  const [formDesc, setFormDesc] = useState("");
  const [formUrgency, setFormUrgency] = useState<UrgencyLevel>("media");
  const [formUpdates, setFormUpdates] = useState(true);

  useEffect(() => {
    setOccurrences(loadOccurrences());
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const newOcc: Occurrence = {
      id: `occ-${Date.now()}`,
      type: formType,
      region: formRegion,
      description: formDesc,
      urgency: formUrgency,
      status: "recebido",
      wantsUpdates: formUpdates,
      createdAt: now.split("T")[0],
      updatedAt: now.split("T")[0],
    };
    const updated = [newOcc, ...occurrences];
    setOccurrences(updated);
    saveOccurrences(updated);

    // Simulate status progression using functional updater to avoid stale closure
    const newId = newOcc.id;
    setTimeout(() => {
      setOccurrences((prev) => {
        const progressed = prev.map((o) =>
          o.id === newId ? { ...o, status: "em_analise" as OccurrenceStatus, updatedAt: new Date().toISOString().split("T")[0] } : o
        );
        saveOccurrences(progressed);
        return progressed;
      });
    }, 5000);

    // Reset form
    setFormType("alagamento");
    setFormRegion("Centro");
    setFormDesc("");
    setFormUrgency("media");
    setFormUpdates(true);
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Reportar Ocorrência" />
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-2xl p-4 h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reportar Ocorrência"
        description="Registre ocorrências climáticas na sua região e acompanhe o status."
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow"
          >
            <Plus size={16} />
            Nova Ocorrência
          </button>
        }
      />

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-emerald-300">Ocorrência registrada com sucesso!</p>
            <p className="text-xs text-emerald-400/60">Sua ocorrência foi recebida e será analisada em breve.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatSummaryCard title="Total" value={occurrences.length} icon={<MessageSquare size={20} />} color="text-violet-400" />
        <StatSummaryCard title="Recebidas" value={occurrences.filter((o) => o.status === "recebido").length} icon={<Clock size={20} />} color="text-blue-400" />
        <StatSummaryCard title="Em Análise" value={occurrences.filter((o) => o.status === "em_analise").length} icon={<AlertTriangle size={20} />} color="text-amber-400" />
        <StatSummaryCard title="Resolvidas" value={occurrences.filter((o) => o.status === "resolvido").length} icon={<CheckCircle2 size={20} />} color="text-emerald-400" />
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-bold text-white">Nova Ocorrência</h3>

          {/* Type */}
          <div>
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 block">Tipo de Ocorrência</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.entries(occurrenceTypeConfig) as [OccurrenceType, { label: string; icon: string }][]).map(([key, cfg]) => {
                const Icon = iconMap[cfg.icon] || HelpCircle;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormType(key)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      formType === key
                        ? "bg-violet-600 text-white ring-1 ring-violet-400"
                        : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
                    }`}
                  >
                    <Icon size={14} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 block">Região</label>
            <select
              value={formRegion}
              onChange={(e) => setFormRegion(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition [&>option]:bg-gray-900 [&>option]:text-white"
            >
              {regionOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 block">Descrição</label>
            <textarea
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              required
              rows={3}
              placeholder="Descreva a ocorrência..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 block">Urgência</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(urgencyConfig) as [UrgencyLevel, { label: string; color: string; bg: string }][]).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormUrgency(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    formUrgency === key ? `${cfg.bg} ${cfg.color} ring-1 ring-current` : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Updates checkbox */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formUpdates}
              onChange={(e) => setFormUpdates(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/[0.06] accent-violet-500"
            />
            <span className="text-sm text-white/60">Desejo receber atualizações sobre esta ocorrência</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow"
          >
            <Send size={16} />
            Enviar Ocorrência
          </button>
        </form>
      )}

      {/* List */}
      {occurrences.length === 0 ? (
        <EmptyState
          icon={<MessageSquare size={28} className="text-white/40" />}
          title="Nenhuma ocorrência registrada"
          description="Clique em 'Nova Ocorrência' para registrar um evento climático na sua região."
        />
      ) : (
        <div className="space-y-3">
          {occurrences.map((occ) => {
            const typeCfg = occurrenceTypeConfig[occ.type];
            const statusCfg = occurrenceStatusConfig[occ.status];
            const urgCfg = urgencyConfig[occ.urgency];
            const Icon = iconMap[typeCfg.icon] || HelpCircle;
            const isExpanded = expandedId === occ.id;

            return (
              <div key={occ.id} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : occ.id)}
                  className="w-full text-left p-4 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 text-violet-400">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-white">{typeCfg.label}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${statusCfg.bg} ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${urgCfg.bg} ${urgCfg.color}`}>
                        {urgCfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/30">
                      <span className="flex items-center gap-1"><MapPin size={10} /> {occ.region}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {occ.createdAt}</span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
                    <p className="text-sm text-white/60">{occ.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span>Atualizado: {occ.updatedAt}</span>
                      {occ.wantsUpdates && <span className="text-violet-400">Recebendo atualizações</span>}
                    </div>

                    {/* Status Timeline */}
                    <div className="flex items-center gap-2 pt-2">
                      {(["recebido", "em_analise", "encaminhado", "resolvido"] as OccurrenceStatus[]).map((s, i) => {
                        const sCfg = occurrenceStatusConfig[s];
                        const statusIdx = ["recebido", "em_analise", "encaminhado", "resolvido"].indexOf(occ.status);
                        const isActive = i <= statusIdx;
                        return (
                          <div key={s} className="flex items-center gap-2 flex-1">
                            <div className={`w-3 h-3 rounded-full ${isActive ? sCfg.bg.replace("/15", "") : "bg-white/10"}`} />
                            <span className={`text-[10px] font-medium ${isActive ? sCfg.color : "text-white/20"}`}>{sCfg.label}</span>
                            {i < 3 && <div className={`flex-1 h-0.5 ${isActive ? "bg-violet-500/30" : "bg-white/5"}`} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
