// Globala variabler

const wordList = ["äpple", "päron", "citron", "bil", "toffel"];     // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame (){
    selectedWord = randomWord();
    console.log(selectedWord);

    createBlanks(selectedWord);
}
// Funktion som slumpar fram ett ord
function randomWord (){
    return wordList[Math.floor(Math.random() * wordList.length)];
}
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createBlanks(word){
    for (let i = 0; i < word.length; i++) {
        const blank = document.querySelector(".letterBoxesUl");
        blank.innerHTML += `<li><input type="text" disabled value="_" /></li>`;
        
    }
}
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetter(letter){
    console.log(letter);
}
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på


//eventlisteners for start game button
const clickToStart = document.querySelector("#startGameBtn");
clickToStart.addEventListener("click", startGame);

//eventliseners for letter buttons
const clickLetter = document.querySelectorAll("#letterButtons button");  
for (let i = 0; i < clickLetter.length; i++) {
    const element = clickLetter[i];
    element.addEventListener("click", () => guessLetter(element.value));   
}
// clickLetter.foreach(element => element.addEventListener("click", () => guessLetter(element.value))));                   


