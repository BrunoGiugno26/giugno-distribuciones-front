import { ProductType } from "@/types/product";

interface ProductInfoProps {
  product: ProductType;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { attributes } = product;

  return (
    <div className="space-y-8">
      {/* Nombre y marca */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {attributes.productName}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Marca: {attributes.marca}
        </p>
      </div>

      {/* Descripción */}
      <div className="space-y-3">
        <p className="text-gray-700 dark:text-gray-300">
          {attributes.description}
        </p>
        <p className="text-sm text-gray-500">
          Origen: {attributes.origin} | Tipo de cabello: {attributes.tipoCabello}
        </p>
      </div>

      {/* Precio y botones */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
        <span className="text-2xl font-semibold text-amber-600 dark:text-sky-400">
          ${attributes.price}
        </span>
        <button className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
          Añadir al carrito
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
          Favorito
        </button>
      </div>

      {/* CTA principal */}
      <div className="pt-2">
        <button className="h-12 w-full sm:max-w-xs rounded-full bg-amber-600 text-white font-semibold hover:bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-500">
          Comprar ahora
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
