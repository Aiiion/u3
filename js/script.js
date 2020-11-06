// Globala variabler

const wordList = ["ÄPPLE", "PÄRON", "CITRON", "BIL", "TOFFEL"];     // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

//eventlisteners for start game button
const clickToStart = document.querySelector("#startGameBtn");
clickToStart.addEventListener("click", startGame);

//eventliseners for letter buttons
const clickLetter = document.querySelectorAll("#letterButtons button");
for (let i = 0; i < clickLetter.length; i++) {
    const button = clickLetter[i];
    button.addEventListener("click", () => guessLetter(button.value, selectedWord));
} //  clickLetter.forEach(button => button.addEventListener("click", () => guessLetter(button.value, selectedWord)))); 

clickLetter.forEach(button => button.disabled = true); // Avaktiverar knapparna så de inte kan användas innan man startar spelet

//removes HTML
const setEmpty = (element) => element.innerHTML = '';

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
    selectedWord = randomWord();
    console.log(selectedWord);
    activateLetterButtons(clickLetter);
    deleteBlanks();
    createBlanks(selectedWord);
}
// Funktion som slumpar fram ett ord
function randomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}
// Funktion som aktiverar knapparna så att man kan gissa ordet
function activateLetterButtons(clickLetter) {
    clickLetter.forEach(button => button.disabled = false);
}
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createBlanks(word) {
    const blank = document.querySelector(".letterBoxesUl");
    for (let i = 0; i < word.length; i++) {
        
        blank.innerHTML += `<li><input type="text" value="_" /></li>`;

    }
}
function deleteBlanks(){
    const currentBlanks = document.querySelectorAll(".letterBoxesUl");
 
    if (currentBlanks != ''){
        // currentBlanks.removeChild(main.children);
        currentBlanks.forEach(setEmpty);
    }
}
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetter(letter, word) {
    let guessedRight = false;
    const getBlanks = document.querySelectorAll(".letterBoxesUl li");
    for (let i = 0; i < word.length; i++) {
        console.log(getBlanks[i]);
        console.log(word.charAt(i));
        if (letter == word.charAt(i)) {
            getBlanks[i].innerHTML = '<input type="text" value="' + letter + '" />'; //funkar inte riktigt, placerar bokstäver fel och skriver över ibland? 
            // getBlanks[i].value = letter; //funkar inte 
            console.log(getBlanks[i]);
            guessedRight = true;
        }

    }
    if (guessedRight == false) {
        guesses++;
        console.log("du har svarat fel: " + guesses + " gånger.");

    }
    disableUsedButton(clickLetter, letter);
}
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function disableUsedButton (clickLetter, letter){
    clickLetter.forEach(button => {if(button.value == letter) button.disable});
}




