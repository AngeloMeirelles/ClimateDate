"use client";

import { useState } from "react";
import {
  MapPin,
  Thermometer,
  Cloud,
  Wind,
  Waves,
  AlertTriangle,
  Users,
  Crosshair,
  Droplets,
  Sun,
  Navigation,
  Activity,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import RiskBadge from "@/components/RiskBadge";
import { regions, riskLevelConfig, type Region } from "@/data/mockRegions";

export default function MapaPage() {
  const [selected, setSelected] = useState<Region | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  function handleDetectLocation() {
    const centro = regions.find((r) => r.id === "centro") ?? null;
    setSelected(centro);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mapa Climático"
        description="Visualize os dados climáticos por região. Clique em uma área para ver detalhes."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* MAP - 3 columns */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative w-full rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-cyan-50/30 shadow-sm overflow-hidden" style={{ aspectRatio: "5/4" }}>
            {/* SVG Map */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              {/* Water features */}
              <path d="M 0,180 Q 60,170 120,195 Q 180,220 250,210 Q 320,200 380,215 Q 440,230 500,220 L 500,240 Q 440,250 380,235 Q 320,220 250,230 Q 180,240 120,215 Q 60,190 0,200 Z" fill="#bfdbfe" fillOpacity="0.4" />
              <path d="M 300,0 Q 310,50 320,100 Q 315,150 330,200 Q 340,250 335,300 Q 330,350 340,400" fill="none" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              <path d="M 305,0 Q 315,50 325,100 Q 320,150 335,200 Q 345,250 340,300 Q 335,350 345,400" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

              {/* Main roads */}
              <line x1="0" y1="200" x2="500" y2="200" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="250" y1="0" x2="250" y2="400" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="50" y1="50" x2="450" y2="350" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="450" y1="50" x2="50" y2="350" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />

              {/* Secondary roads */}
              <line x1="125" y1="0" x2="125" y2="400" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="375" y1="0" x2="375" y2="400" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="300" x2="500" y2="300" stroke="#f3f4f6" strokeWidth="1" />

              {/* Ring road */}
              <ellipse cx="250" cy="200" rx="180" ry="150" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="8 4" />

              {/* Green areas */}
              <circle cx="150" cy="120" r="20" fill="#bbf7d0" fillOpacity="0.5" />
              <circle cx="380" cy="90" r="15" fill="#bbf7d0" fillOpacity="0.4" />
              <circle cx="100" cy="310" r="25" fill="#bbf7d0" fillOpacity="0.5" />
              <circle cx="420" cy="320" r="18" fill="#bbf7d0" fillOpacity="0.4" />
              <rect x="220" y="170" width="60" height="60" rx="8" fill="#dcfce7" fillOpacity="0.4" />

              {/* Region zones as styled polygons */}
              {regions.map((region) => {
                const config = riskLevelConfig[region.riskLevel];
                const isSelected = selected?.id === region.id;
                const isHovered = hoveredId === region.id;
                const cx = (region.coords.x / 100) * 500;
                const cy = (region.coords.y / 100) * 400;
                const baseR = 42;
                const r = isSelected ? baseR + 6 : isHovered ? baseR + 3 : baseR;

                return (
                  <g key={region.id}>
                    {/* Glow */}
                    {(isSelected || isHovered) && (
                      <circle cx={cx} cy={cy} r={r + 10} fill={config.mapColor} fillOpacity={0.15} />
                    )}
                    {/* Pulse for selected */}
                    {isSelected && (
                      <circle cx={cx} cy={cy} r={r + 15} fill="none" stroke={config.mapColor} strokeWidth="2" opacity="0.4">
                        <animate attributeName="r" from={String(r + 5)} to={String(r + 25)} dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Zone background */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={config.mapColor}
                      fillOpacity={isSelected ? 0.25 : 0.12}
                      stroke={config.mapColor}
                      strokeWidth={isSelected ? 3 : 1.5}
                      strokeOpacity={isSelected ? 1 : 0.6}
                    />
                    {/* Inner dot */}
                    <circle cx={cx} cy={cy} r="8" fill={config.mapColor} fillOpacity={0.9} />
                    <circle cx={cx} cy={cy} r="4" fill="white" />
                  </g>
                );
              })}
            </svg>

            {/* Clickable overlay buttons */}
            {regions.map((region) => {
              const config = riskLevelConfig[region.riskLevel];
              const isSelected = selected?.id === region.id;

              return (
                <button
                  key={region.id}
                  onClick={() => setSelected(region)}
                  onMouseEnter={() => setHoveredId(region.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 group focus:outline-none z-10"
                  style={{
                    left: `${region.coords.x}%`,
                    top: `${region.coords.y}%`,
                  }}
                  title={`${region.name} - Risco: ${config.label}`}
                >
                  {/* Invisible hitbox */}
                  <span className="w-20 h-20 rounded-full" />
                  {/* Label */}
                  <span
                    className={`absolute top-full mt-1 text-[11px] font-bold whitespace-nowrap px-2 py-0.5 rounded-lg shadow-sm transition-all ${
                      isSelected
                        ? "bg-gray-800 text-white scale-105"
                        : "bg-white/90 text-gray-700 group-hover:bg-gray-800 group-hover:text-white"
                    }`}
                  >
                    {region.name}
                  </span>
                </button>
              );
            })}

            {/* Compass */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
              <Navigation size={16} className="text-gray-500 -rotate-12" />
            </div>

            {/* Scale bar */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] text-gray-500 bg-white/80 backdrop-blur rounded-lg px-2 py-1 border border-gray-200">
              <div className="w-12 h-0.5 bg-gray-400 rounded" />
              <span>2 km</span>
            </div>
          </div>

          {/* Legend + Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl border border-emerald-100 p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-5">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Legenda:</span>
              {(["baixo", "medio", "alto", "critico"] as const).map((level) => {
                const cfg = riskLevelConfig[level];
                return (
                  <span key={level} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-4 h-4 rounded-full shadow-sm border-2 border-white" style={{ backgroundColor: cfg.mapColor }} />
                    <span className="font-medium">{cfg.label}</span>
                  </span>
                );
              })}
            </div>
            <button
              onClick={handleDetectLocation}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition-shadow"
            >
              <Crosshair className="h-4 w-4" />
              Detectar Localização
            </button>
          </div>
        </div>

        {/* DETAIL PANEL - 2 columns */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full rounded-2xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 p-10 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Selecione uma Região</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Clique em uma das regiões no mapa ou use o botão de detectar localização para ver os dados climáticos detalhados.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm overflow-hidden">
              {/* Header with gradient */}
              <div className="p-5 bg-gradient-to-r from-teal-500 to-cyan-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{selected.name}</h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Users className="h-3.5 w-3.5 text-white/70" />
                        <span className="text-xs text-white/80">{selected.population}</span>
                      </div>
                    </div>
                  </div>
                  <RiskBadge level={selected.riskLevel} />
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Main stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-red-50 to-orange-50 p-4 border border-red-100/50">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      Temperatura
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{selected.temperature}°C</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Sensação: {selected.temperature + 2}°C</p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 p-4 border border-teal-100/50">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <Wind className="h-4 w-4 text-teal-500" />
                      Qualidade do Ar
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{selected.airQuality}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">AQI — {selected.airQualityLabel}</p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-100/50">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <Waves className="h-4 w-4 text-blue-500" />
                      Risco Enchente
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{selected.floodRisk}%</p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${selected.floodRisk > 60 ? "bg-red-500" : selected.floodRisk > 35 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${selected.floodRisk}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 p-4 border border-amber-100/50">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <Sun className="h-4 w-4 text-amber-500" />
                      Índice UV
                    </div>
                    <p className="text-2xl font-bold text-gray-800">9</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Muito Alto</p>
                  </div>
                </div>

                {/* Additional info */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-sky-50 p-4 border border-sky-100/50">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <Cloud className="h-4 w-4 text-sky-500" />
                      Previsão
                    </div>
                    <p className="text-sm font-medium text-gray-700">{selected.forecast}</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 rounded-xl bg-purple-50 p-3 border border-purple-100/50 text-center">
                      <Droplets className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-800">68%</p>
                      <p className="text-[10px] text-gray-500">Umidade</p>
                    </div>
                    <div className="flex-1 rounded-xl bg-cyan-50 p-3 border border-cyan-100/50 text-center">
                      <Wind className="h-4 w-4 text-cyan-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-800">15 km/h</p>
                      <p className="text-[10px] text-gray-500">Vento</p>
                    </div>
                    <div className="flex-1 rounded-xl bg-rose-50 p-3 border border-rose-100/50 text-center">
                      <Activity className="h-4 w-4 text-rose-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-800">1015</p>
                      <p className="text-[10px] text-gray-500">hPa</p>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Alertas Ativos ({selected.alerts.length})
                  </h3>
                  {selected.alerts.length === 0 ? (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center">
                      <p className="text-sm text-emerald-600 font-medium">Nenhum alerta ativo</p>
                      <p className="text-xs text-emerald-500">Esta região está segura</p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {selected.alerts.map((alert, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-700"
                        >
                          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-500" />
                          <span className="font-medium">{alert}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
