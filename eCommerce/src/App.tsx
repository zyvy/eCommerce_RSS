import { JSX } from 'react';
import cl from './App.module.css';
import Header from './components/UI/Header';

function App(): JSX.Element {
  const title: string = 'Hi!';
  return (
    <>
    <Header />
      <h1 className={cl.header}>{title}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus earum magni quae itaque, voluptate officiis
        veritatis at iste, quis incidunt cupiditate deleniti molestiae tempore totam laudantium quas perspiciatis?
        Provident, commodi?
      </p>
    </>
  );
}

export default App;
