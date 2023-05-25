let categories = document.querySelectorAll(".categories li");
let dataContainer = document.querySelector(".data-container");

let currentActiveClass = "weekly";

categories.forEach((item) => {
  item.addEventListener("click", () => {
    categories.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    currentActiveClass = item.innerHTML.toLocaleLowerCase();
    getData();
  });
});

function showData(arr) {
  dataContainer.innerHTML = "";

  for (let obj of arr) {
    let item = `
    <div class="item ${obj.title.toLowerCase()} col-12 col-md-6 col-lg-4">
      <div class="top" style="background-color: ${obj.color};">
        <img src="./images/icon-${obj.title.toLowerCase()}.svg" alt="Work Icon" draggable="false" />
      </div>
        <div class="content">
        <p class="title">${obj.title}</p>
        <svg class="ellipsis" width="21" height="5" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
        </svg>
        <p class="time">${obj.timeframes[currentActiveClass].current}hrs</p>
        <span class="date">last week - ${
          obj.timeframes[currentActiveClass].previous
        }hsr</span>
      </div>
    </div>
  `;
    dataContainer.innerHTML += item;
  }
}

function getData() {
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => showData(data));
}

getData();
