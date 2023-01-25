// pages
import Welcome from '../pages/Welcome';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';

// components
import Navbar from '../components/Navbar';

// dependencies
import { auth } from '../utils/firebase';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export default function Root({ globalProps }) {
  const [user] = useAuthState(auth);
  const { toggleTheme, SignInWithGoogle, SignOut } = globalProps;
  const [currentUser, setCurrentUser] = useState('');

  // sets user state if logged in
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
        <Route
          path='/welcome/'
          element={
            <Welcome signInHandle={SignInWithGoogle} user={currentUser} />
          }
        />
        <Route
          path='/profile'
          element={<Profile user={currentUser} signOut={SignOut} />}
        />
        <Route path='/chat' element={<Chat user={currentUser} />} />
        <Route path='/*' element={<Navigate to='/welcome' />} />
      </Routes>
    </>
  );
}
