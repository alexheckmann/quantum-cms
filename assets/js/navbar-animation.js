const menuSlide = () => {
  const burger = document.querySelector('.qntm-nav-burger');
  const menu = document.querySelector('.qntm-menu-wrapper');
  let menuToggled = false;

  burger.addEventListener('click', () => {
    menuToggled = !menuToggled;

    // menu animation
    menu.classList.toggle('menu-active');

    // burger animation
    burger.classList.toggle('navbar-burger-toggle');
  });
};

menuSlide();
