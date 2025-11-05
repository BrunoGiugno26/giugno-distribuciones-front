"use client"
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// Definición de las líneas de producto (datos estáticos)


const MenuList = () => {
    return (
        <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      GiugnoDistribuciones
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Somos líderes en la distribucion de cosmética capilar profesional y accesorios en Mendoza, Argentina
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu informacion, tus pedidos y mucho más
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Seccion dedicada a promociones y descuentos especiales
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cuidado Capilar</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Para Salones</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default MenuList

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Shampoo",
    href: "/productos/shampoo",
    description:
      "Productos de limpieza profunda o suave, formulados para tratar el cuero cabelludo y la fibra capilar.",
  },
  {
    title: "Acondicionador",
    href: "/productos/acondicionador",
    description:
      "Fórmulas para sellar la cutícula, aportar brillo y facilitar el desenredado después del lavado.",
  },
  {
    title: "Baño de Crema",
    href: "/productos/bano-de-crema",
    description:
      "Tratamientos intensivos de reparación e hidratación profunda para restaurar cabellos secos o dañados.",
  },
  {
    title: "Tónicos Capilares",
    href: "/productos/tonicos-capilares",
    description: "Soluciones líquidas concentradas para estimular el crecimiento y fortalecer el cabello desde la raíz.",
  },
  {
    title: "Tinturas",
    href: "/productos/tinturas",
    description:
      "Coloraciones permanentes y semipermanentes con una amplia gama de tonos para resultados duraderos.",
  },
  {
    title: "Decolorantes",
    href: "/productos/decolorantes",
    description:
      "Productos en polvo o crema para remover el color natural o artificial, preparando el cabello para la coloración.",
  },
  {
    title: "Ampollas",
    href: "/productos/ampollas",
    description:
      "Tratamientos concentrados de dosis única que proporcionan un refuerzo instantáneo de brillo y vitalidad.",
  },
  {
    title: "Accesorios",
    href: "/productos/accesorios",
    description:
      "Herramientas de uso profesional y personal, incluyendo peines, cepillos y elementos para la aplicación de productos.",
  },
  {
    title: "Reveladores Oxidantes",
    href: "/productos/reveladores-oxidantes",
    description:
      "Agentes químicos que se mezclan con las tinturas o decolorantes para activar la acción del color.",
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
  )
}



