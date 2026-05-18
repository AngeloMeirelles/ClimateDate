"use client";

import {
  Shield,
  Leaf,
  Flame,
  CloudSun,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { publicContacts } from "@/data/mockContacts";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Leaf,
  Flame,
  CloudSun,
};

const iconColors: Record<string, string> = {
  Shield: "text-blue-600 bg-blue-100",
  Leaf: "text-emerald-600 bg-emerald-100",
  Flame: "text-red-600 bg-red-100",
  CloudSun: "text-teal-600 bg-teal-100",
};

export default function ContatosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contatos e Serviços Públicos"
        description="Encontre os contatos essenciais para emergências e serviços ambientais."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publicContacts.map((contact) => {
          const Icon = iconMap[contact.icon] ?? Shield;
          const colorClass = iconColors[contact.icon] ?? "text-teal-600 bg-teal-100";

          return (
            <div
              key={contact.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${colorClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800">{contact.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {contact.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-teal-500 shrink-0" />
                  <span className="font-medium">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-teal-500 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-teal-500 shrink-0" />
                  <span>{contact.available}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors">
                  <Phone className="h-4 w-4" />
                  Ligar
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors">
                  <Mail className="h-4 w-4" />
                  Enviar E-mail
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
