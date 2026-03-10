export type StrapiBlock = {
  type: string;
  children: { text: string }[];
};

export type StrapiMedia = {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string | null;
      formats?: {
        large?: { url: string };
        medium?: { url: string };
        small?: { url: string };
        thumbnail?: { url: string };
      }
    };
  } | null;
};

export type StrapiMediaMultiple = {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string | null;
      formats?: {
        large?: { url: string };
        medium?: { url: string };
        small?: { url: string };
        thumbnail?: { url: string };
      }
    };
  }[] | null;
};

export type BeneficioType = {
  id: number;
  titulo: string;
  descripcion: string;
  icono: StrapiMedia;
};

export type PasoType = {
  id: number;
  numero: number;
  titulo: string;
  descripcion: string;
};

export type FAQType = {
  id: number;
  pregunta: string;
  respuesta: StrapiBlock[];
};

export type SolucionesPerfumeriasType = {
  id: number;
  attributes: {
    tituloHero: string;
    subtituloHero: StrapiBlock[];

    bannerHero?: StrapiMedia | null;

    beneficios?: BeneficioType[] | null;

    pasos?: PasoType[] | null;

    tituloMarcas: string;

    logosMarcas?: StrapiMediaMultiple | null;

    textoCTA: string;
    linkCTA: string;
    tituloPacks: string;

    faqs?: FAQType[] | null;
  };
};


