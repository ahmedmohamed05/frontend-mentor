const themeToggleBtn = document.querySelector(".toggle-container");
const toggleThemeCircle = document.querySelector(".toggle-container .circle");
const root = document.documentElement;
let currentTheme = 1;
let expression = "0";

themeToggleBtn.addEventListener("click", changeTheme);

function changeTheme() {
  if (currentTheme == 3) {
    currentTheme = 1;
  } else {
    currentTheme++;
  }
  root.dataset.theme = currentTheme;
  toggleThemeCircle.dataset.theme = currentTheme;
}

const btns = document.querySelectorAll(".keys button");

btns.forEach((btn) => {
  btn.addEventListener("click", handleBtn);
});

function handleBtn(e) {
  const valuePressed = e.target.innerText;

  // DEL Button
  if (valuePressed == "DEL") {
    if (expression) {
      expression = expression.substring(0, expression.length - 1);
    }

    // Check if the expression is empty
    if (!expression) expression = "0";
  }

  // + - / * buttons
  else if (isOperation(valuePressed)) {
    // check if the expression already ends with an operation
    if (endsWithOperation(expression)) return;

    // Can't add operation after '.'
    if (expression[expression.length - 1] == ".") return;

    // Replace the 'x' with '*' for the evalation
    if (valuePressed == "x") {
      expression += "*";
    } else {
      expression += valuePressed;
    }
  }

  // Dot (.) button
  else if (valuePressed == ".") {
    // Adds 0.x if possible
    if (endsWithOperation(expression)) {
      expression += "0.";
    }
    // adding '.' only if there is a number before
    else {
      expression += ".";
    }
  }

  // RESET button
  else if (valuePressed == "RESET") {
    expression = "0";
  } else if (valuePressed == "=") {
    // Expression can't ends with an operation
    if (endsWithOperation(expression)) {
      return;
    }
    // Store the evalation to re-use it
    expression = eval(expression);
  }

  // Numbers buttons
  else {
    if (expression == "0") expression = "";

    // any thing else means a number pressed
    expression += valuePressed;
  }

  updateScreen(expression);
}

function updateScreen(newText) {
  document.querySelector(".calc-screen .result").innerText = newText;
}

function isOperation(value) {
  return value == "+" || value == "-" || value == "/" || value == "x";
}

function endsWithOperation(exp) {
  return isOperation(exp[exp.length - 1]);
}
