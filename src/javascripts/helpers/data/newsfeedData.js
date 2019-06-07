import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getNews = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json`).then((resp) => {
    const articles = resp.data;
    const articleAr = [];
    Object.keys(articles).forEach((article) => {
      articleAr.push(articles[article]);
    });
    resolve(articleAr);
  }).catch(err => reject(err));
});

export default { getNews };
