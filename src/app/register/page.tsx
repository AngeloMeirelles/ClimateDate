"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, AccountType } from "@/contexts/AuthContext";
import { Leaf, Mail, Lock, User, ArrowRight, UserPlus, Users, FlaskConical } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("comum");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password, accountType);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-16 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6">
            <Leaf className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-3">ClimateDate</h1>
          <p className="text-lg text-white/60 text-center max-w-sm leading-relaxed">
            Junte-se a comunidade que monitora e protege o clima da sua regiao.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-8 py-12 bg-gradient-to-br from-[#0f0a1e] to-[#1a1035]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              ClimateDate
            </span>
          </div>

          <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Crie sua conta</h2>
              <p className="text-white/40">
                Comece a monitorar o clima da sua regiao agora mesmo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-1.5">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Tipo de conta
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("comum")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      accountType === "comum"
                        ? "border-violet-500 bg-violet-500/10 shadow-md shadow-violet-500/20"
                        : "border-white/10 bg-white/[0.04] hover:border-white/20"
                    }`}
                  >
                    <Users
                      className={`w-6 h-6 ${
                        accountType === "comum" ? "text-violet-400" : "text-white/40"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        accountType === "comum" ? "text-violet-300" : "text-white/60"
                      }`}
                    >
                      Conta Comum
                    </span>
                    <span
                      className={`text-xs ${
                        accountType === "comum" ? "text-violet-400/80" : "text-white/30"
                      }`}
                    >
                      Cidadao
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("avancada")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      accountType === "avancada"
                        ? "border-purple-500 bg-purple-500/10 shadow-md shadow-purple-500/20"
                        : "border-white/10 bg-white/[0.04] hover:border-white/20"
                    }`}
                  >
                    <FlaskConical
                      className={`w-6 h-6 ${
                        accountType === "avancada" ? "text-purple-400" : "text-white/40"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        accountType === "avancada" ? "text-purple-300" : "text-white/60"
                      }`}
                    >
                      Conta Avancada
                    </span>
                    <span
                      className={`text-xs ${
                        accountType === "avancada" ? "text-purple-400/80" : "text-white/30"
                      }`}
                    >
                      Gestor / Pesquisador
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 py-3 px-4 font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
              >
                <UserPlus className="w-5 h-5" />
                Criar Conta
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/40">
              Ja tem uma conta?{" "}
              <Link
                href="/login"
                className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
