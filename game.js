var isStarted = false;
var buttonColours = ["green", "red", "yellow", "blue"];
var userSequence = []
var level = 0;


function generateNumber() {
  n = Math.random();
  n = n * 4;
  n = Math.floor(n);
  return n;
}

var gameSequence = []
var userSequence = []

function startGame() {
  if(!isStarted) {
    isStarted = true;
    $("h1").text("Level " + level);
    playGame()
  }
}

function endGame() {
  if(isStarted) {
    userSequence = []
    gameSequence = []
    level = 0;
    isStarted = false;
    var audioFile = new Audio("sounds/wrong.mp3")
    audioFile.play()
    $("body").toggleClass("game-over");
    setTimeout(() => {
      $("body").toggleClass("game-over");
      
    }, 200);
    $("h1").text("Game Over. Press Any Key to Restart");
  }
}

function playsound(name) {
  var audioFile = new Audio("./sounds/" + name + ".mp3");
  audioFile.play();
}

function animateButton(button) {
  var originalColour = button.css("background-color")
  button.css("background-color", "gray");
  setTimeout(() => {
    button.css("background-color", originalColour);    
  }, 100);
  
}

function playGame() {
  level += 1;
  $("h1").text("Level " + level)
  isStarted = false;
  userSequence = []
  gameSequence.push(buttonColours[generateNumber()]);
  console.log("game sequence: " +  gameSequence)
  for (let i = 0; i < gameSequence.length; i++) {
    
    setTimeout(() => {
      playsound(gameSequence[i]);
      animateButton($("#" + gameSequence[i]))
      
    },(i+1) * 600);
  }
  setTimeout(() => {
    isStarted = true;
  }, (gameSequence.length+ 1)*600);

}

function checkResults(gameSequence, userSequence) {
  for (let i = 0; i < userSequence.length; i++) {
    if(gameSequence[i] !== userSequence[i]) {
      console.log("gameSequence[" + i + "] = " + gameSequence[i] + " userSequence[" + i + "] = " + userSequence[i])
      endGame();
    }
  }
  if(gameSequence.length === userSequence.length) {
    userSequence = []
    console.log("sonaki aşama")
    setTimeout(() => {
      playGame()
    }, 500);
    
  }
 
}

for(let i = 0; i < 4; i++) {
  let buttonName = buttonColours[i];
  $("#" + buttonName).on("click", function () {
    if (isStarted) {
      playsound(buttonName);
      animateButton($("#" + buttonName));
      userSequence.push(buttonName)
      checkResults(gameSequence, userSequence)   
    }
  });
}

$("body").ready().on("keypress", startGame)