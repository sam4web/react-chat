import Home from '../pages/Home';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';

import Navbar from '../components/Navbar';

import { Route, Routes } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/chat/' element={<Chat />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}
