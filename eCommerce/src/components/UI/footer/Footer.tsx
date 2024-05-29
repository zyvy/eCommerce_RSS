import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_div}>
        <p>Thank you for shopping with us!</p>
        <p>&copy; {new Date().getFullYear()} OLD Ecommerce Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
