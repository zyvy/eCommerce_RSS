import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Catalog-card.module.css';
import { CartService } from '../../../services/CartService.ts';
import { loadCart, useCart } from '../../../context/CartContext.tsx';
/* eslint-disable react/require-default-props */
interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
  slug: string;
  isInCart?: boolean;
}

function ProductCard({ id, name, image, description, price, discountPrice = undefined, slug, isInCart = false }: ProductCardProps) {
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(isInCart);
  const [loading, setLoading] = useState<boolean>(false);

  const cart = useCart();
  const { setCart } = { ...cart };

  const handleCardClick = (urlslug: string) => {
    navigate(`/product/${urlslug}`);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>, urlslug: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCardClick(urlslug);
    }
  };

  const handleAddToCart = async (prodid: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!inCart && !loading) {
      setLoading(true);
      if (!CartService.getCartInfo().id) {
        await CartService.createCart();
      }
      await CartService.addItemToCart(prodid, 1);
      setInCart(true);
      setLoading(false);
      loadCart(cart, setCart);
    }
  };

  return (
    <div
      className={styles.product_card}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => handleKeyPress(event, slug)}
      onClick={() => handleCardClick(slug)}>
      <p>{id}</p>
      <img src={image} alt={name} className={styles.product_image} />
      <h2 className={styles.product_name}>{name}</h2>
      <p className={styles.product_description}>{description}</p>
      {discountPrice ? (
        <>
          <p className={styles.product_price}>
            <span>$</span>
            {discountPrice} <s className={styles.product_discount}>€{price}</s>
          </p>
          <p className={styles.product_sale}>Sale!</p>
        </>
      ) : (
        <p className={styles.product_price}>
          <span>$</span>
          {price}
        </p>
      )}
      <button
        type="button"
        className={`${styles.add_to_cart_button} ${inCart ? styles.disabled : ''}`}
        onClick={(event) => handleAddToCart(id, event)}
        disabled={inCart || loading}>
        {loading && 'Adding to cart...'}
        {!loading && inCart && 'In Cart'}
        {!loading && !inCart && 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
