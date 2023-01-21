import Home from '../pages/Home';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';

import Navbar from '../components/Navbar';

import { auth } from '../utils/firebase';
import { Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export default function Root({ globalProps }) {
  const [user] = useAuthState(auth);
  const { toggleTheme, SignInWithGoogle } = globalProps;
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <>
      <Navbar
        signInHandle={SignInWithGoogle}
        toggleTheme={toggleTheme}
        user={currentUser}
      />
      <Routes>
        <Route path='/' element={<Home user={currentUser} />} />
        <Route path='/chat/' element={<Chat user={currentUser} />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}
