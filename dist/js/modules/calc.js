'use strict';

function calc() {
    // Calc

    const result = document.getElementById('result');
    let sex, weight, height, age, level, sexIndex;

    if (localStorage.getItem('sex') === 'male') {
        document.querySelector('#female').classList.remove('calculating__choose-item_active');
        document.querySelector('#male').classList.add('calculating__choose-item_active');
    }

    switch (localStorage.getItem('level')) {
        case '1.2':
            document.querySelectorAll('.calculating__choose_big div').forEach(item => {
                item.classList.remove('calculating__choose-item_active');
            });
            document.querySelector('#low').classList.add('calculating__choose-item_active');
            break;

        case '1.375':
            document.querySelectorAll('.calculating__choose_big div').forEach(item => {
                item.classList.remove('calculating__choose-item_active');
            });
            document.querySelector('#small').classList.add('calculating__choose-item_active');
            break;

        case '1.55':
            document.querySelectorAll('.calculating__choose_big div').forEach(item => {
                item.classList.remove('calculating__choose-item_active');
            });
            document.querySelector('#medium').classList.add('calculating__choose-item_active');
            break;

        case '1.725':
            document.querySelectorAll('.calculating__choose_big div').forEach(item => {
                item.classList.remove('calculating__choose-item_active');
            });
            document.querySelector('#high').classList.add('calculating__choose-item_active');
            break;
    }

    function getCalcData() {
        const choosenElements = document.querySelectorAll('.calculating__choose-item_active');
        level = choosenElements[1].dataset.level;
        if (choosenElements[0].id === 'female') {
            sex = 'female';
        } else {
            sex = 'male';
        }
        sexIndex = choosenElements[0].dataset.sexIndex;
        height = document.querySelector('#height').value;
        weight = document.querySelector('#weight').value;
        age = document.querySelector('#age').value;

    }

    function getTotal() {
        getCalcData();
        let calcResult = 0;
        if (sex && weight && height && age && level && sexIndex) {
            if (sex === 'female') {
                calcResult = +sexIndex + (9.2 * weight) + (3.1 * height) - (4.3 * age);
                result.textContent = (calcResult * level).toFixed(0);
            } else {
                calcResult = +sexIndex + (13.4 * weight) + (4.8 * height) - (5.7 * age);
                result.textContent = (calcResult * level).toFixed(0);
            }
        } else {
            result.textContent = '_____';
            return;
        }
    }

    let calcGenderItems = [...document.querySelector('#gender').getElementsByTagName('div')];
    const calcLevelItems = [...document.querySelector('.calculating__choose_big').getElementsByTagName('div')];
    const calcFieldsItems = [...document.querySelector('.calculating__choose_medium')
        .getElementsByTagName('input')
    ];

    calcFieldsItems.forEach(item => {
        item.addEventListener('change', event => {
            if (item.value.match(/\D/g)) {
                item.style.border = '1px solid red';
            } else {
                item.style.border = 'none';
            }
            getTotal();
        });
    });

    calcGenderItems.forEach(item => {
        item.addEventListener('click', event => {
            calcGenderItems.forEach(item => {
                item.classList.remove('calculating__choose-item_active');
            });
            event.target.classList.add('calculating__choose-item_active');
            getTotal();
            const choosenElements = document.querySelectorAll('.calculating__choose-item_active');
            localStorage.setItem('sex', choosenElements[0].id);
        });
    });

    calcLevelItems.forEach(item => {
        item.addEventListener('click', event => {
            calcLevelItems.forEach(item => {
                item.classList.remove('calculating__choose-item_active');
            });
            event.target.classList.add('calculating__choose-item_active');
            getTotal();
            const choosenElements = document.querySelectorAll('.calculating__choose-item_active');
            localStorage.setItem('level', choosenElements[1].dataset.level);
        });
    });
}

export default calc;