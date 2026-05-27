import { z } from "zod";

// Esquema de validación de la ficha de evaluación (se valida en el server action).
export const evaluacionSchema = z.object({
  // Contexto (viene de la cita/paciente, no lo edita la secretaria)
  dentalink_cita_id: z.number(),
  dentalink_paciente_id: z.number().nullable().optional(),
  nombre_paciente: z.string().nullable().optional(),
  rut: z.string().nullable().optional(),
  telefono: z.string().nullable().optional(),
  email: z.string().nullable().optional(),

  // Obligatorios
  doctor_evaluador: z.string().min(1, "Selecciona el doctor evaluador"),
  tipo_caso: z.string().min(1, "Selecciona el tipo de caso"),
  precio_cotizado: z.string().min(1, "Selecciona el precio cotizado"),
  objecion_principal: z.string().min(1, "Selecciona la objeción principal"),
  nivel_interes: z.string().min(1, "Selecciona el nivel de interés"),

  // Opcionales
  duracion_estimada: z.string().nullable().optional(),
  tiene_seguro: z.string().nullable().optional(),
  nombre_isapre: z.string().nullable().optional(),
  nombre_seguro: z.string().nullable().optional(),
  plan_pago: z.string().nullable().optional(),
  foto_caso_similar: z.string().nullable().optional(),
  notas_doctor: z.string().nullable().optional(),

  // Control
  fase_seguimiento: z.string().nullable().optional(),
});

export type EvaluacionInput = z.infer<typeof evaluacionSchema>;
