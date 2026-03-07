import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda tu Evaluación | Clínica Lingual Santiago",
  description:
    "Agenda tu evaluación inicial de ortodoncia lingual en Clínica Lingual, Las Condes, Santiago. +5,000 tratamientos. Llámanos al (2) 2944 4714.",
};

export default function AgendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
