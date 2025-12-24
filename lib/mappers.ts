import { CartItemBackend } from "@/types/cart";
import { FavoriteItemBackend } from "@/types/favorite";
import { ProductType } from "@/types/product";

export type CartItem = {
  id: number;
  product: ProductType;
  quantity: number;
};

export type FavoriteItem = {
  id: number;
  product: ProductType;
};

const placeholderProduct: ProductType = {
  id: -1,
  attributes: {
    productName: "Producto no disponible",
    marca: "",
    description: "",
    origin: "",
    tipoCabello: "",
    price: 0,
    slug: "",
    images: { data: [] },
    active: false,
    isFeatured: false,
    tipoProducto: "",
    category: { data: { attributes: { slug: "", categoryName: "" } } },
  },
};

// 🛒 Mapper de carrito
export const mapCartItem = (backend: CartItemBackend): CartItem => {
  const productData = backend.attributes.product?.data;

  if (!productData) {
    console.warn("⚠️ Producto faltante en cart-item:", backend);
    return {
      id: backend.id,
      product: placeholderProduct,
      quantity: backend.attributes.quantity,
    };
  }

  return {
    id: backend.id,
    product: productData,
    quantity: backend.attributes.quantity,
  };
};

// ❤️ Mapper de favoritos
export const mapFavoriteItem = (backend: FavoriteItemBackend): FavoriteItem => {
  const productData = backend.attributes.product?.data;

  if (!productData) {
    console.warn("⚠️ Producto faltante en favorito:", backend);
    return {
      id: backend.id,
      product: placeholderProduct,
    };
  }

  return {
    id: backend.id,
    product: productData,
  };
};

