import { Phone, MessageCircle } from "lucide-react";
import { aE164, formatearParaMostrar, linkWhatsApp } from "@/lib/interno/telefono";

// Teléfono listo para llamar: tel: abre el marcador (o el softphone del computador)
// y el botón verde abre WhatsApp Web con el mensaje ya escrito.
export function CeldaTelefono({
  telefono,
  mensajeWhatsApp,
}: {
  telefono: string | null;
  mensajeWhatsApp?: string;
}) {
  const e164 = aE164(telefono);
  const wa = linkWhatsApp(telefono, mensajeWhatsApp);

  if (!e164) {
    return <span className="text-xs text-[#6B6B6B]">Sin teléfono</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`tel:${e164}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 bg-white px-2.5 py-1 text-sm font-medium tabular-nums text-[#1A1A1A] transition hover:border-[#C9A96E] hover:bg-[#C9A96E]/10"
      >
        <Phone className="h-3.5 w-3.5 text-[#C9A96E]" />
        {formatearParaMostrar(telefono)}
      </a>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir WhatsApp"
          className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 p-1.5 text-emerald-700 transition hover:bg-emerald-100"
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
