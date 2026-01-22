/* eslint-disable @next/next/no-img-element */
"use client";

import ProtectedRoute from "@/components/protectedRoute";
import { useCartStore } from "@/store/cart-store";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";

const MAX_INPUT = 100;

function normalizeQuantity(raw: string, max: number) {
  const digitsOnly = raw.replace(/\D/g, "");
  const cleaned = digitsOnly.replace(/^0+/, "");
  let parsed = cleaned === "" ? 0 : parseInt(cleaned, 10);
  if (parsed > max) parsed = max;
  return parsed;
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const updateItemBackend = useCartStore((s) => s.updateItemBackend);
  const removeItemBackend = useCartStore((s) => s.removeItemBackend);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user } = useUser();
  const router = useRouter();

  const distinctItems = items.length;
  const totalUnits = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  // Inicializamos cantidades locales directamente desde items
  const [localQuantities, setLocalQuantities] = useState<
    Record<number, number>
  >(() => {
    const initial: Record<number, number> = {};
    for (const item of items) initial[item.id] = item.quantity;
    return initial;
  });

  const [page,setPage] = useState(1);
  const itemsPerPage = 5
  const pageCount = Math.max(1,Math.ceil(items.length / itemsPerPage));
  const safePage = Math.max(1, Math.min(page,pageCount));

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start,end);
  }, [items, safePage, itemsPerPage])

  const handleQuantityChange = (
    cartItemId: number,
    newQuantity: number,
    stock: number,
  ) => {
    const currentItem = items.find((i) => i.id === cartItemId);
    if (!currentItem) return;

    if (newQuantity === currentItem.quantity) {
      toast.info("La cantidad ya está actualizada");
      return;
    }

    if (newQuantity > stock) {
      toast.error(`Solo podés agregar hasta ${stock} unidades`);
      return;
    }
    if (newQuantity < 1) {
      toast.error("La cantidad mínima es 1");
      return;
    }
    updateItemBackend(cartItemId, newQuantity);
    toast.success("Cantidad actualizada");
  };

  const handleRemove = (cartItemId: number) => {
    removeItemBackend(cartItemId);
    toast.success("Producto eliminado del carrito");
  };

  const handleClearCart = () => {
    if (user?.id) {
      clearCart(user.id);
      toast.success("Carrito vaciado");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 self-start"
            >
            ← Volver al inicio
            </button>
          <h1 className="text-2xl mt-8 sm:text-3xl font-extrabold flex-1 text-center sm:mt-1">
            Tu carrito
          </h1>
        </div>
        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {paginatedItems.map((item) => {
                const { product, variant } = item;
                const { attributes } = product;
                const imageUrl = attributes.images?.data?.[0]?.attributes?.url;
                const stock = variant
                  ? variant.attributes.stock
                  : (attributes.stock ?? 0);
                const currentLocal = localQuantities[item.id] ?? item.quantity;
                const remaining = Math.max(stock - item.quantity, 0);
                const unitPrice =
                  attributes.price + (variant?.attributes.priceDelta ?? 0);
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-start border-b pb-4 w-full"
                  >
                    {imageUrl && (
                      <Link href={`/product/${attributes.slug}`}>
                        
                        <div className="w-18 h-20 sm:w-20 sm:h-20 relative rounded-md overflow-hidden bg-gray-100 cursor-pointer">
                          
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
                            alt={attributes.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    {/* Contenido */}
                    <div className="flex-1 min-w-0 wrap-break-word">
                     
                      <Link href={`/product/${attributes.slug}`}>
                      
                        <h2 className="font-semibold cursor-pointer hover:text-amber-600 dark:hover:text-sky-400">
                         
                          {attributes.productName}
                        </h2>
                      </Link>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        
                        Marca: {attributes.marca}
                      </p>
                      {variant && (
                        <p className="text-sm text-gray-700 dark:text-gray-500">
                          
                          Variante:
                          <span className="font-medium">
                            {variant.attributes.code}
                          </span>
                        </p>
                      )}
                      {/* Badge */}
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full text-white bg-amber-400 dark:bg-sky-400 mt-1">
                        
                        Ya agregaste {item.quantity} unidades de {stock} disponibles
                      </span>
                      {/* Stock restante */}
                      <p className="text-sm mt-1 text-gray-700 dark:text-gray-500">
                       
                        {remaining === 0 ? (
                          <span className="text-amber-600 dark:text-sky-600 font-semibold">
                           
                            Stock completo en tu carrito
                          </span>
                        ) : (
                          <span className="text-gray-600">
                            
                            Unidades disponibles: {remaining}
                          </span>
                        )}
                      </p>
                      {remaining <= 3 && remaining > 0 && (
                        <p className="text-sm text-red-500 font-medium">
                          
                          ¡Quedan solo {remaining} unidades disponibles!{" "}
                        </p>
                      )}
                      {/* Cantidad + actualizar */}
                      <div className="flex items-center gap-2 mt-2">
                        
                        <span className="text-sm text-gray-700 dark:text-gray-500">
                          Cantidad:
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={currentLocal}
                          onChange={(e) => {
                            const parsed = normalizeQuantity(
                              e.target.value,
                              MAX_INPUT,
                            );
                            setLocalQuantities((q) => ({
                              ...q,
                              [item.id]: parsed,
                            }));
                          }}
                          className="w-16 px-2 py-1 border rounded text-center appearance-none"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, currentLocal, stock)
                          }
                          className="px-2 py-1 text-sm cursor-pointer text-white bg-amber-600 rounded hover:bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-500"
                        >
                          
                          Actualizar
                        </button>
                      </div>
                    </div>
                    {/* Acciones (precio + eliminar) */}
                    <div className="space-y-2 sm:min-w-20">
                      
                      <p className="text-lg font-medium">
                        ${unitPrice * item.quantity}
                      </p>
                      <button
                        className="flex items-center px-2 py-0.5 space-x-2 text-xs font-medium transition duration-200 rounded-lg shadow-md cursor-pointer bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200 dark:bg-sky-700 dark:text-white dark:border-sky-600 dark:hover:bg-sky-600 dark:hover:border-sky-500"
                        onClick={() => handleRemove(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination page={safePage} pageCount={pageCount} onPageChange={(newPage) => setPage(newPage)}/>
            {/* Totales + acciones finales */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t gap-4">
              
              <div className="space-y-2 text-center sm:text-left">
                
                <p className="text-sm text-gray-500">
                  Productos Totales: {distinctItems}
                </p>
                <p className="text-sm text-gray-500">
                  Total de Unidades: {totalUnits}
                </p>
                <p className="text-lg font-semibold">Total: ${totalPrice}</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={handleClearCart}
                >
                  Vaciar carrito
                </button>
                <button className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-500">
                  Finalizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
