import { getCategories, getProductSlug } from "@/actions";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params;

  const [product, {categories}] = await Promise.all([
    getProductSlug(slug),
    getCategories()
  ])

  if((!product || !categories) && slug !== 'new' ) {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Nuevo product' : 'Editar producto'

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}