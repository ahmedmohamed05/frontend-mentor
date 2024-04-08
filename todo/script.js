const root = document.documentElement;
const themeBtn = document.querySelector(".theme-icon button");
const themeIcon = themeBtn.querySelector("img");
const addTodoBtn = document.querySelector(".input button");
const input = document.querySelector(".input input");
const todosUl = document.querySelector("ul");
const clearCompletedBtn = document.querySelector(".info .clear-completed");
const filterBtns = document.querySelectorAll(".filter button");
const [all, active, completed] = filterBtns;
let todosArr = [];
let draggingEl;

// Get todos array from local storage
if (localStorage.getItem("todos-arr")) {
  todosArr = JSON.parse(localStorage.getItem("todos-arr"));
  mapping();
}

// Get Theme From Locale Storage
if (localStorage.getItem("theme"))
  changTheme(localStorage.getItem("theme"), localStorage.getItem("icon"));

// Change Theme On Click
themeBtn.onclick = () => {
  if (root.dataset.theme == "dark") return changTheme("light", "moon");
  changTheme("dark", "sun");
};

// Vaildate and add new todo
document.forms[0].onsubmit = (e) => e.preventDefault();
addTodoBtn.onclick = () => {
  // Check if input is empty
  if (!input.value) return sendNotification("Can't Add An Empty Todo");

  // Check if todo already exist
  if (todosArr.filter((item) => item.value == input.value).length == 1)
    return sendNotification("This Todo Already Exist");

  createTodo(input.value);
  input.value = "";
  input.focus;
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  all.classList.add("active");
};

clearCompletedBtn.onclick = clearCompleted;

filterBtns.forEach((btn, i) => {
  btn.onclick = () => {
    filterBtns.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    if (btn.innerHTML == "All") mapping();
    if (btn.innerHTML == "Active")
      mapping(todosArr.filter((item) => !item.status));
    if (btn.innerHTML == "Completed")
      mapping(todosArr.filter((item) => item.status));
  };
});

function createTodo(value) {
  let todoObj = {
    value,
    status: false,
    id: Date.now(),
  };
  todosArr.push(todoObj);
  updateLocalArr();
  mapping();
}

function mapping(arr = todosArr) {
  updateItemsLeft();
  todosUl.innerHTML = "";
  arr.forEach((item) => {
    let todoEl = `
    <li
      class="todo ${item.status ? "check" : ""}"
      data-id=${item.id}
      draggable="true"
      ondragstart = "dragStart(this)"
      ondragover = "dragOver(this)"
    >
        <button class="circle check-icon" onclick="check(this)"></button>
      <p class="text">
        <span>${item.value}</span>
      </p>
      <button class="delete-icon" tabindex="0" onclick="deleteTodo(this)">
        <img
          src="./images/icon-cross.svg"
          alt="Cross Icon For Deleting This Task"
        />
      </button>
    </li>
    `;
    todosUl.innerHTML += todoEl;
  });

  let todos = Array.from(todosUl.children);
  todos.forEach((todo) => {
    // On touch start
    todo.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];

      offsetX = touch.clientX - todo.getBoundingClientRect().left;
      offsetY = touch.clientY - todo.getBoundingClientRect().top;

      todo.style.opacity = 0.2;
    });

    // On Touch end
    todo.addEventListener("touchend", (e) => {
      todo.style.opacity = 1;

      // Get the element that curruntly dragging
      const curruntlyDraggingIndex = todosArr.indexOf(
        todosArr.find((item) => item.id == todo.dataset.id)
      );

      // Get the last touch event's coordinates
      const touch = e.changedTouches[e.changedTouches.length - 1];
      const x = touch.clientX;
      const y = touch.clientY;

      // Get the element under the touch event's coordinates
      let droppedOverEl = document.elementFromPoint(x, y);

      // makeing sure getting the li element
      while (droppedOverEl && droppedOverEl.tagName !== "LI") {
        droppedOverEl = droppedOverEl.parentNode;
      }

      // get the last element the touch was over it
      const droppedOverIndex = todosArr.indexOf(
        todosArr.find((item) => item.id == droppedOverEl.dataset.id)
      );

      // Swap The Elements
      [todosArr[curruntlyDraggingIndex], todosArr[droppedOverIndex]] = [
        todosArr[droppedOverIndex],
        todosArr[curruntlyDraggingIndex],
      ];

      mapping();
      updateLocalArr();
    });
  });
}

function dragStart(e) {
  let elIndex = todosArr.indexOf(
    todosArr.find((item) => item.id == e.dataset.id)
  );
  e.dataset.curruntlyDragging = true;
  draggingEl = todosArr[elIndex];
}

function dragOver(e) {
  let elIndex = todosArr.indexOf(
    todosArr.find((item) => item.id == e.dataset.id)
  );
  let draggingElIndex = todosArr.indexOf(draggingEl);

  if (!e.dataset.curruntlyDragging) {
    [todosArr[draggingElIndex], todosArr[elIndex]] = [
      todosArr[elIndex],
      todosArr[draggingElIndex],
    ];

    updateLocalArr();
    mapping();
  }
}

function check(e) {
  let li = e.parentElement;
  let todoObj = todosArr.find((item) => item.id == li.dataset.id);
  // Change Todo object status
  todosArr[todosArr.indexOf(todoObj)].status = !todoObj.status;

  updateLocalArr();
  mapping();
}

function deleteTodo(e) {
  let li = e.parentElement;

  todosArr = todosArr.filter((item) => item.id != li.dataset.id);
  updateLocalArr();
  mapping();
}

function updateLocalArr() {
  localStorage.setItem("todos-arr", JSON.stringify(todosArr));
}

function sendNotification(msg) {
  const notificationEl = document.querySelector(".notification");
  const notificationP = notificationEl.querySelector("p");

  notificationP.innerHTML = msg;

  notificationEl.classList.add("active");

  setTimeout(() => {
    notificationEl.classList.remove("active");
  }, 5300);
}

function updateItemsLeft() {
  document.querySelector(".info .items-left").innerHTML =
    todosArr.filter((item) => !item.status).length + " items left";
}

function clearCompleted() {
  todosArr = todosArr.filter((item) => !item.status);
  updateLocalArr();
  mapping();
}

function changTheme(theme, icon) {
  root.dataset.theme = theme;
  themeIcon.src = `./images/icon-${icon}.svg`;
  localStorage.setItem("theme", theme);
  localStorage.setItem("icon", icon);
}
