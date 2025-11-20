import Link from "next/link";

const BannerProduct = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="relatve overflow-hidden rounde-xl shadow-xl transition duration-300 bg-linear-to-br from-orange-100 to-amber-100 shadow-gray-300/50 dark:from-gray-800 dark:to-gray-900 dark:shadow-black/70">
        <div className="px-6 py-10 sm:px-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-3/5 text-center lg:text-left mb-8 lg:mb-0">
            <p className="text-gray-600 dark:text-white text-base font-medium opacity-80 uppercase tracking-wider">
              GIUGNO DISTRIBUCIONES - SOCIO PROFESIONAL
            </p>

            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-600 dark:from-sky-500 dark:to-blue-300 leading-tight">
              !Stockeate! <br className="sm:hidden" /> Aumenta tu Margen
              de Ganancia
            </h2>

            <p className="mt-4 text-xl text-orange-800 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
              Accede a precios mayoristas exclusivos. La calidad que tus clientes
              aman, la rentabilidad que tu negocio necesita
            </p>
          </div>

          <div className="font-bold text-lg px-5 py-2 m-4 rounded-full shadow-lg transform -rotate-1 mb-6 bg-amber-100 text-amber-700 shadow-amber-200 dark:bg-sky-700 dark:text-sky-100 dark:shadow-sky-600">
            !HASTA 25% DE AHORRO!
          </div>

          <Link href={"#"} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-bold rounded-full shadow-xl text-white bg-yellow-500
          dark:bg-sky-900 dark:hover:bg-sky-500 hover:bg-orange-400 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 dark:focus:ring-sky-900 focus:ring-opacity-50">
          Ver Ofertas Mayoristas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
