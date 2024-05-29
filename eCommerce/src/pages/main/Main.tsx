import { Link } from 'react-router-dom';
import Header from '../../components/UI/header/Header.tsx';
import { PagePaths } from '../../utils/utils.ts';
import styles from './Main.module.css';
import Footer from '../../components/UI/footer/Footer.tsx';
import ProductList from '../../components/UI/products/products.tsx';

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header />
        <h1 className={styles.title}>Main page</h1>
        <nav className={styles.list}>
          <Link to={PagePaths.Login}>Войти</Link>
          <br />
          <Link to={PagePaths.Register}>Регистрация</Link>
          <br />
          <Link to={PagePaths.Main}>Главная</Link>
          <br />
          <Link to={PagePaths.Profile}>Профиль</Link>
          <br />
          <Link to={PagePaths.NotFound}>404</Link>
        </nav>
      </div>
      <div>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
