import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaReact, FaGithub } from 'react-icons/fa';
import { SiFirebase } from 'react-icons/si';
import { AiOutlineGoogle } from 'react-icons/ai';

export default function Home({ user }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // return navigate('/chat');
    }
  }, [user]);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
