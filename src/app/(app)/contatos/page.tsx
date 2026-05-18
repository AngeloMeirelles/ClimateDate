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
  Shield: "text-blue-400 bg-blue-500/20",
  Leaf: "text-emerald-400 bg-emerald-500/20",
  Flame: "text-red-400 bg-red-500/20",
  CloudSun: "text-cyan-400 bg-cyan-500/20",
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
          const colorClass = iconColors[contact.icon] ?? "text-cyan-400 bg-cyan-500/20";

          return (
            <div
              key={contact.id}
              className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${colorClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                  <p className="text-sm text-white/70 mt-1 leading-relaxed">
                    {contact.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Phone className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="font-medium">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Mail className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Clock className="h-4 w-4 text-violet-400 shrink-0" />
                  <span>{contact.available}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20 hover:opacity-90 transition-opacity">
                  <Phone className="h-4 w-4" />
                  Ligar
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1] transition-colors">
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
