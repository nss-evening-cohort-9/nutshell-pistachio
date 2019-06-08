import messageData from '../../helpers/data/messagesData';
import util from '../../helpers/util';

const printMessages = (array) => {
  let st = '';
  array.forEach((msg) => {
    st += `<div id="${msg.id}" class="card article-card">`;
    st += msg.message;
    st += '</div>';
  });
  util.printToDom('messages', st);
};

const loadMessages = () => {
  messageData.getMessages().then((resp) => {
    printMessages(resp);
  }).catch(err => console.error('error from loadArticles', err));
};

export default { loadMessages };
