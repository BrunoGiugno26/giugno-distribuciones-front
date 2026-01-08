import { CartItem, CartItemBackend } from "@/types/cart";
import { FavoriteItemBackend } from "@/types/favorite";
import { ProductType } from "@/types/product";

const placeholderProduct: ProductType = {
  id: -1,
  attributes: {
    productName: "Producto no disponible",
    marca: "",
    description: "",
    origin: "",
    tipoCabello: "",
    price: 0,
    stock: 0,
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
  const variantData = backend.attributes.variant?.data ?? undefined;

  if (!productData) {
    console.warn("⚠️ Producto faltante en cart-item:", backend);
    return {
      id: backend.id,
      product: placeholderProduct,
      variant: variantData,
      quantity: backend.attributes.quantity,
    };
  }

  return {
    id: backend.id,
    product: productData,
    variant: variantData,
    quantity: backend.attributes.quantity,
  };
};

// ❤️ Mapper de favoritos
export type FavoriteItem = {
  id: number;
  product: ProductType;
};

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


