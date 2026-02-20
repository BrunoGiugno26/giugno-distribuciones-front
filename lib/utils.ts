import { ProductType } from "@/types/product"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProductLocations(product: ProductType) {
  const attrs = product.attributes;

  // Normalizador de slugs
  const normalize = (str: string) =>
    decodeURIComponent(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  const categorySlug = attrs.category?.data?.attributes?.slug;

  const rawCategory =
    attrs.tipoProductoNuevo?.data?.attributes?.slug || attrs.tipoProducto;

  const normalized = normalize(rawCategory);

  const slugMap: Record<string, string> = {
    "shampoo": "shampoo",
    "acondicionador": "acondicionador",
    "bano-de-crema": "bano-de-crema",
    "tonico-capilar": "tonicos-capilares",
    "tinturas": "tinturas",
    "tintura": "tinturas",
    "decolorante": "decolorantes",
    "decolorantes": "decolorantes",
    "ampolla": "ampollas",
    "ampollas": "ampollas",
    "accesorio": "accesorios",
    "accesorios": "accesorios",
    "revelador-oxidante": "reveladores-oxidantes",
    "reveladores-oxidantes": "reveladores-oxidantes",
    "reparador-de-puntas": "rep-puntas",
    "rep-puntas": "rep-puntas",
    "finalizador": "finalizadores",
    "finalizadores": "finalizadores",
    "secadores": "accesorios",
  };

  const realCategorySlug = slugMap[normalized] || normalized;

  const locations: { label: string; url: string }[] = [];

  // 🟩 1) Venta minorista → funciona como siempre
  if (categorySlug === "venta-minorista") {
    locations.push({
      label: "Particular",
      url: `/products/${realCategorySlug}?product=${attrs.slug}`,
    });
  }

  // 🟩 2) Accesorios y Herramientas Profesionales (catálogo con precios)
  if (categorySlug === "accesorios-y-herramientas-profesionales") {
    locations.push({
      label: "Particular",
      url: `/category/accesorios-y-herramientas-profesionales?product=${attrs.slug}`,
    });
  }

  // 🟩 3) Muebles Profesionales (catálogo sin precios)
  if (categorySlug === "muebles-pro") {
    locations.push({
      label: "Muebles",
      url: `/peluquerias/muebles?product=${attrs.slug}`,
    });
  }

  // 🟦 Booleanos (tu lógica original)
  if (attrs.esProfesional) {
    locations.push({
      label: "Productos Profesionales",
      url: `/peluquerias/productos-profesionales?product=${attrs.slug}`,
    });
  }

  if (attrs.esReventa) {
    locations.push({
      label: "Reventa",
      url: `/peluquerias/reventa?product=${attrs.slug}`,
    });
  }

  if (attrs.esAccesoriosPro) {
    locations.push({
      label: "Accesorios Profesionales",
      url: `/peluquerias/accesorios-herramientas-pro?product=${attrs.slug}`,
    });
  }

  // 🟩 Eliminar duplicados
  const uniqueLocations = Array.from(
    new Map(locations.map((loc) => [loc.url, loc])).values()
  );

  return uniqueLocations;
}





