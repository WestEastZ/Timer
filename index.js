const inputTime = document.querySelectorAll("input");
const HRS = document.querySelector(".HRS");
const MIN = document.querySelector(".MIN");
const SEC = document.querySelector(".SEC");
const btnStart = document.querySelector(".btn-start");
const btnPause = document.querySelector(".btn-pause");
const btnReset = document.querySelector(".btn-reset");

// Button 변환
function showBtn(btn) {
  btn.style.display = "inline-block";
}

function hideBtn(btn) {
  btn.style.display = "none";
}

// timer 시작
function startTimer(totalTime) {
  const interval = setInterval(() => {
    totalTime--;
    updateTimer(totalTime);
    if (totalTime <= 0) {
      clearInterval(interval);
      HRS.value = "00";
      MIN.value = "00";
      SEC.value = "00";
      showBtn(btnStart);
      hideBtn(btnPause);
    }
  }, 1000);

  // Pause 버튼
  btnPause.addEventListener("click", () => {
    showBtn(btnStart);
    hideBtn(btnPause);
    clearInterval(interval);
  });

  // Reset 버튼
  btnReset.addEventListener("click", () => {
    HRS.value = "00";
    MIN.value = "00";
    SEC.value = "00";

    btnStart.classList.add("disable");
    btnPause.classList.add("disable");
    btnReset.classList.add("disable");

    showBtn(btnStart);
    hideBtn(btnPause);
    clearInterval(interval);
  });
}

// timer 시간 표시
function updateTimer(totalTime) {
  const hours = Math.floor(totalTime / 60 / 60);
  const minutes = Math.floor((totalTime / 60) % 60);
  const seconds = Math.floor(totalTime % 60);

  console.log("seconds", seconds);

  HRS.value = hours;
  MIN.value = minutes;
  SEC.value = seconds;

  HRS.value = HRS.value.padStart(2, "0");
  MIN.value = MIN.value.padStart(2, "0");
  SEC.value = SEC.value.padStart(2, "0");
}

// Start 버튼
btnStart.addEventListener("click", () => {
  const hours = parseInt(HRS.value);
  const minutes = parseInt(MIN.value);
  const seconds = parseInt(SEC.value);

  btnStart.classList.remove("disable");
  btnPause.classList.remove("disable");
  btnReset.classList.remove("disable");

  const totalTime = hours * 60 * 60 + minutes * 60 + seconds;
  if (totalTime === 0) {
    alert("시간을 입력하세요");
  } else {
    showBtn(btnPause);
    hideBtn(btnStart);
    startTimer(totalTime);
  }
});
