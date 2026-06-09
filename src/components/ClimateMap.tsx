"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Search, Layers, Crosshair, X, Navigation } from "lucide-react";
import { regions, riskLevelConfig, generateClimateData, type Region } from "@/data/mockRegions";

// ─── Types ───
type MapLayer = "risco" | "temperatura" | "qualidade_ar" | "enchente";

interface Props {
  selected: Region | null;
  onSelect: (region: Region) => void;
  favorites: Region[];
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

// ─── Layer config ───
const layerConfig: Record<MapLayer, {
  label: string;
  getColor: (r: Region) => string;
  getOpacity: (r: Region) => number;
  getValue: (r: Region) => string;
}> = {
  risco: {
    label: "Nível de Risco",
    getColor: (r) => riskLevelConfig[r.riskLevel]?.mapColor || "#888",
    getOpacity: (r) => r.riskLevel === "critico" ? 0.45 : r.riskLevel === "alto" ? 0.35 : r.riskLevel === "medio" ? 0.25 : 0.18,
    getValue: (r) => riskLevelConfig[r.riskLevel]?.label || "—",
  },
  temperatura: {
    label: "Temperatura",
    getColor: (r) => r.temperature >= 33 ? "#ef4444" : r.temperature >= 29 ? "#f97316" : r.temperature >= 24 ? "#eab308" : "#22c55e",
    getOpacity: () => 0.3,
    getValue: (r) => `${r.temperature}°C`,
  },
  qualidade_ar: {
    label: "Qualidade do Ar",
    getColor: (r) => r.airQuality >= 100 ? "#ef4444" : r.airQuality >= 50 ? "#f97316" : "#22c55e",
    getOpacity: (r) => 0.15 + (r.airQuality / 150) * 0.35,
    getValue: (r) => `AQI ${r.airQuality}`,
  },
  enchente: {
    label: "Risco de Enchente",
    getColor: (r) => r.floodRisk >= 60 ? "#3b82f6" : r.floodRisk >= 35 ? "#6366f1" : "#06b6d4",
    getOpacity: (r) => 0.15 + (r.floodRisk / 100) * 0.4,
    getValue: (r) => `${r.floodRisk}%`,
  },
};

// ─── Custom marker icon ───
function createMarkerIcon(color: string, isSelected: boolean, isCity: boolean) {
  const size = isSelected ? 28 : isCity ? 20 : 22;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px; height:${size}px; border-radius:50%;
      background:${color}; border:${isSelected ? 3 : 2}px solid rgba(255,255,255,0.9);
      box-shadow:0 0 ${isSelected ? 24 : 8}px ${color},0 2px 8px rgba(0,0,0,0.5);
      transition:all .3s;
      ${isSelected ? "animation:pm 1.5s infinite;" : ""}
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

// ─── Map sub-components ───
function FlyTo({ latlng, zoom }: { latlng: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo(latlng, zoom, { duration: 1.2 }); }, [latlng, zoom, map]);
  return null;
}

function ClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onClick(e.latlng.lat, e.latlng.lng) });
  return null;
}

