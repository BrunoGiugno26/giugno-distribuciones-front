/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para el componente Image de Next.js
  images: {
    // La lista de dominios/hostnames de donde Next.js puede cargar imágenes.
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Puerto por defecto de Strapi
        pathname: '/uploads/**', // Permite cualquier ruta dentro de /uploads/
      },
      // Si usas un servidor Strapi en producción, agrégalo aquí también:
      /*
      {
        protocol: 'https',
        hostname: 'tudominiodeapi.com',
      },
      */
    ],
  },
};

module.exports = nextConfig;
