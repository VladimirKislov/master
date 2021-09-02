document.addEventListener('DOMContentLoaded', function () {

  let btn = document.querySelector('.btn');
  let counter = document.querySelector('.counter');

  btn.addEventListener('click', function () {

    let text = document.querySelector('.time').value;
    counter.textContent = text;

    let timerId = setInterval(function () {

      counter.textContent = counter.textContent - 1;
      if (counter.textContent <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    document.querySelector('.btn').addEventListener('click', () => {
      clearInterval(timerId);
    })
  });
});
