import Root from './routes/root';
import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import { auth, db } from './utils/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { SiReact, SiFirebase } from 'react-icons/si';

export default function App() {
  let navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem('isDarkTheme'))
  );

  // when page loads
  // => load fonts using 'webfontloader' package
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

  // adds required user info to firestore
  //  => when user signs up create a doc in firestore with user information
  //  => used while storing message data
  const AddUserInfo = async (user) => {
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      user_id: user.uid,
    });
  };

  // Signs in user with google
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user info.
      const user = result.user;
      AddUserInfo(user);
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
