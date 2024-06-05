import  { useState } from 'react';
import Header from '../../components/UI/header/Header.tsx';
import styles from './Catalog.module.css';
import Footer from '../../components/UI/footer/Footer.tsx';
import ProductList from '../../components/UI/products/products.tsx';
import Searching from '../../components/UI/searching/Searching.tsx';
import Sorting from '../../components/UI/sorting/Sorting.tsx';

function Catalog() {
  const [searchResults, setSearchResults] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const handleSearch = (value:string ) => {
    setSearchResults(value)
  }
  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header />
      </div>
      <div>
        <Searching onChange={handleSearch}/>
      </div>
      <div>
      <Sorting onSortChange={handleSortChange} />
      </div>
      <div className={styles.catalog_wrapper}>
        <ProductList productsArray={searchResults} sortingArray={sortOption} />
      </div>
      <Footer />
    </div>
  );
}

export default Catalog;
