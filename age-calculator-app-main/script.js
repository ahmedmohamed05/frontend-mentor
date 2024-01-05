const daysInput = document.querySelector("#day");
const monthsInput = document.querySelector("#month");
const yearsInput = document.querySelector("#year");
const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector(".submit a");
const daysResult = document.querySelector(".days span");
const monthsResult = document.querySelector(".months span");
const yearsResult = document.querySelector(".years span");

submitBtn.onclick = () => {
  let state = false;
  inputs.forEach((input, i) => {
    let label = input.parentElement;
    let rangeCond = input.value < +input.min || input.value > +input.max;

    // Check if inputs are empty
    if (!input.value) {
      sendError(undefined, label, "This field is required");
    }
    // Check if inputs are out of range
    else if (rangeCond) {
      let msg = "Must ve a valid ";
      if (i == 0) msg += "day";
      else if (i == 1) msg += "month";
      else msg = "Must be in the past";
      sendError(false, label, msg);
    }
    // Check for valid date
    else if (daysInput.value > numDays(yearsInput.value, monthsInput.value)) {
      sendError(false, label, "Must be a vaild date");
    } else {
      sendError(true, label);
      state = true;
    }
  });
  if (state) calcAge();
};

function sendError(clearError = false, el, msg) {
  if (clearError) {
    el.classList.remove("error");
    return;
  }

  el.classList.add("error");
  el.children[2].innerHTML = msg;
}

function numDays(y, m) {
  return new Date(y, m, 0).getDate();
}

function calcAge() {
  let date = new Date();
  date.setMonth(9);
  let currentMonth = date.getMonth() + 1;
  let today = date.getDate();

  let day = +daysInput.value,
    month = +monthsInput.value,
    year = +yearsInput.value;

  let yearsAge = 0,
    monthsAge = 0,
    daysAge = 0;

  // Calculate Years
  if (currentMonth > month || (currentMonth == month && today >= day))
    yearsAge = date.getFullYear() - year;
  else yearsAge = date.getFullYear() - year - 1;

  // Calculate Months
  if (currentMonth > month) {
    monthsAge = currentMonth - month;
    // if (day >= today) monthsAge--;
  } else if (currentMonth == month) {
    monthsAge = 11;
    if (today > day) monthsAge = 0;
  } else {
    monthsAge = 12 - month;
    if (today >= day) monthsAge++;
  }

  // Calcluate Days
  if (today >= day) daysAge = today - day;
  else {
    daysAge = numDays(date.getFullYear(), date.getMonth()) - day + today;
  }

  if (currentMonth == month && today == day) {
    yearsAge = date.getFullYear() - year;
    monthsAge = daysAge = 0;
  }

  showResult(yearsResult, yearsAge);
  showResult(monthsResult, monthsAge);
  showResult(daysResult, daysAge);
}

function showResult(el, value) {
  // let counter = 0;
  // const i = setInterval(() => {
  //   el.innerHTML = counter;
  //   counter++;
  //   if (counter > value) clearInterval(i);
  // }, 60);
  el.innerHTML = value;
}
