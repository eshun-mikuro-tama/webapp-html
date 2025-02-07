let timer;
let remainingTime;
let adCounter = 0;
let catchCount = 0; // ディスクキャッチカウント

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const timeSelect = document.getElementById('time-select');
const timerDisplay = document.getElementById('timer-display');
const adContainer = document.getElementById('ad-container');
const catchBtn = document.getElementById('catch-btn'); // キャッチボタン
const catchDisplay = document.getElementById('catch-display'); // キャッチ回数表示

// 音声ファイル
const readySound = new Audio('ready.mp3');
const goSound = new Audio('go.mp3');
const countdownSound = new Audio('countdown.mp3');

startBtn.addEventListener('click', () => {
  const selectedTime = parseInt(timeSelect.value);
  remainingTime = selectedTime;
  catchCount = 0; // カウントリセット
  updateCatchCount(); // 表示更新

  // レディ・ゴーの音声再生
  readySound.play();
  setTimeout(() => {
    goSound.play();
    startTimer();
    catchBtn.style.display = 'inline-block'; // キャッチボタンを表示
  }, 2000);

  startBtn.style.display = 'none';
  stopBtn.style.display = 'inline-block';
});

stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  startBtn.style.display = 'inline-block';
  stopBtn.style.display = 'none';
  catchBtn.style.display = 'none'; // キャッチボタンを隠す
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  timerDisplay.textContent = formatTime(parseInt(timeSelect.value));
  startBtn.style.display = 'inline-block';
  stopBtn.style.display = 'none';
  catchBtn.style.display = 'none'; // キャッチボタンを隠す
  catchCount = 0; // キャッチ回数リセット
  updateCatchCount(); // 表示更新
});

function startTimer() {
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      adCounter++;
      if (adCounter % 3 === 0) showAd();
      catchBtn.style.display = 'none'; // タイマー終了時にキャッチボタンを隠す
      return;
    }

    if (remainingTime <= 10) {
      countdownSound.play();
    }

    remainingTime--;
    timerDisplay.textContent = formatTime(remainingTime);
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function showAd() {
  adContainer.style.display = 'block';
  setTimeout(() => {
    adContainer.style.display = 'none';
  }, 5000);
}

// キャッチカウントを増やす
catchBtn.addEventListener('click', () => {
  catchCount++;
  updateCatchCount();
});

// キャッチカウントを画面に反映
function updateCatchCount() {
  catchDisplay.textContent = catchCount;
}