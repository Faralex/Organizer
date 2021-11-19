let btnStart = document.querySelector(".start");
let btnPause = document.querySelector(".pause");
let btnResume = document.querySelector(".clear");
let timer = document.querySelector(".demo");
let progressBar = document.querySelectorAll(".progress-bar");
let progressBarr = document.querySelector(".progress-bar2");
let reset = document.querySelector(".reset");
let total = document.querySelector(".total");
let breakBtn = document.querySelector(".break");
let audio = new Audio("audio/kedamShyGirl.mp3");
let audioBreak = new Audio("audio/logicEveryday.mp3");

let timerStart;
let timerBreak;
let isPaused = false;
let onBreak = false;
let num = 0;
let numBreak = 0;
let duration = 2700;
let chillNum = 900;
let counts = localStorage.getItem("countsValue") || 0;

function timerCalc(value) {
  let minutes = Math.floor(value / 60);
  let seconds = Math.floor(value % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timer.textContent = minutes + ":" + seconds;
}

total.textContent = `Total:${counts}`;

breakBtn.addEventListener("click", () => {
  breakBtn.classList.add("activeBreak");
  timer.classList.add("activeBreak");
  onBreak = true;
  timerCalc(chillNum);
  if (numBreak == 0) {
    startBreak();
    timerBreak();
    setInterval(function () {
      timerBreak();
    }, 1000);
  } else {
    --chillNum;
    chillNum = 900;
  }
});

btnStart.addEventListener(
  "click",
  function () {
    btnStart.classList.add("active");
    breakBtn.classList.remove("activeBreak");
    btnStart.disabled = true;
    btnPause.disabled = false;
    stopBreak();
    audioBreak.pause();
    audioBreak.currentTime = 0;
    breakBtn.disabled = false;
    if (num == 0) {
      runProgress();
      startTimer();
      timerStart();
      setInterval(function () {
        timerStart();
      }, 1000);
    } else {
      isPaused = false;
      duration = 2700;
      timerCalc(duration);
      runProgress();
      --duration;
    }
  },
  false
);

btnPause.addEventListener("click", (e) => {
  e.preventDefault();
  if (isPaused == false) {
    isPaused = true;
    btnPause.textContent = "Resume";
    progressBar[num].style.animationPlayState = "paused";
  } else {
    isPaused = false;
    btnPause.textContent = "Pause";
    progressBar[num].style.animationPlayState = "running";
  }
});

reset.addEventListener("click", () => {
  localStorage.setItem("countsValue", 0);
  localStorage.clear();
  total.textContent = "Total:0";
});

function startTimer() {
  timerStart = function () {
    if (!isPaused) {
      timerCalc(duration);
      --duration;
    }
    if (duration < 0) {
      duration = 0;
      stopTimer();
    }
  };
}

function startBreak() {
  timerBreak = function () {
    if (onBreak) {
      timerCalc(chillNum);
      --chillNum;
      breakBtn.disabled = true;
    }
    if (chillNum < 0) {
      chillNum = 0;
      stopBreak();
      numBreak++;
      breakBtn.disabled = false;
    }
  };
}

function runProgress() {
  progressBar[num].style.animation = `progress-animation ${duration}s forwards`;
  progressBar[num].style.animationTimingFunction = "linear";
}

function stopBreak() {
  clearInterval(timerBreak);
  onBreak = false;
  breakBtn.classList.remove("activeBreak");
  timer.classList.remove("activeBreak");
  audioBreak.play();
  audioBreak.volume = 0.03;
}

function stopTimer() {
  btnStart.disabled = false;
  clearInterval(timerStart);
  btnStart.classList.remove("active");
  isPaused = true;
  num++;
  counts++;
  total.textContent = `Total:${counts}`;
  localStorage.setItem("countsValue", counts);
  btnPause.disabled = true;
  audio.play();
  audio.volume = 0.04;
}
