import Header from '../../components/UI/Header';
import { Link } from 'react-router-dom';
import Footer from '../../components/UI/footer';

function Main() {
  return (
    <>
      <Header />
      <h1>Main page</h1>
      <div>
        <nav>
          <Link to="/">Главная</Link>
          <br />
          <Link to="/login">Войти</Link>
          <br />
          <Link to="/register">Регистрация</Link>
          <br />
          <Link to="/404">404</Link>
        </nav>
      </div>
      <Footer />
    </>
  );
}

export default Main;
