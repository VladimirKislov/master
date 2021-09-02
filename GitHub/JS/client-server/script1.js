document.addEventListener('DOMContentLoaded', function () {

  const dataWrapper = document.querySelector('.data__wrapper');

  function creatElement() {
    const divBtn = document.createElement('div');
    divBtn.classList.add('wrapper__btn');

    let btnPrev = document.createElement('button');
    btnPrev.classList.add('btn__prev', 'btn');
    btnPrev.setAttribute('href', 'prev');
    btnPrev.textContent = 'Назад';

    let btnStart = document.createElement('button');
    btnStart.classList.add('btn__start', 'btn');
    btnStart.setAttribute('href', 'start');
    btnStart.textContent = 'В начало';

    let btnNext = document.createElement('button');
    btnNext.classList.add('btn__next', 'btn');
    btnNext.setAttribute('href', 'next');
    btnNext.textContent = 'Вперед';

    const divContent = document.createElement('div');
    divContent.classList.add('wrapper__content');

    const numArticle = document.createElement('p');
    numArticle.classList.add('content__article');

    const numPages = document.createElement('p');
    numPages.classList.add('content__pages');

    const numPage = document.createElement('p');
    numPage.classList.add('content__page');

    dataWrapper.append(divBtn);
    dataWrapper.append(divContent);
    divBtn.append(btnPrev);
    divBtn.append(btnStart);
    divBtn.append(btnNext);
    divContent.append(numArticle);
    divContent.append(numPages);
    divContent.append(numPage);
  }
  creatElement();

  let url = `https://gorest.co.in/public/v1/posts?page=1`;
  let j = localStorage.getItem('data');
  if(j > 0) {
    url = `https://gorest.co.in/public/v1/posts?page=${j}`;
  }

  async function loadDataServer(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  async function entryDataWrapper() {
    let data = loadDataServer(url);
    await data.then(item => {
      let elem = item.data;
      let meta = item.meta.pagination;

      let divContent = document.querySelector('.wrapper__content');
      let numArticle = document.querySelector('.content__article');
      let numPages = document.querySelector('.content__pages');
      let numPage = document.querySelector('.content__page');

      document.querySelector('.btn__prev').setAttribute('href', `${meta.links.previous}`);
      document.querySelector('.btn__start').setAttribute('href', 'https://gorest.co.in/public/v1/posts?page=1');
      document.querySelector('.btn__next').setAttribute('href', `${meta.links.next}`);

      numArticle.textContent = 'количество статей: ' + `${meta.total}`;
      numPages.textContent = 'количество страниц: ' + `${meta.pages}`;
      numPage.textContent = 'страница: ' + `${meta.page}`;

      localStorage.setItem('data', `${meta.page}`);

      elem.forEach(element => {
        let title = document.createElement('a');
        title.classList.add('content__title');
        title.setAttribute('data-id', `${element.id}`);
        title.setAttribute('page-id', `${meta.page}`);
        title.textContent = element.title;
        divContent.append(title);
      });
      return elem;
    });

    document.querySelectorAll('.content__title').forEach(function (el) {
      el.addEventListener('click', function (item) {
        data.then(i => {
          let dataAttribute = item.currentTarget;
          let dataId = dataAttribute.getAttribute('data-id');
          let pageId = dataAttribute.getAttribute('page-id');

          let setData = {
            id: +`${dataId}`,
            page: +`${pageId}`,
          }
          localStorage.setItem("object_id", JSON.stringify(setData));
          location.assign('index2.html');
        })
      })
    })
  }
  entryDataWrapper();

  document.querySelectorAll('.btn').forEach(function (element) {
    element.addEventListener('click', function (item) {
      let target = item.currentTarget;
      url = target.getAttribute('href');
      if (url === 'null') {
        return
      }
      document.querySelectorAll('a').forEach(e => e.remove());
      entryDataWrapper();
    })
  })
});
