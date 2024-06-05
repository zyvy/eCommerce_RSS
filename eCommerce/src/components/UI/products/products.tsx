import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './products.module.css';
import { ProductsService } from '../../../services/ProductsService.ts';
import ProductCard from '../product-cat-card/Catalog-card.tsx';
interface ProductListProps {
  productsArray?: string;
  sortingArray?: string;
  priceFilter?: string[];
  season?: string;
}

function extractFirstSentence(text: string): string {
  const match = text.match(/.*?[.!?](?:\s|$)/);
  return match ? match[0] : text;
}
function ProductList( {productsArray='', sortingArray='name-asc', priceFilter = [], season =''} : ProductListProps ) {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [error, setError] = useState<string | null>(null);
    useEffect(() => {
     // console.log('trying to fetch')
      const getProducts = async () => {
        try {
          const productData = await ProductsService.performSearch(productsArray, sortingArray, priceFilter, season)
          setProducts(productData.results);
        } catch (e) {
          setError('Failed to fetch products. Please try again later.');
          console.error(e);
        }
      };

      getProducts();
    }, [productsArray, sortingArray, priceFilter]);

    if (error) {
      return <div>{error}</div>;
    }
  return (
    <div className={styles.product_list}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
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
          discountPrice={
            product.masterVariant?.prices?.[0].discounted
              ? product.masterVariant?.prices?.[0].discounted?.value?.centAmount / 100
              : 0
          }
          slug={product.key ? product.key : ''}
        />
      ))}
    </div>
  );
}

export default ProductList;
