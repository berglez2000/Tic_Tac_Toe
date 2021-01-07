// Variables
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
const gameOverSection = document.querySelector("#game-over");


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

  const finishGame = (winner) => {
    console.log("Igra je končana");
    // Dodaj vsem class clicked da se ne da več klikati
    boxes.forEach(box => {
      if (!box.classList.contains("clicked")){
        box.classList.add("clicked");
      }
    });

    // Prikaže se popup
    gameOverSection.classList.add("show");
    // Spremeni text v besedilu
    const winText = document.querySelector(".winner-text");
    if (gameOver){
      winText.textContent = `Zmagovalec je ${winner}`;
    } else {
      winText.textContent = `Izenačeno`;
    }
    // Dodaj Event listenerje za ponovno igro ali ne
    const playAgain = document.querySelector(".play-again");
    const returnBtn = document.querySelector(".return");

    playAgain.addEventListener("click", () => {
      gameOverSection.classList.remove("show");
      // Nastavi vse kot je na začetku
      // Vse boolean vrednosti nastavi na default
      rounds = 0;
      gameOver = false;
      xMoves = [];
      oMoves = [];
      boxes.forEach(box => {
        if (box.classList.contains("clicked")){
          box.classList.remove("clicked");
        }
      });
      images.forEach(img => {
        img.classList.remove("clicked");
      });

      // Spremeni rezultete
      playerOneName.textContent = `${playerOne.value}: ${playerOneScore}`;
      playerTwoName.textContent = `${playerTwo.value}: ${playerTwoScore}`;

      imgSrc();
    });

    returnBtn.addEventListener("click", () => {
      const thankPage = document.querySelector(".thank-page");
      thankPage.classList.add("show");
      const startBtn = document.querySelector(".start")
      startBtn.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = "#landing";
        a.click();
        thankPage.classList.remove("show");
      });
    });
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
              playerOneScore++;
              return finishGame(playerOne.value)
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
              playerTwoScore++;
              return finishGame(playerTwo.value);
            }
          }
        }
      }
    }
    if (rounds === 9 && !gameOver){
      return finishGame("0");
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