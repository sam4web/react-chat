import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import Navbar from './components/Navbar';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem('isDarkTheme'))
  );

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito', 'Inter', 'Open Sans'],
      },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkTheme', isDarkTheme);
    isDarkTheme
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme');
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
  };

  return (
    <>
      <main className='container'>
        <Navbar toggleTheme={toggleTheme} />
      </main>
    </>
  );
}
