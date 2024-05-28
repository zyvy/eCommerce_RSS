import React, { useEffect, useState } from 'react';
import styles from './products.module.css'
import { ProductsService } from '../../../services/ProductsService';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductCard from '../product-cat-card/Catalog-card';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProducts();
        setProducts(productData.results);
        console.log(productData.results[0].id)
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
        console.error(error);
      }
    };

    getProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.product_list}>
      {products.map(product => (
        <ProductCard
          id={product.id}
          name={product.name['en-US']}
          image={product.masterVariant?.images?.[0].url? product.masterVariant?.images?.[0].url: 'http://localhost'}
          description={product.description?.['en-US']? product.description?.['en-US']: 'description' }
        />
      ))}
    </div>
  );
};

export default ProductList;