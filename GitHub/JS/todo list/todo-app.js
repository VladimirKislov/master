(function () {
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  };

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    input.addEventListener('input', function () {
      if (input.value === '') {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });

    buttonWrapper.append(button);
    button.disabled = true;
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  };

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  };

  // Создаем дело
  function createTodoItem(name) {

    let item = document.createElement('li');
    // создаем кнопки, чтобы поместить в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а так же для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    }
  };

  let arrayTodoList = [];

  let objTodo = [
    { name: 'Начать обучение', done: true, },
    { name: 'Защитить диплом', done: false, },
    { name: 'Трудоустроится', done: false, },
  ];

  function createTodoApp(container, title = 'Список дел', obj = objTodo) {

    if (localStorage.getItem(title) != undefined) {
      arrayTodoList = JSON.parse(localStorage.getItem(title));
    }

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let addInput = document.querySelector('.form-control');
    let addButton = document.querySelector('.btn');

    addButton.addEventListener('click', function () {
      let newTodo = {
        name: addInput.value,
        done: false,
      };
      arrayTodoList.push(newTodo);

      localStorage.setItem(title, JSON.stringify(arrayTodoList));
    });

    arrayTodoList = localStorage.getItem(title) ? JSON.parse(localStorage.getItem(title)) : obj;

    for (let i of arrayTodoList) {
      let todoItem = createTodoItem(i.name);
      todoList.append(todoItem.item);

      let todoItemDone = i.done;

      if (todoItemDone == true) {
        todoItem.item.classList.add('list-group-item-success');
      }

      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
        let item = arrayTodoList.find(items => items.name == i.name);
        item.done = !item.done;
        localStorage.setItem(title, JSON.stringify(arrayTodoList));
      });

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();

          let newArray = arrayTodoList.filter(
            items => items.name != i.name);
          localStorage.setItem(title, JSON.stringify(newArray));
        }
      });
    }

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function (e) {
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      // e.preventDefault();
      let todoItem = createTodoItem(todoItemForm.input.value);

      // создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);
      // обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;

    });
  };

  window.createTodoApp = createTodoApp;
})();

