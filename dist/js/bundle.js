/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/js/modules/calc.js":
/*!*********************************!*\
  !*** ./dist/js/modules/calc.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./dist/js/modules/menu.js":
/*!*********************************!*\
  !*** ./dist/js/modules/menu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function menu() {
    class MenuItem {
        constructor(name, price, content, img, alt, parentElement, ...classes) {
            this.name = name;
            this.price = price;
            this.content = content;
            this.img = img;
            this.alt = alt;
            this.parentElement = parentElement;
            this.classes = classes;
        }

        getShown() {
            const element = document.createElement('div');

            element.innerHTML = `
            <div class="menu__item">
            <img src="${this.img}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">Меню ${this.name}</h3>
            <div class="menu__item-descr">${this.content}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> $/день</div>
            </div>
            </div>
            `;
            this.parentElement.append(element);
            const elementInnerDiv = element.children[0];
            this.classes.forEach(c => {
                elementInnerDiv.classList.add(c);
            });
        }
    }

    const menuHoleder = document.querySelector('[data-menuHolder]');


    axios.get('http://localhost:3000/menu')
        .then(res => {
            res.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuItem(title, price, descr, img, altimg, menuHoleder).getShown();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./dist/js/modules/modal.js":
/*!**********************************!*\
  !*** ./dist/js/modules/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });

function closeModal(selector) {
    const modal = document.querySelector(selector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function openModal(selector) {
    const modal = document.querySelector(selector);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    //        clearInterval(modalTimer);
}


function modals(selector) {
    //open modal form
    const btnsContactUs = document.querySelectorAll('[data-contactUs]'),
        modal = document.querySelector(selector),
        modalContent = modal.querySelector('modal__content');

    
    btnsContactUs.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(selector);
        });
    });

    //close modal form

    modal.addEventListener('click', (event) => {
        if (event.target == modal && event.target != modalContent || event.target.classList.contains('modal__close')) {
            closeModal(selector);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modal.style.display != 'none') {
            closeModal(selector);
        }
    });

    //open modal by timeout
    // const modalTimer = setTimeout(openModal, 5000);

    //open modal by scrolldown
    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(selector);
            window.removeEventListener('scroll', openModalByScroll);
        }
    }
    window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);


/***/ }),

/***/ "./dist/js/modules/post.js":
/*!*********************************!*\
  !*** ./dist/js/modules/post.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./dist/js/modules/modal.js");
/* harmony import */ var _services_postData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/postData */ "./dist/js/services/postData.js");



