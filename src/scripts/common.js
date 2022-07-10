const ecosystemLink = document.querySelectorAll('.ecosystem__link');
console.log(ecosystemLink);
ecosystemLink.forEach( (el) => {
  el.addEventListener('click', (e) => {
  e.preventDefault();
});
});
