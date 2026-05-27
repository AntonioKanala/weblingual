// Tipos de las tablas que pobla n8n desde Dentalink (solo los campos que usamos).

export type Cita = {
  id: number;
  id_paciente: number;
  nombre_paciente: string | null;
  estado_cita: string | null;
  nombre_tratamiento: string | null;
  nombre_dentista: string | null;
  fecha: string | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  comentarios: string | null;
};

export type Paciente = {
  id: number;
  rut: string | null;
  nombre: string | null;
  apellidos: string | null;
  telefono: string | null;
  celular: string | null;
  email: string | null;
};

export type CitaConPaciente = Cita & {
  paciente: Paciente | null;
  evaluada: boolean;
};
