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

const loadEvents = () => {
  eventsData.getEvents().then((resp) => {
    printEvents(resp);
  }).catch(err => console.error('error from loadEvents', err));
};

export default { loadEvents };
