import firebase from 'firebase/app';
import 'firebase/auth';
import Axios from 'axios';

import util from '../../helpers/util';

import newsfeedData from '../../helpers/data/newsfeedData';
import apiKeys from '../../helpers/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const printArticle = (array) => {
  let st = '';
  // st += '<div class="container row">';
  array.forEach((obj) => {
    st += '<div class="article-card card mb-3 text-white bg-dark">';
    st += '<div class="row no-gutters">';
    st += '<div class="col-md-4">';
    st += `<img src="${obj.imgUrl}" class="article-img"></img>`;
    st += '</div>';
    st += '<div class="col-md-8">';
    st += '<button class="delete-btn btn close"><span aria-hidden="true">&times;</span></button>';
    st += '<div class="card-body">';
    st += `<h5 class="card-title">${obj.title}</h5>`;
    st += `<a href="${obj.articleUrl}" class="article-link">Read More</a></p>`;
    st += '</div>';
    st += '</div>';
    st += '</div>';
    st += '</div>';
  });
  // st += '</div>';
  util.printToDom('newsfeedCon', st);
};


const loadArticles = () => {
  newsfeedData.getNews().then((resp) => {
    printArticle(resp);
  }).catch(err => console.error(err));
};

const addArticle = (e) => {
  e.preventDefault();
  const user = firebase.auth().currentUser.uid;
  const formUrl = document.getElementById('addArticleFormUrl').value;
  const formTitle = document.getElementById('addArticleFormTitle').value;
  const formImg = document.getElementById('addArticleFormImage').value;
  const formText = document.getElementById('articleText').value;
  const newArtAr = [];

  const newArt = {
    uid: `${user}`,
    imgUrl: `${formImg}`,
    articleUrl: `${formUrl}`,
    title: `${formTitle}`,
    text: `${formText}`,
  };

  newArtAr.push(newArt);
  Axios.post(`${firebaseUrl}/news.json`, newArt).then(() => loadArticles());
};

export default { loadArticles, addArticle };
