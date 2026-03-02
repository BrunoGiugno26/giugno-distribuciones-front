"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites.store";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ToggleTheme from "./toggle-theme";
import Image from "next/image";
import UserIcon from "./user-icon";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import MobileMenuOverlay from "./mobile-menu-overlay";
import SearchAutocomplete from "./search/SearchAutocomplete";

const Navbar = () => {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const favorites = useFavoritesStore((state) => state.favorites);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      useFavoritesStore.getState().syncFavoritesFromBackend(user.id);
    }
  }, [user?.id]);

  const distinctItems = cartItems.length;

  const lowStock = cartItems.some((items) => {
    const stock = items.variant
      ? items.variant.attributes.stock
      : (items.product.attributes.stock ?? 0);
    const remaining = stock - items.quantity;
    return remaining > 0 && remaining <= 3;
  });

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto w-full max-w-7xl px-4 py-4">

        <div className="grid grid-cols-3 items-center gap-4 min-w-0">

          {/* IZQUIERDA */}
          <div
            className="flex items-center gap-2 flex-shrink-0"
            onClick={() => router.push("/")}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl whitespace-nowrap cursor-pointer hidden md:block">
              Giugno<span className="font-bold">Distribuciones</span>
            </h1>

            <Image
              src={"/logo-GiugnoDistribuciones.jpeg"}
              alt="Giugno Distribuciones Logo"
              width={40}
              height={40}
              className="block md:hidden cursor-pointer"
            />
          </div>

          {/* CENTRO */}
          <div className="flex flex-col items-center justify-center w-full min-w-0">

            <div className="hidden xl:block w-[520px] max-w-full mb-2">
              <SearchAutocomplete
                variant="desktop"
                onSelect={({ url }) => router.push(url)}
              />
            </div>

            <div className="hidden lg:flex justify-center">
              <MenuList />
            </div>

          </div>

          {/* DERECHA */}
          <div className="flex flex-row-reverse items-center gap-6 flex-shrink-0 min-w-[110px]">

            <div className="flex lg:hidden items-center">
              <MobileMenuOverlay />
            </div>

            <div className="relative flex-shrink-0">
              <ShoppingCart
                strokeWidth={2}
                className="cursor-pointer w-6 h-6"
                onClick={() => router.push("/cart")}
              />
              {distinctItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full dark:bg-sky-600">
                  {distinctItems}
                </span>
              )}
              {lowStock && (
                <span className="absolute -bottom-2 -right-2 text-red-500 text-xs font-bold">
                  ⚠️
                </span>
              )}
            </div>

            <div className="relative flex-shrink-0">
              <Heart
                strokeWidth={2}
                className={`cursor-pointer w-6 h-6 transition ${
                  favorites.length > 0
                    ? "fill-amber-500 text-amber-600 dark:fill-sky-600 dark:text-sky-800"
                    : "text-gray-800 dark:text-white"
                }`}
                onClick={() => router.push("/loved-products")}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-amber-600 dark:bg-sky-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </div>

            <UserIcon />
            <ToggleTheme />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;

