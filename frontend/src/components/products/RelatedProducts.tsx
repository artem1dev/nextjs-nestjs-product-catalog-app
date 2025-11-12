'use client';
import { useGetProductsQuery } from '@/lib/redux/api/productsApi';
import { ProductCard } from './ProductCard';
import styles from './RelatedProducts.module.scss';
import { ProductCategory } from '@/types';
import Loading from '@/app/(pages)/loading';

type Props = {
  category: ProductCategory;
  currentProductId: number;
};

export function RelatedProducts({ category, currentProductId }: Props) {
  const { data: products, isLoading } = useGetProductsQuery({
    category: [category],
  });

  if (isLoading) return <Loading />;

  const relatedProducts = products
    ?.filter(p => p.id !== currentProductId)
    .slice(0, 4);
  
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.related}>
      <h2>Related Products</h2>
      <div className={styles.grid}>
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}