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
  messageEvents();
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
      const message = resp.data;
      document.getElementById('update-message-time').value = message.time;
      document.getElementById('update-message-text').value = message.text;
      document.getElementById('update-message-text').closest('form').id = cardToEdit;
      document.getElementById('editMessage').classList.remove('hide');
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
  messagesData.updateEvent(messageId, editMessage)
    .then(() => {
      loadMessages(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
      document.getElementById('editMessage').classList.add('hide');
    })
    .catch(err => console.error('no update for you', err));
};

const messageEvents = () => {
  document.getElementById('saveNewMessage').addEventListener('click', createNewMessage);
  const deleteButtons = document.getElementsByClassName('delete-message');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteMessageEvent);
  }
  const editButtons = document.getElementsByClassName('editMessage');
  for (let j = 0; j < editButtons.length; j += 1) {
    editButtons[j].addEventListener('click', editMessageEvent);
  }
  const submitButton = document.getElementById('updateNewMessageButton');
  submitButton.addEventListener('click', updateButtonMessage);
  // document.getElementsByClassName('edit').addEventListener('click', showUpdateEventForm);
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
