import ProductDetail from '@/components/ProductDetail';

interface ProductPageProps {
  params: Promise<{
    game: string;
    product: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { game, product } = await params;

  return <ProductDetail productId={product} />;
}
