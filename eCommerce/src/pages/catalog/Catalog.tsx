import { useState } from 'react';
import Header from '../../components/UI/header/Header.tsx';
import styles from './Catalog.module.css';
import Footer from '../../components/UI/footer/Footer.tsx';
import ProductList from '../../components/UI/products/products.tsx';
import Searching from '../../components/UI/searching/Searching.tsx';
import Sorting from '../../components/UI/sorting/Sorting.tsx';
import FilteringPrice from '../../components/UI/filtering/FilteringPrice.tsx';
import FilterSeason from '../../components/UI/filtering/FilteringSeason.tsx';

function Catalog() {
  const [searchResults, setSearchResults] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchResults(value);
  };
  const handleSortChange = (srtOption: string) => {
    setSortOption(srtOption);
  };
  const handleFilterChange = (mnPrice: string, mxPrice: string) => {
    setMinPrice(mnPrice);
    setMaxPrice(mxPrice);
  };
  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header />
      </div>
      <div>
        <Searching onChange={handleSearch} />
      </div>
      <div className={styles.filters}>
        <Sorting onSortChange={handleSortChange} />
        <p>Filtering</p>
        <FilteringPrice onFilterChange={handleFilterChange} />
        <FilterSeason onSeasonChange={handleSeasonChange} />
      </div>
      <div className={styles.catalog_wrapper}>
        <ProductList
          productsArray={searchResults}
          sortingArray={sortOption}
          priceFilter={[minPrice, maxPrice]}
          season={selectedSeason}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Catalog;
