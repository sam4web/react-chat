import { useEffect } from 'react';
import WebFont from 'webfontloader';

export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito'],
      },
    });
  }, []);

  return (
    <>
      <main className='home__page'>
        <h1>Hello, World!</h1>
      </main>
    </>
  );
}
