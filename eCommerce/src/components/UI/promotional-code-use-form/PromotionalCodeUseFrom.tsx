import { DiscountCode, DiscountCodeInfo } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from './PromotionalCodeUseFrom.module.css';
import { CartService } from '../../../services/CartService.ts';
import InputText from '../inputs/input-text/InputText.tsx';
import { loadCart, useCart } from '../../../context/CartContext.tsx';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const isPromoCodeValid = (codes: DiscountCode[], code: string) => codes.some((item) => item.code === code);

function PromotionalCodeUseFrom() {
  const [promoCodes, setPromoCodes] = useState<DiscountCode[]>([]);
  const [applyPromoCode, setApplyPromoCode] = useState('');
  const [textError, setTextError] = useState('');
  const [allApplyPromoCodes, setAllApplyPromoCodes] = useState<DiscountCodeInfo[] | undefined>([]);
  const [promo10, setPromo10] = useState('');
  const [promo20, setPromo20] = useState('');

  const cart = useCart();
  const { setCart } = { ...cart };

  const handleOnInputPromoCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextError('');
    setApplyPromoCode(e.target.value);
  };

  const handleApplyPromoCode = async () => {
    // 'b640da39-b5d6-470d-b15a-ec25d440fab0'
    // CartService.removeDiscountCartCode('4a958570-db54-4cb7-bce5-abfb4619d92e');
    if (!isPromoCodeValid(promoCodes, applyPromoCode)) {
      setTextError('invalid promotional code');
      return;
    }
    const response = await CartService.applyDiscountToCart(applyPromoCode);
    setAllApplyPromoCodes(response?.body.discountCodes);
    setPromo10('Промокод sale10 применен.');
    setPromo20('Промокод sale20 применен.');
    console.log('111', response);
    loadCart(cart, setCart);
    setTextError('');

    await CartService.getDiscounts(
      promoCodes.map((item) => {
        return item.id;
      }),
    );
  };

  console.log(promoCodes);
  const handleDelPromoCode1 = async () => {
    await CartService.removeDiscountCartCode('4a958570-db54-4cb7-bce5-abfb4619d92e');
    loadCart(cart, setCart);
    for (let i = 0; i < promoCodes.length; i++) {
      if (promoCodes[i].id === '4a958570-db54-4cb7-bce5-abfb4619d92e') {
        promoCodes.splice(i, 1);
        setPromoCodes(promoCodes);
        setPromo10('');
      }
    }
    // loadCart(cart, setCart);
  };
  const handleDelPromoCode2 = async () => {
    await CartService.removeDiscountCartCode('b640da39-b5d6-470d-b15a-ec25d440fab0');
    loadCart(cart, setCart);
    for (let i = 0; i < promoCodes.length; i++) {
      if (promoCodes[i].id === 'b640da39-b5d6-470d-b15a-ec25d440fab0') {
        promoCodes.splice(i, 1);
        setPromoCodes(promoCodes);
        setPromo20('');
      }
    }
  };

  useEffect(() => {
    CartService.getActiveDiscountCodes().then((codes) => {
      if (codes) {
        setPromoCodes(codes);
      }
    });
  }, []);
  useEffect(() => {
    CartService.getActiveDiscountCodes().then((codes) => {
      if (codes) {
        setPromoCodes(codes);
      }
    });
  }, []);
  return (
    <>
      <div className={styles.applyPromoCodeContainer}>
        <InputText handleOnInput={handleOnInputPromoCode} label="promo code" errorText={textError} />
        <Button
          disabled={applyPromoCode.length === 0}
          style={{ alignSelf: 'flex-start' }}
          variant="outlined"
          onClick={handleApplyPromoCode}>
          Apply
        </Button>
      </div>
      <div>
        {allApplyPromoCodes?.map((item) => {
          if (item.discountCode.id === '4a958570-db54-4cb7-bce5-abfb4619d92e' && promo10.length) {
            return (
              <div className={styles.wrapper_discount}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  Промокод sale10 применен.
                </Alert>
                <Button size="small" color="inherit" aria-label="cart" onClick={handleDelPromoCode1}>
                  <DeleteIcon />
                </Button>
              </div>
            );
          }
          if (item.discountCode.id === 'b640da39-b5d6-470d-b15a-ec25d440fab0' && promo20.length) {
            return (
              <div className={styles.wrapper_discount}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  Промокод sale20 применен.
                </Alert>
                <Button size="small" color="inherit" aria-label="cart" onClick={handleDelPromoCode2}>
                  <DeleteIcon />
                </Button>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default PromotionalCodeUseFrom;
