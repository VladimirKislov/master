document.addEventListener('DOMContentLoaded', function () {

  function addForm() {
    let input = document.createElement('input');
    let h2 = document.createElement('h2');
    input.classList.add('text-input');
    h2.classList.add('title');
    document.body.append(input);
    document.body.append(h2);
  }
  addForm();

  let textInput = document.querySelector('.text-input');
  let textTitle = document.querySelector('.title');

  textInput.addEventListener('input', write);

  function write() {
    setTimeout(function() {
      textTitle.textContent = textInput.value;
    }, 3000);
  }

});
