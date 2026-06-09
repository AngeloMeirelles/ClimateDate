"use client";

import { useState } from "react";
import {
  ArrowLeftRight,
  Thermometer,
  Droplets,
  Wind,
  Waves,
  Sun,
  TrendingUp,
  Minus,
  Info,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { regions, riskLevelConfig } from "@/data/mockRegions";
import { regionComparison } from "@/data/mockClimateData";

const tooltipStyle = {
  background: "rgba(15,10,30,0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

interface ComparisonMetric {
  label: string;
  key: string;
  unit: string;
  icon: React.ElementType;
  higherIsWorse: boolean;
}

const metrics: ComparisonMetric[] = [
  { label: "Temperatura", key: "temp", unit: "°C", icon: Thermometer, higherIsWorse: true },
  { label: "Qualidade do Ar", key: "airQuality", unit: "AQI", icon: Wind, higherIsWorse: true },
  { label: "Risco de Enchente", key: "floodRisk", unit: "%", icon: Waves, higherIsWorse: true },
  { label: "Umidade", key: "humidity", unit: "%", icon: Droplets, higherIsWorse: false },
  { label: "Índice UV", key: "uvIndex", unit: "", icon: Sun, higherIsWorse: true },
  { label: "Vento", key: "windSpeed", unit: "km/h", icon: Wind, higherIsWorse: true },
];

function generateInterpretation(
  r1Name: string,
  r2Name: string,
  d1: Record<string, number>,
  d2: Record<string, number>
) {
  const risks1 = (d1.floodRisk || 0) + (d1.airQuality || 0) + (d1.temp || 0) * 2;
  const risks2 = (d2.floodRisk || 0) + (d2.airQuality || 0) + (d2.temp || 0) * 2;
  const worse = risks1 > risks2 ? r1Name : r2Name;
  const better = risks1 > risks2 ? r2Name : r1Name;
  const worseData = risks1 > risks2 ? d1 : d2;

  const reasons: string[] = [];
  if (worseData.floodRisk > 50) reasons.push("maior risco de enchente");
  if (worseData.airQuality > 50) reasons.push("pior qualidade do ar");
  if (worseData.temp > 32) reasons.push("temperaturas mais elevadas");
  if (worseData.uvIndex > 8) reasons.push("índice UV mais alto");

  const reasonText = reasons.length > 0 ? ` devido a ${reasons.join(", ")}` : "";
  return `${worse} apresenta risco climático mais elevado que ${better}${reasonText}. Recomenda-se atenção redobrada aos alertas na região de ${worse}.`;
}

export default function ComparadorPage() {
  const [region1Id, setRegion1Id] = useState("");
  const [region2Id, setRegion2Id] = useState("");

  const r1 = regions.find((r) => r.id === region1Id);
  const r2 = regions.find((r) => r.id === region2Id);
  const d1 = regionComparison.find((r) => r.region === r1?.name);
  const d2 = regionComparison.find((r) => r.region === r2?.name);

  const canCompare = r1 && r2 && d1 && d2 && region1Id !== region2Id;

  const barData = canCompare
    ? metrics.map((m) => ({
        metric: m.label,
        [r1.name]: (d1 as unknown as Record<string, number>)[m.key] || 0,
        [r2.name]: (d2 as unknown as Record<string, number>)[m.key] || 0,
      }))
    : [];

  return (
    <div className="space-y-6">
      <PageHeader title="Comparador Climático" description="Compare os dados climáticos entre duas regiões." />

      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 block">Região 1</label>
            <select
              value={region1Id}
              onChange={(e) => setRegion1Id(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="">Selecione uma região</option>
              {regions.filter((r) => r.id !== region2Id).map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
            <ArrowLeftRight size={20} className="text-violet-400" />
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 block">Região 2</label>
            <select
              value={region2Id}
              onChange={(e) => setRegion2Id(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="">Selecione uma região</option>
              {regions.filter((r) => r.id !== region1Id).map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!canCompare ? (
        <EmptyState icon={<ArrowLeftRight size={28} className="text-violet-400" />} title="Selecione duas regiões" description="Escolha duas regiões diferentes acima para comparar seus dados climáticos." />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((m) => {
              const v1 = (d1 as unknown as Record<string, number>)[m.key] || 0;
              const v2 = (d2 as unknown as Record<string, number>)[m.key] || 0;
              const diff = v1 - v2;
              const worse = m.higherIsWorse ? (v1 > v2 ? 1 : v1 < v2 ? 2 : 0) : (v1 < v2 ? 1 : v1 > v2 ? 2 : 0);

              return (
                <div key={m.key} className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <m.icon size={16} className="text-violet-400" />
                    <span className="text-sm font-semibold text-white/70">{m.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className={`text-center flex-1 ${worse === 1 ? "opacity-100" : "opacity-70"}`}>
                      <p className={`text-2xl font-bold ${worse === 1 ? "text-red-400" : "text-white"}`}>{v1}{m.unit}</p>
                      <p className="text-xs text-white/40 mt-1">{r1.name}</p>
                      {worse === 1 && <TrendingUp size={14} className="text-red-400 mx-auto mt-1" />}
                    </div>
                    <div className="px-3">
                      {diff === 0 ? <Minus size={16} className="text-white/20" /> : <span className="text-xs font-mono text-white/30">{diff > 0 ? "+" : ""}{diff.toFixed(0)}</span>}
                    </div>
                    <div className={`text-center flex-1 ${worse === 2 ? "opacity-100" : "opacity-70"}`}>
                      <p className={`text-2xl font-bold ${worse === 2 ? "text-red-400" : "text-white"}`}>{v2}{m.unit}</p>
                      <p className="text-xs text-white/40 mt-1">{r2.name}</p>
                      {worse === 2 && <TrendingUp size={14} className="text-red-400 mx-auto mt-1" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white/80 mb-4">Alertas e População</h3>
              <div className="space-y-4">
                {[r1, r2].map((r) => {
                  const cfg = riskLevelConfig[r.riskLevel];
                  return (
                    <div key={r.id} className="flex items-center justify-between p-3 bg-white/[0.04] rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-white">{r.name}</p>
                        <p className="text-xs text-white/40 flex items-center gap-1"><Users size={10} />{r.population}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className={`text-lg font-bold ${r.alerts.length > 0 ? "text-red-400" : "text-emerald-400"}`}>{r.alerts.length}</p>
                          <p className="text-[10px] text-white/30">Alertas</p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${cfg.color} bg-white/[0.06]`}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white/80 mb-4">Comparação Visual</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="metric" stroke="#ffffff40" fontSize={10} angle={-20} textAnchor="end" height={50} />
                  <YAxis stroke="#ffffff40" fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
                  <Bar dataKey={r1.name} fill="#a78bfa" radius={[4, 4, 0, 0]} />
                  <Bar dataKey={r2.name} fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Info size={20} className="text-violet-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Análise Comparativa</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {generateInterpretation(r1.name, r2.name, d1 as unknown as Record<string, number>, d2 as unknown as Record<string, number>)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
