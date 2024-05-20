import { Link } from 'react-router-dom';
import Header from '../../components/UI/Header.tsx';
import { PagePaths } from '../../utils/utils.tsx';
import Footer from '../../components/UI/footer.tsx';
import styles from './Main.module.css';

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
          <Link to={PagePaths.NotFound}>404</Link>
        </nav>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
