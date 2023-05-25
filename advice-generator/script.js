let diceBtn = document.querySelector(".dice-btn");

let api = `https://api.adviceslip.com/advice`;

diceBtn.addEventListener("click", () => getAdvice());

async function getAdvice() {
  try {
    let respons = await fetch(api);
    let data = await respons.json();
    let adviceObj = data.slip;
    changeContent(adviceObj);
  } catch {
    console.error(Error);
  }
}

function changeContent(obj) {
  let idSpan = document.querySelector(".advice-id span");
  let adviceP = document.querySelector(".advice .advice-text");

  idSpan.innerHTML = obj.id;
  adviceP.innerHTML = `"${obj.advice}"`;
}

getAdvice();
