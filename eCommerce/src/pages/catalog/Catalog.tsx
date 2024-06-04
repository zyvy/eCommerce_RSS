import  { useState } from 'react';
import Header from '../../components/UI/header/Header.tsx';
import styles from './Catalog.module.css';
import Footer from '../../components/UI/footer/Footer.tsx';
import ProductList from '../../components/UI/products/products.tsx';
import Searching from '../../components/UI/searching/Searching.tsx';

function Catalog() {
  const [searchResults, setSearchResults] = useState<string>('');
  const handleSearch = (value:string ) => {
    setSearchResults(value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header />
      </div>
      <div>
        <Searching onChange={handleSearch}/>
      </div>
      <div className={styles.catalog_wrapper}>
        <ProductList productsArray={searchResults} />
      </div>
      <Footer />
    </div>
  );
}

export default Catalog;
