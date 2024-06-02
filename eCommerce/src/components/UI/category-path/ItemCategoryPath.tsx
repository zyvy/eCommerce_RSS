import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsService } from '../../../services/ProductsService';
import { Category } from '@commercetools/platform-sdk';
// если мы передаем пустой Id значит мы в корне и нужно просто вывести все категории
// иначе нужно проследить до начальной родительской и вывести ее
// Функция для получения имени категории по её ID
function getCategoryName(categoryId: string, categories: Category[]): string {
  const category = categories.find(category => category.id === categoryId);
  return category?.key ? category.key : '';
}

// Функция для получения пути категории
function getCategoryPath(categoryID: string, categories: Category[]): string[] | undefined {
  const catPath: string[] = []
  const currentName = getCategoryName(categoryID, categories);
  if (currentName){
  catPath.push(currentName)
  }
  const category = categories.find(category => category.id === categoryID);
  if (category?.ancestors) {
    category.ancestors.forEach((ancestor) =>{
      const currentName = getCategoryName(ancestor.id, categories);
  if (currentName){
  catPath.push(currentName)
  }
  })
  if (category?.parent){
    const currentName = getCategoryName(category.parent.id, categories);
    catPath.push(currentName)}
}
return catPath;
}

function ItemCategoryPath() {
  const { productKey } = useParams<{ productKey: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await ProductsService.getCategories();
      setCategories(categoriesData.results);
    };
    fetchData();
  }, []); 

  useEffect(() => {
    if (categories.length > 0 && productKey) {
      const curPath = getCategoryPath(productKey, categories);
      if (curPath) {
        setCurrentPath(curPath);
      }
    }
  }, [categories, productKey]);
  console.log('path', currentPath)

  return (
    <div>
      {currentPath.map((curName, index) => (
        <span key={index}>{curName}{index < currentPath.length - 1 ? ' > ' : ''}</span>
      ))}
    </div>
  );
}

export default ItemCategoryPath;
