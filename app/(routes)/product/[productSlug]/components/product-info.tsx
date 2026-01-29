"use client";

import FavoriteButton from "@/components/favorites/favorite-button";
import { useCartStore } from "@/store/cart-store";
import { ProductType, VariantType } from "@/types/product";
import { useUser } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Listbox } from "@headlessui/react";
import ShareButtons from "@/components/shareButtons";

interface ProductInfoProps {
  product: ProductType;
  isReventaView?: boolean;
}

const ProductInfo = ({ product, isReventaView = false }: ProductInfoProps) => {
  const { attributes } = product;
  const items = useCartStore((s) => s.items);
  const { user, isSignedIn } = useUser();

  const variants = attributes.variants?.data ?? [];
  const [selectedVariant, setSelectedVariant] = useState<VariantType | null>(
    variants.length > 0 ? variants[0] : null
  );

  const [quantity, setQuantity] = useState(1);

  const isReventaProduct = attributes.esReventa === true;
  const hidePrice = isReventaProduct && isReventaView;

  const available =
    variants.length > 0
      ? selectedVariant?.attributes.stock ?? 0
      : attributes.stock ?? 0;

  const cartQuantity = useMemo(() => {
    return (
      items.find(
        (i) =>
          i.product.id === product.id &&
          (variants.length > 0 && selectedVariant
            ? i.variant?.id === selectedVariant.id
            : !i.variant)
      )?.quantity ?? 0
    );
  }, [items, product.id, selectedVariant, variants.length]);

  const remaining = Math.max(available - cartQuantity, 0);
  const isLowStock = remaining > 0 && remaining <= 3;
  const variantRequired = variants.length > 0 && !selectedVariant;

  const handleAddToCart = () => {
    if (!isSignedIn || !user?.id) {
      toast.error("Debes iniciar sesión para agregar productos 🛒");
      return;
    }

    if (available <= 0) {
      toast.error("Sin stock para este producto/tono");
      return;
    }

    if (variantRequired) {
      toast.error("Debes seleccionar un tono antes de agregar");
      return;
    }

    if (quantity < 1 || quantity > remaining) {
      toast.error("Cantidad inválida");
      return;
    }

    useCartStore
      .getState()
      .addToCartWithSync(
        product,
        quantity,
        user.id,
        selectedVariant ?? undefined
      );

    toast.success("Producto añadido al carrito 🛒");
  };

  return (
    <div className="space-y-8">
      {/* Nombre y marca */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {attributes.productName}
        </h2>
        <p className="text-base sm:text-lg text-amber-600 dark:text-sky-600">
          Marca: {attributes.marca}
        </p>
      </div>

      {/* Descripción */}
      <div className="space-y-3">
        <p className="text-gray-700 dark:text-gray-300">
          {attributes.description}
        </p>
        <p className="text-sm text-amber-600 dark:text-sky-600">
          Origen: {attributes.origin} | Tipo de cabello: {attributes.tipoCabello}
        </p>

        {/* Stock disponible y mensajes dinámicos */}
        {!hidePrice && (
          <>
            {variants.length > 0 ? (
              selectedVariant ? (
                <div className="space-y-1 mt-2">
                  <p className="text-sm text-amber-600 dark:text-sky-600">
                    {remaining > 0
                      ? `Stock disponible: ${remaining}`
                      : "Sin stock para este tono"}
                  </p>

                  {isLowStock && (
                    <p className="text-sm font-semibold text-red-500">
                      ¡Quedan solo {remaining} unidades!
                    </p>
                  )}

                  {cartQuantity >= available && available > 0 && (
                    <p className="text-sm text-gray-500">
                      Ya tenés el máximo disponible en el carrito
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic mt-2">
                  Seleccioná un tono para ver el stock
                </p>
              )
            ) : (
              <div className="space-y-1 mt-2">
                <p className="text-sm text-gray-700 dark:text-gray-500">
                  {remaining > 0
                    ? `Stock disponible: ${remaining}`
                    : "Sin stock para este producto"}
                </p>

                {isLowStock && (
                  <p className="text-sm font-semibold text-red-500">
                    ¡Quedan solo {remaining} unidades!
                  </p>
                )}

                {cartQuantity >= available && available > 0 && (
                  <p className="text-sm text-gray-500">
                    Ya tenés el máximo disponible en el carrito
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Selector de variantes */}
      {variants.length > 0 && (
        <div className="w-full sm:max-w-xs">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Elegí el tono:
          </label>

          <Listbox value={selectedVariant} onChange={setSelectedVariant}>
            <div className="relative">
              <Listbox.Button className="w-full rounded-md border px-3 py-2 bg-amber-50 dark:bg-sky-950 font-semibold text-gray-900 dark:text-white text-left text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-600">
                {selectedVariant
                  ? `Tono ${selectedVariant.attributes.code}`
                  : "Seleccioná un tono..."}
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white dark:bg-gray-800 shadow-lg z-10">
                {variants.map((v) => {
                  const cartQuantityForVariant =
                    items.find((i) => i.variant?.id === v.id)?.quantity ?? 0;
                  return (
                    <Listbox.Option
                      key={v.id}
                      value={v}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-2 text-sm ${
                          active
                            ? "bg-amber-600 dark:bg-sky-800 text-white"
                            : "text-gray-900 dark:text-white"
                        }`
                      }
                    >
                      {`Tono ${v.attributes.code} - ${v.attributes.stock} ud`}
                      {cartQuantityForVariant > 0 && (
                        <span className="ml-2 text-xs">
                          (ya agregaste {cartQuantityForVariant})
                        </span>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </div>
          </Listbox>

          {/* Preview del tono */}
          {selectedVariant && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p className="font-medium text-gray-800 dark:text-gray-200">
                Tono seleccionado: {selectedVariant.attributes.code}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Precio / favoritos / cantidad / WhatsApp */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
        {!hidePrice ? (
          <>
            <span className="text-3xl font-semibold text-amber-600 dark:text-sky-400">
              $
              {attributes.price +
                (selectedVariant?.attributes.priceDelta ?? 0)}
            </span>

            {variants.length === 0 && <FavoriteButton product={product} />}

            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  const parsed = Math.min(100, Math.max(1, Number(raw)));
                  setQuantity(parsed);
                }}
                className="w-16 px-2 py-1 border rounded text-center"
              />

              <button
                onClick={handleAddToCart}
                disabled={available <= 0 || variantRequired}
                className="px-4 py-2 bg-amber-600 dark:bg-sky-600 text-white rounded-lg hover:bg-amber-400 dark:hover:bg-sky-400 disabled:bg-gray-400"
              >
                Añadir al carrito
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() =>
              window.open(
                `https://wa.me/549261XXXXXXX?text=Hola, quiero consultar por ${attributes.productName}`,
                "_blank"
              )
            }
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
          >
            Consultar por WhatsApp
          </button>
        )}
      </div>
      
      <ShareButtons className="mt-4" label="Compartir este producto" />
    </div>
  );
};

export default ProductInfo;