// ─── Main component ───
export default function ClimateMap({ selected, onSelect, favorites }: Props) {
  const [activeLayer, setActiveLayer] = useState<MapLayer>("risco");
  const [showLayers, setShowLayers] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ latlng: [number, number]; zoom: number } | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const layer = layerConfig[activeLayer];

  // ─── Search (Nominatim) ───
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (query.trim().length < 3) { setSearchResults([]); return; }
    searchTimeout.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ", Brasil")}&limit=6&addressdetails=1&countrycodes=br`,
          { headers: { "Accept-Language": "pt-BR" } }
        );
        setSearchResults(await res.json());
      } catch { setSearchResults([]); }
      setIsSearching(false);
    }, 500);
  }, []);

  const selectSearchResult = useCallback((result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const parts = result.display_name.split(", ");
    const name = parts[0] + (parts[1] ? `, ${parts[1]}` : "");
    const data = generateClimateData(lat, lon, name);
    onSelect(data);
    setFlyTarget({ latlng: [lat, lon], zoom: 12 });
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  }, [onSelect]);

  // ─── Click on map → generate data for that point ───
  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    // Reverse geocode to get the place name
    let name = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
        { headers: { "Accept-Language": "pt-BR" } }
      );
      const data = await res.json();
      if (data.address) {
        name = data.address.city || data.address.town || data.address.village || data.address.municipality || data.address.state || name;
        if (data.address.state && name !== data.address.state) {
          name += `, ${data.address.state}`;
        }
      }
    } catch { /* use coordinates as fallback */ }
    const region = generateClimateData(lat, lng, name);
    onSelect(region);
    setFlyTarget({ latlng: [lat, lng], zoom: 12 });
  }, [onSelect]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <style>{`
        @keyframes pm{0%,100%{box-shadow:0 0 20px currentColor;transform:scale(1)}50%{box-shadow:0 0 35px currentColor;transform:scale(1.12)}}
        .leaflet-container{background:#0a0a12!important}
        .leaflet-control-zoom{border:none!important}
        .leaflet-control-zoom a{background:rgba(26,16,53,.92)!important;color:rgba(255,255,255,.6)!important;border:1px solid rgba(255,255,255,.1)!important;backdrop-filter:blur(12px);width:36px!important;height:36px!important;line-height:36px!important;font-size:18px!important;border-radius:10px!important;margin-bottom:4px!important}
        .leaflet-control-zoom a:hover{background:rgba(26,16,53,1)!important;color:#a78bfa!important;border-color:rgba(167,139,250,.3)!important}
        .leaflet-control-attribution{background:rgba(15,10,30,.8)!important;color:rgba(255,255,255,.2)!important;font-size:9px!important;border-radius:6px 0 0 0!important;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.05)!important}
        .leaflet-control-attribution a{color:rgba(167,139,250,.4)!important}
        .leaflet-popup-content-wrapper{background:rgba(26,16,53,.95)!important;color:#fff!important;border-radius:14px!important;border:1px solid rgba(255,255,255,.1)!important;backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(0,0,0,.5)!important}
        .leaflet-popup-tip{background:rgba(26,16,53,.95)!important}
        .leaflet-popup-close-button{color:rgba(255,255,255,.4)!important;font-size:18px!important}
        .leaflet-popup-close-button:hover{color:#a78bfa!important}
      `}</style>

      <MapContainer
        center={[-14.235, -51.925]}
        zoom={4}
        minZoom={4}
        maxZoom={18}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <ClickHandler onClick={handleMapClick} />
        {flyTarget && <FlyTo latlng={flyTarget.latlng} zoom={flyTarget.zoom} />}

        {/* Featured city markers */}
        {regions.map((r) => {
          const isSelected = selected?.id === r.id;
          const color = layer.getColor(r);
          return (
            <Marker
              key={`city-${r.id}-${activeLayer}-${isSelected}`}
              position={r.latlng}
              icon={createMarkerIcon(color, isSelected, true)}
              eventHandlers={{ click: () => { onSelect(r); setFlyTarget({ latlng: r.latlng, zoom: 11 }); } }}
            >
              <Popup>
                <div className="text-center min-w-[120px]">
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-white/60">{r.temperature}°C · AQI {r.airQuality}</p>
                  <p className="text-[10px] mt-1 font-semibold" style={{ color }}>{layer.getValue(r)}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Featured city radius circles */}
        {regions.map((r) => {
          const isSelected = selected?.id === r.id;
          const color = layer.getColor(r);
          return (
            <Circle
              key={`circle-${r.id}-${activeLayer}`}
              center={r.latlng}
              radius={r.radius}
              pathOptions={{
                color: isSelected ? "#a78bfa" : color,
                fillColor: color,
                fillOpacity: isSelected ? layer.getOpacity(r) + 0.12 : layer.getOpacity(r),
                weight: isSelected ? 2 : 1,
                dashArray: isSelected ? undefined : "6 4",
              }}
              eventHandlers={{ click: () => { onSelect(r); setFlyTarget({ latlng: r.latlng, zoom: 11 }); } }}
            />
          );
        })}

        {/* Selected custom location marker */}
        {selected && !regions.find((r) => r.id === selected.id) && (
          <>
            <Marker
              position={selected.latlng}
              icon={createMarkerIcon(layer.getColor(selected), true, false)}
            >
              <Popup>
                <div className="text-center min-w-[120px]">
                  <p className="font-bold text-sm">{selected.name}</p>
                  <p className="text-xs text-white/60">{selected.temperature}°C · AQI {selected.airQuality}</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={selected.latlng}
              radius={5000}
              pathOptions={{ color: "#a78bfa", fillColor: layer.getColor(selected), fillOpacity: 0.25, weight: 2 }}
            />
          </>
        )}

        <LocateButton onLocate={(lat, lng) => handleMapClick(lat, lng)} />
      </MapContainer>

      {/* ═══ SEARCH ═══ */}
      <div className="absolute top-3 left-3 z-[1000] w-80">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm transition-all shadow-lg ${
            showSearch
              ? "bg-[#1a1035]/95 border border-violet-500/30 text-white backdrop-blur-xl"
              : "bg-[#1a1035]/90 backdrop-blur-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20"
          }`}
        >
          <Search size={16} />
          <span className="flex-1 text-left text-xs">Buscar qualquer cidade do Brasil...</span>
        </button>

        {showSearch && (
          <div className="mt-1.5 bg-[#1a1035]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/5">
              <Search size={14} className="text-white/30 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Ex: Curitiba, Recife, Salvador..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchResults([]); }}>
                  <X size={14} className="text-white/30 hover:text-white/60" />
                </button>
              )}
            </div>

            {isSearching && <div className="px-3 py-4 text-center text-xs text-white/30">Buscando...</div>}

            {!isSearching && searchResults.length > 0 && (
              <div className="max-h-60 overflow-y-auto">
                {searchResults.map((result) => {
                  const parts = result.display_name.split(", ");
                  return (
                    <button
                      key={result.place_id}
                      onClick={() => selectSearchResult(result)}
                      className="w-full flex items-start gap-2.5 px-3 py-2.5 text-left hover:bg-white/[0.06] transition-colors border-b border-white/5 last:border-0"
                    >
                      <Navigation size={12} className="text-violet-400 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-medium truncate">{parts[0]}</p>
                        <p className="text-[10px] text-white/30 truncate">{parts.slice(1, 4).join(", ")}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {!isSearching && searchQuery.length >= 3 && searchResults.length === 0 && (
              <div className="px-3 py-4 text-center text-xs text-white/30">Nenhum resultado encontrado</div>
            )}

            {!isSearching && searchQuery.length < 3 && (
              <div className="p-3">
                <p className="text-[10px] text-white/20 uppercase tracking-wide font-semibold mb-2">Cidades em destaque</p>
                <div className="flex flex-wrap gap-1.5">
                  {regions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => { onSelect(r); setFlyTarget({ latlng: r.latlng, zoom: 11 }); setShowSearch(false); }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.05] text-white/50 hover:bg-violet-500/20 hover:text-violet-300 transition-all"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.getColor(r) }} />
                      {r.name}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-white/15 mt-3">Ou clique em qualquer ponto do mapa</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ LAYERS ═══ */}
      <div className="absolute top-3 right-3 z-[1000]">
        <button
          onClick={() => setShowLayers(!showLayers)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg ${
            showLayers
              ? "bg-violet-600 text-white border border-violet-400/30"
              : "bg-[#1a1035]/90 backdrop-blur-xl border border-white/15 text-white/60 hover:text-violet-400"
          }`}
          title="Camadas"
        >
          <Layers size={18} />
        </button>

        {showLayers && (
          <div className="mt-2 w-48 bg-[#1a1035]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="px-3 py-2 border-b border-white/5">
              <p className="text-[9px] font-semibold text-white/25 uppercase tracking-wider">Camadas</p>
            </div>
            {(Object.entries(layerConfig) as [MapLayer, typeof layerConfig.risco][]).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => { setActiveLayer(key); setShowLayers(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition-all ${
                  activeLayer === key ? "bg-violet-600/20 text-violet-300" : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="flex-1 text-left">{cfg.label}</span>
                {activeLayer === key && <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══ LEGEND — Meus Locais ═══ */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#1a1035]/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-lg max-w-[220px]">
        <p className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mb-2">
          Meus Locais Monitorados
        </p>
        {favorites.length === 0 ? (
          <div className="py-2 text-center">
            <p className="text-[10px] text-white/20 leading-relaxed">
              Favorite locais no painel ao lado para acessá-los rapidamente aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {favorites.map((r) => (
              <button
                key={r.id}
                onClick={() => { onSelect(r); setFlyTarget({ latlng: r.latlng, zoom: 12 }); }}
                className={`flex items-center gap-2 w-full text-left text-[11px] rounded-md px-1.5 py-1 transition-all ${
                  selected?.id === r.id ? "bg-violet-500/20 text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: layer.getColor(r) }} />
                <span className="flex-1 truncate">{r.name}</span>
                <span className="font-mono text-[9px] text-white/25">{layer.getValue(r)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══ ACTIVE LAYER BADGE ═══ */}
      <div className="absolute bottom-3 right-3 z-[1000] flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1035]/90 backdrop-blur-xl border border-white/10 rounded-lg text-[10px] text-white/35 shadow-lg">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        {layer.label}
      </div>
    </div>
  );
}

// ─── Locate button (needs map context) ───
function LocateButton({ onLocate }: { onLocate: (lat: number, lng: number) => void }) {
  const map = useMap();
  return (
    <button
      onClick={() => {
        map.locate({ setView: false, maxZoom: 12 });
        map.once("locationfound", (e) => onLocate(e.latlng.lat, e.latlng.lng));
        map.once("locationerror", () => {
          // Fallback: São Paulo
          onLocate(-23.5505, -46.6333);
        });
      }}
      className="absolute bottom-20 right-3 z-[1000] w-10 h-10 bg-[#1a1035]/90 backdrop-blur-xl border border-white/15 rounded-xl flex items-center justify-center text-white/60 hover:text-violet-400 hover:border-violet-500/40 transition-all shadow-lg"
      title="Minha localização"
    >
      <Crosshair size={18} />
    </button>
  );
}
