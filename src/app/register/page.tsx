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
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-10 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
            <Leaf className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-3">ClimateDate</h1>
          <p className="text-lg text-emerald-100 text-center max-w-sm leading-relaxed">
            Junte-se a comunidade que monitora e protege o clima da sua regiao.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              ClimateDate
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Crie sua conta</h2>
            <p className="text-gray-500">
              Comece a monitorar o clima da sua regiao agora mesmo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de conta
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType("comum")}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    accountType === "comum"
                      ? "border-teal-500 bg-teal-50 shadow-md shadow-teal-500/10"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Users
                    className={`w-6 h-6 ${
                      accountType === "comum" ? "text-teal-600" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      accountType === "comum" ? "text-teal-700" : "text-gray-700"
                    }`}
                  >
                    Conta Comum
                  </span>
                  <span
                    className={`text-xs ${
                      accountType === "comum" ? "text-teal-600" : "text-gray-400"
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
                      ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/10"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <FlaskConical
                    className={`w-6 h-6 ${
                      accountType === "avancada" ? "text-emerald-600" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      accountType === "avancada" ? "text-emerald-700" : "text-gray-700"
                    }`}
                  >
                    Conta Avancada
                  </span>
                  <span
                    className={`text-xs ${
                      accountType === "avancada" ? "text-emerald-600" : "text-gray-400"
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
              className="group w-full flex items-center justify-center gap-2 py-3 px-4 font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
            >
              <UserPlus className="w-5 h-5" />
              Criar Conta
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Ja tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
