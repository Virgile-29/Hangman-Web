import { getWord } from "./words.js"

const startButton = document.getElementById("start")
const guessButton = document.getElementById("guessButton")

const state = {
    lives: null,
    word: null,
    guessedWord: null
}

startButton.onclick = ((e) => {
    init()
})

guessButton.onclick = ((e) => {
    processAnswer()
    updateHTML()
})

/**
 * Process the input from the user and check if game is over
 */
function processAnswer() {
 const guessInput = document.getElementById("guessInput").value
    
    // Switch to check if input is a character or a string
    switch (guessInput.length) {
        case 0:
            // empty string 💩
            console.log("💩 Write something, dumb user 💩")
            break;
        case 1:
            // Guessing a letter
            const guessInputResponse = guessLetter(state.word, state.guessedWord, guessInput)
            if(!guessInputResponse.isCorrectLetter) {
                console.log("WRONG LETTER")
                state.lives = state.lives - 1
                break;
            }
            state.guessedWord = guessInputResponse.guessedWord
            break;
        default:
            // Guessing a word
            if(guessInput !== state.word) {
                console.log("Wrong word noob")
                state.lives = state.lives - 1
            } else {
                state.guessedWord = Array.from(guessInput)
            }
            break;
    }
    
    let wordIsFound = isWordFound(state.word, state.guessedWord)

    if(wordIsFound) {
        console.log("Congratz ! The word has been found ! 🧑‍🦰")
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
    for(let i = 0 ; i < guessedWord.length; i ++) {
        wordIsFound = guessedWord[i] === word[i]
        if(!wordIsFound){
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

    const lives = 7
    state.lives = lives
    state.word = WORD[0].name
    state.guessedWord = replaceLettersByUnderscore(WORD[0].name)
    updateHTML()
}

/**
 * Update html view
 */
function updateHTML() {
    document.getElementById("wordToGuess").innerHTML = state.guessedWord
    document.getElementById("lives").innerHTML = `lives : ${state.lives}`
}

/**
 * Replace every letters of the picked words by underscores
 * @param {*} word 
 * @returns Array<String>
 */
function replaceLettersByUnderscore(word) {
    let guessedWord = []
    for(let i = 0 ; i < word.length ; i++) {
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
    for (let i = 0 ; i < wordToGuess.length ; i++) {
        if(wordToGuess[i] === guessedLetter) {
            isCorrectLetter = true
            guessedWord[i] = guessedLetter
        }
    }
    return { guessedWord, isCorrectLetter }
}





