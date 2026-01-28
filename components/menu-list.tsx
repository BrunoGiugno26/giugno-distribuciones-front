"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-nowrap gap-x-4">
        <NavigationMenuItem className="shrink-0">
          <NavigationMenuTrigger>Particular</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuTrigger>Peluquerías</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] grid-cols-1">
              {salon.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuTrigger>Perfumería y Revendedor</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] grid-cols-1">
              {revendedor.map((item) => (
                <ListItem
                key={item.title}
                title={item.title}
                href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default MenuList;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Shampoo",
    href: "/products/shampoo",
    description:
      "Productos de limpieza profunda o suave, formulados para tratar el cuero cabelludo y la fibra capilar.",
  },
  {
    title: "Acondicionador",
    href: "/products/acondicionador",
    description:
      "Fórmulas para sellar la cutícula, aportar brillo y facilitar el desenredado después del lavado.",
  },
  {
    title: "Baños de Cremas",
    href: "/products/bano-de-crema",
    description:
      "Tratamientos intensivos de reparación e hidratación profunda para restaurar cabellos secos o dañados.",
  },
  {
    title: "Tónicos Capilares",
    href: "/products/tonicos-capilares",
    description:
      "Soluciones líquidas concentradas para estimular el crecimiento y fortalecer el cabello desde la raíz.",
  },
  {
    title: "Tinturas",
    href: "/products/tinturas",
    description:
      "Coloraciones permanentes y semipermanentes con una amplia gama de tonos para resultados duraderos.",
  },
  {
    title: "Decolorantes",
    href: "/products/decolorantes",
    description:
      "Productos en polvo o crema para remover el color natural o artificial, preparando el cabello para la coloración.",
  },
  {
    title: "Ampollas",
    href: "/products/ampollas",
    description:
      "Tratamientos concentrados de dosis única que proporcionan un refuerzo instantáneo de brillo y vitalidad.",
  },
  {
    title: "Accesorios",
    href: "/products/accesorios",
    description:
      "Herramientas de uso profesional y personal, incluyendo peines, cepillos y elementos para la aplicación de productos.",
  },
  {
    title: "Reveladores Oxidantes",
    href: "/products/reveladores-oxidantes",
    description:
      "Agentes químicos que se mezclan con las tinturas o decolorantes para activar la acción del color.",
  },
  {
    title: "Reparador de Puntas",
    href: "/products/rep-puntas",
    description:
      "Agentes químicos que se mezclan con las tinturas o decolorantes para activar la acción del color.",
  },
  {
    title: "Finalizadores",
    href: "/products/finalizadores",
    description:
      "Agentes químicos que se mezclan con las tinturas o decolorantes para activar la acción del color.",
  },
];

const salon: { title: string; href: string; description: string }[] = [
  {
    title: "Productos de Reventa",
    href: "/peluquerias/reventa",
    description:
      "Shampooos, acondicionadores, baños de crema y productos de reventa para el salón",
  },
  {
    title: "Accesorios / Herramientas",
    href: "/salones/accesorios-pro",
    description:
      "Tijeras, secadores, capas y herramientas especializadas para el trabajo en salón.",
  },
  {
    title: "Productos Profesionales",
    href: "/salones/productos-profesionales",
    description:
      "Tinturas, Decolorantes, Aguas Oxigenadas y Shampoos y Enjuagues de 5Lt para tu salón.",
  },
  {
    title: "Muebles",
    href: "/salones/muebles",
    description:
      "Sillones, sillas, exhibidores y todo el mobiliario profesional que tu peluquería necesita para crecer.",
  },
];

const revendedor = [
  {
    title: "Perfil",
    href: "/shop",
    description: "Accedé a toda la información, Elegí tu Perfil que mas se adapte a vos!!.",
  },
  {
    title: "Ofertas por Volumen",
    href: "/offers",
    description:
      "Promociones especiales para revendedores habilitados. Consultá condiciones.",
  },
  {
    title: "Cómo Comprar",
    href: "/como-comprar",
    description:
      "Conocé el proceso de compra para cada tipo de cliente. Todo explicado paso a paso.",
  },
  {
    title: "Preguntas Frecuentes",
    href: "/faq",
    description:
      "Respuestas a las dudas más comunes sobre productos, envíos y condiciones comerciales.",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          // CLASES CORREGIDAS: Aplican la interactividad hover/focus y el cursor
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
