// Opciones de los dropdowns del formulario de evaluación.
// Alineadas con los Custom Fields de GHL. Si cambian seguido, conviene
// moverlas a una tabla de Supabase para editarlas sin re-deploy.

// Solo se evalúan las citas cuyo profesional en Dentalink es este.
export const PROFESIONAL_EVALUACION = "Ortodoncia Evaluación Inicial";

// label = lo que ve la secretaria; value = el valor exacto de la opción en GHL.
export const DOCTORES_EVALUADORES = [
  { label: "Pablo Borquez", value: "pablo_borquez" },
  { label: "Valentina Pinkas", value: "valentina_pinkas" },
  { label: "Bárbara Sepúlveda", value: "bárbara_sepúlveda" },
  { label: "María Paz Teutsch", value: "maría_paz_teutsch" },
  { label: "Javier Poblete", value: "javier_poblete" },
] as const;

export const TIPOS_CASO = [
  "Apiñamiento leve",
  "Apiñamiento severo",
  "Mordida abierta",
  "Mordida profunda",
  "Mordida cruzada",
  "Sobremordida",
  "Diastemas",
  "Protrusión",
  "Otro",
] as const;

// Ajusta estos montos a tu cotización real.
export const PRECIOS_COTIZADOS = [
  "$1.200.000",
  "$1.350.000",
  "$1.500.000",
  "$1.650.000",
  "$1.800.000",
  "$1.965.000",
  "Otro",
] as const;

export const OBJECIONES = [
  "Precio",
  "Miedo",
  "Tiempo",
  "Pensarlo",
  "Comparando",
  "No prioridad",
] as const;

export const NIVELES_INTERES = ["Alto", "Medio", "Bajo", "Frío"] as const;

export const DURACIONES_ESTIMADAS = [
  "6 meses",
  "9 meses",
  "12 meses",
  "18 meses",
  "24 meses",
] as const;

export const TIPOS_SEGURO = [
  "ISAPRE",
  "Seguro complementario",
  "No",
  "No sabe",
] as const;

export const ISAPRES = [
  "Banmédica",
  "Colmena",
  "Cruz Blanca",
  "Consalud",
  "Vida Tres",
  "Nueva Masvida",
  "Fonasa",
  "Otra",
] as const;

export const SEGUROS = [
  "MetLife",
  "Bice Vida",
  "Consorcio",
  "SURA",
  "Vida Security",
  "Otro",
] as const;

export const PLANES_PAGO = ["3 cuotas", "6 cuotas", "12 cuotas", "No definido"] as const;

export const FASES_SEGUIMIENTO = [
  "Fase 1",
  "Fase 2",
  "Fase 3",
  "Fase 4",
  "Completado",
  "Convertido",
] as const;
