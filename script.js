const playBtn = document.querySelector(".start-game");
const playerOne = document.querySelector("#player-1");
const playerTwo = document.querySelector("#player-2");
let checked = false;
const images = document.querySelectorAll(".box img");
const boxes = document.querySelectorAll(".box");
const playerOneName = document.querySelector(".player-one-name");
const playerTwoName = document.querySelector(".player-two-name");
let xTurn = true;
let rounds = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let gameOver = false;
const possibleWins = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]]
let xMoves = [];
let oMoves = [];

playerOne.value = "aljaz";
playerTwo.value = "bostjan";

const main = () => {
  const checkInputs = () => {
    if (playerOne.value === null || playerOne.value === "" || playerTwo.value === null || playerTwo.value === ""){
      return alert("Prosim vnesite ime igralca");
    } else {
      checked = true;
    }
  }
  
  const startGame = () => {
    // Scroll to game section
    const a = document.createElement("a");
    a.href = "#game";
    a.click();
    a.style.pointerEvents = "none";
    a.style.display = "none";

    playerOneName.textContent = `${playerOne.value}: ${playerOneScore}`;
    playerTwoName.textContent = `${playerTwo.value}: ${playerTwoScore}`;
  }

  // Doda slikcam src
  const imgSrc = () => {
    images.forEach(img => {
      if (xTurn && !img.classList.contains("clicked")){
        img.src = "img/times.png";
      } else if (!xTurn && !img.classList.contains("clicked")) {
        img.src = "img/circle.png";
      }
    });
  }

  // zamenja runde
  const switchTurns = () => {
    if (xTurn){
      xTurn = false;
    } else {
      xTurn = true;
    }
  }

  const addMoves = (box) => {
    if (xTurn){
      xMoves.push(box.id);
    } else {
      oMoves.push(box.id);
    }
  }

  const FinishGame = () => {
    console.log("Igra je končana");
  }

  const checkResult = () => {
    if (rounds >= 5){
      xMoves = xMoves.sort();
      oMoves = oMoves.sort();
      // For loop da pregleda vsako številko posebej
      // Pregleda za x številke
      for (let i = 0; i < possibleWins.length; i++){
        let same = 0;
        for (let x = 0; x < possibleWins[i].length; x++){
          for (let y = 0; y < xMoves.length; y++){
            if (xMoves[y] === possibleWins[i][x]){
              same++;
            }
            if (same >= 3){
              console.log(`${playerOne.value} wins`);
              gameOver = true;
              break;
            }
          }
        }
      }
      // Pregleda za o številke
      for (let i = 0; i < possibleWins.length; i++){
        let same = 0;
        for (let x = 0; x < possibleWins[i].length; x++){
          for (let y = 0; y < oMoves.length; y++){
            if (oMoves[y] === possibleWins[i][x]){
              same++;
            }
            if (same >= 3){
              console.log(`${playerTwo.value} wins`);
              gameOver = true;
              break;
            }
          }
        }
      }
    }
    if (gameOver && rounds <= 9){
      // napiši funkcijo za game over
      FinishGame();
    } else if (rounds === 9 && !gameOver){
      FinishGame()
    }
  }

  const game = () => {
    boxes.forEach(box => {
      box.addEventListener("click", () => {
        // adds up new round
        rounds++;
        addMoves(box);
        // img variable
        const img = box.children[0];
        // switch turns
        switchTurns();
        // adds classlists
        box.classList.add("clicked");
        img.classList.add("clicked");
        // Change img source
        checkResult();
        imgSrc();
      });
    });
  }
  
  playBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    checkInputs();
    // Start game
    if (checked){
      startGame();
      imgSrc();
      game();
    }
  });
}


window.addEventListener("load", main);