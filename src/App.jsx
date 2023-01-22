import Root from './routes/root';
import { SiReact, SiFirebase } from 'react-icons/si';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';

export default function App() {
  const [user] = useAuthState(auth);

  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem('isDarkTheme'))
  );

  // Fonts
  // => load fonts when page loads using 'webfontloader' package
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito', 'Inter'],
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

  // Signs in user with google
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(errorMessage);
        console.log(email);
      });
  };

  // Global props
  //  => to pass in required components
  const GlobalProps = {
    toggleTheme,
    SignInWithGoogle,
  };

  return (
    <>
      <Root globalProps={GlobalProps} />
      <SiFirebase className='background-icon' id='firebase-icon' />
      <SiReact className='background-icon' id='react-icon' />
    </>
  );
}
