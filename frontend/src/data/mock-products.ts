import { Product } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: 'Sneakers', description: 'Cool sneakers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJOdAlGHWHaCM2IsdGSDvAt8uM59BT3ns1Q&s', category: 'Shoes', price: 4900, availability: true, slug: 'sneakers' },
  { id: 2, title: 'T-Shirt', description: 'Cool T-Shirt', image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/E13884s6.jpg?im=Resize,width=750', category: 'Clothing', price: 1300, availability: true, slug: 't-shirt' },
  { id: 3, title: 'Headphones', description: 'Cool headphones', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9BTcDhptr0B_FB_AbPEVDFgpwxgGsTZhYA&s', category: 'Electronics', price: 3800, availability: true, slug: 'headphones' },
];