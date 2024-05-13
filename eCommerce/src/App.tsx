import AppRouter from './components/Router';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <AppRouter />
        <nav>
          <Link to="/">Главная</Link><br/>
          <Link to="/login">Войти</Link><br/>
          <Link to="/register">Регистрация</Link><br/>
          <Link to="/404">404</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
