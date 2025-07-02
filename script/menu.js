document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll("nav ul li");

  navItems.forEach((item) => {
    item.addEventListener("touchstart", function (e) {
      e.preventDefault();
      const subMenu = this.querySelector(".sous");
      if (subMenu) {
        subMenu.style.display =
          subMenu.style.display === "flex" ? "none" : "flex";
      }
    });
  });
});
