import firebase from 'firebase/app';
import 'firebase/auth';
import Axios from 'axios';

import util from '../../helpers/util';

import newsfeedData from '../../helpers/data/newsfeedData';
import apiKeys from '../../helpers/apiKeys.json';
import check from './check';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const deleteMovie = articleId => Axios.delete(`${firebaseUrl}/news/${articleId}.json`).catch(err => console.error(err));

const deleteArticleEvent = (e) => {
  const user = firebase.auth().currentUser.uid;
  const articleId = e.target.parentNode.id;
  const confirmdelete = document.getElementById('confirmDeleteBtn');
  confirmdelete.addEventListener('click', () => {
    deleteMovie(articleId).then(() => {
      loadArticles(); // eslint-disable-line no-use-before-define
      loadSavedArticles(user); // eslint-disable-line no-use-before-define
    });
  });
};

const printArticle = (array, divId) => {
  let st = '';
  const user = firebase.auth().currentUser.uid;
  array.forEach((obj) => {
    let img = `${obj.imgUrl}`;
    let txt = `${obj.text}`;
    let deleteBtn = '';
    if (img === '') {
      img = 'https://www.itsmfusa.org/resource/resmgr/images/more_images/news-3.jpg';
    }
    if (obj.text === undefined || txt === null) {
      txt = '';
    }
    if (user === obj.uid) {
      deleteBtn = '<button type="button" class="art-delete-btn btn btn-danger close" data-toggle="modal" data-target="#confirmDelMod"">X</button>';
    }
    st += `<div class="article-card card mb-3 text-white bg-dark" id="${obj.uid}">`;
    st += '<div class="row no-gutters">';
    st += '<div class="col-md-4">';
    st += `<img src="${img}" class="article-img"></img>`;
    st += '</div>';
    st += `<div class="col-md-8" id="${obj.id}">`;
    st += `${deleteBtn}`;
    st += '<div class="card-body">';
    st += `<h5 class="card-title">${obj.title}</h5>`;
    st += `<div class="overflow-auto"><p class="pub-art-text" id="pubArtText">${txt}</p>`;
    st += `<a href="${obj.articleUrl}" class="article-link">Read More</a></div>`;
    st += '</div>';
    st += '</div>';
    st += '</div>';
    st += '</div>';
  });
  util.printToDom(`${divId}`, st);
  const deleteBtns = document.getElementsByClassName('art-delete-btn');
  for (let i = 0; i < deleteBtns.length; i += 1) {
    deleteBtns[i].addEventListener('click', deleteArticleEvent);
  }
};

const loadSavedArticles = (uid) => {
  const user = uid;
  const userNewsCon = document.getElementById('savedHeader');
  newsfeedData.getUserNews(user)
    .then((resp) => {
      printArticle(resp, 'userNewsCon');
      if (resp.length > 0) {
        userNewsCon.classList.remove('hide');
      } else if (resp.length <= 0) {
        userNewsCon.classList.add('hide');
      }
    })
    .catch(err => console.error(err));
};

const loadArticles = () => {
  newsfeedData.getNews().then((resp) => {
    printArticle(resp, 'newsfeedCon');
  })
    .catch(err => console.error(err));
};

const publishArticle = (e) => {
  e.preventDefault();
  const user = firebase.auth().currentUser.uid;
  const url = '#';
  const formTitle = document.getElementById('publishArticleFormTitle').value;
  const formImg = document.getElementById('publishArticleFormImage').value;
  const formText = document.getElementById('articleText').value;
  const newArtAr = [];
  const newArt = {
    uid: `${user}`,
    imgUrl: `${formImg}`,
    articleUrl: `${url}`,
    title: `${formTitle}`,
    text: `${formText}`,
    public: 'true',
  };
  const artTitle = check.checkTitle(newArt.title);
  const artText = check.checkTitle(newArt.text);
  if (artTitle === true && artText === true) {
    newArtAr.push(newArt);
    Axios.post(`${firebaseUrl}/news.json`, newArt).then(() => loadArticles()).then(() => loadSavedArticles(user));
  }
};

const saveArticle = (e) => {
  e.preventDefault();
  const user = firebase.auth().currentUser.uid;
  const formUrl = document.getElementById('saveArticleFormUrl').value;
  const formTitle = document.getElementById('saveArticleFormTitle').value;
  const formImg = document.getElementById('saveArticleFormImage').value;
  const newArtAr = [];
  const newArt = {
    uid: `${user}`,
    imgUrl: `${formImg}`,
    articleUrl: `${formUrl}`,
    title: `${formTitle}`,
    public: 'false',
  };
  const artTitle = check.checkTitle(newArt.title);
  const artUrl = check.checkUrl(newArt.articleUrl);
  if (artTitle === true && artUrl === true) {
    newArtAr.push(newArt);
    Axios.post(`${firebaseUrl}/news.json`, newArt).then(() => loadSavedArticles(user));
  }
};

export default {
  loadArticles, saveArticle, loadSavedArticles, publishArticle,
};
