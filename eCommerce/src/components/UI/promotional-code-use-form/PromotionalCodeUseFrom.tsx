import { DiscountCode } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './PromotionalCodeUseFrom.module.css';
import { CartService } from '../../../services/CartService.ts';
import InputText from '../inputs/input-text/InputText.tsx';
import { loadCart, useCart } from '../../../context/CartContext.tsx';

type PromoCode = {
  id: string;
  code: string;
};

const isPromoCodeValid = (codes: DiscountCode[], code: string) => codes.some((item) => item.code === code);

function PromotionalCodeUseFrom() {
  const [promoCodes, setPromoCodes] = useState<DiscountCode[]>([]);
  const [applyPromoCode, setApplyPromoCode] = useState('');
  const [textError, setTextError] = useState('');
  const [allApplyPromoCodes, setAllApplyPromoCodes] = useState<PromoCode[]>([]);

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
    if (response) {
      const applyPromoCodes = response?.body.discountCodes.map((code) => code.discountCode.id);
      const discounts = await CartService.getDiscounts(applyPromoCodes);
      const applyCodes = discounts.map((discount) => ({ id: discount.id, code: discount.code }));
      setAllApplyPromoCodes(applyCodes);
    }

    loadCart(cart, setCart);
    setApplyPromoCode('');
    setTextError('');
  };

  const handleRemovePromoCode = async (discountCode: string) => {
    const response = await CartService.removeDiscountCartCode(discountCode);
    if (response) {
      const applyPromoCodes = response?.body.discountCodes.map((code) => code.discountCode.id);
      const discounts = await CartService.getDiscounts(applyPromoCodes);
      const applyCodes = discounts.map((discount) => ({ id: discount.id, code: discount.code }));
      setAllApplyPromoCodes(applyCodes);
    }
    loadCart(cart, setCart);
  };

  useEffect(() => {
    CartService.getActiveDiscountCodes().then((codes) => {
      if (codes) {
        setPromoCodes(codes);
      }
    });

    console.log('use effect');

    if (CartService.getCartInfo().id) {
      CartService.getCart().then((response) => {
        CartService.getDiscounts(response.discountCodes.map((code) => code.discountCode.id)).then((discounts) => {
          const applyCodes = discounts.map((discount) => ({ id: discount.id, code: discount.code }));
          setAllApplyPromoCodes(applyCodes);
        });
      });
    }
  }, []);

  return (
    <>
      <div className={styles.applyPromoCodeContainer}>
        <InputText
          handleOnInput={handleOnInputPromoCode}
          value={applyPromoCode}
          label="promo code"
          errorText={textError}
        />
        <Button
          disabled={applyPromoCode.length === 0}
          style={{ alignSelf: 'flex-start' }}
          variant="outlined"
          onClick={handleApplyPromoCode}>
          Apply
        </Button>
      </div>
      <div>
        {allApplyPromoCodes.map((item) => (
          <div key={item.id} className={styles.wrapper_discount}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {`Promo code "${item.code}" applied.`}
            </Alert>
            <Button size="small" color="inherit" aria-label="cart" onClick={() => handleRemovePromoCode(item.id)}>
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default PromotionalCodeUseFrom;
