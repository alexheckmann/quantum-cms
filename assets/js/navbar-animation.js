const menuSlide = () => {
  const burger = document.querySelector(".nav-burger");
  const menu = document.querySelector(".menu-wrapper");
  // const backgroundShadow = window.getComputedStyle(document.querySelector(".body-wrapper"), "after");
  let menuToggled = false;

  burger.addEventListener("click", () => {
    if (!menuToggled) {
      menuToggled = true;
    } else {
      menuToggled = false;
    }

    // menu animation
    menu.classList.toggle("menu-active");

    // burger animation
    burger.classList.toggle("navbar-burger-toggle");
  });
}

menuSlide();
