import Root from './routes/root';
import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './utils/firebase';
import { useNavigate } from 'react-router-dom';
import { SiReact, SiFirebase } from 'react-icons/si';

export default function App() {
  let navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem('isDarkTheme'))
  );

  // when page loads
  // => load fontsusing 'webfontloader' package
  // => navigates to '/welcome'
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito', 'Inter'],
      },
    });
    return navigate('/welcome');
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

  // Signs out user
  const SignOut = () => {
    signOut(auth);
  };

  // Global props
  //  => to pass in required components
  const GlobalProps = {
    toggleTheme,
    SignInWithGoogle,
    SignOut,
  };

  return (
    <>
      <Root globalProps={GlobalProps} />
      <SiFirebase className='background-icon' id='firebase-icon' />
      <SiReact className='background-icon' id='react-icon' />
    </>
  );
}
