document.addEventListener('DOMContentLoaded', function () {

  let btnStart = document.querySelector('.btn__start');
  let container = document.querySelector('.container');
  let obj = [];

  function checkInputValue() {
    let input = document.querySelector('.input');
    let s;
    if (input.value == '' || input.value < 2 || input.value > 10 || input.value == 3 || input.value == 5 || input.value == 7 || input.value == 9) {
      input.value = 4;
      s = '4';
    } else {
      input.value;
      s = input.value;
    }

    return s;
  }

  function addDataArray(n) {
    let s = [];
    for (let i = 1; i < n; i++) {
      s.push(i);
      obj = s.concat(s);
    }
    return obj;
  }

  function filterArray() {
    let f = checkInputValue();

    if (f == 2) {
      addDataArray(5);
    } else if (f == 4) {
      addDataArray(9);
    } else if (f == 6) {
      addDataArray(13);
    } else if (f == 8) {
      addDataArray(17);
    } else if (f == 10) {
      addDataArray(21);
    }
    return obj;
  }

  function shuffle() {
    let arr = filterArray();

    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }

    for (let i = 0; i < obj.length; i++) {
      container.append(createDiv(i));
    }

    function createDiv() {
      let div = document.createElement('div');
      div.classList.add('card');
      return div;
    }

    document.querySelectorAll('.card').forEach(function (element, i) {
      element.innerHTML = obj[i];
    })

    return arr;
  }

  btnStart.addEventListener('click', shuffle);
  btnStart.addEventListener('click', function () {
    const form = document.querySelector('.form');
    form.classList.add('hidden');
    openCard();
  })

  let newArr = [];
  let stopArr = [];

  function check() {
    let dataCard = document.querySelectorAll('[data-id]');

    if (newArr[0] != newArr[1]) {
      console.log('Не угадал, :(');
      for (let i of dataCard) {
        i.classList.remove('show');
        newArr = [];
        i.removeAttribute('data-id');
      }
    } else {
      console.log('Повезло, :)');

      for (let s of dataCard) {
        s.classList.add('active');
        s.removeAttribute('data-id');
        stopArr.push(s);
      }
      newArr = [];
      openCard();
      gameOver();
    }
  }

  let compareLength = function (e) {
    let tar = e.currentTarget;

    const item = 1;
    tar.classList.add('show');

    newArr.push(tar.textContent);
    for (let a = 0; a < newArr.length; a++) {
      tar.dataset.id = item + a;
    }

    if (newArr.length == 2) {
        console.log('открыто две карты');
        setTimeout(check, 500);
    }

  }

  function openCard() {
    let card = document.querySelectorAll('.card');
    card.forEach(function (element) {
      element.addEventListener('click', compareLength);
    })
  }
  openCard();


  function createLink() {
    let link = document.createElement('a');
    link.classList.add('game__over');
    link.textContent = 'Сыграть еще раз!';
    container.append(link);

    return link;
  }

  function gameOver() {
    if (stopArr.length == obj.length) {
      console.log('конец игры');
      createLink();
      returnStart();
    }
  }

  function returnStart() {
    document.querySelector('.game__over').addEventListener('click', function () {
      location.reload();
    })
  }
  setTimeout(() => {
    let gameOver = confirm('game over???');
    alert(gameOver);
    if (gameOver) {
      location.reload();
    }
  }, 60000);

});
