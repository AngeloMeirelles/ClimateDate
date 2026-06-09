"use client";

import {
  Shield,
  Users,
  AlertTriangle,
  MapPin,
  FileText,
  Zap,
  ChevronRight,
  Activity,
  TrendingUp,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatSummaryCard from "@/components/StatSummaryCard";
import AccessBlocked from "@/components/AccessBlocked";
import { useAuth } from "@/contexts/AuthContext";
import {
  riskOverview,
  statusConfig,
  recommendedActions,
  managementStats,
} from "@/data/mockPublicManagement";

const priorityColors: Record<string, string> = {
  urgente: "text-red-400 bg-red-500/15 border-red-500/20",
  alta: "text-orange-400 bg-orange-500/15 border-orange-500/20",
  media: "text-amber-400 bg-amber-500/15 border-amber-500/20",
  baixa: "text-emerald-400 bg-emerald-500/15 border-emerald-500/20",
};

export default function GestaoPage() {
  const { user } = useAuth();
  const isAdvanced = user?.accountType === "avancada";

  if (!isAdvanced) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Gestão Pública"
          description="Painel de controle para gestores públicos e analistas."
        />
        <AccessBlocked
          title="Painel exclusivo para Gestores"
          description="O Painel de Gestão Pública está disponível apenas para contas do tipo Avançada (gestores, pesquisadores e analistas). Faça o upgrade para acessar."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão Pública"
        description="Visão geral de riscos, alertas e ações recomendadas para gestores."
        action={
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Zap size={13} />
            Painel do Gestor
          </span>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatSummaryCard title="Pop. em Risco" value={managementStats.totalPopulationAtRisk} icon={<Users size={20} />} color="text-red-400" />
        <StatSummaryCard title="Alertas Críticos" value={managementStats.criticalAlerts} icon={<AlertTriangle size={20} />} color="text-orange-400" />
        <StatSummaryCard title="Regiões em Atenção" value={managementStats.regionsAttention} icon={<MapPin size={20} />} color="text-amber-400" />
        <StatSummaryCard title="Relatórios Emitidos" value={managementStats.reportsIssued} icon={<FileText size={20} />} color="text-violet-400" />
      </div>

      {/* Risk Ranking */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-violet-400" />
          Ranking de Risco por Região
        </h3>
        <div className="space-y-3">
          {riskOverview.map((region, idx) => {
            const stCfg = statusConfig[region.status];
            return (
              <div key={region.region} className="flex items-center gap-4 p-4 bg-white/[0.04] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-sm font-bold text-white/60">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{region.region}</p>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${stCfg.bg} ${stCfg.color}`}>
                      {stCfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span><Users size={10} className="inline mr-1" />{region.population} hab.</span>
                    <span><AlertTriangle size={10} className="inline mr-1" />{region.activeAlerts} alertas</span>
                    <span>{region.mainRisk}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${region.riskScore > 70 ? "text-red-400" : region.riskScore > 40 ? "text-amber-400" : "text-emerald-400"}`}>
                    {region.riskScore}
                  </p>
                  <p className="text-[10px] text-white/30">Score</p>
                </div>
                <div className="w-24 hidden sm:block">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${region.riskScore > 70 ? "bg-red-500" : region.riskScore > 40 ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${region.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
          <Shield size={16} className="text-violet-400" />
          Ações Recomendadas
        </h3>
        <div className="space-y-3">
          {recommendedActions.map((action) => {
            const pColor = priorityColors[action.priority] || priorityColors.baixa;
            return (
              <div key={action.id} className="flex items-start gap-4 p-4 bg-white/[0.04] rounded-xl hover:bg-white/[0.06] transition-colors">
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border shrink-0 ${pColor}`}>
                  {action.priority}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">{action.action}</p>
                  <p className="text-xs text-white/40 line-clamp-2">{action.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-white/30 mt-1.5">
                    <MapPin size={10} /> {action.region}
                  </span>
                </div>
                <ChevronRight size={16} className="text-white/20 shrink-0 mt-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
