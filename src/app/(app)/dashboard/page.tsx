"use client";

import {
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Waves,
  CloudLightning,
  Info,
  Lock,
  Zap,
  FileText,
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
import IndicatorCard from "@/components/IndicatorCard";
import ChartCard from "@/components/ChartCard";
import PageHeader from "@/components/PageHeader";
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

const tooltipStyle = { borderRadius: "12px", border: "1px solid #d1fae5", fontSize: "12px" };

function DetailTable({ data }: { data: { label: string; value: string; detail: string }[] }) {
  return (
    <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Indicador</th>
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Valor</th>
            <th className="text-left px-4 py-2 font-semibold text-gray-600 hidden sm:table-cell">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.label} className="border-b border-gray-50 last:border-0">
              <td className="px-4 py-2.5 font-medium text-gray-700">{row.label}</td>
              <td className="px-4 py-2.5 font-bold text-gray-800">{row.value}</td>
              <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell">{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-start gap-2 p-3 bg-teal-50 border border-teal-100 rounded-xl">
      <Info size={16} className="text-teal-600 mt-0.5 shrink-0" />
      <p className="text-xs text-teal-700">{children}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const isAdvanced = user?.accountType === "avancada";

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${getGreeting()}, ${user?.name ?? "Usuário"}`}
        description="Acompanhe os principais indicadores climáticos da sua região."
        action={
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
            isAdvanced
              ? "bg-purple-100 text-purple-700 border border-purple-200"
              : "bg-gray-100 text-gray-600 border border-gray-200"
          }`}>
            {isAdvanced ? <Zap size={13} /> : <Lock size={13} />}
            {isAdvanced ? "Conta Avançada" : "Conta Comum"}
          </span>
        }
      />

      {/* Indicator Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <IndicatorCard title="Temperatura" value={currentIndicators.temperature.value} unit={currentIndicators.temperature.unit} trend={currentIndicators.temperature.trend} icon={<Thermometer className="h-5 w-5" />} color="from-red-500 to-orange-500" />
        <IndicatorCard title="Umidade" value={currentIndicators.humidity.value} unit={currentIndicators.humidity.unit} trend={currentIndicators.humidity.trend} icon={<Droplets className="h-5 w-5" />} color="from-blue-500 to-cyan-500" />
        <IndicatorCard title="Índice UV" value={currentIndicators.uvIndex.value} unit={currentIndicators.uvIndex.unit} trend={currentIndicators.uvIndex.trend} icon={<Sun className="h-5 w-5" />} color="from-yellow-500 to-orange-500" />
        <IndicatorCard title="Qualidade do Ar" value={currentIndicators.airQuality.value} unit={currentIndicators.airQuality.unit} trend={currentIndicators.airQuality.trend} icon={<Wind className="h-5 w-5" />} color="from-teal-500 to-emerald-500" />
        <IndicatorCard title="Risco de Enchente" value={currentIndicators.floodRisk.value} unit={currentIndicators.floodRisk.unit} trend={currentIndicators.floodRisk.trend} icon={<Waves className="h-5 w-5" />} color="from-blue-600 to-indigo-500" />
        <IndicatorCard title="Prob. Tempestade" value={currentIndicators.stormProbability.value} unit={currentIndicators.stormProbability.unit} trend={currentIndicators.stormProbability.trend} icon={<CloudLightning className="h-5 w-5" />} color="from-purple-500 to-indigo-500" />
      </div>

      {/* ═══════════════════════════════════════════════════
          CHARTS — cada gráfico é completo na conta avançada
         ═══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 gap-6">

        {/* ─── 1. TEMPERATURA ─── */}
        <ChartCard title="Evolução da Temperatura (Semana)">
          {isAdvanced && (
            <InfoBox>
              O gráfico mostra a temperatura real (máx/mín), sensação térmica e a média histórica dos últimos 10 anos.
              A amplitude térmica, ponto de orvalho e umidade são fatores que influenciam a sensação térmica.
            </InfoBox>
          )}
          <ResponsiveContainer width="100%" height={isAdvanced ? 320 : 280}>
            {isAdvanced ? (
              <ComposedChart data={temperatureWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis yAxisId="temp" stroke="#6b7280" fontSize={12} unit="°C" />
                <YAxis yAxisId="hum" orientation="right" stroke="#6b7280" fontSize={12} unit="%" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <ReferenceLine yAxisId="temp" y={35} stroke="#ef4444" strokeDasharray="5 5" label={{ value: "Alerta calor (35°C)", fontSize: 10, fill: "#ef4444" }} />
                <Area yAxisId="hum" type="monotone" dataKey="humidity" name="Umidade (%)" fill="#dbeafe" stroke="#3b82f6" strokeWidth={1} fillOpacity={0.25} />
                <Line yAxisId="temp" type="monotone" dataKey="feelsLike" name="Sensação Térmica" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} />
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Máxima Real" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4, fill: "#0d9488" }} activeDot={{ r: 6 }} />
                <Line yAxisId="temp" type="monotone" dataKey="min" name="Mínima Real" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4, fill: "#06b6d4" }} activeDot={{ r: 6 }} />
                <Line yAxisId="temp" type="monotone" dataKey="avgHistoric" name="Média Histórica" stroke="#9ca3af" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
              </ComposedChart>
            ) : (
              <LineChart data={temperatureWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} unit="°C" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="temp" name="Máxima" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4, fill: "#0d9488" }} />
                <Line type="monotone" dataKey="min" name="Mínima" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4, fill: "#06b6d4" }} />
              </LineChart>
            )}
          </ResponsiveContainer>
          {isAdvanced && <DetailTable data={temperatureStats} />}
        </ChartCard>

        {/* ─── 2. PRECIPITAÇÃO ─── */}
        <ChartCard title="Precipitação Mensal (mm)">
          {isAdvanced && (
            <InfoBox>
              Comparação entre o volume de chuva registrado e a média histórica (últimos 10 anos).
              O número de dias chuvosos e o máximo em 24h ajudam a avaliar a intensidade das chuvas.
            </InfoBox>
          )}
          <ResponsiveContainer width="100%" height={isAdvanced ? 320 : 280}>
            {isAdvanced ? (
              <ComposedChart data={rainfallMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis yAxisId="vol" stroke="#6b7280" fontSize={12} label={{ value: "mm", angle: -90, position: "insideLeft", fontSize: 11 }} />
                <YAxis yAxisId="days" orientation="right" stroke="#6b7280" fontSize={12} label={{ value: "Dias", angle: 90, position: "insideRight", fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar yAxisId="vol" dataKey="volume" name="Volume Real (mm)" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar yAxisId="vol" dataKey="avgHistoric" name="Média Histórica (mm)" fill="#a7f3d0" radius={[4, 4, 0, 0]} barSize={16} />
                <Line yAxisId="days" type="monotone" dataKey="rainyDays" name="Dias de Chuva" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1" }} />
                <Line yAxisId="vol" type="monotone" dataKey="maxDay" name="Máx. 24h (mm)" stroke="#f97316" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 3 }} />
              </ComposedChart>
            ) : (
              <BarChart data={rainfallMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="volume" name="Volume (mm)" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
          {isAdvanced && <DetailTable data={rainfallStats} />}
        </ChartCard>

        {/* ─── 3. QUALIDADE DO AR ─── */}
        <ChartCard title="Qualidade do Ar — Poluentes Detalhados (Semana)">
          {isAdvanced && (
            <InfoBox>
              O índice AQI é calculado a partir dos poluentes PM2.5, PM10, O₃, NO₂, SO₂ e CO.
              O poluente com maior concentração relativa ao seu limite define o valor final do AQI.
            </InfoBox>
          )}
          <ResponsiveContainer width="100%" height={isAdvanced ? 320 : 280}>
            {isAdvanced ? (
              <ComposedChart data={airQualityWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} label={{ value: "µg/m³", angle: -90, position: "insideLeft", fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} label={{ value: "AQI", angle: 90, position: "insideRight", fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <ReferenceLine yAxisId="right" y={50} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: "Limite Moderado", fontSize: 10, fill: "#f59e0b" }} />
                <Bar yAxisId="left" dataKey="pm25" name="PM2.5" fill="#8b5cf6" radius={[2, 2, 0, 0]} barSize={8} />
                <Bar yAxisId="left" dataKey="pm10" name="PM10" fill="#6366f1" radius={[2, 2, 0, 0]} barSize={8} />
                <Bar yAxisId="left" dataKey="no2" name="NO₂" fill="#ec4899" radius={[2, 2, 0, 0]} barSize={8} />
                <Line yAxisId="left" type="monotone" dataKey="o3" name="O₃ (Ozônio)" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="aqi" name="AQI Total" stroke="#0d9488" strokeWidth={3} dot={{ r: 4, fill: "#0d9488" }} />
              </ComposedChart>
            ) : (
              <AreaChart data={airQualityWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <defs>
                  <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="aqi" name="AQI" stroke="#14b8a6" strokeWidth={2} fill="url(#aqiGrad)" />
              </AreaChart>
            )}
          </ResponsiveContainer>

          {/* Pollutant Table — advanced only */}
          {isAdvanced && (
            <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">Poluente</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">Atual</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">Limite (OMS)</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">% do Limite</th>
                  </tr>
                </thead>
                <tbody>
                  {airQualityPollutants.map((p) => {
                    const pct = Math.round((p.value / p.limit) * 100);
                    const barColor = pct < 50 ? "bg-emerald-500" : pct < 80 ? "bg-amber-500" : "bg-red-500";
                    const statusColor = p.status === "Bom" ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50";
                    return (
                      <tr key={p.name} className="border-b border-gray-50 last:border-0">
                        <td className="px-4 py-2.5 font-medium text-gray-700">{p.name}</td>
                        <td className="px-4 py-2.5 text-gray-800">{p.value} {p.unit}</td>
                        <td className="px-4 py-2.5 text-gray-500">{p.limit} {p.unit}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>{p.status}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </ChartCard>

        {/* ─── 4. PREVISÃO HORÁRIA ─── */}
        <ChartCard title="Previsão Horária — Hoje">
          {isAdvanced && (
            <InfoBox>
              Previsão detalhada com temperatura real, sensação térmica, índice UV, umidade, vento e probabilidade de chuva ao longo do dia.
              A sensação térmica combina temperatura, umidade e velocidade do vento.
            </InfoBox>
          )}
          <ResponsiveContainer width="100%" height={isAdvanced ? 340 : 280}>
            {isAdvanced ? (
              <ComposedChart data={hourlyForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
                <YAxis yAxisId="temp" stroke="#6b7280" fontSize={11} />
                <YAxis yAxisId="pct" orientation="right" stroke="#6b7280" fontSize={11} unit="%" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <ReferenceLine yAxisId="temp" y={35} stroke="#ef4444" strokeDasharray="5 5" label={{ value: "Calor extremo", fontSize: 10, fill: "#ef4444" }} />
                <Area yAxisId="pct" type="monotone" dataKey="rainProb" name="Prob. Chuva (%)" fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1.5} fillOpacity={0.3} />
                <Area yAxisId="pct" type="monotone" dataKey="humidity" name="Umidade (%)" fill="#c7d2fe" stroke="#6366f1" strokeWidth={1} fillOpacity={0.15} />
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Temperatura (°C)" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4, fill: "#0d9488" }} />
                <Line yAxisId="temp" type="monotone" dataKey="feelsLike" name="Sensação Térmica" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} />
                <Line yAxisId="temp" type="monotone" dataKey="uvIndex" name="Índice UV" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: "#f59e0b" }} />
                <Line yAxisId="temp" type="monotone" dataKey="wind" name="Vento (km/h)" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2 }} />
              </ComposedChart>
            ) : (
              <ComposedChart data={hourlyForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
                <YAxis yAxisId="temp" stroke="#6b7280" fontSize={11} />
                <YAxis yAxisId="hum" orientation="right" stroke="#6b7280" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Area yAxisId="hum" type="monotone" dataKey="humidity" name="Umidade (%)" fill="#dbeafe" stroke="#3b82f6" strokeWidth={1.5} fillOpacity={0.4} />
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Temperatura (°C)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line yAxisId="temp" type="monotone" dataKey="wind" name="Vento (km/h)" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2 }} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
          {isAdvanced && <DetailTable data={hourlyStats} />}
        </ChartCard>

        {/* ─── 5. COMPARAÇÃO POR REGIÃO ─── */}
        <ChartCard title="Comparação por Região">
          {isAdvanced && (
            <InfoBox>
              Comparação completa entre as regiões incluindo temperatura, AQI, risco de enchente, umidade, UV e vento.
              A tabela abaixo mostra dados populacionais, alertas ativos e cobertura vegetal.
            </InfoBox>
          )}
          <ResponsiveContainer width="100%" height={isAdvanced ? 340 : 280}>
            {isAdvanced ? (
              <BarChart data={regionComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="region" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="temp" name="Temperatura (°C)" fill="#0d9488" radius={[3, 3, 0, 0]} />
                <Bar dataKey="airQuality" name="AQI" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                <Bar dataKey="floodRisk" name="Risco Enchente (%)" fill="#6366f1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="humidity" name="Umidade (%)" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="uvIndex" name="Índice UV" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="windSpeed" name="Vento (km/h)" fill="#ec4899" radius={[3, 3, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={regionComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="region" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="temp" name="Temperatura (°C)" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="airQuality" name="AQI" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="floodRisk" name="Risco Enchente (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>

          {/* Region Detail Table — advanced only */}
          {isAdvanced && (
            <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">Região</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">População</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">Risco</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600">Alertas</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600 hidden sm:table-cell">Principal Risco</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600 hidden md:table-cell">Cobertura Vegetal</th>
                  </tr>
                </thead>
                <tbody>
                  {regionDetailedStats.map((r) => {
                    const riskColor =
                      r.riskLevel === "Crítico" ? "text-red-600 bg-red-50" :
                      r.riskLevel === "Alto" ? "text-orange-600 bg-orange-50" :
                      r.riskLevel === "Médio" ? "text-amber-600 bg-amber-50" :
                      "text-emerald-600 bg-emerald-50";
                    return (
                      <tr key={r.region} className="border-b border-gray-50 last:border-0">
                        <td className="px-4 py-2.5 font-medium text-gray-700">{r.region}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.population}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${riskColor}`}>{r.riskLevel}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`font-bold ${r.alertCount > 0 ? "text-red-600" : "text-emerald-600"}`}>{r.alertCount}</span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell">{r.mainRisk}</td>
                        <td className="px-4 py-2.5 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: r.treesCoverage }} />
                            </div>
                            <span className="text-xs text-gray-500">{r.treesCoverage}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </ChartCard>
      </div>

      {/* Account-specific banner */}
      {isAdvanced ? (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-800">Acesso Avançado Ativo</h3>
              <p className="text-sm text-purple-600 mt-1">
                Você tem acesso completo a relatórios detalhados, exportação de dados em CSV e análises aprofundadas por região.
              </p>
              <Link
                href="/relatorios"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
              >
                <FileText size={16} />
                Acessar Relatórios
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-800">Desbloqueie Recursos Avançados</h3>
              <p className="text-sm text-amber-600 mt-1">
                Com a conta avançada, você acessa gráficos completos com todas as variáveis, tabelas detalhadas, relatórios e exportação de dados.
              </p>
              <Link
                href="/perfil"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-xl hover:bg-amber-700 transition-colors"
              >
                <Zap size={16} />
                Fazer Upgrade
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
