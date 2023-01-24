import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

export default function Profile({ user }) {
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
        {currentUser && (
          <>
            <h2 className='user-profile__name'>{currentUser.displayName}</h2>
            <p className='user-profile__email'>
              <MdEmail />
              {currentUser.email}
            </p>
          </>
        )}

        <button className='btn btn-round'>Sign out</button>
      </div>
    </>
  );
}
