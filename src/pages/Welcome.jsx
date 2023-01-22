import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineGoogle, AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export default function Welcome({ user, signInHandle }) {
  let navigate = useNavigate();
  const [colorfulIcon, setColorfulIcon] = useState(false);

  useEffect(() => {
    if (user) {
      return navigate('/chat');
    }
  }, [user]);

  return (
    <>
      <main className='home__page'>
        <div className='section-container'>
          <h1 className='section-title'>Chat with fellow developers</h1>
          <p className='section-description'>
            By developer for developers. A real-time chat application build with{' '}
            <a href='https://reactjs.org/'>ReactJS</a>
            {' and '}
            <a href='https://firebase.google.com/'>Firebase</a>. Simple way to
            find new developers with similar interest.
          </p>

          <div className='btn-container'>
            <button
              type='button'
              className='btn'
              id='join-btn'
              onClick={signInHandle}
              onMouseEnter={() => setColorfulIcon(true)}
              onMouseLeave={() => setColorfulIcon(false)}
            >
              {colorfulIcon ? (
                <FcGoogle className='btn__icon' />
              ) : (
                <AiOutlineGoogle className='btn__icon' />
              )}
              <span className='btn__text'>Join Chat</span>
            </button>
            {/* /btn */}

            <a
              href='https://github.com/sam4web/react-chat'
              target='_blank'
              className='btn btn-link'
            >
              <span className='btn__text'>View Code</span>
              <AiOutlineGithub className='btn__icon' id='github-icon' />
            </a>
            {/* /btn */}
          </div>
          {/* /button-container */}
        </div>
        {/* /section-container */}
      </main>
    </>
  );
}
