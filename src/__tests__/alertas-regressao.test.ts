/**
 * TESTES DE REGRESSÃO — Módulo de Alertas Climáticos
 *
 * Estes testes garantem que a funcionalidade de alertas continua
 * funcionando corretamente após alterações no sistema (ex: adição
 * da tela de Notificações que consome dados similares).
 *
 * Cenário: A equipe adicionou a tela de Notificações (/notificacoes)
 * com sistema de prioridade e filtros. Precisamos verificar que a
 * tela de Alertas (/alertas) não foi afetada (sem regressão).
 */

import { describe, it, expect } from "vitest";
import { alerts, type AlertSeverity } from "@/data/mockAlerts";

// ============================================================
// Função de filtragem (mesma lógica usada na página de Alertas)
// ============================================================
function filtrarAlertas(
  severity: AlertSeverity | "todos",
  onlyActive: boolean
) {
  return alerts.filter((alert) => {
    if (severity !== "todos" && alert.severity !== severity) return false;
    if (onlyActive && !alert.active) return false;
    return true;
  });
}

// ============================================================
// TESTE 1: Integridade dos dados de alertas
// ============================================================
describe("Integridade dos Dados de Alertas", () => {
  it("deve conter exatamente 8 alertas no sistema", () => {
    expect(alerts).toHaveLength(8);
  });

  it("todo alerta deve ter os campos obrigatórios", () => {
    alerts.forEach((alerta) => {
      expect(alerta.id).toBeDefined();
      expect(alerta.title).toBeTruthy();
      expect(alerta.description).toBeTruthy();
      expect(alerta.severity).toBeTruthy();
      expect(alerta.region).toBeTruthy();
      expect(alerta.recommendation).toBeTruthy();
      expect(typeof alerta.active).toBe("boolean");
    });
  });

  it("severidades devem ser apenas valores válidos", () => {
    const validas: AlertSeverity[] = ["baixo", "medio", "alto", "critico"];
    alerts.forEach((alerta) => {
      expect(validas).toContain(alerta.severity);
    });
  });
});

// ============================================================
// TESTE 2: Filtragem por severidade (funcionalidade principal)
// ============================================================
describe("Filtragem por Severidade", () => {
  it("filtro 'Todos' deve retornar todos os 8 alertas", () => {
    const resultado = filtrarAlertas("todos", false);
    expect(resultado).toHaveLength(8);
  });

  it("filtro 'Crítico' deve retornar apenas alertas críticos", () => {
    const resultado = filtrarAlertas("critico", false);
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((alerta) => {
      expect(alerta.severity).toBe("critico");
    });
  });

  it("filtro 'Alto' deve retornar apenas alertas de severidade alta", () => {
    const resultado = filtrarAlertas("alto", false);
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((alerta) => {
      expect(alerta.severity).toBe("alto");
    });
  });

  it("filtro 'Médio' deve retornar apenas alertas médios", () => {
    const resultado = filtrarAlertas("medio", false);
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((alerta) => {
      expect(alerta.severity).toBe("medio");
    });
  });

  it("filtro 'Baixo' deve retornar apenas alertas baixos", () => {
    const resultado = filtrarAlertas("baixo", false);
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((alerta) => {
      expect(alerta.severity).toBe("baixo");
    });
  });

  it("soma dos filtros individuais deve ser igual ao total", () => {
    const criticos = filtrarAlertas("critico", false).length;
    const altos = filtrarAlertas("alto", false).length;
    const medios = filtrarAlertas("medio", false).length;
    const baixos = filtrarAlertas("baixo", false).length;
    expect(criticos + altos + medios + baixos).toBe(alerts.length);
  });
});

// ============================================================
// TESTE 3: Filtro de alertas ativos
// ============================================================
describe("Filtro de Alertas Ativos", () => {
  it("filtro 'Apenas ativos' deve excluir alertas resolvidos", () => {
    const ativos = filtrarAlertas("todos", true);
    ativos.forEach((alerta) => {
      expect(alerta.active).toBe(true);
    });
  });

  it("deve existir pelo menos 1 alerta ativo e 1 resolvido", () => {
    const ativos = alerts.filter((a) => a.active);
    const resolvidos = alerts.filter((a) => !a.active);
    expect(ativos.length).toBeGreaterThan(0);
    expect(resolvidos.length).toBeGreaterThan(0);
  });

  it("combinação de filtros: 'Crítico' + 'Apenas ativos' funciona", () => {
    const resultado = filtrarAlertas("critico", true);
    resultado.forEach((alerta) => {
      expect(alerta.severity).toBe("critico");
      expect(alerta.active).toBe(true);
    });
  });
});

// ============================================================
// TESTE 4: Expansão de cards (dados para detalhes)
// ============================================================
describe("Dados para Expansão de Cards", () => {
  it("todo alerta deve ter campo 'impact' para o card expandido", () => {
    alerts.forEach((alerta) => {
      expect(alerta.impact).toBeTruthy();
    });
  });

  it("todo alerta deve ter 'recommendation' para o card expandido", () => {
    alerts.forEach((alerta) => {
      expect(alerta.recommendation).toBeTruthy();
    });
  });

  it("todo alerta deve ter 'source' e 'affectedPop'", () => {
    alerts.forEach((alerta) => {
      expect(alerta.source).toBeTruthy();
      expect(alerta.affectedPop).toBeTruthy();
    });
  });
});

// ============================================================
// TESTE 5: Regiões e contagem (resumo do header)
// ============================================================
describe("Resumo de Alertas Ativos (Header)", () => {
  it("contagem de alertas ativos deve ser consistente", () => {
    const ativos = alerts.filter((a) => a.active);
    expect(ativos.length).toBe(6);
  });

  it("regiões dos alertas ativos devem ser listáveis", () => {
    const ativos = alerts.filter((a) => a.active);
    const regioes = [...new Set(ativos.map((a) => a.region))];
    expect(regioes.length).toBeGreaterThan(0);
    regioes.forEach((r) => expect(r).toBeTruthy());
  });
});
