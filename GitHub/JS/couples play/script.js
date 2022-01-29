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

  let timeGameOver;

  btnStart.addEventListener('click', shuffle);
  btnStart.addEventListener('click', function () {
    const form = document.querySelector('.form');
    const score = document.querySelector('.score');
    form.classList.add('hidden');
    container.classList.remove('hidden');
    score.classList.remove('hidden');
    timeGameOver = setTimeout(() => {
      let gameOver = confirm('game over???');
      alert(gameOver);
      if (gameOver) {
        location.reload();
      }
    }, 60000);
    openCard();
    timer();
    level();
    animationClickCard();
  })

  let time = 59;
  let timeScoreTimeout;
  function timer() {
    document.querySelector('.score__timer').innerHTML = `timer: ${time}`;
    time--;
    if (time === 0) {
      time = 0;
    } else {
      timeScoreTimeout = setTimeout(timer, 1000);
    }
    for (let i of container.childNodes) {
      if (i.classList.value === "game__over") {
        clearTimeout(timeScoreTimeout);
        clearTimeout(timeGameOver);
      }
    }
    scorePoints();
  }

  function level() {
    let f = checkInputValue();
    if (f == 2 || f == 4) {
      document.querySelector('.score__level').innerHTML = 'level: easy';
    } else if (f == 6 || f == 8) {
      document.querySelector('.score__level').innerHTML = 'level: middle';
    } else if (f == 10) {
      document.querySelector('.score__level').innerHTML = 'level: hard';
    }
  }

  let scoreId = 0;
  function scorePoints() {
    for (let i of container.childNodes) {
      if (i.classList.value === "game__over") {
        if (time >= 40) {
          scoreId += 100;
        } else if (time >= 30) {
          scoreId += 80;
        } else if (time >= 20) {
          scoreId += 60;
        } else if (time >= 10) {
          scoreId += 40;
        } else if (time >= 0) {
          scoreId += 20;
        }
      }
    }
    document.querySelector('.score__points').innerHTML = `score: ${scoreId}`;
  }

  function scorePointsOpenCard() {
    scoreId += 5;
    document.querySelector('.score__points').innerHTML = `score: ${scoreId}`;
  }

  function animationClickCard() {
    let card = document.querySelectorAll('.card');
    card.forEach((item) => {
      item.addEventListener('click', (elem) => {
        elem.target.style.animation = ".4s click-card";
      });
    })
  }

  let newArr = [];
  let stopArr = [];

  function check() {
    let dataCard = document.querySelectorAll('[data-id]');

    if (newArr[0] != newArr[1]) {
      for (let i of dataCard) {
        i.classList.remove('show');
        newArr = [];
        i.removeAttribute('data-id');
      }
    } else {
      for (let s of dataCard) {
        s.classList.add('active');
        s.removeAttribute('data-id');
        stopArr.push(s);
        scorePointsOpenCard();
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
      setTimeout(check, 200);
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
    link.textContent = 'Repeat the Game!';
    container.append(link);

    return link;
  }

  function gameOver() {
    if (stopArr.length == obj.length) {
      createLink();
      returnStart();
    }
  }

  function returnStart() {
    document.querySelector('.game__over').addEventListener('click', function () {
      location.reload();
    })
  }

});
