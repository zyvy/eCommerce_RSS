import React, { useEffect, useState } from 'react';
import { Image } from '@commercetools/platform-sdk';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Pagination, Navigation } from 'swiper/modules';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ProductsService } from '../../../services/ProductsService.ts';
import styles from './ProductItem.module.css';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '50%',
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProductByKey(slug);
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
      } catch (e) {
        setError(`Тут написать про ошибку ${e}`);
        console.error(error);
      }
    };
    getProducts();
  }, [slug]);

  const slides = productImg?.map((prod) => prod.url);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className={styles.swiper__modal}>
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              navigation
              modules={[Pagination, Navigation]}
              className="mySwiper">
              {slides?.map((slideContent, index) => (
                <SwiperSlide key={slideContent} virtualIndex={index} className={styles.slider__modal}>
                  <img src={slideContent} className={styles.swiper__img2} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Box>
      </Modal>
      <h1>{productTitle}</h1>
      <div className={styles.product__wrapper}>
        <div className={styles.swiper__img}>
          <Swiper pagination navigation grabCursor modules={[Pagination, Navigation]} className="mySwiper">
            {slides?.map((slideContent, index) => (
              <SwiperSlide key={slideContent} virtualIndex={index} className={styles.swiper_slide}>
                <img src={slideContent} className={styles.swiper__img2} onClick={handleOpen} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.product_description}>
          {productArtNumber && <p className={styles.product__article}>Article number: {productArtNumber}</p>}
          <p className={styles.product__description}>{productDescr}</p>
          <div className={styles.price__wrapper}>
            {productPrice && <p className={styles.price__sale}>{productPrice / 100}€</p>}
            {productDiscountedPrice && <p className={styles.price__discounted}>{productDiscountedPrice / 100}€</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
