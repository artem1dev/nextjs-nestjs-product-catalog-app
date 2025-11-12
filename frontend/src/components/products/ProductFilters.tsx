'use client';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from './ProductFilters.module.scss';
import { ProductCategory } from '@/types';
import { useState } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type SortValue = 'price-asc' | 'price-desc' | '';

type Props = {
  onSearchChange: (value: string) => void;
  onCategoryChange: (values: string[]) => void;
  onPriceChange: (min?: number, max?: number) => void;
  onSortChange: (value: SortValue) => void;
};

const CATEGORIES: ProductCategory[] = ["Clothing", "Shoes", "Electronics", "Accessories", "Other"];
const MAX_PRICE = 5000;

export function ProductFilters({
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([0, MAX_PRICE]);

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    onCategoryChange(newCategories);
  };

  const handlePriceSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalPriceRange(value as [number, number]);
    }
  };

  const handlePriceChangeComplete = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const [min, max] = value;
      onPriceChange(
        min > 0 ? min : undefined,
        max < MAX_PRICE ? max : undefined
      );
    }
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
        <div className={styles.sliderWrapper}>
          <Slider
            range
            min={0}
            max={MAX_PRICE}
            value={localPriceRange}
            onChange={handlePriceSliderChange}
            onChangeComplete={handlePriceChangeComplete}
          />
          <div className={styles.priceLabels}>
            <span>${localPriceRange[0]}</span>
            <span>${localPriceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3>Sort by</h3>
        <select
          className={styles.sortSelect}
          onChange={(e) => onSortChange(e.target.value as SortValue)}
        >
          <option value="">Default</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </div>
    </aside>
  );
}