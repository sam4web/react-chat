import { FaReact, FaGithub } from 'react-icons/fa';
import { SiFirebase } from 'react-icons/si';
import { AiOutlineGoogle } from 'react-icons/ai';

export default function Hero() {
  return (
    <>
      <main className='hero__section'>
        <h1 className='title'>React Chat</h1>
        <p className='description'>
          A real time chat application built with{' '}
          <a href='https://reactjs.org/' target='_blank'>
            React
          </a>{' '}
          and{' '}
          <a href='https://firebase.google.com/' target='_blank'>
            Firebase
          </a>
          .{' '}
        </p>
        {/* content */}

        <div className='btn-container'>
          <button className='btn'>
            <AiOutlineGoogle className='btn__icon' />
            <span className='btn__text'>Join Chat</span>
          </button>

          <a
            href='https://github.com/sam4web/react-chat'
            className='btn btn-transparent'
            target='_blank'
          >
            <span className='btn__text'>Source Code</span>
            <FaGithub className='btn__icon' />
          </a>
        </div>
        {/* /btn-container */}

        <FaReact className='background-icon bg-react' />
        <SiFirebase className='background-icon bg-firebase' />
        {/* /background-images */}
      </main>
    </>
  );
}
