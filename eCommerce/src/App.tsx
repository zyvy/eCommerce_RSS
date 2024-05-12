import { JSX } from 'react';
import cl from './App.module.css';
import AppRouter from './components/Router';

function App(): JSX.Element {
  const title: string = 'Hi!';
  return (
      <AppRouter />
  );
}

export default App;