function post(selector) {
    //post data
    const modal = document.querySelector(selector);
    
    const forms = document.querySelectorAll('form'),
        messege = {
            loading: 'img/form/spinner.svg',
            success: 'Thank you, we contact you',
            failure: 'Something goes wrong'
        };


    const statusMessege = [document.createElement('img'), document.createElement('img')];
    forms.forEach((form, index) => {

        statusMessege[index].src = messege.loading;
        statusMessege[index].classList.add('spinner');
        statusMessege[index].classList.add('hide');
        form.insertAdjacentElement('afterend', statusMessege[index]);
        bindFormData(form, index);

    });

    function bindFormData(form, index) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            statusMessege[index].classList.add('show');
            statusMessege[index].classList.remove('hide');

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            (0,_services_postData__WEBPACK_IMPORTED_MODULE_1__.default)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(messege.success);
                    statusMessege[index].classList.add('hide');
                    statusMessege[index].classList.remove('show');
                })
                .catch(() => {
                    showThanksModal(messege.failure);
                    statusMessege[index].classList.add('hide');
                    statusMessege[index].classList.remove('show');
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(messege) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(selector);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${messege}</div>
            </div>
            `;

        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(selector);
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (post);

/***/ }),

/***/ "./dist/js/modules/slider.js":
/*!***********************************!*\
  !*** ./dist/js/modules/slider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function slider() {
    //slider

    class Slide {
        constructor(img, alt, parentElement, ...classes) {
            this.img = img;
            this.alt = alt;
            this.parentElement = parentElement;
            this.classes = classes;
        }

        getShown() {
            const div = document.createElement('div');
            this.classes.forEach(c => {
                div.classList.add(c);
            });
            div.innerHTML = `
                    <div class="offer__slide fade">
                        <img src="${this.img}" alt="${this.alt}">
                    </div>
                `;
            this.parentElement.innerHTML = div.innerHTML;
        }
    }
    const slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slider = document.querySelector('.offer__slider'),
        current = document.getElementById('current'),
        total = document.getElementById('total'),
        next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width;
    const slids = [
        new Slide('img/slider/pepper.jpg', 'pepper', slideWrapper),
        new Slide('img/slider/food-12.jpg', 'food', slideWrapper),
        new Slide('img/slider/olive-oil.jpg', 'oil', slideWrapper),
        new Slide('img/slider/paprika.jpg', 'paprika', slideWrapper)
    ];
    let slideIndex = 1;
    let offset = 0;
    let dots = [];
    const ol = document.createElement('ol');
    ol.classList.add('carousel-indicators');
    slider.append(ol);

    for (let i = 0; i < slides.length; i++) {
        dots[i] = document.createElement('li');
        dots[i].setAttribute('data-slide-to', i + 1);
        dots[i].classList.add('dot');
        dots[i].style.opacity = (i == 0) ? 1 : 0.5;
        ol.append(dots[i]);
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slideWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const trimWidth = (str) => {
        return +(str.replace(/\D/g, ''));
    };

    next.addEventListener('click', () => {
        if (offset == trimWidth(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += trimWidth(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = trimWidth(width) * (slides.length - 1);
        } else {
            offset -= trimWidth(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            offset = trimWidth(width) * (index);
            slidesField.style.transform = `translateX(-${offset}px)`;
            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[index].style.opacity = 1;
            slideIndex = index + 1;
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./dist/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./dist/js/modules/tabs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(i => {
            i.classList.add('hide');
            i.classList.remove('show');
        });
        tabs.forEach(i => {
            i.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (tab == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });

        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./dist/js/modules/timer.js":
/*!**********************************!*\
  !*** ./dist/js/modules/timer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function timer() {
    const deadline = '2021-06-06',
        days = document.getElementById('days'),
        hours = document.getElementById('hours'),
        minutes = document.getElementById('minutes'),
        seconds = document.getElementById('seconds');


    function getZero(num) {
        if (num >= 0 && num < 10) {
            return ('0' + num);
        } else {
            return (num);
        }
    }

    function reloadTimer() {
        const dateContent = refreshDate(deadline);
        days.innerHTML = getZero(dateContent.days);
        hours.innerHTML = getZero(dateContent.hours);
        minutes.innerHTML = getZero(dateContent.minutes);
        seconds.innerHTML = getZero(dateContent.seconds);
    }
    reloadTimer();
    let timer = setInterval(() => {
        reloadTimer();
        timer = setInterval(reloadTimer, 1000);
    }, 1000);

    function refreshDate(deadline) {
        const currentDate = new Date();
        const t = Date.parse(deadline) - Date.parse(currentDate);
        if (t <= 0) {
            clearInterval(timer);
        }
        const dateContent = {
            days: (Math.floor(t / 1000 / 60 / 60 / 24)),
            hours: (Math.floor(t / 1000 / 60 / 60 % 24)),
            minutes: Math.floor(t / 1000 / 60 % 60),
            seconds: Math.floor(t / 1000 % 60),
            total: t
        };
        return dateContent;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./dist/js/script.js":
/*!***************************!*\
  !*** ./dist/js/script.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./dist/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./dist/js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./dist/js/modules/slider.js");
/* harmony import */ var _modules_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/post */ "./dist/js/modules/post.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./dist/js/modules/modal.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/menu */ "./dist/js/modules/menu.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./dist/js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_post__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)('[data-modal]');
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
});

/***/ }),

/***/ "./dist/js/services/postData.js":
/*!**************************************!*\
  !*** ./dist/js/services/postData.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./dist/js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map