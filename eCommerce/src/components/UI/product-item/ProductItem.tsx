import React, { useEffect, useState } from 'react';
import { Image } from '@commercetools/platform-sdk';
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Pagination, Navigation } from 'swiper/modules';
/* eslint-enable import/no-unresolved */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ProductItem.module.css';
import { ProductsService } from '../../../services/ProductsService.ts';
import { CartService } from '../../../services/CartService.ts';
import { loadCart, useCart } from '../../../context/CartContext.tsx';

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
  const [productId, setProductId] = useState('');
  const [inCart, setInCart] = useState(false);
  const [error, setError] = useState('');

  const cart = useCart();
  const { products, setCart } = { ...cart };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAddToCart = async (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!inCart) {
      if (!CartService.getCartInfo().id) {
        await CartService.createCart();
      }
      await CartService.addItemToCart(id, 1);
      setInCart(true);
      loadCart(cart, setCart);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ProductsService.getProductByKey(slug);
        setProductId(productData.id);
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

        products.forEach((el) => {
          if (el.id === productData.id) {
            setInCart(true);
          }
        });
      } catch (e) {
        setError(error);
      }
    };
    getProducts();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const slides = productImg?.map((prod) => prod.url);

  const handleDelete = (productsId: string, variang: number, quantity: number) => {
    CartService.removeItemFromCart(productsId, variang, quantity).then(() => loadCart(cart, setCart));
    setInCart(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className={styles.swiper__modal}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              navigation
              modules={[Pagination, Navigation]}
              className="mySwiper">
              {slides?.map((slideContent, index) => (
                <SwiperSlide key={slideContent} virtualIndex={index} className={styles.slider__modal}>
                  <img src={slideContent} className={styles.swiper__img2} alt="product pic" />
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
                {/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */}
                <img
                  src={slideContent}
                  tabIndex={0}
                  role="button"
                  className={styles.swiper__img2}
                  onClick={handleOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpen();
                    }
                  }}
                  alt="product pic"
                />
                {/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.product_description}>
          {productArtNumber && <p className={styles.product__article}>Article number: {productArtNumber}</p>}
          <p className={styles.product__description}>{productDescr}</p>
          <div className={styles.price__wrapper}>
            {productDiscountedPrice ? (
              <>
                <p className={styles.price__sale}>${productPrice ? (productPrice / 100).toFixed(2) : undefined}</p>
                <p className={styles.price__discounted}>${(productDiscountedPrice / 100).toFixed(2)}</p>
              </>
            ) : (
              <p className={styles.price__standart}>${productPrice ? (productPrice / 100).toFixed(2) : undefined}</p>
            )}
          </div>
          <div className={styles.cart__wrapper}>
            {inCart ? (
              <Button fullWidth disabled variant="contained" size="small" color="primary">
                In Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={(event) => handleAddToCart(productId, event)}>
                Add To Cart
              </Button>
            )}
            {inCart && (
              <Button size="small" color="inherit" aria-label="cart" onClick={() => handleDelete(productId, 1, 1)}>
                <DeleteIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
