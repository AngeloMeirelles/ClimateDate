"use client";

import { Lock, Zap } from "lucide-react";
import Link from "next/link";

interface Props {
  title?: string;
  description?: string;
}

export default function AccessBlocked({
  title = "Recurso exclusivo do plano Avançado",
  description = "Esta funcionalidade está disponível apenas para contas do tipo Avançada. Faça o upgrade da sua conta para ter acesso completo.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-2xl">
      <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">
        <Lock size={36} className="text-amber-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-sm text-white/50 max-w-md mb-6">{description}</p>
      <Link
        href="/perfil"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow"
      >
        <Zap size={16} />
        Fazer upgrade para Avançada
      </Link>
    </div>
  );
}
