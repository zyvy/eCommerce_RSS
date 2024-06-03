import Header from '../../components/UI/header/Header.tsx';
import styles from './ItemCard.module.css';
import Footer from '../../components/UI/footer/Footer.tsx';
import ProductItem from '../../components/UI/product-item/ProductItem.tsx';
import { useParams } from 'react-router-dom';

function ItemCard() {
  const { slug } = useParams();

  return (
    <>
      <Header />
      <div>
        <ProductItem slug={slug || ''} />
      </div>
      <Footer />
    </>
  );
}

export default ItemCard;
