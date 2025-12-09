"use client";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import Image from "next/image";
import UserIcon from "./user-icon";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl lg:max-w-7xl">
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

      <div className=" hidden md:flex items-center">
        <MenuList />
      </div>

      <div className="flex md:hidden">
        <ItemsMenuMobile />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-7">
        <ShoppingCart
          strokeWidth={2}
          className="cursor-pointer"
          onClick={() => router.push("/cart")}
        />
        <Heart
          strokeWidth={2}
          className="cursor-pointer"
          onClick={() => router.push("/loved-products")}
        />
        <UserIcon />
        <ToggleTheme />
      </div>
    </div>
  );
};
export default Navbar;
