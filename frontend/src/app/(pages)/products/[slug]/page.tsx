'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { 
  useGetProductBySlugQuery, 
  useDeleteProductMutation,
  useUpdateProductMutation
} from '@/lib/redux/api/productsApi';
import Image from 'next/image';
import styles from './pdp.module.scss';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { AddProductForm } from '@/components/products/AddProductForm';
import Loading from '../../loading';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter(); 

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { data: product, isLoading, error } = useGetProductBySlugQuery(slug, {
    skip: !slug,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (!product) return;
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id).unwrap();
        router.push('/'); 
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error || !product) return <Loading />;

  return (
    <div className={styles.pdpPage}>
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link> / {product.category}
      </div>
      
      <div className={styles.mainDetails}>
        <div className={styles.imageWrapper}>
          <Image 
            src={product.image} 
            alt={product.title} 
            width={500}
            height={500}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
        
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          
          <span className={product.availability ? styles.inStock : styles.outOfStock}>
            {product.availability ? 'In Stock' : 'Out of Stock'}
          </span>
          
          <h3 className={styles.descriptionHeader}>Description</h3>
          <p className={styles.descriptionText}>{product.description}</p>
          
          <div className={styles.actions}>
            <Button 
              variant="secondary" 
              onClick={() => setIsUpdateModalOpen(true)}
            >
              Update Product
            </Button>
            <Button 
              variant="secondary"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Product'}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.relatedSection}>
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>

      {product && (
        <Dialog 
          isOpen={isUpdateModalOpen} 
          onClose={() => setIsUpdateModalOpen(false)}
          title="Update Product"
        >
          <AddProductForm 
            onSuccess={() => setIsUpdateModalOpen(false)}
            existingProduct={product}
          />
        </Dialog>
      )}
    </div>
  );
}