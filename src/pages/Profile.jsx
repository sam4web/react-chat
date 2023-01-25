import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { HiArrowLeft } from 'react-icons/hi';

export default function Profile({ user, signOut }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
    setCurrentUser(user);
  }, [user]);

  return (
    <>
      <div className='user-profile'>
        <button className='back-btn' onClick={() => navigate(-1)}>
          <HiArrowLeft />
        </button>

        {/* back-btn */}
        {currentUser && (
          <>
            <div className='section-container'>
              <img
                src={currentUser.photoURL}
                alt='avatar'
                title={currentUser.displayName}
                className='user-profile__img'
              />
              <h2 className='user-profile__name'>{currentUser.displayName}</h2>
              <p className='user-profile__email'>
                <MdEmail className='mail-icon' />
                {currentUser.email}
              </p>
            </div>
            {/* /section-container */}
          </>
        )}

        <button className='btn btn-round' onClick={signOut}>
          Sign out
        </button>
      </div>
    </>
  );
}
