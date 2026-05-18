"use client";

import { useState } from "react";
import { FileText, Download, Lock, ChevronDown, ChevronUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import {
  reports,
  reportTypes,
  reportRegions,
  type Report,
} from "@/data/mockReports";

const typeBadgeColors: Record<string, string> = {
  eventos_extremos: "bg-red-50 text-red-700 border-red-200",
  qualidade_ar: "bg-teal-50 text-teal-700 border-teal-200",
  riscos_ambientais: "bg-amber-50 text-amber-700 border-amber-200",
  indice_uv: "bg-purple-50 text-purple-700 border-purple-200",
};

function getTypeLabel(type: string): string {
  const found = reportTypes.find((t) => t.value === type);
  return found ? found.label : type;
}

function exportCSV(report: Report) {
  const header = "Campo,Valor\n";
  const rows = report.data.map((d) => `"${d.label}","${d.value}"`).join("\n");
  const csv = header + rows;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.title.replace(/\s+/g, "_")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function RelatoriosPage() {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState("todos");
  const [regionFilter, setRegionFilter] = useState("todas");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isComum = user?.accountType === "comum";

  const filtered = reports.filter((report) => {
    if (typeFilter !== "todos" && report.type !== typeFilter) return false;
    if (regionFilter !== "todas" && report.region !== regionFilter && report.region !== "Todas") return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios Climáticos"
        description="Visualize e exporte relatórios detalhados sobre o clima da sua região."
      />

      {isComum ? (
        /* Upgrade Banner */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
            <Lock size={36} className="text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Recurso exclusivo do plano Avançado
          </h2>
          <p className="text-sm text-gray-500 max-w-md mb-6">
            Os relatórios climáticos detalhados estão disponíveis apenas para
            contas do tipo <strong>Avançada</strong>. Faça o upgrade da sua conta
            para ter acesso a relatórios completos, exportação de dados e muito
            mais.
          </p>
          <button className="px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors">
            Fazer upgrade para Avançada
          </button>
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {reportTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {reportRegions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reports Grid */}
          {filtered.length > 0 ? (
            <div className="space-y-4 max-w-3xl">
              {filtered.map((report) => {
                const isExpanded = expandedId === report.id;
                return (
                  <div
                    key={report.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : report.id)
                      }
                      className="w-full text-left p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span
                              className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${
                                typeBadgeColors[report.type] ??
                                "bg-gray-50 text-gray-700 border-gray-200"
                              }`}
                            >
                              {getTypeLabel(report.type)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {report.period}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-800 text-sm mb-1">
                            {report.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {report.region} &middot; {report.date}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {report.summary}
                          </p>
                        </div>
                        <div className="pt-1">
                          {isExpanded ? (
                            <ChevronUp size={18} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={18} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
                        {/* Data Table */}
                        <div className="mt-4 rounded-xl overflow-hidden border border-gray-200">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="text-left px-4 py-2 font-medium text-gray-600">
                                  Campo
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-600">
                                  Valor
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {report.data.map((d, i) => (
                                <tr
                                  key={i}
                                  className="border-t border-gray-100"
                                >
                                  <td className="px-4 py-2 text-gray-700">
                                    {d.label}
                                  </td>
                                  <td className="px-4 py-2 font-medium text-gray-800">
                                    {d.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Export Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportCSV(report);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
                        >
                          <Download size={16} />
                          Exportar CSV
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <FileText size={28} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Nenhum relatório encontrado
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Nenhum relatório corresponde aos filtros selecionados. Tente
                ajustar os filtros para ver mais resultados.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
