document.addEventListener('DOMContentLoaded', function () {

  function creatElement() {
    const dataWrapper = document.querySelector('.data__wrapper');

    let link = document.createElement('a');
    link.classList.add('link');
    link.setAttribute('href', 'index.html');
    link.textContent = 'Назад';

    let title = document.createElement('h1');
    title.classList.add('wrapper__title');

    let content = document.createElement('p');
    content.classList.add('wrapper__body');

    let containerComment = document.createElement('div');
    containerComment.classList.add('wrapper__comment');

    let nameAuthor = document.createElement('h3');
    nameAuthor.classList.add('name__author');

    let comment = document.createElement('p');
    comment.classList.add('comment');

    dataWrapper.append(link);
    dataWrapper.append(title);
    dataWrapper.append(content);
    dataWrapper.append(containerComment);
    containerComment.append(nameAuthor);
    containerComment.append(comment);
  }
  creatElement();

  function parseDataId() {
    let dataObj = localStorage.getItem("object_id");
    let valueId = JSON.parse(dataObj).id;
    let valuePage = JSON.parse(dataObj).page;
    return {
      valueId,
      valuePage,
    }
  }
  parseDataId();

  async function loadDataPosts() {
    let id = parseDataId();
    let valuePageId = id.valuePage;

    let response = await fetch(`https://gorest.co.in/public/v1/posts?page=${valuePageId}`);
    let data = await response.json();
    return data;
  }

  async function loadDataComment() {
    let id = parseDataId();
    let valueId = id.valueId;

    let response = await fetch(`https://gorest.co.in/public/v1/comments?post_id=${valueId}`);
    let data = await response.json();
    return data;
  }

  async function creatCommentElement() {
    let id = parseDataId();
    let valueId = id.valueId;

    let dataPosts = loadDataPosts();
    let dataComment = loadDataComment();
    await dataPosts.then(i => {
      let info = i.data;
      let title = info.find(e => e.id == valueId).title
      let body = info.find(e => e.id == valueId).body
      document.querySelector('.wrapper__title').textContent = title;
      document.querySelector('.wrapper__body').textContent = body;
    });
    await dataComment.then(e => {
      let info = e.data;
      if (info != '') {
        info.forEach(element => {
          let div = document.createElement('div');
          div.classList.add('wrapper__comment');
          let containerComment = document.querySelector('.wrapper__comment');

          let name = 'name: ' + element.name;
          let body = `comment: ${element.body}`;
          let nameAuthor = document.createElement('h3');
          nameAuthor.classList.add('name__author');
          nameAuthor.textContent = name;
          let comment = document.createElement('p');
          comment.classList.add('comment');
          comment.textContent = body;
          containerComment.append(nameAuthor);
          containerComment.append(comment);
        });
      } else {
        let name = document.querySelector('.name__author');
        name.textContent = 'name: Имя Автора Отсутствует';
        let comment = document.querySelector('.comment');
        comment.textContent = 'comment: Комментарий Отсутствует';
      }
    });
  }
  creatCommentElement();

});
