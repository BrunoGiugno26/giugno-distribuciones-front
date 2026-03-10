"use client";

import { useGetSolucionesPerfumerias } from "@/api/useGetSolucionesPerfumerias";
import HeroPerfumerias from "./components/HeroPerfumerias";
import Pasos from "./components/Pasos";
import Beneficios from "./components/Beneficios";
import Marcas from "./components/Marcas";
import FAQs from "./components/FAQs";
import CTA from "./components/CTA";

export default function PerfumeriasPage() {
  const { loading, result, error } = useGetSolucionesPerfumerias();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!result) return <p>No hay contenido disponible</p>;

  const data = result.attributes;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <HeroPerfumerias data={data} />

      {data.beneficios && data.beneficios.length > 0 && (
        <Beneficios beneficios={data.beneficios} />
      )}

      {data.pasos && data.pasos.length > 0 && (
        <Pasos pasos={data.pasos} />
      )}

      <Marcas titulo={data.tituloMarcas} logos={data.logosMarcas}/>

      {data.faqs && data.faqs.length > 0 && (
        <FAQs faqs={data.faqs}/>
      )}

      <CTA texto={data.textoCTA} link={data.linkCTA} />
      
    </main>
  );
}
