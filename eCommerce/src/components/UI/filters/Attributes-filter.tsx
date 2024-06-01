import React, { useEffect, useState } from 'react';
import { ProductType, AttributeDefinition } from '@commercetools/platform-sdk';
import { ProductsService } from '../../../services/ProductsService';
type AttributeValues = Record<string, string[]>; // название фильтра (свойства) и массив его возможных значений
// Все свойства храним в объекте где ключи - названия свойств а значения - массив значений

async function getAttributes(): Promise<AttributeValues> {
  const attributeValues: AttributeValues = {};

  const productTypes = await ProductsService.getProductTypes();
  productTypes.forEach((productType: ProductType) => {
    productType.attributes?.forEach((attribute: AttributeDefinition) => {
      if (attribute.type.name === 'enum' || attribute.type.name === 'lenum') {
        attributeValues[attribute.name] = attribute.type.values.map(value => value.key);
      } else if (attribute.type.name === 'boolean') {
        attributeValues[attribute.name] = ['true', 'false'];
      }
    });
    console.log(attributeValues)
  });

  return attributeValues;
}

const FiltersComponent: React.FC = () => {
  const [attributes, setAttributes] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const getAttributesData = async () => {
    const atributesData = await getAttributes();
    setAttributes(atributesData);
  }

    getAttributesData();
  }, []);

  return (
    <div className="filters-component">
      {Object.entries(attributes).map(([attributeName, values]) => (
        <div key={attributeName} className="filter-group">
          <h4>{attributeName}</h4>
          {values.map(value => (
            <div key={value}>
              <input type="checkbox" id={`${attributeName}-${value}`} name={attributeName} value={value} />
              <label htmlFor={`${attributeName}-${value}`}>{value}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FiltersComponent;
