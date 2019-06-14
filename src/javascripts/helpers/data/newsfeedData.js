import Axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getNews = () => new Promise((resolve, reject) => {
  Axios.get(`${firebaseUrl}/news.json?orderBy="public"&equalTo="true"`).then((resp) => {
    const articles = resp.data;
    const articleAr = [];
    Object.keys(articles).forEach((article) => {
      articles[article].id = article;
      articleAr.push(articles[article]);
    });
    resolve(articleAr);
  }).catch(err => reject(err));
});

const getUserNews = uid => new Promise((resolve, reject) => {
  Axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`).then((resp) => {
    const userArticles = resp.data;
    const userArticleAr = [];
    Object.keys(userArticles).forEach((userArticle) => {
      userArticles[userArticle].id = userArticle;
      userArticleAr.push(userArticles[userArticle]);
    });
    resolve(userArticleAr);
  }).catch(err => reject(err));
});

export default { getNews, getUserNews };
