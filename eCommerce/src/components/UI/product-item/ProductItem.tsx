import React, { useEffect, useState } from 'react';
import { ProductsService } from '../../../services/ProductItemService';
import { ProductProjection, Image, Price, DiscountedPrice } from '@commercetools/platform-sdk';
import styles from './ProductItem.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { dividerClasses } from '@mui/material';

function ProductItem() {
  const [productImg, setProductImg] = useState<Image[] | undefined>([]);
  const [productTitle, setProductTitle] = useState('');
  const [productDescr, setProductDescr] = useState<string | undefined>('');
  const [productArtNumber, setProductArtNumber] = useState<string | undefined>('');
  const [productPrice, setProductPrice] = useState<Price[] | undefined>([]);
  const [productDiscountedPrice, setProductDiscountedPrice] = useState<Price[] | undefined>(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProducts('art-deco-chair');
        console.log('fesf', productData);
        setProductImg(productData.masterVariant.images);
        setProductTitle(productData.name['en-US']);
        setProductDescr(productData.description?.['en-US']);
        setProductArtNumber(productData.masterVariant.sku);
        setProductPrice(productData.masterVariant.prices)
        setProductDiscountedPrice(productData.masterVariant.prices);
      } catch (error) {
        setError('Тут написать про ошибку');
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const slides = productImg?.map((prod) => prod.url);

  return (
    <>
      <h1>{productTitle}</h1>
      <div className={styles.product__wrapper}>
        <div className={styles.swiper__img}>
          <Swiper
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper">
            {slides?.map((slideContent, index) => (
              <SwiperSlide key={slideContent} virtualIndex={index}>
                <img src={slideContent} className={styles.swiper__img2}></img>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <p>Article number: {productArtNumber}</p>
          <p>{productDescr}</p>
          <p className={styles.price__sale}>{productPrice? productPrice[2].value.centAmount: undefined}$</p>
          <p className={styles.price__discounted}>{productPrice? productPrice[2].discounted?.value.centAmount : undefined}$</p>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
