// Globala variabler

const wordList = ["ÄPPLE", "PÄRON", "CITRON", "BIL", "TOFFEL"];     // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet fel gissningar som gjorts
let rightGuesses = 0; // Number: håller antalet rätt gissningar som gjorts

let winns = 0; //håller reda på antalet vinster/förluster med poäng

let msgHolderEl = document.querySelector("#message");     // DOM-nod: Ger meddelande när spelet är över

//eventlisteners for start game button
const clickToStart = document.querySelector("#startGameBtn");
clickToStart.addEventListener("click", startGame);

//eventliseners for letter buttons
const clickLetter = document.querySelectorAll("#letterButtons button");
clickLetter.forEach(button => button.addEventListener("click", () => guessLetter(button.value, selectedWord))); 

// Avaktiverar knapparna så de inte kan användas innan man startar spelet
clickLetter.forEach(button => button.disabled = true); 

//removes HTML
const setEmpty = (element) => element.innerHTML = '';

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
    selectedWord = randomWord();
    console.log(selectedWord);
    activateLetterButtons(clickLetter);
    deleteBlanks();
    createBlanks(selectedWord);
    guesses = 0;
    rightGuesses = 0;
    drawPicture(guesses);
    //showInstructions('none');
    updateCounter(guesses);
    msgHolderEl.innerHTML = 'Lycka till!';
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
//Funktion som tar bort de gamla tomrutorna (om de finns)
function deleteBlanks(){
    const currentBlanks = document.querySelectorAll(".letterBoxesUl");
 
    if (currentBlanks != ''){
        currentBlanks.forEach(setEmpty);
    }
}
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetter(letter, word) {
    let guessedRight = false;
    const getBlanks = document.querySelectorAll(".letterBoxesUl li");
    for (let i = 0; i < word.length; i++) {
        
        if (letter == word.charAt(i)) {
            getBlanks[i].innerHTML = '<input type="text" value="' + letter + '" />'; 
            guessedRight = true;
            rightGuesses++;
        }
    }
    if (guessedRight == false) {
        guesses++;
        console.log("du har svarat fel: " + guesses + " gånger.");
        msgHolderEl.innerHTML = 'Du har ' + (6 - guesses) + ' gissningar kvar.';
        drawPicture(guesses);
        updateCounter(guesses);

    } 
    disableUsedButton(clickLetter, letter);
    winOrLose(guesses, rightGuesses, word);
}
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
function winOrLose(guesses, rightGuesses, word){
    if(guesses >= 6){
        msgHolderEl.innerHTML = 'LOSER, du förlorade. Men du ger väl inte upp ännu? Försök igen, tryck STARTA SPELET';
        clickLetter.forEach(button => button.disabled = true);
        showInstructions('inline');
        winns--;  
    }else if(rightGuesses >= word.length) {
        msgHolderEl.innerHTML = 'WINNER WINNER CHICKEN DINNER, försök igen, du hade säkert bara tur. Tryck STARTA SPELET';
        clickLetter.forEach(button => button.disabled = true);
        showInstructions('inline'); 
        winns++;  
    }
    updatePoints(winns);
}
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function disableUsedButton (clickLetter, letter){
    
    clickLetter.forEach(button => {if(button.value === letter) button.disabled = true});
}

//Funktion som ritar ut gubben som hängs, funk. visar inget om inget fel är registrerat

function drawPicture(guesses){
    const drawingSpace = document.querySelector("#hangman");
    
    switch (guesses){
        case 1: 
            drawingSpace.src = "images/h1.png";
            drawingSpace.style.display ='flex';
            return;
        case 2: 
            drawingSpace.src = "images/h2.png";
            return;
        case 3: 
            drawingSpace.src = "images/h3.png";
            return;
        case 4: 
            drawingSpace.src = "images/h4.png";
            return;
        case 5: 
            drawingSpace.src = "images/h5.png";
            return;
        case 6: 
            drawingSpace.src = "images/h6.png";
            return;
        default:
            //drawingSpace.style.display ='none';
            drawingSpace.src = "images/h0.png";
            return;
    }
}

//Funktion som gömmer instruktionerna när spelet startar, för bättre överblick
function showInstructions(yesNo){
    const instructions = document.querySelector('.hideLater');
    instructions.style.display = yesNo;
}
//Funktion som uppdaterar antalet gissningar kvar
function updateCounter (guesses){
    const questionCounter = document.querySelector(".counter");
    questionCounter.innerHTML = 6 - guesses;
}
//Funktion som uppdaterar antalet poäng hittils
function updatePoints(winns){
    const pointDisplay = document.querySelector('#points');
    pointDisplay.innerHTML = 'Poäng: ' + winns;
}