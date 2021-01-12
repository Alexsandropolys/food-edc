'use strict';

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

export default slider;