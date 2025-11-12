import { apiSlice } from './apiSlice';
import { Product } from '@/types';

type GetProductsArgs = {
  search?: string;
  category?: string[];
  price_min?: number;
  price_max?: number;
  sort?: 'price-asc' | 'price-desc';
};

type UpdateProductArgs = {
  id: number;
  body: Partial<Omit<Product, 'id' | 'slug'>>;
};

const transformPriceFromCents = (product: Product): Product => ({
  ...product,
  price: product.price / 100,
});

const transformPriceToCents = (body: any) => {
  const transformedBody = { ...body };
  if (transformedBody.price !== undefined) {
    transformedBody.price = Math.round(transformedBody.price * 100);
  }
  return transformedBody;
};


export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getProducts: builder.query<Product[], GetProductsArgs | void>({
      query: (args) => ({
        url: '/products',
        params: args || {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
      transformResponse: (response: Product[]) => {
        return response.map(transformPriceFromCents);
      },
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/by-slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Products', id: result?.id }],
      transformResponse: (response: Product) => {
        return transformPriceFromCents(response);
      },
    }),

    addProduct: builder.mutation<Product, Omit<Product, 'id' | 'slug'>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body: transformPriceToCents(body),
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      transformResponse: (response: Product) => {
        return transformPriceFromCents(response);
      },
    }),

    updateProduct: builder.mutation<Product, UpdateProductArgs>({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: transformPriceToCents(body),
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id: 'LIST' },
        { type: 'Products', id },
      ],
      transformResponse: (response: Product) => {
        return transformPriceFromCents(response);
      },
    }),

    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Products', id: 'LIST' },
        { type: 'Products', id },
      ],
    }),

  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useAddProductMutation,
  useUpdateProductMutation, 
  useDeleteProductMutation,
} = productsApi;