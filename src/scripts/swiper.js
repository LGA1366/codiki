const swiper = new Swiper('.swiper', {
  slidesPerView: 5,
  spaceBetween: 15,
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
