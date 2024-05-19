import { Link } from 'react-router-dom';
import Header from '../../components/UI/Header.tsx';
import { PagePaths, isUserLoggedIn } from '../../utils/utils.ts';
import Footer from '../../components/UI/Footer.tsx';

function Main() {
  return (
    <>
      <Header />
      <h1>Main page</h1>
      <div>
        <nav>
          <Link to={PagePaths.Main}>Главная</Link>
          <br />
          {isUserLoggedIn() ? 'Logout' : <Link to={PagePaths.Login}>Войти</Link>}
          <br />
          {isUserLoggedIn() ? 'Orders' :<Link to={PagePaths.Register}>Регистрация</Link>}
          <br />
          <Link to={PagePaths.NotFound}>404</Link>
        </nav>
      </div>
      <Footer />
    </>
  );
}

export default Main;
