import { FcGoogle } from 'react-icons/fc';

export default function Navbar({ toggleTheme }) {
  return (
    <>
      <nav className='nav'>
        <div className='nav-logo'>
          <img src='/react.svg' className='nav-logo__icon' alt='logo' />
          <span className='nav-logo__text'>react-chat</span>
        </div>

        <div className='nav-options'>
          <div className='theme-toggler' onClick={toggleTheme}>
            <span className='theme-toggler__text' id='light'>
              light
            </span>
            <div className='theme-toggler__btn'>
              <div className='theme-toggler__dot'></div>
            </div>
            <span className='theme-toggler__text' id='dark'>
              dark
            </span>
          </div>
          {/* /theme-toggler */}

          <buttton className='sign-btn'>
            <FcGoogle className='sign-btn__icon' />
            <span className='sign-btn__text'>Sign in with Google</span>
          </buttton>
          {/* /sign-btn */}
        </div>
        {/* /nav-options */}
      </nav>
    </>
  );
}
