import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda tu Evaluación Gratis | Ortodoncia Lingual Las Condes",
  description:
    "Agenda en línea tu evaluación inicial gratuita de ortodoncia lingual en Las Condes: diagnóstico, plan y presupuesto claros. O llámanos al +56 9 9012 3002.",
  alternates: {
    canonical: "/agenda-tu-sonrisa-perfecta",
  },
  openGraph: {
    title: "Agenda tu Evaluación Gratis | Ortodoncia Lingual Las Condes",
    description:
      "Agenda tu evaluación inicial de ortodoncia lingual en Las Condes, Santiago.",
    url: "/agenda-tu-sonrisa-perfecta",
  },
};

export default function AgendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
