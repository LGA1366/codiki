const signBtn = document.querySelector('.sign-up__btn'),
      modalWrapper = document.querySelector('.modal-wrapper'),
      closeBtn = document.querySelector('.close-btn');

signBtn.addEventListener('click', () => {
  modalWrapper.classList.add('show-modal');
  document.body.classList.add('modal-active');
});

closeBtn.addEventListener('click', () => {
  modalWrapper.classList.remove('show-modal');
  document.body.classList.remove('modal-active');
});
