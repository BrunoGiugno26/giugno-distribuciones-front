"use client";

import { Scissors, Store, User } from "lucide-react";
import Link from "next/link";

const ProfileSelector = () => {
  return (
    <section className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="relative overflow-hidden rounded-xl shadow-xl transition duration-300 bg-cover bg-center bg-[url('/logo-GiugnoDistribuciones.jpeg')] shadow-gray-300/50 dark:shadow-black/70">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/20"></div>

        <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2 className="text-4xl text-white font-bold mb-4">
            ¡Bienvenido a Giugno Distribuciones!
          </h2>
          <p className="text-white text-lg mb-12">
            Elegí tu perfil y descubrí productos pensados para vos 😊💇❤️.
          </p>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <Link
              href="/category/peluquerias-y-perfumerias"
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-transform text-left"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600 dark:text-sky-600" />{" "}
                Consumo Particular
              </h3>
              <p className="text-muted-foreground text-sm">
                Productos para uso personal, cuidado diario y belleza accesible.
              </p>
            </Link>

            <Link
              href="/peluquerias/reventa"
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-transform text-left"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Scissors className="w-5 h-5  text-amber-600 dark:text-sky-600" />{" "}
                Peluquerías
              </h3>
              <p className="text-muted-foreground text-sm">
                Productos técnicos, herramientas y mobiliario para
                profesionales.
              </p>
            </Link>

            <Link
              href="/offers"
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-transform text-left"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-600 dark:text-sky-600" />{" "}
                Perfumerías
              </h3>
              <p className="text-muted-foreground text-sm">
                Ofertas por volumen y condiciones especiales para negocios.
              </p>
            </Link>
          </div>
          <p className="mt-12 text-sm text-white">
            ¿No sabés qué perfil elegir? Podés explorar libremente
            <br />o{" "}
            <Link href="/contact" className="underline hover:text-accent">
              contactarnos
            </Link>{" "}
            para que te asesoremos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileSelector;
