import React, { useEffect, useState } from 'react';
import { ProductsService } from '../../services/ProductItemService';
import { ProductProjection } from '@commercetools/platform-sdk';

type productId = {
  id: string
}

function ProductItem() {
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProducts('4f751c98-2394-4b1f-80f0-87489fc0a116');
        setProduct(product => ({
          ...product,
          ...productData}));
        console.log("test", product)
      } catch (error) {
        console.error(error);
      }
    };
    // console.log('product:', product)
    getProducts();
  }, []);
  console.log('test222', product)
  return (
    <>
      <div>
        <img 
          src={product.masterVariant?.images?.[0].url? product.masterVariant?.images?.[0].url: 'http://localhost'}
        ></img>
      </div>
    </>
  )
}

export default ProductItem;
