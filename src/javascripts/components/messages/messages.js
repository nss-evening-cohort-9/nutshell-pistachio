/* eslint-disable no-use-before-define */
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import messagesData from '../../helpers/data/messagesData';
import apiKeys from '../../helpers/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const deleteMessage = messageId => axios.delete(`${firebaseUrl}/messages/${messageId}.json`);

const deleteMessageEvent = (e) => {
  e.preventDefault();
  const messageId = e.target.parentNode.id;
  console.error(messageId);
  deleteMessage(messageId).then(() => {
    loadMessages(); // eslint-disable-line no-use-before-define
  });
};

const printMessages = (array) => {
  let st = '';
  array.forEach((msg) => {
    st += '<form>';
    st += `<div id="${msg.id}" class="card">`;
    st += `${msg.message}`;
    if (msg.uid === firebase.auth().currentUser.uid) {
      st += `
        <button class="editMessage pt-1 ml-2" id="del${msg.id}">Edit</button>
        <button class="deleteMessage pt-1 ml-2" id="edit${msg.id}">Delete</button>
      </div>`;
      // if they are not signed in, the edit and delete buttons will not show up and
      // they are unable to edit or delete
    } else {
      st += '</p></div>';
    }
    st += '</div>';
    st += '</form>';
  });
  util.printToDom('messages', st);
  const deleteBtns = document.getElementsByClassName('deleteMessage');
  for (let i = 0; i < deleteBtns.length; i += 1) {
    deleteBtns[i].addEventListener('click', deleteMessageEvent);
  }
};

const createNewMessage = (e) => {
  e.preventDefault();
  const newMessage = {
    time: document.getElementById('msg-time').value,
    message: document.getElementById('msg-text').value,
    uid: firebase.auth().currentUser.uid,
  };
  messagesData.addNewMessage(newMessage)
    .then(() => {
      document.getElementById('msg-time').value = '';
      document.getElementById('msg-text').value = '';
      document.getElementById('messages').classList.remove('hide');
      document.getElementById('add-message').classList.add('hide');
      loadMessages(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new message for you', err));
};

const editMessageEvent = (e) => {
  // eslint-disable-next-line prefer-destructuring
  const cardToEdit = e.target.closest('.card').id;
  messagesData.singleMessageById(cardToEdit)
    .then((resp) => {
      const event = resp.data;
      document.getElementById('update-event-name').value = event.eName;
      document.getElementById('update-event-location').value = event.location;
      document.getElementById('update-event-date').value = event.date;
      document.getElementById('update-event-time').value = event.time;
      document.getElementById('update-event-note').value = event.note;
      document.getElementById('update-event-note').closest('form').id = cardToEdit;
      document.getElementById('edit-event').classList.remove('hide');
    })
    .catch(err => console.error('no edit for you', err));
};

const updateButtonMessage = (e) => {
  e.preventDefault();
  const messageId = e.target.closest('form').id;
  const editMessage = {
    time: document.getElementById('update-message-time').value,
    text: document.getElementById('update-message-text').value,
    uid: firebase.auth().currentUser.uid,
  };
  messagesData.updateMessage(messageId, editMessage)
    .then(() => {
      loadMessages(firebase.auth().currentUser.uid);
      document.getElementById('edit-message').classList.add('hide');
    })
    .catch(err => console.error('no update for you', err));
};

const showNewMessageForm = () => {
  document.getElementById('messages').classList.add('hide');
  document.getElementById('new-message').classList.remove('hide');
};

document.getElementById('add-message').addEventListener('click', showNewMessageForm);
document.getElementById('saveNewMessage').addEventListener('click', createNewMessage);

const loadMessages = () => {
  messagesData.getMessages().then((resp) => {
    printMessages(resp);
  }).catch(err => console.error('error from loadMessages', err));
  console.error();
};

export default { loadMessages };
