// dependencies
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

// icons
import { FaRegPaperPlane } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { IoIosArrowDown } from 'react-icons/io';

// components
import MessageBubble from '../components/MessageBubble';

// firebase
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
  const body = document.body;
  let navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
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

  // checks for scroll event in body
  //  => if scrolled scrollY state is changed to scroll position
  useEffect(() => {
    function watchScroll() {
      body.addEventListener('scroll', () => {
        setScrollY(body.scrollTop);
      });
    }
    watchScroll();
    return () => {
      body.removeEventListener('scroll', () => {
        setScrollY(body.scrollTop);
      });
    };
  });

  // change showScroll state when page is scrolled up
  useEffect(() => {
    if (scrollY < body.scrollHeight / 1.65) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  }, [scrollY]);

  // scrolls to bottom of page(body)
  const scrollToBottom = () => {
    body.scrollTo(0, body.scrollHeight);
  };

  // calls scrollToBottom() functino
  //  => when message is updated
  //  => when page loads
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

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
            <MessageBubble message={message} user={user} key={nanoid()} />
          ))}

        {!showInput && showScroll && (
          <button onClick={scrollToBottom} className='btn scroll-top'>
            <IoIosArrowDown />
          </button>
        )}

        <form
          className={`message-form ${showInput ? 'show-input' : ''}`}
          onSubmit={(e) => handleSubmit(e)}
        >
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
