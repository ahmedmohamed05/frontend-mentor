const daysInput = document.querySelector("#day");
const monthsInput = document.querySelector("#month");
const yearsInput = document.querySelector("#year");
const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector(".submit a");
const daysResult = document.querySelector(".days span");
const monthsResult = document.querySelector(".months span");
const yearsResult = document.querySelector(".years span");

// Get Days In Given Month
const numDays = (y, m) => new Date(y, m, 0).getDate();
// Display Age Results
const showResult = (el, value) => (el.innerHTML = value);

submitBtn.onclick = (e) => {
  inputs.forEach((input, i) => {
    let label = input.parentElement;
    let rangeCond = input.value < +input.min || input.value > +input.max;

    // Check if inputs are empty
    if (!input.value) {
      sendError(undefined, label, "This field is required");
      e.preventDefault();
    }
    // Check if inputs are out of range
    else if (rangeCond) {
      let msg = "Must ve a valid ";
      if (i == 0) msg += "day";
      else if (i == 1) msg += "month";
      else msg = "Must be in the past";
      sendError(false, label, msg);
      e.preventDefault();
    }
    // Check for valid date
    else if (daysInput.value > numDays(yearsInput.value, monthsInput.value)) {
      sendError(false, label, "Must be a vaild date");
      e.preventDefault();
    } else {
      sendError(true, label);
    }
  });
  let daysLabelClass = daysInput.parentElement.classList.contains("error");
  let monthsLabelClass = monthsInput.parentElement.classList.contains("error");
  let yearsLabelClass = yearsInput.parentElement.classList.contains("error");
  let errorLabelClass = daysLabelClass || monthsLabelClass || yearsLabelClass;
  if (!errorLabelClass) calcAge();
};

function sendError(clearError = false, el, msg) {
  if (clearError) {
    el.classList.remove("error");
    return;
  }

  el.classList.add("error");
  el.children[2].innerHTML = msg;
}

function calcAge() {
  let date = new Date();
  let currentMonth = date.getMonth() + 1;
  let today = date.getDate();

  let day = +daysInput.value;
  let month = +monthsInput.value;
  let year = +yearsInput.value;

  let yearsAge, monthsAge, daysAge;

  // Calculate Years
  if (currentMonth > month || (currentMonth == month && today >= day))
    yearsAge = date.getFullYear() - year;
  else yearsAge = date.getFullYear() - year - 1;

  // Calculate Months
  if (currentMonth > month) {
    monthsAge = currentMonth - month;
  } else if (currentMonth == month) {
    monthsAge = 11;
    if (today >= day) monthsAge = 0;
  } else {
    monthsAge = 12 - month;
    if (today >= day) monthsAge++;
  }

  // Calcluate Days
  if (today >= day) daysAge = today - day;
  else {
    daysAge = numDays(date.getFullYear(), date.getMonth()) - day + today;
  }

  showResult(yearsResult, yearsAge);
  showResult(monthsResult, monthsAge);
  showResult(daysResult, daysAge);
}
