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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Search className="h-5 w-5 text-teal-600" />
          <span className="text-sm font-semibold text-gray-700">Filtrar por tipo de resíduo</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {wasteTypeOptions.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedType === type
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Recycle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-1">
            Nenhum ponto encontrado
          </h3>
          <p className="text-sm text-gray-400">
            Não há pontos de reciclagem para o tipo de resíduo selecionado. Tente outro filtro.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((point) => (
            <div
              key={point.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">{point.name}</h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    point.open
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {point.open ? "Aberto" : "Fechado"}
                </span>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-teal-500 shrink-0" />
                  <span>{point.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-teal-500 shrink-0" />
                  <span>{point.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-teal-500 shrink-0" />
                  <span>{point.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {point.wasteTypes.map((type) => (
                  <span
                    key={type}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-400">Distância</span>
                <span className="text-sm font-semibold text-teal-700">{point.distance}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
