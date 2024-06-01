import React, { useEffect, useState } from 'react';
import styles from './products.module.css';
import { ProductsService } from '../../../services/ProductsService';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductCard from '../product-cat-card/Catalog-card';

function extractFirstSentence(text: string): string {
  const match = text.match(/.*?[.!?](?:\s|$)/);
  return match ? match[0] : text;
}
interface ProductListProps {
    selectedCategory?: string;
    priceRange?: Record<number, number>;
    season?: string;
    fabric?: string;
    size?: number;
    brand?: string;
    color?: string;
}

const ProductList: React.FC<ProductListProps> = (filters) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProducts(filters);
        setProducts(productData.results);
        console.log(productData.results[0].id);
        await ProductsService.getProductTypes();
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
        console.error(error);
      }
    };

    getProducts();
  }, [filters]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.product_list}>
      {products.map((product) => (
        <ProductCard
          id={product.id}
          name={product.name['en-US']}
          image={product.masterVariant?.images?.[0].url ? product.masterVariant?.images?.[0].url : 'http://localhost'}
          description={
            product.description?.['en-US'] ? extractFirstSentence(product.description?.['en-US']) : 'description'
          }
          price={
            product.masterVariant?.prices?.[0].value?.centAmount
              ? product.masterVariant.prices[0].value.centAmount / 100
              : 0
          }
          discount_price={
            product.masterVariant?.prices?.[0].discounted
              ? product.masterVariant?.prices?.[0].discounted?.value?.centAmount / 100
              : 0
          }
        />
      ))}
    </div>
  );
};

export default ProductList;
