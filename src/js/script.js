const words = [
  "car",
  "university",
  "banana",
  "computer",
  "doors",
  "orange",
  "temperature",
  "paper",
  "science",
  "driver",
  "phone",
  "pizza",
  "hangman",
];

const lettersContainer = document.querySelector(".container__letters");
const guessWordContainer = document.querySelector(".container__guessing-word");
const resultContainer = document.querySelector(".container__result-text");
const resetButton = document.querySelector(".container__reset-button");
const canvas = document.querySelector(".container__hangman");
const ctx = canvas.getContext("2d");

let passwordArray, currPasswordArray, win, end, score;

let init = function () {
  passwordArray = randomWordToArray(words);
  currPasswordArray = fillInitialPassword(passwordArray);
  win = false;
  end = false;
  score = 6;
  resultContainer.textContent = "";
  gallows();
};

const displayLetters = function () {
  lettersContainer.innerHTML = "";
  for (let i = 90; i >= 65; i--) {
    const letter = String.fromCharCode(i);
    const html = `<button class="container__letter-button">${letter}</button>`;
    lettersContainer.insertAdjacentHTML("afterbegin", html);
  }
};

const randomWordToArray = function (arr) {
  const randomWordIndex = Math.floor(Math.random() * arr.length);
  return arr[randomWordIndex].toUpperCase().split("");
};

const fillInitialPassword = function (arr) {
  let currPassword = [];
  for (let i = 0; i < arr.length; i++) currPassword.push("_");
  return currPassword;
};

const displayWord = function (array) {
  guessWordContainer.textContent = "";
  for (let singleLetter of array) {
    const html = `<div class="container__single-letter">${singleLetter}</div>`;
    guessWordContainer.insertAdjacentHTML("beforeend", html);
  }
};
const displayResult = function (winFlag) {
  return (resultContainer.innerHTML =
    winFlag == true
      ? `Congratulations you won!`
      : `Unfortunately, this time you lost!`);
};
const checkScore = function (score) {
  switch (score) {
    case 5:
      head();
      break;
    case 4:
      torso();
      break;
    case 3:
      leftHand();
      break;
    case 2:
      rightHand();
      break;
    case 1:
      leftLeg();
      break;
    case 0:
      rightLeg();
      break;
  }
};

init();
displayLetters();
displayWord(currPasswordArray);

const letterButtons = document.querySelectorAll(".container__letter-button");
letterButtons.forEach((val) =>
  val.addEventListener("click", function () {
    score--;
    val.setAttribute("disabled", "");

    for (let i = 0; i < passwordArray.length; i++) {
      if (passwordArray[i] === val.textContent) {
        currPasswordArray[i] = val.textContent;
        score++;
      }
    }
    checkScore(score);
    displayWord(currPasswordArray);
    if (passwordArray.join("") === currPasswordArray.join("")) {
      win = true;
      end = true;
    }
    if (score === 0) {
      end = true;
      win = false;
    }
    if (end) {
      letterButtons.forEach((val) => val.setAttribute("disabled", ""));
      displayResult(win);
    }
  })
);

resetButton.addEventListener("click", function () {
  init();
  displayWord(currPasswordArray);
  letterButtons.forEach((val) => val.removeAttribute("disabled"));
});
function gallows() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 250);
  ctx.lineTo(100, 250);
  ctx.lineTo(55, 250);
  ctx.lineTo(55, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(150, 80);
  ctx.stroke();
}

function head() {
  ctx.beginPath();
  ctx.arc(150, 105, 25, 0, Math.PI * 2, true);
  ctx.stroke();
}
function torso() {
  ctx.beginPath();
  ctx.moveTo(150, 130);
  ctx.lineTo(150, 200);
  ctx.stroke();
}
function leftHand() {
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(120, 180);
  ctx.stroke();
}

function rightHand() {
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(180, 180);
  ctx.stroke();
}

function rightLeg() {
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.lineTo(120, 230);
  ctx.stroke();
}
function leftLeg() {
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.lineTo(180, 230);
  ctx.stroke();
}
