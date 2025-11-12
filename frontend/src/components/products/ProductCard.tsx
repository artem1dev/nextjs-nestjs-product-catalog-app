import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <span className={styles.price}>${product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}