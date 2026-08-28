/**
 * Tarjeta contenedora compartida por /tu-experiencia y /tu-experiencia/gracias.
 */
export function TarjetaExperiencia({
  eyebrow,
  titulo,
  children,
}: {
  eyebrow: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200/70 bg-white p-8 shadow-sm sm:p-10">
      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {titulo}
      </h1>
      <div className="mt-5">{children}</div>
    </div>
  );
}
