-- ============================================================
-- Tabla: seguimiento_llamadas
-- Registro de las llamadas de recuperación que hace la secretaria
-- desde /interno/crm. Una fila por intento de llamada.
--
-- YA APLICADA en el proyecto sheleyytbdikizlwvwvl como la migración
-- `crear_seguimiento_llamadas`. Este archivo queda como referencia
-- del esquema; no hace falta volver a correrlo.
--
-- OJO: las tablas de Dentalink (citas, pacientes, tratamientos, pagos)
-- son VISTAS en `public` sobre tablas reales en el esquema `core`.
-- Esta tabla es propia de la app, así que vive directo en `public`.
-- ============================================================

create table if not exists public.seguimiento_llamadas (
    id uuid primary key default gen_random_uuid(),

    -- A quién se llamó. Se guardan ambos identificadores para poder llamar
    -- tanto a pacientes de Dentalink como a contactos que solo existen en GHL.
    dentalink_paciente_id bigint,
    dentalink_cita_id     bigint,
    ghl_contact_id        text,
    nombre                text,
    telefono              text,

    -- De qué lista salió el contacto.
    origen  text not null default 'no_iniciaron'
            check (origen in ('no_iniciaron','campana')),
    campana text,

    resultado text not null
              check (resultado in ('Contactado','No contesta','Volver a llamar',
                                   'Agendó','No interesado','Número equivocado')),
    notas     text,

    llamado_por uuid references auth.users(id),
    llamado_at  timestamptz not null default now()
);

create index if not exists idx_llamadas_cita     on public.seguimiento_llamadas(dentalink_cita_id);
create index if not exists idx_llamadas_paciente on public.seguimiento_llamadas(dentalink_paciente_id);
create index if not exists idx_llamadas_ghl      on public.seguimiento_llamadas(ghl_contact_id);
create index if not exists idx_llamadas_fecha    on public.seguimiento_llamadas(llamado_at desc);

alter table public.seguimiento_llamadas enable row level security;

-- Solo el personal autenticado de la clínica lee y escribe el seguimiento.
create policy "llamadas_select_authenticated"
    on public.seguimiento_llamadas for select
    to authenticated using (true);

create policy "llamadas_insert_authenticated"
    on public.seguimiento_llamadas for insert
    to authenticated with check (true);
