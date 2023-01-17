import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import Navbar from './components/Navbar';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem('isDarkTheme'))
  );

  // Fonts
  // => load fonts when page loads using 'webfontloader' package
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito', 'Inter', 'Open Sans'],
      },
    });
  }, []);

  // theme toggle
  //  => runs when isDarkTheme state is changed
  //  => sets localStorge item to isDarkTheme state
  //  => add or remove 'dark-theme' class from <body> according to isDarkTheme state
  useEffect(() => {
    localStorage.setItem('isDarkTheme', isDarkTheme);
    isDarkTheme
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme');
  }, [isDarkTheme]);

  // toggles isDarkTheme state
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
