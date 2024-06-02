import React, { useState, useEffect } from 'react';
import { ProductsService } from '../../../services/ProductsService';

const CategoriesComponent: React.FC = () => {
  const [categories, setCategories] = useState<Record<string, string>>({});
  useEffect(() => {
    async function loadCategories() {
      const getCat = await ProductsService.getCategories();
      const cat: Record<string, string> = {};
      getCat.results.forEach((category) => {
        if (!category.ancestors[0]) {
          cat[category.name['en-US']] = category.id;
        }
      });
      setCategories(cat);
      console.log("get_cat", getCat);
    }

    loadCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {Object.entries(categories).map(([name, id]) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesComponent;