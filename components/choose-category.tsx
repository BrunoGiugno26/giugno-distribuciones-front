/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetCategories } from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";

const HIDDEN_CATEGORY_SLUGS = ["reventa","productos-profesionales"];

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  const visibleCategories = Array.isArray(result)
    ? result.filter(
        (category: CategoryType) => !HIDDEN_CATEGORY_SLUGS.includes(category.attributes.slug),
      )
    : [];
  return (
    <div className=" font-serif max-w-6xl mt-5 py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="text-2xl sm:text-4xl font-extrabold text-center uppercase tracking-wider text-slate-900 dark:text-white px-6 pb-4 sm:pb-12">
        Elige tu categoria
        <span className="text-amber-500 dark:text-sky-500 ml-2"> favorita</span>
      </h3>
      <div className="grid gap-5 sm:grid-cols-3">
        {!loading &&
          visibleCategories.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.attributes.slug}`}
              className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg h-96"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.mainimage.data.attributes.url}`}
                alt={category.attributes.categoryName}
                className="w-full h-full object-cover transition duration-300 ease-in-out rounded-lg hover:scale-110"
              />
              <p className="absolute bottom-0 w-full bg-white/60 dark:bg-black/50 p-4 text-black dark:text-white text-center font-semibold text-lg">
                {category.attributes.categoryName}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChooseCategory;
