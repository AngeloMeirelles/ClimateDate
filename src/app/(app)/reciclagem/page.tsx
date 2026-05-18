"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Recycle,
  Search,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { recyclingPoints, wasteTypeOptions } from "@/data/mockRecyclingPoints";

export default function ReciclagemPage() {
  const [selectedType, setSelectedType] = useState("Todos");

  const filtered =
    selectedType === "Todos"
      ? recyclingPoints
      : recyclingPoints.filter((p) => p.wasteTypes.includes(selectedType));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pontos de Reciclagem"
        description="Encontre os pontos de coleta mais próximos e contribua com a reciclagem."
      />

      {/* Filter */}
      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Search className="h-5 w-5 text-violet-400" />
          <span className="text-sm font-semibold text-white/70">Filtrar por tipo de resíduo</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {wasteTypeOptions.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedType === type
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
          <Recycle className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/70 mb-1">
            Nenhum ponto encontrado
          </h3>
          <p className="text-sm text-white/40">
            Não há pontos de reciclagem para o tipo de resíduo selecionado. Tente outro filtro.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((point) => (
            <div
              key={point.id}
              className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{point.name}</h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    point.open
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {point.open ? "Aberto" : "Fechado"}
                </span>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-violet-400 shrink-0" />
                  <span>{point.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Clock className="h-4 w-4 text-violet-400 shrink-0" />
                  <span>{point.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Phone className="h-4 w-4 text-violet-400 shrink-0" />
                  <span>{point.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {point.wasteTypes.map((type) => (
                  <span
                    key={type}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-sm text-white/40">Distância</span>
                <span className="text-sm font-semibold text-violet-400">{point.distance}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
