import util from '../../helpers/util';

import newsfeedData from '../../helpers/data/newsfeedData';

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

export default { loadArticles };
