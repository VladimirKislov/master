document.addEventListener('DOMContentLoaded', function () {

    let email = document.querySelector('.garage__email');
    let name = document.querySelector('.garage__name');
    let owner = document.querySelector('.garage__owner');

    let infoTitle = document.querySelector('.info__title');
    let description = document.querySelector('.info__description');
    let make = document.querySelector('.make');
    let model = document.querySelector('.model');
    let carTitle = document.querySelector('.car-options__title');
    let code = document.querySelector('.code');

    let fuelType = document.querySelector('.fuel-type');
    let gearBox = document.querySelector('.gear-box');
    let trimLevel = document.querySelector('.trimLevel');

    const modal = document.querySelector('.modal');
    const close = document.querySelector('.close');

    function loadData() {
        fetch('http://109.236.74.74:9900/getdata')
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    email.textContent = `Email: ${data.Garage.Email}`;
                    name.textContent = `Имя: ${data.Garage.Name}`;
                    owner.textContent = `Владелец: ${data.Garage.Owner}`;

                    infoTitle.textContent = `${data.Item.Title}`;
                    description.textContent = `${data.Item.Description}`;
                    make.textContent = `Марка: ${data.Item.Original.Make}`;
                    model.textContent = `Модель: ${data.Item.Original.Model}`;
                    carTitle.textContent = `Название машины: ${data.Item.Original.CarOptions.Title}`;
                    code.textContent = `Код: ${data.Item.Original.CarOptions.Code}`;

                    fuelType.textContent = `Тип топлива: ${data.Item.KeyValues.FuelType}`;
                    gearBox.textContent = `Коробка передач: ${data.Item.KeyValues.GearBox}`;
                    trimLevel.textContent = `Отделка: ${data.Item.KeyValues.TrimLevel}`;
                })
            });
    }
    loadData();

    document.querySelector('.btn__edit').addEventListener('click', function () {
        document.querySelector('.modal').classList.add('show');
    })

    document.querySelector('.modal').addEventListener('click', function (element) {
        if (element.target == modal || element.target == close) {
            document.querySelector('.modal').classList.remove('show');
        }
    })

    document.querySelector('.btn__save').addEventListener('click', function() {
        changeGarage();
        document.querySelectorAll('input').forEach(function(e) {
            e.value = '';
        })
    })

    function changeGarage() {
        const inputEmail = document.querySelector('.input__email');
        const inputName = document.querySelector('.input__name');
        const inputOwner = document.querySelector('.input__owner');

        email.textContent = `Email: ${inputEmail.value}`;
        name.textContent = `Имя: ${inputName.value}`;
        owner.textContent = `Владелец: ${inputOwner.value}`;
    }
})