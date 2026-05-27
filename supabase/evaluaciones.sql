-- ============================================================
-- Tabla: evaluaciones
-- Ficha que llena la secretaria tras la evaluación del paciente.
-- Se guarda PRIMERO aquí (fuente de verdad / auditoría) y luego
-- se dispara a GHL vía n8n para activar las reactivaciones.
-- Ejecutar en el proyecto Supabase donde n8n escribe dentalink_citas.
-- ============================================================

create extension if not exists "uuid-ossp";

create table if not exists public.evaluaciones (
    id uuid primary key default uuid_generate_v4(),

    -- Vínculos con los datos que vienen de Dentalink (vía n8n)
    dentalink_paciente_id bigint,                 -- dentalink_pacientes.id
    dentalink_cita_id     bigint,                 -- dentalink_citas.id
    nombre_paciente       text,                   -- snapshot para mostrar sin join
    rut                   text,
    telefono              text,
    email                 text,

    -- ---------- OBLIGATORIOS (los llena la secretaria) ----------
    doctor_evaluador   text not null,             -- Dr. Pérez | Dra. González | Dr. Fuentes
    tipo_caso          text not null,             -- Apiñamiento leve/severo, Mordida abierta, ...
    precio_cotizado    text not null,             -- $1.200.000 ... $1.965.000
    objecion_principal text not null,             -- Precio | Miedo | Tiempo | Pensarlo | Comparando | No prioridad
    nivel_interes      text not null,             -- Alto | Medio | Bajo | Frío

    -- ---------- OPCIONALES ----------
    duracion_estimada  text,                      -- 6 a 24 meses
    tiene_seguro       text,                      -- ISAPRE | Seguro complementario | No | No sabe
    nombre_isapre      text,                      -- Banmédica | Colmena | Cruz Blanca | ...
    nombre_seguro      text,                      -- MetLife | Bice Vida | Consorcio | ...
    plan_pago          text,                      -- 3 | 6 | 12 cuotas | No definido
    foto_caso_similar  text,                      -- URL a before/after
    notas_doctor       text,                      -- texto libre

    -- ---------- CONTROL ----------
    fase_seguimiento   text default 'Fase 1',     -- Fase 1-4 | Completado | Convertido
    opted_out          boolean default false,
    fecha_evaluacion   timestamptz default now(),

    -- ---------- Metadatos de la app / envío a GHL ----------
    created_by      uuid references auth.users(id),
    created_at      timestamptz default now(),
    enviado_ghl     boolean default false,
    enviado_ghl_at  timestamptz,
    ghl_response    jsonb
);

create index if not exists idx_evaluaciones_cita      on public.evaluaciones(dentalink_cita_id);
create index if not exists idx_evaluaciones_paciente  on public.evaluaciones(dentalink_paciente_id);
create index if not exists idx_evaluaciones_fecha     on public.evaluaciones(fecha_evaluacion);
create index if not exists idx_evaluaciones_pendientes on public.evaluaciones(enviado_ghl) where enviado_ghl = false;

-- ---------- Row Level Security ----------
alter table public.evaluaciones enable row level security;

-- Solo usuarios autenticados (secretarias) pueden leer/escribir.
create policy "evaluaciones_select_authenticated"
    on public.evaluaciones for select
    to authenticated using (true);

create policy "evaluaciones_insert_authenticated"
    on public.evaluaciones for insert
    to authenticated with check (true);

create policy "evaluaciones_update_authenticated"
    on public.evaluaciones for update
    to authenticated using (true) with check (true);
