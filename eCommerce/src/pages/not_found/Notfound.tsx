import React from 'react';
import Header from '../../components/UI/header/Header.tsx';
import styles from './Notfound.module.css';

function NotFound() {
  const [fact, setFact] = React.useState('');
  const [pic, setPic] = React.useState('');

  React.useEffect(() => {
    const getCatFact = () => {
      fetch('https://catfact.ninja/fact')
        .then((response) => response.json())
        .then((data) => setFact(data.fact))
        .catch(() => null);
    };

    const getCatPic = () => {
      fetch('https://api.thecatapi.com/v1/images/search')
        .then((response) => response.json())
        .then((data) => setPic(data[0]?.url || ''))
        .catch(() => null);
    };

    getCatFact();
    getCatPic();
  }, [setFact, setPic]);

  return (
    <>
      <Header />
      <div className={styles.not_found_wrap}>
        <h1>404 error</h1>
        <h2>There is no such page</h2>
        {pic && <img className={styles.catpic} src={pic} alt="Cat" />}
        {fact && <p>Random cat fact: {fact}</p>}
      </div>
    </>
  );
}

export default NotFound;
