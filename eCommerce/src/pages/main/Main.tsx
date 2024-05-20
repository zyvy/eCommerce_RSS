import { Link } from 'react-router-dom';
import Header from '../../components/UI/Header.tsx';
import { PagePaths, isUserLoggedIn } from '../../utils/utils.tsx';
import Footer from '../../components/UI/footer.tsx';

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
          {isUserLoggedIn() ? 'Orders' : <Link to={PagePaths.Register}>Регистрация</Link>}
          <br />
          <Link to={PagePaths.NotFound}>404</Link>
          <br />
          <Link to={PagePaths.Login}>Login</Link>
          <br />
          <Link to={PagePaths.Register}>Registration</Link>
        </nav>
      </div>
      <Footer />
    </>
  );
}

export default Main;
