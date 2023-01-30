import ReactMarkdown from 'react-markdown';
import { nanoid } from 'nanoid';

export default function MessageBubble({ message, user }) {
  // return formatted date as a string
  //  => formats and returns date to display
  const getDateFormat = (date) => {
    date = date.toDate();
    const formatedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    return formatedDate;
  };

  return (
    <div
      key={nanoid()}
      className={`message-bubble ${
        user.uid === message.author.user_id ? 'self' : ''
      }`}
    >
      <img
        src={message.author.photoURL}
        className='message-bubble__avatar'
        alt=''
      />
      {/* message-image */}

      <div className='message-bubble__body'>
        <div className='message-bubble__posted'>
          {getDateFormat(message.postedDate)}
        </div>
        <div className='message-bubble__user'>{message.author.displayName}</div>
        <ReactMarkdown className='message-bubble__text'>
          {message.body}
        </ReactMarkdown>
      </div>
      {/* message-body */}
    </div>
  );
}
