// const max=prompt("enter the max number");

// const random=Math.floor(Math.random()*max)+1;

// let guess=prompt("guess the number");

// while(true){
//     if(guess=="quit"){
//         console.log("user quit");
//         break;
//     }
//     if(guess==random){
//         console.log("yoy are right!!congrats! random number was", random);
//         break;
//     }else if(guess<random){
//         guess=prompt("your guess was small . please try again");
//     }else{
//         guess=prompt("your guess was too large . please try again");
//     }
// }     



let secretNumber, maxAttempts, maxRange, attempts, timer, timeLeft;

const difficultySettings = {
  easy: { range: 50, attempts: 10 },
  medium: { range: 100, attempts: 7 },
  hard: { range: 200, attempts: 5 }
};

function setDifficulty() {
  const level = document.getElementById("difficulty").value;
  maxRange = difficultySettings[level].range;
  maxAttempts = difficultySettings[level].attempts;
  document.getElementById("rangeText").textContent = `Guess a number between 1 and ${maxRange}`;
  document.getElementById("attemptsLeft").textContent = maxAttempts;
  resetGame();
}

function startTimer() {
  timeLeft = 60;
  document.getElementById("timer").textContent = `⏱️ Time Left: ${timeLeft}s`;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏱️ Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("message").textContent = "⏰ Time's up! Game Over!";
      document.getElementById("message").style.color = "red";
      playSound('timeout');
      disableInput();
    }
  }, 1000);
}

function playSound(type) {
  document.getElementById(`sound-${type}`).play();
}

function checkGuess() {
  const guess = Number(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  if (!guess || guess < 1 || guess > maxRange) {
    message.textContent = `⚠️ Enter a number between 1 and ${maxRange}.`;
    message.style.color = "gray";
    return;
  }

  attempts--;
  document.getElementById("attemptsLeft").textContent = attempts;

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}.`;
    message.style.color = "green";
    playSound('correct');
    clearInterval(timer);
    disableInput();
  } else if (guess < secretNumber) {
    message.textContent = "📉 Too low!";
    message.style.color = "blue";
    playSound('wrong');
  } else {
    message.textContent = "📈 Too high!";
    message.style.color = "orange";
    playSound('wrong');
  }

  if (attempts <= 0 && guess !== secretNumber) {
    message.textContent = `❌ No attempts left! The number was ${secretNumber}.`;
    message.style.color = "red";
    playSound('timeout');
    clearInterval(timer);
    disableInput();
  }
}

function disableInput() {
  document.getElementById("guessInput").disabled = true;
}

function enableInput() {
  document.getElementById("guessInput").disabled = false;
}

function playSound(type) {
  document.getElementById(`sound-${type}`).play();

// Correct guess
playSound('correct');

// Wrong guess
playSound('wrong');

// Timeout or game over
playSound('timeout');

}

function resetGame() {
  const level = document.getElementById("difficulty").value;
  maxRange = difficultySettings[level].range;
  maxAttempts = difficultySettings[level].attempts;
  secretNumber = Math.floor(Math.random() * maxRange) + 1;
  attempts = maxAttempts;

  document.getElementById("message").textContent = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("attemptsLeft").textContent = maxAttempts;
  document.getElementById("guessInput").disabled = false;
  startTimer();
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');

  // Save theme preference in localStorage
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
}

// Load saved theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  setDifficulty(); // initialize game
};

