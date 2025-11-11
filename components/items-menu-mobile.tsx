import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent className="ml-5">
        <Link href={"/categories/accesorios-y-herramientas-profesionales"} className="block my-3 text-center bg-secondary rounded-md p-2 hover:opacity-80 transition-opacity">
          Accesorios y Herramientas
        </Link>
        <Link href={"/categories/peluquerias-y-perfumerias"} className="block my-3 text-center bg-secondary rounded-md p-2 hover:opacity-80 transition-opacity">
          Peluquerías y Perfumerías
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
