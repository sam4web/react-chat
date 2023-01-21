import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat({ user }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
  }, [user]);

  return <h1>Hello {user.displayName}</h1>;
}
