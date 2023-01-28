import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import ReactMarkdown from 'react-markdown';

export default function Chat({ user }) {
  let navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

  const messages = [
    {
      user: user,
      body: 'Continually streamline front-end testing procedures and.',
      posted_date: new Date().toLocaleDateString(),
    },
    {
      user: user,
      body: 'Monotonectally reinvent B2C schemas with backward-compatible catalysts.',
      posted_date: new Date().toLocaleDateString(),
    },
    {
      user: user,
      body: 'Compellingly transform visionary methodologies for just in time methods of empowerment. Authoritatively brand multidisciplinary niches with goal-oriented.',
      posted_date: new Date().toLocaleDateString(),
    },
    {
      user: user,
      body: 'Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.',
      posted_date: new Date().toLocaleDateString(),
    },
    {
      user: user,
      body: 'Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.Credibly incubate best-of-breed web services for backend potentialities. Quickly plagiarize effective portals vis-a-vis.',
      posted_date: new Date().toLocaleDateString(),
    },
  ];

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
      <div className='chat'>
        {messages.map((message) => (
          <>
            <div className={`message ${user === message.user ? '' : ''}`}>
              <div className='message__image'>
                <img src={message.user.photoURL} alt='' />
              </div>
              {/* /message_image */}
              <div className='message__body'>
                <div className='message__posted'>{message.posted_date}</div>
                <div className='message__user'>{message.user.displayName}</div>
                <ReactMarkdown className='message__text'>
                  {message.body}
                </ReactMarkdown>
              </div>
              {/* /message_body */}
            </div>
          </>
        ))}

        <form className='message-form' onSubmit={(e) => handleSubmit(e)}>
          {showInput && (
            <>
              <div className='input-container'>
                <textarea
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
        {/* /message-form */}
      </div>
    </>
  );
}
