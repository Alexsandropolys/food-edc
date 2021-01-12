'use strict';
import {closeModal, openModal} from './modal';
import postData from '../services/postData';
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
            postData('http://localhost:3000/requests', json)
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
        openModal(selector);

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
            closeModal(selector);
        }, 4000);
    }
}

export default post;