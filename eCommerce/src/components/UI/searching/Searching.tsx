import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './Searching.module.css';

interface ProductsResult {
  onChange: (productsArray: string) => void;
}

function Searching({ onChange }: ProductsResult) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    onChange(searchQuery);
  };

  return (
    <div className={styles.searching}>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Searching..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Searching;
