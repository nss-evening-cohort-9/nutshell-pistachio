function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
  + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
  + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
  + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

const checkTitle = (formTitle) => {
  const saveFormTitle = document.getElementById('saveArticleFormTitle');
  const articleText = document.getElementById('articleText');
  const publishFormTitle = document.getElementById('publishArticleFormTitle');
  let canSubmit = true;
  if (formTitle === '' || formTitle.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    canSubmit = false;
    saveFormTitle.placeholder = 'Title Required!';
    articleText.placeholder = 'Text Required!';
    publishFormTitle.placeholder = 'Title Required!';
    saveFormTitle.classList.add('redPlaceholderText');
    articleText.classList.add('redPlaceholderText');
    publishFormTitle.classList.add('redPlaceholderText');
    return canSubmit;
  }
  saveFormTitle.placeholder = 'Article Title';
  articleText.placeholder = 'Article Text';
  publishFormTitle.placeholder = 'Article Title';
  saveFormTitle.classList.remove('redPlaceholderText');
  articleText.classList.remove('redPlaceholderText');
  publishFormTitle.classList.remove('redPlaceholderText');
  return canSubmit;
};

const checkUrl = (formUrl) => {
  const saveFormUrl = document.getElementById('saveArticleFormUrl');
  let canSubmit = true;
  if (formUrl === '' || validURL(formUrl) === false) {
    canSubmit = false;
    saveFormUrl.placeholder = 'URL Required!';
    saveFormUrl.classList.add('redPlaceholderText');
    return canSubmit;
  }
  saveFormUrl.placeholder = 'Article URL';
  saveFormUrl.classList.remove('redPlaceholderText');
  return canSubmit;
};

export default { checkTitle, checkUrl };
