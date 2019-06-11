import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import messagesData from '../../helpers/data/messagesData';


const printMessages = (array) => {
  let st = '';
  array.forEach((msg) => {
    st += '<form>';
    st += `<div id="${msg.id}" class="card">`;
    st += `${msg.message}`;
    st += '</div>';
    st += '</form>';
  });
  util.printToDom('messages', st);
};

const createNewMessage = (e) => {
  e.preventDefault();
  const newMessage = {
    time: document.getElementById('msg-time').value,
    text: document.getElementById('msg-text').value,
    uid: firebase.auth().currentUser.uid,
  };
  messagesData.addNewMessage(newMessage)
    .then(() => {
      document.getElementById('msg-time').value = '';
      document.getElementById('msg-text').value = '';
      document.getElementById('messages').classList.remove('hide');
      document.getElementById('add-message').classList.add('hide');
      console.error(newMessage.uid);
      loadMessages(); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new message for you', err));
};

const showNewMessageForm = () => {
  document.getElementById('messages').classList.add('hide');
  document.getElementById('new-message').classList.remove('hide');
};

document.getElementById('add-message').addEventListener('click', showNewMessageForm);
document.getElementById('saveNewMessage').addEventListener('click', createNewMessage);

const loadMessages = (uid) => {
  messagesData.getMessagesByUid(uid).then((resp) => {
    printMessages(resp);
  }).catch(err => console.error('error from loadMessages', err));
  console.error(uid);
};


export default { loadMessages };
