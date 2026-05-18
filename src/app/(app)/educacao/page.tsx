"use client";

import { useState } from "react";
import {
  CloudLightning,
  Waves,
  Sun,
  Wind,
  Leaf,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { educationCards } from "@/data/mockEducation";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  CloudLightning,
  Waves,
  Sun,
  Wind,
  Leaf,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Emergência": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  "Saúde": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Educação": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Sustentabilidade": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};

const categoryIconColors: Record<string, string> = {
  "Emergência": "text-red-500 bg-red-100",
  "Saúde": "text-amber-500 bg-amber-100",
  "Educação": "text-blue-500 bg-blue-100",
  "Sustentabilidade": "text-emerald-500 bg-emerald-100",
};

export default function EducacaoPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Educação Ambiental"
        description="Aprenda a se proteger e contribuir para um meio ambiente mais saudável."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationCards.map((card) => {
          const Icon = iconMap[card.icon] ?? Leaf;
          const colors = categoryColors[card.category] ?? categoryColors["Educação"];
          const iconColor = categoryIconColors[card.category] ?? "text-teal-500 bg-teal-100";
          const isExpanded = expandedId === card.id;

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    {card.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.summary}</p>
              </div>

              <div className="px-6 pb-4">
                <button
                  onClick={() => toggle(card.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  {isExpanded ? "Ocultar dicas" : "Ver dicas"}
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-3">
                  {card.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
