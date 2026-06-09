"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, AlertTriangle, FileText, BookOpen, Recycle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { regions } from "@/data/mockRegions";
import { alerts } from "@/data/mockAlerts";
import { reports } from "@/data/mockReports";
import { educationCards } from "@/data/mockEducation";
import { recyclingPoints } from "@/data/mockRecyclingPoints";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "region" | "alert" | "report" | "education" | "recycling";
  href: string;
  icon: React.ElementType;
}

const typeConfig: Record<string, { label: string; color: string }> = {
  region: { label: "Região", color: "text-violet-400" },
  alert: { label: "Alerta", color: "text-red-400" },
  report: { label: "Relatório", color: "text-cyan-400" },
  education: { label: "Educação", color: "text-emerald-400" },
  recycling: { label: "Reciclagem", color: "text-amber-400" },
};

function getAllResults(): SearchResult[] {
  const results: SearchResult[] = [];
  regions.forEach((r) =>
    results.push({
      id: `r-${r.id}`,
      title: r.name,
      subtitle: `${r.temperature}°C · AQI ${r.airQuality} · Risco: ${r.riskLevel}`,
      type: "region",
      href: "/mapa",
      icon: MapPin,
    })
  );
  alerts.forEach((a) =>
    results.push({
      id: `a-${a.id}`,
      title: a.title,
      subtitle: `${a.region} · ${a.severity}`,
      type: "alert",
      href: "/alertas",
      icon: AlertTriangle,
    })
  );
  reports.forEach((r) =>
    results.push({
      id: `rp-${r.id}`,
      title: r.title,
      subtitle: r.region,
      type: "report",
      href: "/relatorios",
      icon: FileText,
    })
  );
  educationCards.forEach((e) =>
    results.push({
      id: `e-${e.id}`,
      title: e.title,
      subtitle: e.category,
      type: "education",
      href: "/educacao",
      icon: BookOpen,
    })
  );
  recyclingPoints.forEach((p) =>
    results.push({
      id: `rc-${p.id}`,
      title: p.name,
      subtitle: p.address,
      type: "recycling",
      href: "/reciclagem",
      icon: Recycle,
    })
  );
  return results;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const allResults = getAllResults();
  const filtered =
    query.trim().length > 0
      ? allResults
          .filter(
            (r) =>
              r.title.toLowerCase().includes(query.toLowerCase()) ||
              r.subtitle.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 10)
      : [];

  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]" role="dialog" aria-modal="true" aria-label="Busca global">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-[#1a1035] border border-white/15 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={18} className="text-white/40 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar regiões, alertas, relatórios..."
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X size={16} className="text-white/40" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query.trim().length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-white/30">Digite para buscar...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <Search size={24} className="text-white/20 mx-auto mb-2" />
              <p className="text-sm text-white/40">Nenhum resultado encontrado</p>
            </div>
          ) : (
            <div className="py-2">
              {filtered.map((result) => {
                const cfg = typeConfig[result.type];
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.06] transition-colors text-left"
                  >
                    <result.icon size={16} className={cfg.color} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{result.title}</p>
                      <p className="text-xs text-white/40 truncate">{result.subtitle}</p>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    <ArrowRight size={14} className="text-white/20" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] text-white/20">ESC para fechar</p>
          <p className="text-[10px] text-white/20">{filtered.length} resultado(s)</p>
        </div>
      </div>
    </div>
  );
}
