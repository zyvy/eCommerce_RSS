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

function ProductList({
  productsArray = '',
  sortingArray = 'name-asc',
  priceFilter = [],
  season = '',
}: ProductListProps) {
  const [productsProjection, setProducts] = useState<ProductProjection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const productsPerPage = 6;

  const handlePageClick = (pageNumber: number) => {
    console.log('got to page', pageNumber);
    setOffset(productsPerPage * (pageNumber - 1));
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.performSearch(
          productsArray,
          sortingArray,
          priceFilter,
          season,
          productsPerPage,
          offset,
        );
        setProducts(productData.results);
        setTotalPages(productData.total ? Math.ceil(productData.total / productsPerPage) : 0);
      } catch (e) {
        setError('Failed to fetch products. Please try again later.');
      }
    };
    getProducts();
  }, [productsArray, sortingArray, priceFilter, currentPage]);

  const cart = useCart();
  const { products } = { ...cart };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
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
      <div className={styles.pagination_block}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === currentPage ? styles.active : ''}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
