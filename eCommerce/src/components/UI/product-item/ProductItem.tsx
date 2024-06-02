import React, { useEffect, useState } from 'react';
import { Image } from '@commercetools/platform-sdk';
import styles from './ProductItem.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom'
import { Pagination, Navigation } from 'swiper/modules';
import { ProductsService } from '../../../services/ProductsService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    console.log('efesfsefesfesfes');
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProductByKey(slug);
        console.log('fesf', productData);
        setProductImg(productData.masterVariant.images);
        setProductTitle(productData.name['en-US']);
        setProductDescr(productData.description?.['en-US']);
        setProductArtNumber(productData.masterVariant.sku);
        setProductPrice(
          productData.masterVariant.prices ? productData.masterVariant.prices[0].value.centAmount : undefined,
        );
        setProductDiscountedPrice(
          productData.masterVariant.prices
            ? productData.masterVariant.prices[0].discounted?.value.centAmount
            : undefined,
        );
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
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
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
        </Box>
      </Modal> */}
      <h1>{productTitle}</h1>
      <div className={styles.product__wrapper}>
        <div className={styles.swiper__img}>
          <Swiper
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            zoom={true}
            loop={true}
            grabCursor={true}
            modules={[Pagination, Navigation]}
            className="mySwiper">
            {slides?.map((slideContent, index) => (
              <SwiperSlide key={slideContent} virtualIndex={index} zoom={true}>
                {/* <a href="#" onClick={handleOpen}> */}
                  <img src={slideContent} className={styles.swiper__img2}></img>
                {/* </a> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <p>Article number: {productArtNumber}</p>
          <p>{productDescr}</p>
          {productPrice && <p className={styles.price__sale}>{productPrice}</p>}
          {productDiscountedPrice && <p className={styles.price__discounted}>{productDiscountedPrice}</p>}
        </div>
      </div>
    </>
  );
}

export default ProductItem;
