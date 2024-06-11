import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import styles from './products.module.css';
import { ProductsService } from '../../../services/ProductsService.ts';
import ProductCard from '../product-cat-card/Catalog-card.tsx';
// import { CartService } from '../../../services/CartService.ts';
import { useCart } from '../../../context/CartContext.tsx';

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
/* async function getItemsInCard(): Promise<string[]> {
  if (CartService.getCartInfo().id) {
    const products = await CartService.getProducts();
    return products.map((item) => item.id);
  } else {
    return [''];
  }
} */

function ProductList({
  productsArray = '',
  sortingArray = 'name-asc',
  priceFilter = [],
  season = '',
}: ProductListProps) {
  const [productsProjection, setProducts] = useState<ProductProjection[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const [cartItems, setCartItems] = useState<string[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        /* const itemsInCart = await getItemsInCard();
        if (itemsInCart) {
          setCartItems(itemsInCart);
        } */
        const productData = await ProductsService.performSearch(productsArray, sortingArray, priceFilter, season);
        setProducts(productData.results);
      } catch (e) {
        setError('Failed to fetch products. Please try again later.');
        console.error(e);
      }
    };
    getProducts();
  }, [productsArray, sortingArray, priceFilter]);

  const cart = useCart();
  const { products, setCart } = { ...cart };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className={styles.product_list}>
      {productsProjection.map((product) => (
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
              ? product.masterVariant.prices?.[0].discounted.value?.centAmount / 100
              : 0
          }
          slug={product.key ? product.key : ''}
          /* isInCart={cartItems.some((id) => product.id === id)} */
          isInCart={products.some(({ id }) => product.id === id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
