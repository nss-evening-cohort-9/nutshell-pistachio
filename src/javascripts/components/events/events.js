import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import eventsData from '../../helpers/data/eventsData';


const printEvents = (array) => {
  let domString = '';
  array.forEach((event) => {
    domString += `<div id="${event.uid}" class="card" style="width: 18rem;">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${event.eName}</h5>`;
    domString += `<h6 class="card-subtitle mb-2 text-muted">${event.location}</h6>`;
    domString += `<h6 class="card-subtitle mb-2 text-muted">${event.date}</h6>`;
    domString += `<h6 class="card-subtitle mb-2 text-muted">${event.time}</h6>`;
    domString += `<p class="card-text">Note to self: ${event.note}</p>`;
    domString += '</div>';
  });
  util.printToDom('events', domString);
};

const createNewEvent = (e) => {
  e.preventDefault();
  const newEvent = {
    eName: document.getElementById('event-name').value,
    location: document.getElementById('event-location').value,
    date: document.getElementById('event-date').value,
    time: document.getElementById('event-time').value,
    note: document.getElementById('event-note').value,
    uid: firebase.auth().currentUser.uid,
  };
  eventsData.addNewEvent(newEvent)
    .then(() => {
      document.getElementById('event-name').value = '';
      document.getElementById('event-location').value = '';
      document.getElementById('event-date').value = '';
      document.getElementById('event-time').value = '';
      document.getElementById('event-note').value = '';
      document.getElementById('events').classList.remove('hide');
      document.getElementById('add-event').classList.add('hide');
      loadEvents(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new event for you', err));
};

const showNewEventForm = () => {
  document.getElementById('events').classList.add('hide');
  document.getElementById('new-event').classList.remove('hide');
};

document.getElementById('add-event').addEventListener('click', showNewEventForm);
document.getElementById('saveNewEvent').addEventListener('click', createNewEvent);


// const showEvents = () => {
//   const domString = '<button id="add-events-button" class="btn btn-info">Add Event</button>';
//   util.printToDom('user-events', domString);
//   document.getElementById('add-events-button').addEventListener('click', newEventButton);
// };

const loadEvents = (uid) => {
  eventsData.getEventsByUid(uid).then((resp) => {
    printEvents(resp);
  }).catch(err => console.error('error from loadEvents', err));
  console.error(uid);
};

export default { loadEvents };
