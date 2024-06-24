import { DiscountCode } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { CartService } from '../../../services/CartService.ts';
import styles from './PromotionalCodesList.module.css';

function PromotionalCodesList() {
  const [promoCodes, setPromoCodes] = useState<DiscountCode[]>([]);

  useEffect(() => {
    CartService.getActiveDiscountCodes().then((codes) => {
      if (codes) {
        setPromoCodes(codes);
      }
    });
  }, []);

  return (
    <div className={styles.promoCodesContainer}>
      <h4 className={styles.title}>List of promotional codes:</h4>
      {promoCodes.map((code) => (
        <div key={code.id} className={styles.promoCodeContainer}>
          <div className={styles.promoCode}>{code.code}</div>
          <div className={styles.description}>{code.description!['en-US']}</div>
        </div>
      ))}
    </div>
  );
}

export default PromotionalCodesList;
