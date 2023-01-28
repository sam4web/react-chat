import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import ReactMarkdown from 'react-markdown';
import { nanoid } from 'nanoid';
import { db } from '../utils/firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';

export default function Chat({ user }) {
  let navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [isMessageValid, setIsMessageValid] = useState(false);

  // navigate to '/welcome' page if user is not logged in
  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
  }, [user]);

  // checks & updates messages in real-time
  //  => sets messageList state to list of messages from firebase db
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('postedDate'));
    onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessageList(messages);
    });
  }, []);

  // check if message is valid
  //  => check if user entered message or not
  //  => if not option to close input box is visible
  useEffect(() => {
    if (message.length > 0) {
      setIsMessageValid(true);
    } else {
      setIsMessageValid(false);
    }
  }, [message]);

  // return formatted date as a string
  //  => formats and returns date to display
  const getDateFormat = (date) => {
    date = date.toDate();
    const formatedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    return formatedDate;
  };

  // when user submits the form(message input)
  //  => adds message to firebase db
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    await addDoc(collection(db, 'messages'), {
      author: docSnap.data(),
      body: message,
      postedDate: Timestamp.now(),
    });
    setMessage('');
  };

  return (
    <>
      <div className='chat'>
        {messageList &&
          messageList.map((message) => (
            <div
              key={nanoid()}
              className={`message ${
                user.uid === message.author.user_id ? '' : ''
              }`}
            >
              <div className='message__image'>
                <img src={message.author.photoURL} alt='' />
              </div>
              {/* /message_image */}

              <div className='message__body'>
                <div className='message__posted'>
                  {getDateFormat(message.postedDate)}
                </div>
                <div className='message__user'>
                  {message.author.displayName}
                </div>
                <ReactMarkdown className='message__text'>
                  {message.body}
                </ReactMarkdown>
                {/* /message_text */}
              </div>
              {/* /message_body */}
            </div>
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

                {isMessageValid ? (
                  <button
                    type='submit'
                    className='message-form__input-btn submit'
                  >
                    <FaRegPaperPlane />
                  </button>
                ) : (
                  <button
                    type='button'
                    className='message-form__input-btn'
                    onClick={() => {
                      setShowInput(false);
                    }}
                  >
                    <RxCross2 />
                  </button>
                )}
                {/* /hide-input-btn */}
              </div>
              {/* /input-container */}
            </>
          )}

          {!showInput && (
            <button
              type='button'
              className='btn message-form__btn'
              onClick={() => {
                setShowInput(true);
              }}
            >
              <FaRegPaperPlane />
            </button>
          )}
        </form>
        {/* /message-form */}
      </div>
    </>
  );
}
