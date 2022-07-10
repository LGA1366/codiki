const burgerBtn = document.querySelector('.js-header-burger'),
      headerNavList = document.querySelector('.header__navigation');
burgerBtn.addEventListener('click', () => {
  Event.preventDefault;
  document.body.classList.toggle('show-burger');
  headerNavList.classList.toggle('container');
  document.querySelectorAll('.nav__item').forEach(function(el){
    el.addEventListener('click', function(){
      document.body.classList.remove('show-burger');
    });
  });
});
