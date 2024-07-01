const userPickDisplay = document.querySelector('.user-pick');
const computerPickDisplay = document.querySelector('.computer-pick');
const rockBtn = document.querySelector('#rock')
const paperBtn = document.querySelector('#paper')
const scissorsBtn = document.querySelector('#scissors')

const resultDisplay = document.querySelector('#result')

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  let computerChoice;
  switch (randomNumber) {
    case 1:
      computerChoice = 'rock';
      break;
    case 2:
      computerChoice = 'paper';
      break;
    case 3:
      computerChoice = 'scissors';
      break;
    default:
      break;
  }
  return computerChoice;
}

const playGame = (userChoice) => {
  const computerMove = getComputerChoice();
  let result;
  switch (userChoice) {
    case 'rock':
      switch (computerMove) {
        case 'paper':
          result = 'you lose';
        break;
        case 'scissors':
          result = 'you win';
        break;
        case 'rock':
          result = 'tie';
        break;
        default:
        break;
      };
    break;
    case 'paper':
      switch (computerMove) {
        case 'scissors':
          result = 'you lose';
        break;
        case 'rock':
          result = 'you win';
        break;
        case 'paper':
          result = 'tie';
        break;
        default:
        break;
      };
    break;
    case 'scissors':
      switch (computerMove) {
        case 'rock':
          result = 'you lose';
        break;
        case 'paper':
          result = 'you win';
        break;
        case 'scissors':
          result = 'tie';
        break;
        default:
        break;
      };
    break;
    default:
    break;
    
  }

  

  resultDisplay.innerHTML = `<h1>${result}</h1>`

  userPickDisplay.innerHTML = `<h1>player picked ${userChoice}</h1>`
  computerPickDisplay.innerHTML = `<h1>computer picked ${computerMove}</h1>`
  return result
}

rockBtn.addEventListener('click', () => {
  playGame('rock')
})
paperBtn.addEventListener('click', () => {
  playGame('paper')
})
scissorsBtn.addEventListener('click', () => {
  playGame('scissors')
})