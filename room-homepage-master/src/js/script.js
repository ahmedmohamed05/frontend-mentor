let slideIndex = document.querySelector(".page").dataset.slideIndex;
const navIcon = document.querySelector("header nav .nav-icon");
const navIconImg = navIcon.querySelector("img");
const nexBtn = document.querySelector(".arrows .right");
const prevBtn = document.querySelector(".arrows .left");

function selectEl(selector) {
  return function (newContent) {
    document.querySelector(selector).innerHTML = newContent;
  };
}
let ChangeTopRightTitle = selectEl(".top-right h1");
let ChangeTopRightDesc = selectEl(".top-right .desc");

changeContent(slideIndex);

navIcon.onclick = () => {
  navIcon.classList.toggle("active");
  navIconImg.src = navIcon.classList.contains("active")
    ? `./src/images/icon-close.svg`
    : `./src/images/icon-hamburger.svg`;
};

function changeContent(slideNum) {
  console.log(slideNum);
  switch (+slideNum) {
    case 2:
      ChangeTopRightTitle("We are available all across the globe");
      ChangeTopRightDesc(`With stores all over the world, it's easy for you to find furniture for your home or place of business. 
    Locally, we’re in most major cities throughout the country. Find the branch nearest you using our 
    store locator. Any questions? Don't hesitate to contact us today.`);
      break;
    case 3:
      ChangeTopRightTitle("Manufactured with the best materials");
      ChangeTopRightDesc(`Our modern furniture store provide a high level of quality. Our company has invested in advanced technology 
    to ensure that every product is made as perfect and as consistent as possible. With three decades of 
    experience in this industry, we understand what customers want for their home and office.`);
      break;
    default:
      ChangeTopRightTitle("Discover innovative ways to decorate");
      ChangeTopRightDesc(`We provide unmatched quality, comfort, and style for property owners
    across the country. Our experts combine form and function in
    bringing your vision to life. Create a room in your own style with
    our collection and make your property a reflection of you and what
    you love.`);
  }
}

nexBtn.onclick = () => {
  slideIndex = slideIndex == 3 ? 1 : +slideIndex + 1;
  changeContent(slideIndex);
};
prevBtn.onclick = () => {
  slideIndex = slideIndex == 1 ? 3 : +slideIndex - 1;
  changeContent(slideIndex);
};
