import { useParams } from 'react-router-dom';
import Header from '../../components/UI/header/Header.tsx';
import styles from './ItemCard.module.css';
import Footer from '../../components/UI/footer/Footer.tsx';
import ProductItem from '../../components/UI/product-item/ProductItem.tsx';

function ItemCard() {
  const { slug } = useParams();

  return (
    <>
      <Header />
      <div className={styles.item__card}>
        <ProductItem slug={slug || ''} />
      </div>
      <Footer />
    </>
  );
}

export default ItemCard;
