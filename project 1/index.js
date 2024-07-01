const input = document.querySelector('#input');
const searchBtn = document.querySelector('#submit');
const antonymsDiv = document.querySelector('#antonyms-div');
const synonymsDiv = document.querySelector('#synonyms-div');
const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
const wordDiv = document.querySelector('.js-word-div');
const containerDiv = document.querySelector('.js-container-div');


async function getWord() {
  const data = await fetch(baseUrl + input.value);
  const response = await data.json();
  const result = response[0];
  const resultObject = result.meanings[0];

  const definitions = resultObject.definitions;
  function checkForExample() {
    const displayExample = document.querySelector('#example');
    const example = definitions[0].example !== undefined ? definitions[0].example : "";
    if (example !== "") {
      displayExample.textContent = `Example: ${example}`;
    }
  };

  let generatedHtml = "";
  generatedHtml = `<h1 id="word">${result.word.toUpperCase()}</h1>
        <h3 id="parts-of-speech">${resultObject.partOfSpeech}</h3>
        <h4>${result.phonetic}</h4>
        <h2 id="definition-div">${definitions[0].definition}</h2>`;
  wordDiv.innerHTML = generatedHtml;
  checkForExample();

  const phonetics = result.phonetics;
  phonetics.forEach(phone => {
    const myAudio = document.querySelector("#myAudio");
    myAudio.src = phone.audio;
    function playAudio() {
      myAudio.play();
    }
    if (phone.audio !== "") {
      const playBtn = document.querySelector("#playBtn");
      playBtn.src = "images/playbutton.jpg";
      playBtn.addEventListener('click', playAudio);
    }
  });

  function removeDuplicate(arrayValue) {
    const uniqueArray = Array.from(new Set(arrayValue));
    return uniqueArray;
  };
  const synonyms = removeDuplicate(resultObject.synonyms);
  const antonyms = removeDuplicate(resultObject.antonyms);

  function addItem(itemValue) {
    let html = "";
    itemValue.forEach((item) => {
      html += `<p class="para-el js-para-el">${item}</p>`;
      if (itemValue === synonyms) return synonymsDiv.innerHTML = `<h5>Synonyms</h5>${html}`;
      if (itemValue === antonyms) return antonymsDiv.innerHTML = `<h5>Antonyms</h5>${html}`;
    })
  };

  addItem(synonyms);
  addItem(antonyms);
 

};

searchBtn.addEventListener('click', () => {
  const inputValue = input.value

  if (inputValue !== "") return getWord();
  console.log(inputValue)
});

