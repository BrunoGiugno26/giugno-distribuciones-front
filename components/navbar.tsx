"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites.store";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import Image from "next/image";
import UserIcon from "./user-icon";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const favorites = useFavoritesStore((state) => state.favorites);
  const { user } = useUser();

  // 🔄 Sincronizar al montar
  useEffect(() => {
    if (user?.id) {
      useFavoritesStore.getState().syncFavoritesFromBackend(user.id);
    }
  }, [user?.id]);

  const distinctItems = cartItems.length;

  const lowStock = cartItems.some((items) => {
    const stock = items.variant
    ? items.variant.attributes.stock
    :items.product.attributes.stock ?? 0
    const remaining = stock - items.quantity;
    return remaining > 0 && remaining <= 3
  });

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl lg:max-w-7xl">
      
      {/* Logo */}
      <div className="flex items-center" onClick={() => router.push("/")}>
        <h1 className="text-xl sm:text-2xl md:text-3xl whitespace-nowrap hidden md:block">
          Giugno
          <span className="font-bold">Distribuciones</span>
        </h1>
        <Image
          src={"/logo-GiugnoDistribuciones.jpeg"}
          alt="Giugno Distribuciones Logo"
          width={40}
          height={40}
          className="block md:hidden"
        />
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center">
        <MenuList />
      </div>

      {/* Menu Mobile */}
      <div className="flex md:hidden">
        <ItemsMenuMobile />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
        
        {/* Carrito */}
        <div className="relative">
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

        {/* Favoritos */}
        <div className="relative">
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
  );
};

export default Navbar;



