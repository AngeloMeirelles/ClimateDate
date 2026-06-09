"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  ChevronDown,
  ChevronUp,
  Umbrella,
  Zap,
  Clock,
  MapPin,
  AlertTriangle,
  Star,
  Flame,
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

import { useAuth } from "@/contexts/AuthContext";
import ChartCard from "@/components/ChartCard";
import {
  getSmartSummary,
  getComfortBlock,
  getRainBlock,
  getQualityBlock,
  smartAlerts,
} from "@/data/mockSmartSummary";
import {
  currentIndicators,
  temperatureWeek,
  temperatureStats,
  rainfallMonthly,
  rainfallStats,
  airQualityWeek,
  airQualityPollutants,
  regionComparison,
  regionDetailedStats,
  hourlyForecast,
  hourlyStats,
} from "@/data/mockClimateData";
import { riskLevelConfig, type Region } from "@/data/mockRegions";

const FAVORITES_KEY = "climatedate_favorites";

const tooltipStyle = {
  background: "rgba(15,10,30,0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

function WeatherIcon({ type, size = 48 }: { type: string; size?: number }) {
  const iconMap: Record<string, React.ReactNode> = {
    sun: <Sun size={size} className="text-amber-400" />,
    cloud: <Cloud size={size} className="text-slate-300" />,
    rain: <CloudRain size={size} className="text-cyan-400" />,
    storm: <CloudLightning size={size} className="text-purple-400" />,
    hot: <Flame size={size} className="text-orange-400" />,
  };
  return <>{iconMap[type] || iconMap.sun}</>;
}

function SmartAlertCard({ alert }: { alert: typeof smartAlerts[0] }) {
  const iconMap: Record<string, React.ReactNode> = {
    storm: <CloudLightning size={20} className="text-purple-400" />,
    flood: <Droplets size={20} className="text-blue-400" />,
    heat: <Flame size={20} className="text-orange-400" />,
    wind: <Wind size={20} className="text-cyan-400" />,
    air: <Wind size={20} className="text-emerald-400" />,
  };

  const severityColors: Record<string, string> = {
    critical: "border-red-500/30 bg-red-500/[0.06]",
    high: "border-orange-500/30 bg-orange-500/[0.06]",
    medium: "border-amber-500/30 bg-amber-500/[0.06]",
    low: "border-emerald-500/30 bg-emerald-500/[0.06]",
  };

  return (
    <div className={`rounded-2xl border p-4 ${severityColors[alert.severity]}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{iconMap[alert.icon]}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white">{alert.title}</h4>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-white/50">
            <span className="flex items-center gap-1"><Clock size={11} />{alert.when}</span>
            <span className="flex items-center gap-1"><MapPin size={11} />{alert.where}</span>
          </div>
          <p className="text-xs text-white/40 mt-2">{alert.impact}</p>
          <p className="text-xs text-white/60 mt-1.5 font-medium">{alert.recommendation}</p>
        </div>
      </div>
    </div>
  );
}

function DetailTable({ data }: { data: { label: string; value: string; detail: string }[] }) {
  return (
    <div className="mt-4 border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/[0.04] border-b border-white/5">
            <th className="text-left px-4 py-2 font-semibold text-white/50">Indicador</th>
            <th className="text-left px-4 py-2 font-semibold text-white/50">Valor</th>
            <th className="text-left px-4 py-2 font-semibold text-white/50 hidden sm:table-cell">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.label} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-medium text-white/70">{row.label}</td>
              <td className="px-4 py-2.5 font-bold text-white">{row.value}</td>
              <td className="px-4 py-2.5 text-white/40 hidden sm:table-cell">{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HojePage() {
  const { user } = useAuth();
  const [showTechnical, setShowTechnical] = useState(false);
  const [favorites, setFavorites] = useState<Region[]>([]);
  const isAdvanced = user?.accountType === "avancada";

  const summary = getSmartSummary();
  const comfort = getComfortBlock();
  const rain = getRainBlock();
  const quality = getQualityBlock();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && (parsed.length === 0 || (typeof parsed[0] === "object" && parsed[0].latlng))) {
          setFavorites(parsed);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ═══════════════════════════════════════════
          HERO CARD — Resumo inteligente do dia
         ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(6,182,212,0.08) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Subtle animated gradient orb */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />

        <div className="relative z-10">
          {/* Greeting + Account Badge */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-white/50 font-medium">
              {summary.greeting}, {user?.name ?? "Usuário"}
            </p>
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${
              isAdvanced
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "bg-white/10 text-white/50 border border-white/10"
            }`}>
              {isAdvanced ? <><Zap size={10} /> Pro</> : "Básica"}
            </span>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Weather Icon + Temp */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <WeatherIcon type={summary.icon} size={56} />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500/80 rounded-full border-2 border-[rgba(15,10,30,0.85)]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white tracking-tight">{summary.temperature}</span>
                  <span className="text-2xl text-white/50 font-light">°C</span>
                </div>
                <p className="text-sm text-white/40 mt-0.5">
                  Sensação de {summary.feelsLike}°C
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-20 bg-white/10" />

            {/* Summary Text */}
            <div className="flex-1">
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                {summary.mainSummary}
              </p>
              <p className="text-sm text-violet-300/80 mt-3 flex items-center gap-1.5">
                <Clock size={13} />
                Melhor horário para sair: <span className="font-semibold text-white/80">{summary.bestTime}</span>
              </p>
            </div>
          </div>

          {/* Detail bullets */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {summary.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="w-1 h-1 mt-2 bg-violet-400 rounded-full shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          3 BLOCOS RESUMIDOS
         ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conforto Térmico */}
        <div className="glass rounded-2xl p-5 border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
              <Thermometer size={16} className="text-orange-400" />
            </div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">{comfort.title}</h3>
          </div>
          <p className="text-sm text-white font-medium leading-relaxed">{comfort.summary}</p>
          <p className="text-xs text-white/40 mt-2">{comfort.detail}</p>
        </div>

        {/* Chuva e Alertas */}
        <div className="glass rounded-2xl p-5 border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rain.hasRain ? "bg-cyan-500/15" : "bg-emerald-500/15"}`}>
              {rain.hasRain ? <Umbrella size={16} className="text-cyan-400" /> : <Sun size={16} className="text-emerald-400" />}
            </div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">{rain.title}</h3>
          </div>
          <p className="text-sm text-white font-medium leading-relaxed">{rain.summary}</p>
          {rain.expectedTime && (
            <p className="text-xs text-cyan-300/70 mt-1.5 flex items-center gap-1">
              <Clock size={10} /> Esperada: {rain.expectedTime}
            </p>
          )}
          <p className="text-xs text-white/40 mt-2">{rain.recommendation}</p>
        </div>

        {/* Qualidade do Dia */}
        <div className="glass rounded-2xl p-5 border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Wind size={16} className="text-emerald-400" />
            </div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">{quality.title}</h3>
          </div>
          <p className="text-sm text-white font-medium leading-relaxed">{quality.summary}</p>
          <p className="text-xs text-white/40 mt-2">{quality.recommendation}</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          ALERTAS INTELIGENTES
         ═══════════════════════════════════════════ */}
      {smartAlerts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white/60 flex items-center gap-2">
              <AlertTriangle size={15} className="text-amber-400" />
              Alertas para hoje
            </h2>
            <Link href="/alertas" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {smartAlerts.map((alert) => (
              <SmartAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          REGIÕES MONITORADAS
         ═══════════════════════════════════════════ */}
      {favorites.length > 0 && (
        <div className="glass rounded-2xl p-5 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
              <Star size={15} className="text-amber-400" />
              Minhas Regiões
            </h3>
            <Link href="/mapa" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              Gerenciar
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favorites.slice(0, 6).map((r) => {
              const cfg = riskLevelConfig[r.riskLevel];
              return (
                <Link key={r.id} href="/mapa" className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl hover:bg-white/[0.08] transition-colors">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.mapColor }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-white/40">{r.temperature}°C • {cfg.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          CONTA PRO — CENTRAL TÉCNICA COMPLETA
          (sempre visível, sem colapsável)
         ═══════════════════════════════════════════ */}
      {isAdvanced && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-violet-400" />
            <h2 className="text-sm font-semibold text-white/60">Central Técnica</h2>
          </div>

          {/* Indicator Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {[
              { label: "Temperatura", value: `${currentIndicators.temperature.value}°C`, color: "from-red-500 to-orange-500" },
              { label: "Umidade", value: `${currentIndicators.humidity.value}%`, color: "from-blue-500 to-cyan-500" },
              { label: "Índice UV", value: `${currentIndicators.uvIndex.value}`, color: "from-yellow-500 to-orange-500" },
              { label: "Qualidade do Ar", value: `${currentIndicators.airQuality.value} AQI`, color: "from-teal-500 to-emerald-500" },
              { label: "Risco Enchente", value: `${currentIndicators.floodRisk.value}%`, color: "from-blue-600 to-indigo-500" },
              { label: "Prob. Tempestade", value: `${currentIndicators.stormProbability.value}%`, color: "from-purple-500 to-indigo-500" },
            ].map((ind) => (
              <div key={ind.label} className="glass rounded-xl p-3 border border-white/[0.06]">
                <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{ind.label}</p>
                <p className="text-lg font-bold text-white mt-1">{ind.value}</p>
              </div>
            ))}
          </div>

          {/* Temperature Chart */}
          <ChartCard title="Evolução da Temperatura (Semana)">
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={temperatureWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} />
                <YAxis yAxisId="temp" stroke="#ffffff40" fontSize={12} unit="°C" />
                <YAxis yAxisId="hum" orientation="right" stroke="#ffffff40" fontSize={12} unit="%" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
                <ReferenceLine yAxisId="temp" y={35} stroke="#f472b6" strokeDasharray="5 5" label={{ value: "Alerta calor (35°C)", fontSize: 10, fill: "#f472b6" }} />
                <Area yAxisId="hum" type="monotone" dataKey="humidity" name="Umidade (%)" fill="#22d3ee" stroke="#22d3ee" strokeWidth={1} fillOpacity={0.1} />
                <Line yAxisId="temp" type="monotone" dataKey="feelsLike" name="Sensação Térmica" stroke="#f472b6" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} />
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Máxima Real" stroke="#34d399" strokeWidth={2.5} dot={{ r: 4, fill: "#34d399" }} activeDot={{ r: 6 }} />
                <Line yAxisId="temp" type="monotone" dataKey="min" name="Mínima Real" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4, fill: "#22d3ee" }} activeDot={{ r: 6 }} />
                <Line yAxisId="temp" type="monotone" dataKey="avgHistoric" name="Média Histórica" stroke="#ffffff40" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
            <DetailTable data={temperatureStats} />
          </ChartCard>

          {/* Rainfall Chart */}
          <ChartCard title="Precipitação Mensal (mm)">
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={rainfallMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} />
                <YAxis yAxisId="vol" stroke="#ffffff40" fontSize={12} label={{ value: "mm", angle: -90, position: "insideLeft", fontSize: 11, fill: "#ffffff40" }} />
                <YAxis yAxisId="days" orientation="right" stroke="#ffffff40" fontSize={12} label={{ value: "Dias", angle: 90, position: "insideRight", fontSize: 11, fill: "#ffffff40" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
                <Bar yAxisId="vol" dataKey="volume" name="Volume Real (mm)" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar yAxisId="vol" dataKey="avgHistoric" name="Média Histórica (mm)" fill="#34d399" radius={[4, 4, 0, 0]} barSize={16} opacity={0.5} />
                <Line yAxisId="days" type="monotone" dataKey="rainyDays" name="Dias de Chuva" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 4, fill: "#a78bfa" }} />
              </ComposedChart>
            </ResponsiveContainer>
            <DetailTable data={rainfallStats} />
          </ChartCard>

          {/* Air Quality Chart */}
          <ChartCard title="Qualidade do Ar — Poluentes Detalhados (Semana)">
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={airQualityWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} />
                <YAxis yAxisId="left" stroke="#ffffff40" fontSize={12} label={{ value: "µg/m³", angle: -90, position: "insideLeft", fontSize: 11, fill: "#ffffff40" }} />
                <YAxis yAxisId="right" orientation="right" stroke="#ffffff40" fontSize={12} label={{ value: "AQI", angle: 90, position: "insideRight", fontSize: 11, fill: "#ffffff40" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
                <ReferenceLine yAxisId="right" y={50} stroke="#facc15" strokeDasharray="5 5" label={{ value: "Limite Moderado", fontSize: 10, fill: "#facc15" }} />
                <Bar yAxisId="left" dataKey="pm25" name="PM2.5" fill="#a78bfa" radius={[2, 2, 0, 0]} barSize={8} />
                <Bar yAxisId="left" dataKey="pm10" name="PM10" fill="#818cf8" radius={[2, 2, 0, 0]} barSize={8} />
                <Bar yAxisId="left" dataKey="no2" name="NO₂" fill="#f472b6" radius={[2, 2, 0, 0]} barSize={8} />
                <Line yAxisId="left" type="monotone" dataKey="o3" name="O₃ (Ozônio)" stroke="#fb923c" strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="aqi" name="AQI Total" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: "#34d399" }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/5">
                    <th className="text-left px-4 py-2 font-semibold text-white/50">Poluente</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50">Atual</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50">Limite (OMS)</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50">Status</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50">% do Limite</th>
                  </tr>
                </thead>
                <tbody>
                  {airQualityPollutants.map((p) => {
                    const pct = Math.round((p.value / p.limit) * 100);
                    const barColor = pct < 50 ? "bg-emerald-500" : pct < 80 ? "bg-amber-500" : "bg-red-500";
                    const statusColor = p.status === "Bom" ? "text-emerald-300 bg-emerald-500/20" : "text-amber-300 bg-amber-500/20";
                    return (
                      <tr key={p.name} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-2.5 font-medium text-white/70">{p.name}</td>
                        <td className="px-4 py-2.5 text-white">{p.value} {p.unit}</td>
                        <td className="px-4 py-2.5 text-white/40">{p.limit} {p.unit}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>{p.status}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                            </div>
                            <span className="text-xs text-white/50 font-medium">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ChartCard>

          {/* Hourly Forecast */}
          <ChartCard title="Previsão Horária — Hoje">
            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={hourlyForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="hour" stroke="#ffffff40" fontSize={11} />
                <YAxis yAxisId="temp" stroke="#ffffff40" fontSize={11} />
                <YAxis yAxisId="pct" orientation="right" stroke="#ffffff40" fontSize={11} unit="%" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
                <ReferenceLine yAxisId="temp" y={35} stroke="#f472b6" strokeDasharray="5 5" label={{ value: "Calor extremo", fontSize: 10, fill: "#f472b6" }} />
                <Area yAxisId="pct" type="monotone" dataKey="rainProb" name="Prob. Chuva (%)" fill="#22d3ee" stroke="#22d3ee" strokeWidth={1.5} fillOpacity={0.15} />
                <Area yAxisId="pct" type="monotone" dataKey="humidity" name="Umidade (%)" fill="#a78bfa" stroke="#a78bfa" strokeWidth={1} fillOpacity={0.1} />
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Temperatura (°C)" stroke="#34d399" strokeWidth={2.5} dot={{ r: 4, fill: "#34d399" }} />
                <Line yAxisId="temp" type="monotone" dataKey="feelsLike" name="Sensação Térmica" stroke="#f472b6" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} />
                <Line yAxisId="temp" type="monotone" dataKey="uvIndex" name="Índice UV" stroke="#facc15" strokeWidth={2} dot={{ r: 3, fill: "#facc15" }} />
                <Line yAxisId="temp" type="monotone" dataKey="wind" name="Vento (km/h)" stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <DetailTable data={hourlyStats} />
          </ChartCard>

          {/* Region Comparison */}
          <ChartCard title="Comparação por Região">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={regionComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="region" stroke="#ffffff40" fontSize={11} />
                <YAxis stroke="#ffffff40" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
                <Bar dataKey="temp" name="Temperatura (°C)" fill="#34d399" radius={[3, 3, 0, 0]} />
                <Bar dataKey="airQuality" name="AQI" fill="#22d3ee" radius={[3, 3, 0, 0]} />
                <Bar dataKey="floodRisk" name="Risco Enchente (%)" fill="#a78bfa" radius={[3, 3, 0, 0]} />
                <Bar dataKey="humidity" name="Umidade (%)" fill="#818cf8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="uvIndex" name="Índice UV" fill="#facc15" radius={[3, 3, 0, 0]} />
                <Bar dataKey="windSpeed" name="Vento (km/h)" fill="#f472b6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/5">
                    <th className="text-left px-4 py-2 font-semibold text-white/50">Região</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50">População</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50">Risco</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50">Alertas</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50 hidden sm:table-cell">Principal Risco</th>
                    <th className="text-left px-4 py-2 font-semibold text-white/50 hidden md:table-cell">Cobertura Vegetal</th>
                  </tr>
                </thead>
                <tbody>
                  {regionDetailedStats.map((r) => {
                    const riskColor =
                      r.riskLevel === "Crítico" ? "text-red-300 bg-red-500/20" :
                      r.riskLevel === "Alto" ? "text-orange-300 bg-orange-500/20" :
                      r.riskLevel === "Médio" ? "text-amber-300 bg-amber-500/20" :
                      "text-emerald-300 bg-emerald-500/20";
                    return (
                      <tr key={r.region} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-2.5 font-medium text-white/70">{r.region}</td>
                        <td className="px-4 py-2.5 text-white/60">{r.population}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${riskColor}`}>{r.riskLevel}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`font-bold ${r.alertCount > 0 ? "text-red-400" : "text-emerald-400"}`}>{r.alertCount}</span>
                        </td>
                        <td className="px-4 py-2.5 text-white/40 hidden sm:table-cell">{r.mainRisk}</td>
                        <td className="px-4 py-2.5 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: r.treesCoverage }} />
                            </div>
                            <span className="text-xs text-white/50">{r.treesCoverage}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          CONTA BÁSICA — DETALHES TÉCNICOS (COLAPSÁVEL)
         ═══════════════════════════════════════════ */}
      {!isAdvanced && (
        <div className="border-t border-white/[0.06] pt-4">
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all"
          >
            <span className="flex items-center gap-2 text-sm text-white/50 font-medium">
              <Eye size={15} />
              Explorar detalhes técnicos
            </span>
            {showTechnical ? (
              <ChevronUp size={16} className="text-white/40" />
            ) : (
              <ChevronDown size={16} className="text-white/40" />
            )}
          </button>

          {showTechnical && (
            <div className="mt-6 space-y-6">
              <ChartCard title="Evolução da Temperatura (Semana)">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={temperatureWeek}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} />
                    <YAxis stroke="#ffffff40" fontSize={12} unit="°C" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: "#ffffffcc" }} />
                    <Line type="monotone" dataKey="temp" name="Máxima" stroke="#34d399" strokeWidth={2.5} dot={{ r: 4, fill: "#34d399" }} />
                    <Line type="monotone" dataKey="min" name="Mínima" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4, fill: "#22d3ee" }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Precipitação Mensal (mm)">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={rainfallMonthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} />
                    <YAxis stroke="#ffffff40" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="volume" name="Volume (mm)" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Qualidade do Ar (Semana)">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={airQualityWeek}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} />
                    <YAxis stroke="#ffffff40" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <defs>
                      <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="aqi" name="AQI" stroke="#34d399" strokeWidth={2} fill="url(#aqiGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Previsão Horária — Hoje">
                <ResponsiveContainer width="100%" height={240}>
                  <ComposedChart data={hourlyForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="hour" stroke="#ffffff40" fontSize={11} />
                    <YAxis yAxisId="temp" stroke="#ffffff40" fontSize={11} />
                    <YAxis yAxisId="pct" orientation="right" stroke="#ffffff40" fontSize={11} unit="%" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
                    <Area yAxisId="pct" type="monotone" dataKey="rainProb" name="Prob. Chuva (%)" fill="#22d3ee" stroke="#22d3ee" strokeWidth={1.5} fillOpacity={0.15} />
                    <Line yAxisId="temp" type="monotone" dataKey="temp" name="Temperatura (°C)" stroke="#34d399" strokeWidth={2.5} dot={{ r: 3, fill: "#34d399" }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          )}

          {/* Upgrade Banner */}
          <div className="mt-6 rounded-2xl border border-violet-500/20 p-6" style={{ background: "rgba(124,58,237,0.06)" }}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white">Quer mais profundidade?</h3>
                <p className="text-sm text-white/50 mt-1">
                  Com a conta Pro você acessa gráficos completos, tabelas detalhadas, comparação por região, relatórios e muito mais.
                </p>
                <Link
                  href="/perfil"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-500 transition-colors"
                >
                  <Zap size={14} />
                  Fazer Upgrade
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
