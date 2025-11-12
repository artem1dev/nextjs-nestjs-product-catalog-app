'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Імпортуємо обидві мутації
import { 
  useAddProductMutation, 
  useUpdateProductMutation 
} from '@/lib/redux/api/productsApi';
import { Product, ProductCategory } from '@/types'; // Імпортуємо 'Product'
import styles from './AddProductForm.module.scss';
import { Button } from '@/components/ui/Button';

// Схема валідації (без змін)
const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  image: Yup.string().url('Must be a valid URL').required('Required'),
  category: Yup.string().oneOf(["Clothing", "Shoes", "Electronics", "Accessories", "Other"] as ProductCategory[]).required('Required'),
  price: Yup.number().min(0, 'Must be at least 0').required('Required'),
  availability: Yup.boolean().required('Required'),
});

const CATEGORIES: ProductCategory[] = ["Clothing", "Shoes", "Electronics", "Accessories", "Other"];

// Оновлюємо Props: додаємо 'existingProduct'
interface Props {
  onSuccess: () => void;
  existingProduct?: Product; // <-- Робимо форму універсальною
}

export function AddProductForm({ onSuccess, existingProduct }: Props) {
  // Визначаємо, чи це режим редагування
  const isEditMode = !!existingProduct;

  // Отримуємо обидві мутації
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  
  const isLoading = isAdding || isUpdating;

  // Визначаємо початкові значення
  const initialValues = {
    title: existingProduct?.title || '',
    description: existingProduct?.description || '',
    image: existingProduct?.image || '',
    category: existingProduct?.category || 'Other',
    price: existingProduct?.price || 0,
    availability: existingProduct?.availability ?? true,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      // Дозволяємо Formik ре-ініціалізуватися, коли 'existingProduct' змінюється
      enableReinitialize 
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (isEditMode) {
            // ЛОГІКА ОНОВЛЕННЯ
            await updateProduct({ 
              id: existingProduct.id, 
              body: values 
            }).unwrap();
          } else {
            // ЛОГІКА СТВОРЕННЯ
            await addProduct(values).unwrap();
          }
          onSuccess(); // Закриваємо модальне вікно
        } catch (err) {
          console.error('Failed to save product:', err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          {/* Динамічний заголовок */}
          <h2>{isEditMode ? 'Update Product' : 'Add New Product'}</h2>

          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="T-Shirt" className={styles.field} />
            <ErrorMessage name="title" component="div" className={styles.errorMessage} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <Field id="description" name="description" as="textarea" placeholder="High-quality cotton t-shirt..." className={styles.textarea} />
            <ErrorMessage name="description" component="div" className={styles.errorMessage} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL</label>
            <Field id="image" name="image" placeholder="https://..." className={styles.field} />
            <ErrorMessage name="image" component="div" className={styles.errorMessage} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <Field id="category" name="category" as="select" className={styles.select}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className={styles.errorMessage} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price</label>
            <Field id="price" name="price" type="number" step="0.01" placeholder="19.99" className={styles.field} />
            <ErrorMessage name="price" component="div" className={styles.errorMessage} />
          </div>

          <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
            <Field id="availability" name="availability" type="checkbox" />
            <label htmlFor="availability">In Stock (Available)</label>
            <ErrorMessage name="availability" component="div" className={styles.errorMessage} />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || isLoading}
            className={styles.submitButton}
          >
            {/* Динамічний текст кнопки */}
            {isLoading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Product')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}