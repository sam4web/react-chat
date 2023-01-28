import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import ReactMarkdown from 'react-markdown';

export default function Chat({ user }) {
  let navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage('');
  };

  return (
    <>
      {/* <ReactMarkdown>{message}</ReactMarkdown> */}

      <div className='chat'>
        <form className='message-form' onSubmit={(e) => handleSubmit(e)}>
          {showInput && (
            <>
              <div className='input-container'>
                <input
                  type='text'
                  className='message-form__input'
                  name='message'
                  placeholder='Message'
                  value={message}
                  autoComplete='off'
                  onChange={(e) => setMessage(e.target.value)}
                />
                {/* /input */}

                <button
                  type='button'
                  className='message-form__hide-input'
                  onClick={() => {
                    setShowInput(false);
                    setMessage('');
                  }}
                >
                  <RxCross2 />
                </button>
                {/* /hide-input-btn */}
              </div>
              {/* /input-container */}
            </>
          )}

          <button
            type={`${showInput ? 'submit' : 'button'}`}
            className='btn message-form__btn'
            onClick={() => {
              setShowInput(true);
            }}
          >
            <FaRegPaperPlane />
          </button>
          {/* send/show-btn */}
        </form>
      </div>
    </>
  );
}
