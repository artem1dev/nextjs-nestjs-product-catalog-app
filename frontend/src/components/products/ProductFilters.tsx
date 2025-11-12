'use client';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from './ProductFilters.module.scss';
import { ProductCategory } from '@/types';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';

type Props = {
  onSearchChange: (value: string) => void;
  onCategoryChange: (values: string[]) => void;
  onPriceChange: (min?: number, max?: number) => void;
};

const CATEGORIES: ProductCategory[] = ["Clothing", "Shoes", "Electronics", "Accessories", "Other"];

export function ProductFilters({
  onSearchChange,
  onCategoryChange,
  onPriceChange,
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  useEffect(() => {
    const min = parseFloat(debouncedMinPrice);
    const max = parseFloat(debouncedMaxPrice);

    onPriceChange(
      !isNaN(min) ? min : undefined,
      !isNaN(max) ? max : undefined
    );
  }, [debouncedMinPrice, debouncedMaxPrice, onPriceChange]);

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    onCategoryChange(newCategories);
  };

  return (
    <aside className={styles.filters}>
      <div className={styles.filterGroup}>
        <Input
          placeholder="Search..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <h3>Category</h3>
        {CATEGORIES.map(category => (
          <div key={category} className={styles.checkboxItem}>
            <Checkbox
              label={category}
              value={category}
              onChange={() => handleCategoryToggle(category)}
              checked={selectedCategories.includes(category)}
            />
          </div>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h3>Price Range</h3>
        <div className={styles.priceInputs}>
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={styles.priceInput}
          />
          <span className={styles.priceSeparator}>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.priceInput}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3>Sort by</h3>
        <select
          className={styles.sortSelect}
        >
          <option value="">Sort by Price</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </div>
    </aside>
  );
}