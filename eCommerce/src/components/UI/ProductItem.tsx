import React, { useEffect, useState } from 'react';
import { ProductsService } from '../../services/ProductItemService';
import { ProductProjection, Image } from '@commercetools/platform-sdk';
import styles from './ProductItem.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';


function ProductItem() {
  const [productImg, setProductImg] = useState<Image[] | undefined>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProducts('4f751c98-2394-4b1f-80f0-87489fc0a116');
        console.log('fesf', productData)
        setProductImg(productData.masterVariant.images);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const slides = productImg?.map((prod) => prod.url)

  return (
      <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {slides?.map((slideContent, index) => (
        <SwiperSlide key={slideContent} virtualIndex={index}>
          <img
            src={slideContent}
            className={styles.swiper__img2}
            ></img>
        </SwiperSlide>
      ))}
          
        </Swiper>
  )
}

export default ProductItem;