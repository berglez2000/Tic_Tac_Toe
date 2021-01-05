const squares = document.querySelectorAll(".square");
const times = document.querySelectorAll(".fas.fa-times");
const circles = document.querySelectorAll(".far.fa-circle");
let timesRound = true;

const main = (e) => {
  e.preventDefault();

  // add classnames
  const addClassNames = () => {
    if (timesRound){
      times.forEach(time => {
        time.classList.add("show");
        time.classList.remove("hide");
      });

      circles.forEach(circle => {
        circle.classList.add("hide");
        circle.classList.remove("show");
      });
    } else {
      times.forEach(time => {
        time.classList.add("hide");
        time.classList.remove("show");
      });

      circles.forEach(circle => {
        circle.classList.add("show");
        circle.classList.remove("hide");
      });
    }
  }

  addClassNames();


}



window.addEventListener("load", main);