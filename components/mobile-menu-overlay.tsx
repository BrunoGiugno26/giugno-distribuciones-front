"use client";

import { Menu, Package, Scissors, ShoppingBag, Sofa, Sparkles, Tags, X } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchAutocomplete from "./search/SearchAutocomplete";

const MobileMenuOverlay = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Botón hamburguesa visible en mobile y tablet */}
      <button onClick={() => setOpen(true)} className="lg:hidden">
        <Menu className="w-7 h-7" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] backdrop-blur-sm overflow-x-hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-background text-foreground shadow-xl animate-in slide-in-from-left duration-300 ease-out z-[10000]">

            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menú</h2>
              <button onClick={() => setOpen(false)}>
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="p-4 border-b">
              <SearchAutocomplete
                onSelect={({ url }) => {
                  setOpen(false)
                  router.push(url);
                }}
              />
            </div>

            <div className="overflow-y-auto h-[calc(100vh-140px)] p-4 space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-2">

                <AccordionItem value="particular">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Particular
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-7">
                    <Link href="/products/shampoo" onClick={() => setOpen(false)}>Shampoo</Link>
                    <Link href="/products/acondicionador" onClick={() => setOpen(false)}>Acondicionador</Link>
                    <Link href="/products/bano-de-crema" onClick={() => setOpen(false)}>Baños de Crema</Link>
                    <Link href="/products/tonicos-capilares" onClick={() => setOpen(false)}>Tónicos Capilares</Link>
                    <Link href="/products/tinturas" onClick={() => setOpen(false)}>Tinturas</Link>
                    <Link href="/products/decolorantes" onClick={() => setOpen(false)}>Decolorantes</Link>
                    <Link href="/products/ampollas" onClick={() => setOpen(false)}>Ampollas</Link>
                    <Link href="/products/reveladores-oxidantes" onClick={() => setOpen(false)}>Aguas Oxigenadas</Link>
                    <Link href="/products/rep-puntas" onClick={() => setOpen(false)}>Reparador de Puntas</Link>
                    <Link href="/products/finalizadores" onClick={() => setOpen(false)}>Finalizadores</Link>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="peluquerias">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Scissors className="w-5 h-5" />
                      Peluquerías
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-7">
                    <Link href="/peluquerias/productos-profesionales" onClick={() => setOpen(false)}>Productos Profesionales</Link>
                    <Link href="/peluquerias/reventa" onClick={() => setOpen(false)}>Productos de Reventa</Link>
                    <Link href="/peluquerias/accesorios-herramientas-pro" onClick={() => setOpen(false)}>Accesorios / Herramientas</Link>
                    <Link href="/peluquerias/muebles" onClick={() => setOpen(false)}>Muebles</Link>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="perfumeria">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Perfumería y Revendedor
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-7">
                    <Link href="/shop" onClick={() => setOpen(false)}>Perfil</Link>
                    <Link href="/offers" onClick={() => setOpen(false)}>Ofertas por Volumen</Link>
                    <Link href="/como-comprar" onClick={() => setOpen(false)}>¿Cómo Comprar?</Link>
                    <Link href="/faq" onClick={() => setOpen(false)}>Preguntas Frecuentes</Link>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="accesorios">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Accesorios / Herramientas
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-7">
                    <Link href="/category/accesorios-y-herramientas-profesionales" onClick={() => setOpen(false)}>Accesorios Profesionales</Link>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="minorista">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Tags className="w-5 h-5" />
                      Venta Minorista
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-7">
                    <Link href="/category/venta-minorista" onClick={() => setOpen(false)}>Todos los productos</Link>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="muebles">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Sofa className="w-5 h-5" />
                      Muebles Profesionales
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-2 pl-7">
                    <Link href="/muebles-pro" onClick={() => setOpen(false)}>Ver Muebles</Link>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenuOverlay;


