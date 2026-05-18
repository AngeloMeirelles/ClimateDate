"use client";

import { useState } from "react";
import {
  CloudLightning,
  Waves,
  Sun,
  Wind,
  Leaf,
  Thermometer,
  ShieldCheck,
  Recycle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  AlertTriangle,
  Heart,
  GraduationCap,
  Clock,
  Radio,
  Star,
  Filter,
  Search,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { educationCards, categories } from "@/data/mockEducation";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  CloudLightning, Waves, Sun, Wind, Leaf, Thermometer, ShieldCheck, Recycle,
  BookOpen, AlertTriangle, Heart, GraduationCap,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  "Emergência": { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/25", iconBg: "bg-red-500/20 text-red-400" },
  "Saúde": { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/25", iconBg: "bg-amber-500/20 text-amber-400" },
  "Educação": { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/25", iconBg: "bg-blue-500/20 text-blue-400" },
  "Sustentabilidade": { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/25", iconBg: "bg-emerald-500/20 text-emerald-400" },
};

const importanceConfig: Record<string, { label: string; color: string }> = {
  essencial: { label: "Essencial", color: "bg-red-500/20 text-red-300 border-red-500/25" },
  recomendado: { label: "Recomendado", color: "bg-violet-500/20 text-violet-300 border-violet-500/25" },
  informativo: { label: "Informativo", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/25" },
};

const categoryFilterIcons: Record<string, LucideIcon> = {
  todos: BookOpen, "Emergência": AlertTriangle, "Saúde": Heart, "Educação": GraduationCap, "Sustentabilidade": Leaf,
};

export default function EducacaoPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = educationCards.filter((card) => {
    if (selectedCategory !== "todos" && card.category !== selectedCategory) return false;
    if (searchTerm && !card.title.toLowerCase().includes(searchTerm.toLowerCase()) && !card.summary.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const essentialCount = educationCards.filter((c) => c.importance === "essencial").length;
  const categoryCount = [...new Set(educationCards.map((c) => c.category))].length;
  const totalTips = educationCards.reduce((sum, c) => sum + c.tips.length, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Educação Ambiental"
        description="Aprenda a se proteger e contribuir para um meio ambiente mais saudável."
        action={
          <div className="flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 px-3 py-1.5 rounded-xl text-sm font-medium">
            <BookOpen size={16} />
            <span>{educationCards.length} conteúdos</span>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <BookOpen size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{educationCards.length}</p>
              <p className="text-[11px] text-white/40">Conteúdos</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Star size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{essentialCount}</p>
              <p className="text-[11px] text-white/40">Essenciais</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <GraduationCap size={20} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{categoryCount}</p>
              <p className="text-[11px] text-white/40">Categorias</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalTips}</p>
              <p className="text-[11px] text-white/40">Dicas no total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-violet-400" />
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Filtros</h3>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Buscar conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const CatIcon = categoryFilterIcons[cat.value] || BookOpen;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                    : "bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1]"
                }`}
              >
                <CatIcon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {filtered.map((card) => {
            const Icon = iconMap[card.icon] ?? BookOpen;
            const colors = categoryColors[card.category] ?? categoryColors["Educação"];
            const imp = importanceConfig[card.importance];
            const isExpanded = expandedId === card.id;

            return (
              <div
                key={card.id}
                className={`glass rounded-2xl overflow-hidden transition-all hover:border-white/20 ${isExpanded ? "ring-1 ring-white/10" : ""}`}
              >
                {/* Category color bar */}
                <div className={`h-1 ${colors.bg.replace("/15", "")}`} style={{ opacity: 0.6 }} />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colors.iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                        {card.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${imp.color}`}>
                        {imp.label}
                      </span>
                    </div>
                  </div>

                  {/* Title & summary */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{card.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{card.summary}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-white/30">
                    <span className="flex items-center gap-1"><Clock size={11} /> {card.readTime} de leitura</span>
                    <span className="flex items-center gap-1"><Radio size={11} /> {card.source}</span>
                  </div>

                  {/* Related alerts */}
                  {card.relatedAlerts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {card.relatedAlerts.map((a) => (
                        <span key={a} className="flex items-center gap-1 text-[10px] text-amber-300/70 bg-amber-500/10 border border-amber-500/15 px-2 py-0.5 rounded-full">
                          <AlertTriangle size={9} /> {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expand button */}
                <div className="px-5 pb-4">
                  <button
                    onClick={() => toggle(card.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isExpanded
                        ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                        : "text-white/50 bg-white/[0.04] border border-white/8 hover:bg-white/[0.08]"
                    }`}
                  >
                    {isExpanded ? "Ocultar dicas" : `Ver ${card.tips.length} dicas`}
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                {/* Expanded tips */}
                {isExpanded && (
                  <div className="border-t border-white/5 px-5 py-4 space-y-2.5">
                    {card.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-cyan-400">{i + 1}</span>
                        </div>
                        <span className="text-sm text-white/70 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center glass rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4">
            <Search size={28} className="text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Nenhum conteúdo encontrado</h3>
          <p className="text-sm text-white/40 max-w-sm">
            Tente ajustar os filtros ou a busca para encontrar o conteúdo desejado.
          </p>
        </div>
      )}
    </div>
  );
}
