const userPickDisplay = document.querySelector('.user-pick');
const computerPickDisplay = document.querySelector('.computer-pick');

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  let computerChoice;
  switch (randomNumber) {
    case 1:
      computerChoice = 'Rock';
      break;
    case 2:
      computerChoice = 'Paper';
      break;
    case 3:
      computerChoice = 'Scissors';
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
}