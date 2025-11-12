'use client';

import { useCallback, useState } from 'react';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductList } from '@/components/products/ProductList';
import styles from './page.module.scss';
import { Button } from '@/components/ui/Button';
import { AddProductForm } from '@/components/products/AddProductForm';
import { Dialog } from '@/components/ui/Dialog';

type PriceRange = {
  min?: number;
  max?: number;
}

type SortValue = 'price-asc' | 'price-desc' | '';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({});
  const [sort, setSort] = useState<SortValue>('');

  const handlePriceChange = useCallback((min?: number, max?: number) => {
    setPriceRange({ min, max });
  }, []);

  return (
    <div className={styles.plpPage}>
      <aside className={styles.sidebar}>
        <ProductFilters
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategories}
          onPriceChange={handlePriceChange}
          onSortChange={setSort}
        />
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Products</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            + Add Product
          </Button>
        </div>

        <ProductList
          search={searchTerm}
          categories={categories}
          price_min={priceRange.min}
          price_max={priceRange.max}
          sort={sort}
        />
      </main>

      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Product"
      >
        <AddProductForm onSuccess={() => setIsFormOpen(false)} />
      </Dialog>
    </div>
  );
}