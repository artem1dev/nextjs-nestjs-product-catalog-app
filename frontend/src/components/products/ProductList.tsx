'use client';

import { useGetProductsQuery } from '@/lib/redux/api/productsApi';
import { ProductCard } from './ProductCard';
import styles from './ProductList.module.scss';
import Loading from '@/app/(pages)/loading';

type Props = {
  search?: string;
  categories?: string[];
  price_min?: number;
  price_max?: number;
};

export function ProductList({ search, categories, price_min, price_max }: Props) {
  
  const { data: products, isLoading, error } = useGetProductsQuery({
    search,
    category: categories,
    price_min,
    price_max,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading products.</div>;
  if (!products || products.length === 0) {
    return <div className={styles.noProducts}>No products found.</div>;
  }

  return (
    <div className={styles.productListGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}