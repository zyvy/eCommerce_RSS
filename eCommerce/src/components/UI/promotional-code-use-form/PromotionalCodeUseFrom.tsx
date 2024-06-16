import { DiscountCode, DiscountCodeInfo } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './PromotionalCodeUseFrom.module.css';
import { CartService } from '../../../services/CartService.ts';
import InputText from '../inputs/input-text/InputText.tsx';
import { loadCart, useCart } from '../../../context/CartContext.tsx';

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
    if (!isPromoCodeValid(promoCodes, applyPromoCode)) {
      setTextError('invalid promotional code');
      return;
    }
    const response = await CartService.applyDiscountToCart(applyPromoCode);
    setAllApplyPromoCodes(response?.body.discountCodes);
    setPromo10('Промокод sale10 применен.');
    setPromo20('Промокод sale20 применен.');
    loadCart(cart, setCart);
    setTextError('');

    await CartService.getDiscounts(promoCodes.map((code) => code.id));
  };
  const handleDelPromoCode10 = async () => {
    await CartService.removeDiscountCartCode('4a958570-db54-4cb7-bce5-abfb4619d92e');

    for (let i = 0; i < promoCodes.length; i++) {
      if (promoCodes[i].id === '4a958570-db54-4cb7-bce5-abfb4619d92e') {
        promoCodes.splice(i, 1);
        setPromoCodes(promoCodes);
        setPromo10('');
      }
    }
    loadCart(cart, setCart);
  };
  const handleDelPromoCode20 = async () => {
    await CartService.removeDiscountCartCode('b640da39-b5d6-470d-b15a-ec25d440fab0');

    for (let i = 0; i < promoCodes.length; i++) {
      if (promoCodes[i].id === 'b640da39-b5d6-470d-b15a-ec25d440fab0') {
        promoCodes.splice(i, 1);
        setPromoCodes(promoCodes);
        setPromo20('');
      }
    }
    loadCart(cart, setCart);
  };

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
          if (item.discountCode.id === '4a958570-db54-4cb7-bce5-abfb4619d92e' && promo10.length && cart.totalDiscount) {
            return (
              <div className={styles.wrapper_discount}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  {promo10}
                </Alert>
                <Button size="small" color="inherit" aria-label="cart" onClick={handleDelPromoCode10}>
                  <DeleteIcon />
                </Button>
              </div>
            );
          }
          if (item.discountCode.id === 'b640da39-b5d6-470d-b15a-ec25d440fab0' && promo20.length && cart.totalDiscount) {
            return (
              <div className={styles.wrapper_discount}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  {promo20}
                </Alert>
                <Button size="small" color="inherit" aria-label="cart" onClick={handleDelPromoCode20}>
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
