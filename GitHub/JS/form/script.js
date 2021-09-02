document.addEventListener('DOMContentLoaded', function () {
  //создаем форму
  function createForm() {
    const container = document.getElementById('container');

    const form = document.createElement('form');
    form.classList.add('form');

    const inputName = document.createElement('input');
    inputName.classList.add('input', 'input__name');
    inputName.placeholder = 'Имя';

    const inputSurName = document.createElement('input');
    inputSurName.classList.add('input', 'input__surname');
    inputSurName.placeholder = 'Фамилия';

    const inputMiddleName = document.createElement('input');
    inputMiddleName.classList.add('input', 'input__middle-name');
    inputMiddleName.placeholder = 'Отчество';

    const inputBirthday = document.createElement('input');
    inputBirthday.classList.add('input', 'input__birthday');
    inputBirthday.setAttribute('type', 'date');

    const inputStartDate = document.createElement('input');
    inputStartDate.classList.add('input', 'input__start-date');
    inputStartDate.placeholder = 'Год начала обучения';

    const inputFaculty = document.createElement('input');
    inputFaculty.classList.add('input', 'input__faculty');
    inputFaculty.placeholder = 'Факультет';

    const inputSubmit = document.createElement('button');
    inputSubmit.classList.add('btn', 'input__submit');
    inputSubmit.textContent = 'Добавить студента';

    const p = document.createElement('p');
    p.classList.add('error');

    // ================== //

    const formSearch = document.createElement('form');
    formSearch.classList.add('form__search');

    const inputFullName = document.createElement('input');
    inputFullName.classList.add('input__search', 'input__full-name');
    inputFullName.placeholder = 'ФИО';

    const inputSearchBirthday = document.createElement('input');
    inputSearchBirthday.classList.add('input__search', 'input__search-birthday');
    inputSearchBirthday.placeholder = 'Дата рождения';
    inputSearchBirthday.setAttribute('type', 'date');

    const inputSearchStartDate = document.createElement('input');
    inputSearchStartDate.classList.add('input__search', 'input__search-start');
    inputSearchStartDate.placeholder = 'Год начала обучения';

    const inputSearchFaculty = document.createElement('input');
    inputSearchFaculty.classList.add('input__search', 'input__search-faculty');
    inputSearchFaculty.placeholder = 'Факультет';

    // ================== //

    const table = document.createElement('table');
    table.classList.add('table');
    const tr = document.createElement('tr');

    const thName = document.createElement('th');
    thName.textContent = 'Имя';
    thName.setAttribute('data-id', 'name');

    const thSurName = document.createElement('th');
    thSurName.textContent = 'Фамилия';
    thSurName.setAttribute('data-id', 'surname');

    const thMiddleName = document.createElement('th');
    thMiddleName.textContent = 'Отчество';
    thMiddleName.setAttribute('data-id', 'middlename');

    const thBirthday = document.createElement('th');
    thBirthday.textContent = 'Дата рождения';
    thBirthday.setAttribute('data-id', 'birthday');

    const thStartDate = document.createElement('th');
    thStartDate.textContent = 'Год начала обучения';
    thStartDate.setAttribute('data-id', 'startdate');

    const thFaculty = document.createElement('th');
    thFaculty.textContent = 'Факультет';
    thFaculty.setAttribute('data-id', 'faculty');

    container.append(form);
    form.append(inputName);
    form.append(inputSurName);
    form.append(inputMiddleName);
    form.append(inputBirthday);
    form.append(inputStartDate);
    form.append(inputFaculty);
    form.append(p);
    form.append(inputSubmit);

    container.append(formSearch);
    formSearch.append(inputFullName);
    formSearch.append(inputSearchBirthday);
    formSearch.append(inputSearchStartDate);
    formSearch.append(inputSearchFaculty);

    container.append(table);
    table.append(tr);
    tr.append(thName);
    tr.append(thSurName);
    tr.append(thMiddleName);
    tr.append(thBirthday);
    tr.append(thStartDate);
    tr.append(thFaculty);
  }
  createForm();

  //создаем массив
  function createArrayDataForm() {
    let arrayDataForm = [];
    let inputName = document.querySelector('.input__name');
    inputName.value.trim();
    let a1 = inputName.value.substr(0, 1);
    let b1 = inputName.value.substr(1, 10);
    inputName = a1.toUpperCase() + b1.toLowerCase();

    let inputSurName = document.querySelector('.input__surname');
    inputSurName.value.trim();
    let a2 = inputSurName.value.substr(0, 1);
    let b2 = inputSurName.value.substr(1, 10);
    inputSurName = a2.toUpperCase() + b2.toLowerCase();

    let inputMiddleName = document.querySelector('.input__middle-name');
    inputMiddleName.value.trim();
    let a3 = inputMiddleName.value.substr(0, 1);
    let b3 = inputMiddleName.value.substr(1, 20);
    inputMiddleName = a3.toUpperCase() + b3.toLowerCase();

    const inputBirthday = document.querySelector('.input__birthday');
    const inputStartDate = document.querySelector('.input__start-date');
    let inputFaculty = document.querySelector('.input__faculty');
    inputFaculty.value.trim();
    let a4 = inputFaculty.value.substr(0, 1);
    let b4 = inputFaculty.value.substr(1, 20);
    inputFaculty = a4.toUpperCase() + b4.toLowerCase();

    let dataForm = {
      'name': inputName,
      'surName': inputSurName,
      'middleName': inputMiddleName,
      'birthday': inputBirthday.value,
      'startDate': inputStartDate.value.trim(),
      'faculty': inputFaculty,
    };

    let dateInput = new Date(document.querySelector('.input__birthday').value);
    let dateMin = new Date('01 01 1900');
    let currentDate = new Date();

    arrayDataForm.push(dataForm);

    if (dataForm.name == "" || dataForm.surName == "" || dataForm.middleName == "" || dataForm.startDate == "" || dataForm.faculty == "") {
      document.querySelector('.error').textContent = "Все поля должны быть заполнены";
      return
    } else if (dateInput < dateMin || dateInput > currentDate) {
      document.querySelector('.error').textContent = "Некорректная дата рождения";
      return
    } else if (inputStartDate.value < 2000 || inputStartDate.value > currentDate || isNaN(inputStartDate.value)) {
      document.querySelector('.error').textContent = "Исправьте год начала обучения не ранее 2000г";
      return
    } else {
      return arrayDataForm;
    }
  }

  //записываем таблицу по нажатию кнопки и очищаем форму
  document.querySelector('.btn').addEventListener('click', element => {
    element.preventDefault();
    addTable();
    document.querySelectorAll('input').forEach(element => {
      element.value = "";
    })
    document.querySelector('.error').textContent = "";
  })

  let array = [];

  //добовляем данные из массива в таблицу
  function addTable() {
    let getArr = createArrayDataForm();

    getArr.forEach(element => {

      let currentDate = new Date();
      currentDate = new Date(currentDate).toISOString().substr(0, 10);
      let currentDate2 = new Date(currentDate).toISOString().substr(0, 4);
      let myDate = element.birthday;
      let myDate2 = new Date(myDate).toISOString().substr(0, 4);
      let age = currentDate2 - myDate2;
      const i = 4;
      let enterDate = new Date(`${Number(element.startDate)}`);
      enterDate = new Date(element.startDate).toISOString().substr(0, 10);
      let firstCourse1 = new Date(2020, 08, 01);
      firstCourse1 = new Date(firstCourse1).toISOString().substr(0, 10);
      let firstCourse2 = new Date(2019, 08, 01);
      firstCourse2 = new Date(firstCourse2).toISOString().substr(0, 10);
      let secondCourse = new Date(2018, 08, 01);
      secondCourse = new Date(secondCourse).toISOString().substr(0, 10);
      let thirdYear = new Date(2017, 08, 01);
      thirdYear = new Date(thirdYear).toISOString().substr(0, 10);
      let fourthYear = new Date(2016, 08, 01);
      fourthYear = new Date(fourthYear).toISOString().substr(0, 10);

      if (currentDate > myDate) {
        age -= 1;
      }

      if (enterDate > currentDate) {
        element.startDate = element.startDate + ' (Еще не выбрал!)'
      } else if (enterDate >= firstCourse2 && enterDate <= currentDate) {
        element.startDate = element.startDate + '-' + `${Number(element.startDate) + Number(i)}` + '(1 курс)';
      } else if (enterDate >= secondCourse && enterDate <= firstCourse2) {
        element.startDate = element.startDate + '-' + `${Number(element.startDate) + Number(i)}` + '(2 курс)';
      } else if (enterDate >= thirdYear && enterDate <= secondCourse) {
        element.startDate = element.startDate + '-' + `${Number(element.startDate) + Number(i)}` + '(3 курс)';
      } else if (enterDate >= fourthYear && enterDate <= thirdYear) {
        element.startDate = element.startDate + '-' + `${Number(element.startDate) + Number(i)}` + '(4 курс)';
      } else if (enterDate <= fourthYear) {
        element.startDate = element.startDate + '-' + `${Number(element.startDate) + Number(i)}` + `(закончил)`;
      }

      array.push(element);

      element.birthday = element.birthday + ` (${age} лет)`;

      const table = document.querySelector('.table');
      let tr = document.createElement('tr');
      tr.classList.add('row');
      const values = Object.values(element);
      values.forEach(value => {
        let td = document.createElement('td');
        td.textContent = value;
        table.append(tr);
        tr.append(td);
      })
    })
  }

  //сортируем массив по нажатию на таблицу
  document.querySelectorAll('th').forEach(element => {
    element.addEventListener('click', function (elem) {
      document.querySelectorAll('.row').forEach(e => e.remove());

      let s = elem.currentTarget;
      let table = document.querySelector('.table');
      if ((s.dataset.id == 'name')) {
        let arraySort = sortName(array);

        for (i = 0; i < arraySort.length; i++) {
          let tr = document.createElement('tr');
          tr.classList.add('row');
          let set = arraySort[i];

          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td);
          })
          table.append(tr);
        }
      } else if ((s.dataset.id == 'surname')) {
        let arraySort = sortSurName(array);

        for (i = 0; i < arraySort.length; i++) {
          let tr = document.createElement('tr');
          tr.classList.add('row');
          let set = arraySort[i];

          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td);
          })
          table.append(tr);
        }
      } else if ((s.dataset.id == 'middlename')) {
        let arraySort = sortmiddleName(array);

        for (i = 0; i < arraySort.length; i++) {
          let tr = document.createElement('tr');
          tr.classList.add('row');
          let set = arraySort[i];

          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td);
          })
          table.append(tr);
        }
      } else if (s.dataset.id == 'birthday') {
        let arraySort = sortBirthday(array);

        for (i = 0; i < arraySort.length; i++) {
          let tr = document.createElement('tr');
          tr.classList.add('row');
          let set = arraySort[i];

          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td);
          })
          table.append(tr);
        }
      } else if (s.dataset.id == 'startdate') {
        let arraySort = sortStartDate(array);

        for (i = 0; i < arraySort.length; i++) {
          let tr = document.createElement('tr');
          tr.classList.add('row');
          let set = arraySort[i];

          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td);
          })
          table.append(tr);
        }
      } else if (s.dataset.id == 'faculty') {
        let arraySort = sortFaculty(array);

        for (i = 0; i < arraySort.length; i++) {
          let tr = document.createElement('tr');
          tr.classList.add('row');
          let set = arraySort[i];

          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td);
          })
          table.append(tr);
        }
      }

    })
  })

  //сортировка по вводу input
  document.querySelectorAll('.input__search').forEach(function (element) {
    element.addEventListener('input', function (el) {
      let target = el.currentTarget;
      this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
      if (target.classList.contains('input__full-name')) {
        emptyInputFullName();
      } else if (target.classList.contains('input__search-faculty')) {
        emptyInputFaculty();
      } else if (target.classList.contains('input__search-birthday')) {
        emptyInputBirthday();
      } else if (target.classList.contains('input__search-start')) {
        emptyInputStartDate();
      }
    });
  })


  function emptyInputFullName() {
    let inputVal = document.querySelector('.input__full-name').value.trim();
    let arraySort = sortName(array);

    if (inputVal != '') {

      let result = arraySort.filter(function (item) {
        if (item.name === inputVal) {
          document.querySelectorAll('.row').forEach(e => e.remove());
          return item.name;
        } else if (item.surName === inputVal) {
          document.querySelectorAll('.row').forEach(e => e.remove());
          return item.surName;
        } else if (item.middleName === inputVal) {
          document.querySelectorAll('.row').forEach(e => e.remove());
          return item.middleName;
        }
      })

      for (let i = 0; i < result.length; i++) {
        let set = result[i];
        const table = document.querySelector('.table');
        let tr = document.createElement('tr');
        tr.classList.add('row');
        const values = Object.values(set);
        values.forEach(value => {
          let td = document.createElement('td');
          td.textContent = value;
          table.append(tr);
          tr.append(td);
        })
      }
    } else {
      document.querySelectorAll('.row').forEach(e => e.remove());
      for (let i = 0; i < arraySort.length; i++) {
        let set = arraySort[i];
        const table = document.querySelector('.table');
        let tr = document.createElement('tr');
        tr.classList.add('row');
        const values = Object.values(set);
        values.forEach(value => {
          let td = document.createElement('td');
          td.textContent = value;
          table.append(tr);
          tr.append(td);
        })
      }
    }
  }

  function emptyInputBirthday() {
    let inputVal = document.querySelector('.input__search-birthday').value.trim();
    let arraySort = sortBirthday(array);

    if (inputVal != '') {
      document.querySelectorAll('.row').forEach(e => e.remove());
      for (let i = 0; i < arraySort.length; i++) {
        let set = arraySort[i];
        let s = set.birthday.substr(0, 10);
        let s2 = inputVal.substr(0, 10);
        if (s === s2) {
          const table = document.querySelector('.table');
          let tr = document.createElement('tr');
          tr.classList.add('row');
          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            table.append(tr);
            tr.append(td);
          })
        }
      }
    } else {
      document.querySelectorAll('.row').forEach(e => e.remove());
      for (let i = 0; i < arraySort.length; i++) {
        let set = arraySort[i];
        const table = document.querySelector('.table');
        let tr = document.createElement('tr');
        tr.classList.add('row');
        const values = Object.values(set);
        values.forEach(value => {
          let td = document.createElement('td');
          td.textContent = value;
          table.append(tr);
          tr.append(td);
        })
      }
    }
  }

  function emptyInputStartDate() {
    let inputVal = document.querySelector('.input__search-start').value.trim();
    let arraySort = sortStartDate(array);

    if (inputVal != '') {
      document.querySelectorAll('.row').forEach(e => e.remove());
      for (let i = 0; i < arraySort.length; i++) {
        let set = arraySort[i];
        let setStart = set.startDate.substr(0, 4);
        if (setStart === inputVal) {
          const table = document.querySelector('.table');
          let tr = document.createElement('tr');
          tr.classList.add('row');
          const values = Object.values(set);
          values.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            table.append(tr);
            tr.append(td);
          })
        }
      }
    } else {
      document.querySelectorAll('.row').forEach(e => e.remove());
      for (let i = 0; i < arraySort.length; i++) {
        let set = arraySort[i];
        const table = document.querySelector('.table');
        let tr = document.createElement('tr');
        tr.classList.add('row');
        const values = Object.values(set);
        values.forEach(value => {
          let td = document.createElement('td');
          td.textContent = value;
          table.append(tr);
          tr.append(td);
        })
      }
    }
  }

  function emptyInputFaculty() {
    let inputVal = document.querySelector('.input__search-faculty').value.trim();
    let arraySort = sortFaculty(array);

    if (inputVal != '') {
      let result = arraySort.filter(function (item) {
        if (item.faculty === inputVal) {
          document.querySelectorAll('.row').forEach(e => e.remove());
          return item.faculty;
        }
      })
      for (let i = 0; i < result.length; i++) {
        let set = result[i];
        const table = document.querySelector('.table');
        let tr = document.createElement('tr');
        tr.classList.add('row');
        const values = Object.values(set);
        values.forEach(value => {
          let td = document.createElement('td');
          td.textContent = value;
          table.append(tr);
          tr.append(td);
        })
      }
    } else {
      document.querySelectorAll('.row').forEach(e => e.remove());
      for (let i = 0; i < arraySort.length; i++) {
        let set = arraySort[i];
        const table = document.querySelector('.table');
        let tr = document.createElement('tr');
        tr.classList.add('row');
        const values = Object.values(set);
        values.forEach(value => {
          let td = document.createElement('td');
          td.textContent = value;
          table.append(tr);
          tr.append(td);
        })
      }
    }
  }

  function sortName(item) {
    const temp = JSON.parse(JSON.stringify(item));
    temp.sort((a, b) => a.name > b.name ? 1 : -1);
    return temp;
  }

  function sortSurName(item) {
    const temp = JSON.parse(JSON.stringify(item));
    temp.sort((a, b) => a.surName > b.surName ? 1 : -1);
    return temp;
  }

  function sortmiddleName(item) {
    const temp = JSON.parse(JSON.stringify(item));
    temp.sort((a, b) => a.middleName > b.middleName ? 1 : -1);
    return temp;
  }

  function sortBirthday(item) {
    const temp = JSON.parse(JSON.stringify(item));
    temp.sort((a, b) => new Date(a.birthday) > new Date(b.birthday) ? 1 : -1);
    return temp;
  }

  function sortStartDate(item) {
    const temp = JSON.parse(JSON.stringify(item));
    temp.sort((a, b) => new Date(a.startDate.substr(0, 5)) > new Date(b.startDate.substr(0, 5)) ? 1 : -1);
    return temp;
  }

  function sortFaculty(item) {
    const temp = JSON.parse(JSON.stringify(item));
    temp.sort((a, b) => a.faculty > b.faculty ? 1 : -1);
    return temp;
  }
})


