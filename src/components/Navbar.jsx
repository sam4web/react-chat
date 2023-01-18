import { FcGoogle } from 'react-icons/fc';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

export default function Navbar({ toggleTheme, signInHandle, currentUser }) {
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

          {/* displays users avatar when signed in */}
          {currentUser && (
            <>
              <img
                className='user-avatar'
                src={currentUser.photoURL}
                alt='avatar'
              />
              {/* /user-avatar */}
            </>
          )}

          {/* displays sign-btn when not signed in */}
          {!currentUser && (
            <>
              <button className='sign-btn btn' onClick={signInHandle}>
                <FcGoogle className='btn__icon' />
                <span className='btn__text'>Sign in with Google</span>
              </button>
              {/* /sign-btn */}
            </>
          )}
        </div>
        {/* /nav-options */}
      </nav>
    </>
  );
}
