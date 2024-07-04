"use client";

import { Product, ProductImage } from "@/interfaces/product.interface";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Product & { ProductImage?: ProductImage[] };
  categories: {
    id: string;
    name: string;
  }[];
}

interface Inputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryID: string;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<Inputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(" "),
      sizes: product.sizes ?? [],
    },
  });

  watch('sizes');

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  }

  const onSubmit = async (data: Inputs) => {
    console.log({data});
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryID", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">

            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <button
                type="button"
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  "flex items-center transition-all px-8 justify-center w-10 h-10 mr-2 border rounded-md",
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size)
                  }
                )}
              >
                <span>{size}</span>
              </button>
            ))}

          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {
              product.ProductImage?.map(image => (

                <div key={image.id}>
                  <Image 
                    alt={product.title}
                    src={`/products/${image.url}`}
                    width={300}
                    height={300}
                    className="rounded-t-md shadow-md"
                  />
                  <button 
                    type="button"
                    className="btn-danger rounded-b-xl w-full"
                    onClick={() => console.log(image.id, image.url)}
                  >
                    Eliminar
                  </button>
                </div>

              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};