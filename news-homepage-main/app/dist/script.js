const navIcon = document.querySelector(".nav-icon");
navIcon.onclick = () => {
  navIcon.classList.toggle("open");
  navIcon.querySelector("img").src = navIcon.classList.contains("open")
    ? "./dist/images/icon-menu-close.svg"
    : "./dist/images/icon-menu.svg";
};

// change intor image
let md = window.matchMedia("(min-width: 768px)");
const introImg = document.querySelector(".intro .intro-img img");
changeIntroImg(md.matches);
md.onchange = (e) => changeIntroImg(e.currentTarget.matches);
function changeIntroImg(mediaState) {
  if (mediaState) introImg.src = "./dist/images/image-web-3-desktop.jpg";
  else introImg.src = "./dist/images/image-web-3-mobile.jpg";
}
