import Header from '../../components/UI/header/Header.tsx';
import styles from './Catalog.module.css';
import Footer from '../../components/UI/footer/Footer.tsx';
import ProductList from '../../components/UI/products/products.tsx';

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header />
      </div>
      <div className={styles.catalog_wrapper}>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
