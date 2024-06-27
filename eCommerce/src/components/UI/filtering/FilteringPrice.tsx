import { useState } from 'react';

interface FilteringProps {
  onFilterChange: (minPrice: string, maxPrice: string) => void;
}

function FilteringPrice({ onFilterChange }: FilteringProps) {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(minPrice, maxPrice);
  };

  return (
    <div>
      by Price
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="minPrice">
            Min Price:
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Min Price"
            />
          </label>
        </div>
        <div>
          <label htmlFor="maxPrice">
            Max Price:
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Max Price"
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FilteringPrice;
