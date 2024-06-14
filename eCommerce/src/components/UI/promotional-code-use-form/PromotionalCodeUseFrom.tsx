import { DiscountCode } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from './PromotionalCodeUseFrom.module.css';
import { CartService } from '../../../services/CartService.ts';
import InputText from '../inputs/input-text/InputText.tsx';
import { loadCart, useCart } from '../../../context/CartContext.tsx';

const isPromoCodeValid = (codes: DiscountCode[], code: string) => codes.some((item) => item.code === code);

function PromotionalCodeUseFrom() {
  const [promoCodes, setPromoCodes] = useState<DiscountCode[]>([]);
  const [applyPromoCode, setApplyPromoCode] = useState('');
  const [textError, setTextError] = useState('');

  const cart = useCart();
  const { setCart } = { ...cart };

  const handleOnInputPromoCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextError('');
    setApplyPromoCode(e.target.value);
  };

  const handleApplyPromoCode = async () => {
    // 'b640da39-b5d6-470d-b15a-ec25d440fab0'
    CartService.removeDiscountCartCode('4a958570-db54-4cb7-bce5-abfb4619d92e');
    if (!isPromoCodeValid(promoCodes, applyPromoCode)) {
      setTextError('invalid promotional code');
      return;
    }
    await CartService.applyDiscountToCart(applyPromoCode);
    loadCart(cart, setCart);
    setTextError('');
  };

  useEffect(() => {
    CartService.getActiveDiscountCodes().then((codes) => {
      if (codes) {
        setPromoCodes(codes);
      }
    });
  }, []);

  return (
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
  );
}

export default PromotionalCodeUseFrom;
