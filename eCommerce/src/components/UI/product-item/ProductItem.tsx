import React, { useEffect, useState } from 'react';
import { ProductProjection, Image, Price, DiscountedPrice } from '@commercetools/platform-sdk';
import styles from './ProductItem.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { dividerClasses } from '@mui/material';
import { ProductsService } from '../../../services/ProductsService';

interface ProductItemProps {
  slug: string;
}

function ProductItem({ slug }: ProductItemProps) {
  const [productImg, setProductImg] = useState<Image[] | undefined>([]);
  const [productTitle, setProductTitle] = useState('');
  const [productDescr, setProductDescr] = useState<string | undefined>('');
  const [productArtNumber, setProductArtNumber] = useState<string | undefined>('');
  const [productPrice, setProductPrice] = useState<number | undefined>(undefined);
  const [productDiscountedPrice, setProductDiscountedPrice] = useState<number | undefined>(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProductByKey(slug);
        console.log('fesf', productData);
        setProductImg(productData.masterVariant.images);
        setProductTitle(productData.name['en-US']);
        setProductDescr(productData.description?.['en-US']);
        setProductArtNumber(productData.masterVariant.sku);
        setProductPrice(productData.masterVariant.prices ? productData.masterVariant.prices[0].value.centAmount : undefined)
        setProductDiscountedPrice(productData.masterVariant.prices ? productData.masterVariant.prices[0].discounted?.value.centAmount : undefined);
      } catch (error) {
        setError('Тут написать про ошибку');
        console.error(error);
      }
    };
    getProducts();
  }, [slug]);

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
          {productPrice && 
            <p className={styles.price__sale}>{productPrice}</p>
          }
          {productDiscountedPrice &&
            <p className={styles.price__discounted}>{productDiscountedPrice}</p>
          }
        </div>
      </div>
    </>
  );
}

export default ProductItem;
