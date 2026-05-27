"use client";

import { useState, useTransition } from "react";
import { useForm, type UseFormRegister, type FieldError } from "react-hook-form";
import { useRouter } from "next/navigation";
import { guardarEvaluacion } from "@/app/interno/actions";
import type { EvaluacionRow } from "@/lib/interno/data";
import {
  DOCTORES_EVALUADORES,
  TIPOS_CASO,
  PRECIOS_COTIZADOS,
  OBJECIONES,
  NIVELES_INTERES,
  DURACIONES_ESTIMADAS,
  TIPOS_SEGURO,
  ISAPRES,
  SEGUROS,
  PLANES_PAGO,
} from "@/lib/interno/constants";

type Props = {
  citaId: number;
  pacienteId: number;
  nombrePaciente: string | null;
  rut: string | null;
  telefono: string | null;
  email: string | null;
  previa: EvaluacionRow | null;
};

type FormValues = {
  doctor_evaluador: string;
  tipo_caso: string;
  precio_cotizado: string;
  objecion_principal: string;
  nivel_interes: string;
  duracion_estimada: string;
  tiene_seguro: string;
  nombre_isapre: string;
  nombre_seguro: string;
  plan_pago: string;
  foto_caso_similar: string;
  notas_doctor: string;
};

type Mensaje = { tipo: "ok" | "warn" | "error"; texto: string };

type Opcion = string | { label: string; value: string };

function Select({
  name,
  label,
  options,
  register,
  required,
  error,
}: {
  name: keyof FormValues;
  label: string;
  options: readonly Opcion[];
  register: UseFormRegister<FormValues>;
  required?: boolean;
  error?: FieldError;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[#1A1A1A]">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <select
        {...register(name, required ? { required: "Campo obligatorio" } : {})}
        className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
      >
        <option value="">Selecciona…</option>
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value;
          const text = typeof o === "string" ? o : o.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      {error && <span className="mt-1 block text-xs text-red-600">{error.message}</span>}
    </label>
  );
}

export function EvaluacionForm({
  citaId,
  pacienteId,
  nombrePaciente,
  rut,
  telefono,
  email,
  previa,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [mensaje, setMensaje] = useState<Mensaje | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      doctor_evaluador: previa?.doctor_evaluador ?? "",
      tipo_caso: previa?.tipo_caso ?? "",
      precio_cotizado: previa?.precio_cotizado ?? "",
      objecion_principal: previa?.objecion_principal ?? "",
      nivel_interes: previa?.nivel_interes ?? "",
      duracion_estimada: previa?.duracion_estimada ?? "",
      tiene_seguro: previa?.tiene_seguro ?? "",
      nombre_isapre: previa?.nombre_isapre ?? "",
      nombre_seguro: previa?.nombre_seguro ?? "",
      plan_pago: previa?.plan_pago ?? "",
      foto_caso_similar: previa?.foto_caso_similar ?? "",
      notas_doctor: previa?.notas_doctor ?? "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setMensaje(null);
    startTransition(async () => {
      const res = await guardarEvaluacion({
        dentalink_cita_id: citaId,
        dentalink_paciente_id: pacienteId,
        nombre_paciente: nombrePaciente,
        rut,
        telefono,
        email,
        ...values,
      });

      if (!res.ok) {
        setMensaje({ tipo: "error", texto: res.error });
        return;
      }
      if (res.ghlOk) {
        router.push("/interno/agenda");
        router.refresh();
        return;
      }
      // Guardó en Supabase pero el envío a GHL/n8n no se completó.
      setMensaje({
        tipo: "warn",
        texto: `Ficha guardada, pero no se pudo enviar a Canala (${res.ghlError ?? "sin detalle"}). Quedó registrada para reintentar.`,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-black/10 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">Ficha de evaluación</h2>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
        Obligatorios
      </p>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select name="doctor_evaluador" label="Doctor evaluador" options={DOCTORES_EVALUADORES} register={register} required error={errors.doctor_evaluador} />
        <Select name="tipo_caso" label="Tipo de caso" options={TIPOS_CASO} register={register} required error={errors.tipo_caso} />
        <Select name="precio_cotizado" label="Precio cotizado" options={PRECIOS_COTIZADOS} register={register} required error={errors.precio_cotizado} />
        <Select name="objecion_principal" label="Objeción principal" options={OBJECIONES} register={register} required error={errors.objecion_principal} />
        <Select name="nivel_interes" label="Nivel de interés" options={NIVELES_INTERES} register={register} required error={errors.nivel_interes} />
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
        Opcionales
      </p>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select name="duracion_estimada" label="Duración estimada" options={DURACIONES_ESTIMADAS} register={register} />
        <Select name="tiene_seguro" label="Tiene seguro" options={TIPOS_SEGURO} register={register} />
        <Select name="nombre_isapre" label="ISAPRE" options={ISAPRES} register={register} />
        <Select name="nombre_seguro" label="Seguro complementario" options={SEGUROS} register={register} />
        <Select name="plan_pago" label="Plan de pago" options={PLANES_PAGO} register={register} />
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[#1A1A1A]">Foto caso similar (URL)</span>
          <input
            type="url"
            placeholder="https://…"
            {...register("foto_caso_similar")}
            className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
          />
        </label>
      </div>

      <label className="mb-6 block">
        <span className="mb-1 block text-sm font-medium text-[#1A1A1A]">Notas del doctor</span>
        <textarea
          rows={3}
          {...register("notas_doctor")}
          className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
        />
      </label>

      {mensaje && (
        <p
          className={`mb-4 rounded-lg px-3 py-2 text-sm ${
            mensaje.tipo === "error"
              ? "bg-red-50 text-red-700"
              : mensaje.tipo === "warn"
                ? "bg-amber-50 text-amber-700"
                : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {mensaje.texto}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#1A6B4F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#155a42] disabled:opacity-50"
        >
          {pending ? "Guardando…" : previa ? "Actualizar y reenviar a Canala" : "Guardar y enviar a Canala"}
        </button>
        {previa?.enviado_ghl && (
          <span className="text-xs text-emerald-700">Última versión enviada a Canala ✓</span>
        )}
      </div>
    </form>
  );
}
