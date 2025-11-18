/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetCategories } from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();
  return (
    <div className=" font-serif max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">
        Elige tu categoria favorita
      </h3>
      <div className="grid gap-5 sm:grid-cols-3">
        {!loading &&
          Array.isArray(result) &&
          result.map((category:CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.attributes.slug}`}
              className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg h-96"
            >
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.mainimage.data.attributes.url}`} alt={category.attributes.categoryName} 
              className="w-full h-full object-cover transition duration-300 ease-in-out rounded-lg hover:scale-110"
              />
              <p className="absolute bottom-0 w-full bg-white/60 dark:bg-black/50 p-4 text-black dark:text-white text-center font-semibold text-lg">{category.attributes.categoryName}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChooseCategory;
