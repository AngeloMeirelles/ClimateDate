"use client";

import Link from "next/link";
import {
  CloudSun,
  BarChart3,
  Map,
  AlertTriangle,
  FileText,
  BookOpen,
  Recycle,
  ArrowRight,
  Shield,
  Leaf,
  Globe,
  Thermometer,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Inteligente",
    desc: "Visualize dados climaticos em tempo real com graficos interativos e indicadores personalizados.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Map,
    title: "Mapa Climatico",
    desc: "Explore o mapa interativo com camadas de temperatura, chuva e qualidade do ar na sua regiao.",
    color: "from-cyan-400 to-violet-500",
  },
  {
    icon: AlertTriangle,
    title: "Alertas em Tempo Real",
    desc: "Receba notificacoes instantaneas sobre eventos climaticos extremos e riscos ambientais.",
    color: "from-pink-400 to-violet-500",
  },
  {
    icon: FileText,
    title: "Relatorios Detalhados",
    desc: "Gere relatorios completos com analises de tendencias e previsoes climaticas locais.",
    color: "from-purple-500 to-cyan-400",
  },
  {
    icon: BookOpen,
    title: "Educacao Ambiental",
    desc: "Acesse conteudos educativos sobre sustentabilidade e acoes para proteger o meio ambiente.",
    color: "from-violet-600 to-purple-600",
  },
  {
    icon: Recycle,
    title: "Pontos de Reciclagem",
    desc: "Encontre pontos de coleta e reciclagem proximos a voce com rotas otimizadas.",
    color: "from-cyan-400 to-purple-500",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              ClimateDate
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/25"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-violet-300 text-sm font-medium mb-8">
            <Globe className="w-4 h-4" />
            Monitoramento climatico inteligente
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ClimateDate
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
            Visualize impactos climaticos locais, receba alertas em tempo real e
            contribua para um futuro mais sustentavel com dados acessiveis e
            acionaveis.
          </p>

          <div className="flex items-center justify-center gap-3 text-sm text-white/40 mb-10">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-violet-400" /> Dados confiaveis
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1">
              <Thermometer className="w-4 h-4 text-cyan-400" /> Tempo real
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1">
              <CloudSun className="w-4 h-4 text-pink-400" /> Previsoes precisas
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-8 py-3.5 text-white font-semibold bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              <BarChart3 className="w-5 h-5" />
              Acessar Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/mapa"
              className="group flex items-center gap-2 px-8 py-3.5 font-semibold text-white bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/[0.1] transition-all"
            >
              <Map className="w-5 h-5" />
              Ver Mapa Climatico
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-8 py-3.5 font-semibold text-violet-300 hover:text-white transition-colors"
            >
              Criar Conta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white/[0.03] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tudo que voce precisa em um so lugar
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Ferramentas poderosas para monitorar, entender e agir sobre as
              mudancas climaticas na sua regiao.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:bg-white/[0.1] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20`}
                >
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 glass py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-violet-400" />
            <span className="font-semibold text-white">ClimateDate</span>
          </div>
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} ClimateDate. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
