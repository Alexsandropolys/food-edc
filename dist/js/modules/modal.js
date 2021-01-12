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
  // open modal form
  const btnsContactUs = document.querySelectorAll('[data-contactUs]');
  const modal = document.querySelector(selector);
  const modalContent = modal.querySelector('modal__content');

  btnsContactUs.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(selector);
    });
  });

  // close modal form

  modal.addEventListener('click', (event) => {
    if (event.target === modal && event.target !== modalContent || event.target.classList.contains('modal__close')) {
      closeModal(selector);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.style.display !== 'none') {
      closeModal(selector);
    }
  });

  // open modal by timeout
  // const modalTimer = setTimeout(openModal, 5000);

  // open modal by scrolldown
  function openModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight
        >= document.documentElement.scrollHeight) {
      openModal(selector);
      window.removeEventListener('scroll', openModalByScroll);
    }
  }
  window.addEventListener('scroll', openModalByScroll);
}

export default modals;
export {
  closeModal,
  openModal,
};
