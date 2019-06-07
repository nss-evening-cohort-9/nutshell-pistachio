import util from '../../helpers/util';

import newsfeedData from '../../helpers/data/newsfeedData';

const printArticle = (array) => {
  let st = '';
  array.forEach((obj) => {
    st += `<div id="${obj.uid}" class="card article-card">`;
    st += `<img src="${obj.imgUrl}" class="article-img"></img>`;
    st += `<p class="article-title">${obj.title}<br>`;
    st += `<a href="${obj.articleUrl}" class="article-link">Read More</a></p>`;
    st += '</div>';
  });
  util.printToDom('newsfeedCon', st);
};

const loadArticles = () => {
  newsfeedData.getNews().then((resp) => {
    printArticle(resp);
  }).catch(err => console.error('error from loadArticles', err));
};

export default { loadArticles };
