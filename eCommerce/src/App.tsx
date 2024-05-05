import cl from './App.module.css';

function App() {
  const title: string = 'Hi!';
  return (
    <>
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
