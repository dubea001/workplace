async function getAnimals() {
  const inputValue = document.querySelector('#searchBox').value;
  const apiKey = 'TqXSQjjYmy8utguzHPQhrczrlr5afSgOO2xnEThP';
  const baseUrl = 'https://api.api-ninjas.com/v1/animals?name=' + inputValue;
  try {
    const data = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'content-type': 'application/json'
      }
    })
    if (!data.ok) throw new Error('Request Failed');
    const response = await data.json();
    function generateRandomNumber() {
      return Math.floor(Math.random() * response.length);
    }

    const questionSection = response[generateRandomNumber()];
    const correctAnswer = questionSection.name;
    const optionsToSelect = [];
    for (let index = 0; index < 3; index++) {
      const randomIndex = Math.floor(Math.random() * response.length);
      const incorrectOption = response[randomIndex].name;
      optionsToSelect.push(incorrectOption);
      response.splice(randomIndex, 1);
    }
    optionsToSelect.push(correctAnswer);
    function shuffleOptions(options) {
      const shuffledArray = [...options];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
    const shuffledArray = shuffleOptions(optionsToSelect);
    function addOptionsAlphabet(word) {
      let alphabet;
      if (word === 0) alphabet = 'A.';
      if (word === 1) alphabet = 'B.';
      if (word === 2) alphabet = 'C.';
      if (word === 3) alphabet = 'D.';
      return alphabet;
    }
    const selectDiv = document.querySelector('#selectDiv');
    const selectElement = document.createElement("select");
    let categoryOption = `<option disabled selected>pick hint category</option>
      <option value="taxonomy">Classification</option>
      <option value="characteristics">Characteristics</option>`; 
      selectElement.innerHTML = categoryOption;
      selectDiv.appendChild(selectElement);
    const SeeHintButton = document.createElement("button");
    SeeHintButton.textContent = 'See Hints';
    selectElement.addEventListener('change', (event) => {
        selectDiv.appendChild(SeeHintButton);
        SeeHintButton.addEventListener('click', displayNextProperty(event.target.value))
    });

    const taxonomyArray = new Array();
    const characteristicsArray = new Array();
    let generatedSection = '';
    shuffledArray.forEach((option, index) => {
      const generatedDiv = `<div>
        <h4>
        ${addOptionsAlphabet(index)}
        <button id="optionButton">
        ${option}
        </button>
        </h4>
        </div>`;
      generatedSection += generatedDiv;
    })
    document.querySelector('#optionsDiv').innerHTML = generatedSection;

    // specie name
    document.querySelector('#header').textContent = questionSection.name;


    let currentIndex = 0;
    function displayNextProperty(buttonValue) { 
      let objectValue;
       if (buttonValue === 'characteristics') {
        objectValue = questionSection.characteristics;
       }
       if (buttonValue === 'taxonomy') {
        objectValue =  questionSection.taxonomy;
       }
      const keys = Object.keys(objectValue);
      const currentProperty = keys[currentIndex];
      const characteristicsDiv = document.querySelector('#characteristicsDiv');
      const taxonomyDiv = document.querySelector('#taxonomyDiv');
      const categoryValue = `${currentProperty}: ${objectValue[currentProperty]}`;
      currentIndex++;
      if (currentIndex >= keys.length) {
        currentIndex = 0;
      }
      if (buttonValue === 'characteristics') {
        characteristicsArray.push(categoryValue);
       characteristicsDiv.innerHTML = characteristicsArray;
      }
      if (buttonValue === 'taxonomy') {
        taxonomyArray.push(categoryValue);
        taxonomyDiv.innerHTML = taxonomyArray;
      } 
      
    } 
  } catch (error) {
    console.error('Error:', error.message);
  }
  document.querySelector('#searchBox').value = '';
}

document.querySelector('#searchBtn').addEventListener('click', getAnimals);