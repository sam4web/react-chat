import { FcGoogle } from 'react-icons/fc';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

export default function Navbar({ toggleTheme }) {
  return (
    <>
      <nav className='nav'>
        <div className='nav-logo'>
          <img src='/react.svg' className='nav-logo__icon' alt='logo' />
          <span className='nav-logo__text'>react-chat</span>
        </div>
        {/* /nav-logo */}

        <div className='nav-options'>
          <div className='theme-toggler' onClick={toggleTheme}>
            <BsSunFill className='theme-toggler__icon' id='light' />
            <div className='theme-toggler__btn'>
              <div className='theme-toggler__dot'></div>
            </div>
            <BsMoonFill className='theme-toggler__icon' id='dark' />
          </div>
          {/* /theme-toggler */}

          <button className='sign-btn'>
            <FcGoogle className='sign-btn__icon' />
            <span className='sign-btn__text'>Sign in with Google</span>
          </button>
          {/* /sign-btn */}
        </div>
        {/* /nav-options */}
      </nav>
    </>
  );
}
