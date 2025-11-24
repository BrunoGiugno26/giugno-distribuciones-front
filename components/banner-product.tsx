import Link from "next/link";

const BannerProduct = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="relative overflow-hidden rounded-xl shadow-xl transition duration-300 bg-cover bg-center bg-[url('/logo-GiugnoDistribuciones.jpeg')] shadow-gray-300/50 dark:shadow-black/70">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="px-6 py-10 sm:px-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
          <div className="lg:w-3/5 text-center lg:text-left mb-8 lg:mb-0">
            <p className="text-white text-base font-medium opacity-90 uppercase tracking-wider">
              GIUGNO DISTRIBUCIONES - SOCIO PROFESIONAL
            </p>

            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              !Stockeate! <br className="sm:hidden" /> Aumenta tu Margen
              de Ganancia
            </h2>

            <p className="mt-4 text-xl text-white max-w-lg mx-auto lg:mx-0">
              Accede a precios mayoristas exclusivos. La calidad que tus clientes
              aman y la rentabilidad que tu negocio necesita
            </p>
          </div>

          <div className="font-bold text-center text-lg px-5 py-2 m-4 rounded-full shadow-lg transform -rotate-1 mb-6 bg-amber-100 text-amber-700 shadow-amber-950 dark:bg-amber-700 dark:text-sky-100 dark:shadow-amber-900">
            25% DE AHORRO!!!
          </div>

          <Link href={"#"} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg text-center font-bold rounded-full shadow-xl text-amber-700 bg-amber-100 dark:bg-amber-200 dark:hover:bg-amber-950 dark:text-white hover:bg-orange-900 hover:text-white transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 dark:focus:ring-sky-900">
            COMPRAR AHORA!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
