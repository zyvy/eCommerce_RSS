import { Link } from 'react-router-dom';
import Header from '../../components/UI/Header.tsx';
import { PagePaths } from '../../utils/utils.ts';

function Main() {
  return (
    <>
      <Header />
      <h1>Main page</h1>
      <div>
        <nav>
          <Link to={PagePaths.Main}>Главная</Link>
          <br />
          <Link to={PagePaths.Login}>Войти</Link>
          <br />
          <Link to={PagePaths.Register}>Регистрация</Link>
          <br />
          <Link to={PagePaths.NotFound}>404</Link>
        </nav>
      </div>
    </>
  );
}

export default Main;
