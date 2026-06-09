"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Thermometer,
  Cloud,
  Wind,
  Waves,
  AlertTriangle,
  Users,
  Droplets,
  Sun,
  Activity,
  Star,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import RiskBadge from "@/components/RiskBadge";
import FavoriteButton from "@/components/FavoriteButton";
import { riskLevelConfig, type Region } from "@/data/mockRegions";

const FAVORITES_KEY = "climatedate_favorites";

const ClimateMap = dynamic(() => import("@/components/ClimateMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 mx-auto bg-violet-500/20 rounded-xl flex items-center justify-center animate-pulse">
          <MapPin size={24} className="text-violet-400" />
        </div>
        <p className="text-sm text-white/40">Carregando mapa...</p>
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
      </div>
    </div>
  ),
});

function loadFavorites(): Region[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object" && parsed[0].latlng) {
        return parsed;
      }
    }
  } catch {
    console.warn("Failed to load favorites");
  }
  return [];
}

function saveFavorites(favs: Region[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export default function MapaPage() {
  const [selected, setSelected] = useState<Region | null>(null);
  const [favorites, setFavorites] = useState<Region[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const toggleFavorite = useCallback((region: Region) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === region.id);
      const updated = exists ? prev.filter((f) => f.id !== region.id) : [...prev, region];
      saveFavorites(updated);
      return updated;
    });
  }, []);

  const isFavorite = selected ? favorites.some((f) => f.id === selected.id) : false;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mapa Climático"
        description="Busque qualquer cidade do Brasil ou clique no mapa para ver os dados climáticos."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* MAP */}
        <div className="lg:col-span-3" style={{ minHeight: "500px", height: "calc(100vh - 220px)", maxHeight: "700px" }}>
          <ClimateMap selected={selected} onSelect={setSelected} favorites={favorites} />
        </div>

        {/* DETAIL PANEL */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center">
              <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4 border border-violet-500/20">
                <MapPin className="h-8 w-8 text-violet-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Explore o Brasil</h3>
              <p className="text-sm text-white/50 max-w-xs">
                Use a busca para encontrar qualquer cidade, ou clique diretamente no mapa para ver os dados climáticos do local.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs text-white/25">
                <Star size={12} />
                <span>Favorite locais para acompanhar no painel lateral do mapa e no dashboard</span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-violet-600 to-purple-600">
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
                  <div className="flex items-center gap-2">
                    <FavoriteButton
                      isFavorite={isFavorite}
                      onToggle={() => toggleFavorite(selected)}
                    />
                    <RiskBadge level={selected.riskLevel} />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Coordinates */}
                <div className="flex items-center gap-2 text-xs text-white/30 bg-white/[0.03] rounded-lg px-3 py-1.5">
                  <MapPin size={11} />
                  <span className="font-mono">{selected.latlng[0].toFixed(4)}, {selected.latlng[1].toFixed(4)}</span>
                </div>

                {/* Main stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.06] p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-1.5">
                      <Thermometer className="h-4 w-4 text-orange-400" />
                      Temperatura
                    </div>
                    <p className="text-2xl font-bold text-white">{selected.temperature}°C</p>
                    <p className="text-[10px] text-white/40 mt-0.5">Sensação: {selected.feelsLike}°C</p>
                  </div>

                  <div className="rounded-xl bg-white/[0.06] p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-1.5">
                      <Wind className="h-4 w-4 text-cyan-400" />
                      Qualidade do Ar
                    </div>
                    <p className="text-2xl font-bold text-white">{selected.airQuality}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">AQI — {selected.airQualityLabel}</p>
                  </div>

                  <div className="rounded-xl bg-white/[0.06] p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-1.5">
                      <Waves className="h-4 w-4 text-blue-400" />
                      Risco Enchente
                    </div>
                    <p className="text-2xl font-bold text-white">{selected.floodRisk}%</p>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${selected.floodRisk > 60 ? "bg-red-500" : selected.floodRisk > 35 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${selected.floodRisk}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/[0.06] p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-1.5">
                      <Sun className="h-4 w-4 text-amber-400" />
                      Índice UV
                    </div>
                    <p className="text-2xl font-bold text-white">{selected.uvIndex}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">
                      {selected.uvIndex >= 11 ? "Extremo" : selected.uvIndex >= 8 ? "Muito Alto" : selected.uvIndex >= 6 ? "Alto" : selected.uvIndex >= 3 ? "Moderado" : "Baixo"}
                    </p>
                  </div>
                </div>

                {/* Forecast */}
                <div className="rounded-xl bg-white/[0.06] p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/50 mb-1.5">
                    <Cloud className="h-4 w-4 text-sky-400" />
                    Previsão
                  </div>
                  <p className="text-sm font-medium text-white/70">{selected.forecast}</p>
                </div>

                {/* Extra stats */}
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl bg-white/[0.06] p-3 border border-white/10 text-center">
                    <Droplets className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{selected.humidity}%</p>
                    <p className="text-[10px] text-white/50">Umidade</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-white/[0.06] p-3 border border-white/10 text-center">
                    <Wind className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{selected.windSpeed} km/h</p>
                    <p className="text-[10px] text-white/50">Vento</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-white/[0.06] p-3 border border-white/10 text-center">
                    <Activity className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{selected.pressure}</p>
                    <p className="text-[10px] text-white/50">hPa</p>
                  </div>
                </div>

                {/* Alerts */}
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    Alertas ({selected.alerts.length})
                  </h3>
                  {selected.alerts.length === 0 ? (
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
                      <p className="text-sm text-emerald-400 font-medium">Nenhum alerta ativo</p>
                      <p className="text-xs text-emerald-400/60">Esta localidade está segura</p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {selected.alerts.map((alert, i) => (
                        <li key={i} className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-sm text-red-300">
                          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-400" />
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
