import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent>
        <Link href={"/categories/accesorios-y-herramientas-profesionales"} className="block">
          Accesorios y Herramientas
        </Link>
        <Link href={"/categories/peluquerias-y-perfumerias"} className="block">
          Peluquerías y Perfumerías
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
