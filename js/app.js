import { launchGame, validateInput} from "./views.js"
import { getWord } from "./words.js"


const startButton = document.getElementById("start")
const guessButton = document.getElementById("guess")
const letterContainer = document.querySelector('.letter-container')

const state = {
    lives: null,
    word: null,
    guessedWord: null
}

startButton.addEventListener("click", ((e) => {
    launchGame()
    init()
}))

guessButton.addEventListener("click", ((e) => {
    processAnswer()
    updateHTML()
}))

/**
 * Process the input from the user and check if game is over
 */
function processAnswer() {
    const guessInput = document.getElementById("guessInput").value
    validateInput(guessInput)

    // Switch to check if input is a character or a string
    switch (guessInput.length) {
        case 0:
            // empty string 💩
            console.log("💩 Write something, dumb user 💩")
            break;
        case 1:
            // Guessing a letter
            const guessInputResponse = guessLetter(state.word, state.guessedWord, guessInput)
            if (!guessInputResponse.isCorrectLetter) {
                console.log("WRONG LETTER")
                state.lives = state.lives - 1
                break;
            }
            state.guessedWord = guessInputResponse.guessedWord
            break;
        default:
            // Guessing a word
            if (guessInput !== state.word) {
                console.log("Wrong word noob")
                state.lives = state.lives - 1
            } else {
                state.guessedWord = Array.from(guessInput)
            }
            break;
    }

    let wordIsFound = isWordFound(state.word, state.guessedWord)

    //TODO: Fait ton boulot sale dev front 
    if (wordIsFound) {
        console.log("Congratz ! The word has been found ! 🧑‍🦰")
    }

    //TODO: Fait ton boulot sale dev front 
    if (state.lives === 0) {
        // Reset state ? Disable button ?

        console.log("YOU LOOSE")
    }
}

/**
 * Check if the word is found by comparing the guessed and the picked word
 * @param {*} word 
 * @param {*} guessedWord 
 * @returns 
 */
function isWordFound(word, guessedWord) {
    let wordIsFound = false
    for (let i = 0; i < guessedWord.length; i++) {
        wordIsFound = guessedWord[i] === word[i]
        if (!wordIsFound) {
            break;
        }
    }
    return wordIsFound
}


/**
 * Initialize state
 */
async function init() {
    // init game
    const WORD = await getWord()

    state.lives = 7
    state.word = WORD[0].name
    state.guessedWord = replaceLettersByUnderscore(WORD[0].name)
    console.log("State : ",state)
     for (const element of state.guessedWord) {
        const letter = document.createElement('p')
        letter.innerHTML = element
        letter.classList.add('letter')
        letterContainer.appendChild(letter)
    }
    updateHTML()
}   

/**
 * Update html view
 */
function updateHTML() {

    document.getElementById("lives").innerHTML = `lives : ${state.lives}`
    const letters = document.querySelectorAll(".letter") ?? null
    console.log("letters", letters)
    if(!letters) return
    for (const i in letters) {
        const letter = letters[i]
        if(letter === letters.length) continue
        console.log("letter", letter)

        letter.innerHTML = state.guessedWord[i]
    }
}

/**
 * Replace every letters of the picked words by underscores
 * @param {*} word 
 * @returns Array<String>
 */
function replaceLettersByUnderscore(word) {
    let guessedWord = []
    for (let i = 0; i < word.length; i++) {
        guessedWord.push("_")
    }
    return guessedWord
}

/**
 * Check if the input matches letters from the picked word
 * @param {*} wordToGuess 
 * @param {*} currentGuessedWord 
 * @param {*} guessedLetter 
 * @returns {Array, bool }
 */
function guessLetter(wordToGuess, currentGuessedWord, guessedLetter) {
    let guessedWord = currentGuessedWord
    let isCorrectLetter = false
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === guessedLetter) {
            isCorrectLetter = true
            guessedWord[i] = guessedLetter
        }
    }
    return { guessedWord, isCorrectLetter }
}





