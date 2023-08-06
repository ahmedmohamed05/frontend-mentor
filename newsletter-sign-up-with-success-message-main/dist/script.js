const mainWrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const label = form.querySelector("label");
const emailInput = label.querySelector("#email");
const subscribBtn = form.querySelector("button");

const successMsgWrapper = document.querySelector(".success-msg");
const dismissBtn = successMsgWrapper.querySelector("button");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

form.onsubmit = (e) => e.preventDefault();

subscribBtn.onclick = (e) => {
  if (!emailRegex.test(emailInput.value)) {
    label.classList.add("invalid");
    return;
  }

  label.classList.remove("invalid");

  toggleSuccessMsg("show");
};

emailInput.addEventListener("input", (e) => {
  if (!emailRegex.test(emailInput.value)) label.classList.add("invalid");
  else label.classList.remove("invalid");
});

function toggleSuccessMsg(state) {
  if (state == "show") {
    mainWrapper.style.display = "none";
    successMsgWrapper.classList.remove("hidden");
  } else {
    mainWrapper.style.display = "flex";
    successMsgWrapper.classList.add("hidden");
  }
}

dismissBtn.onclick = () => toggleSuccessMsg("hide");
