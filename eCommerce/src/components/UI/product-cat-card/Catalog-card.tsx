import { useNavigate } from 'react-router-dom';
import styles from './Catalog-card.module.css';

/* eslint-disable react/require-default-props */
interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
  slug: string;
}

function ProductCard({ id, name, image, description, price, discountPrice = 0, slug }: ProductCardProps) {
  const navigate = useNavigate();
  const handleCardClick = (_slug: string) => {
    navigate(`/product/${_slug}`);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>, urlslug: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCardClick(urlslug);
    }
  };
  return (
    <div
      className={styles.product_card}
      tabIndex={0}
      role="button"
      onClick={() => handleCardClick(slug)}
      onKeyDown={(event) => handleKeyPress(event, slug)}>
      <p>{id}</p>
      <img src={image} alt={name} className={styles.product_image} />
      <h2 className={styles.product_name}>{name}</h2>
      <p className={styles.product_description}>{description}</p>
      {discountPrice ? (
        <>
          <p className={styles.product_price}>
            <span>€</span>
            {discountPrice} <s className={styles.product_discount}>€{price}</s>
          </p>
          <p className={styles.product_sale}>Sale!</p>
        </>
      ) : (
        <p className={styles.product_price}>
          <span>€</span>
          {price}
        </p>
      )}
    </div>
  );
}

export default ProductCard;
