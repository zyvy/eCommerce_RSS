import React, { useState } from 'react';
import styles from './Sorting.module.css';

interface SortingProps {
  onSortChange: (sortOption: string) => void;
}

function Sorting({ onSortChange }: SortingProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedOption(value);
    onSortChange(value);
  };

  return (
    <div>
      <label htmlFor={styles.sort}>
        Sort by:
        <select id={styles.sort} value={selectedOption} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </label>
    </div>
  );
}

export default Sorting;
