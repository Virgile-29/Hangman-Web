import { getWord } from "./words.js"

const startButton = document.getElementById("start")
const guessButton = document.getElementById("guessButton")


const state = {
    lives: null,
    word: null,
    guessedWord: null
}

startButton.onclick = ((e) => {
    console.log("START")
    init()
})

guessButton.onclick = ((e) => {

    console.log("GUESS")

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
    console.log("STATE GUESS WORD : ", state.guessedWord)
    console.log("STATE WORD: ", Array.from(state.word))
    
    let wordIsFound = false
    for(let i = 0 ; i < state.guessedWord.length; i ++) {
        wordIsFound = state.guessedWord[i] === state.word[i]
        if(!wordIsFound){
            break;
        }
    }

    if(wordIsFound) {
        console.log("Congratz ! The word has been found ! 🧑‍🦰")
    }
    
    console.log("input", guessInput)
    console.log("state: ", state)
    updateHTML()
})



async function init() {
    // init game
    const WORD = await getWord()

    const lives = 7
    state.lives = lives
    state.word = WORD[0].name
    console.log("state.guessedWord", state.guessedWord)
    state.guessedWord = replaceLettersByUnderscore(WORD[0].name)
    updateHTML()
}

function updateHTML() {
    document.getElementById("wordToGuess").innerHTML = state.guessedWord
    document.getElementById("lives").innerHTML = `lives : ${state.lives}`
}

function replaceLettersByUnderscore(word) {
    let guessedWord = []
    for(let i = 0 ; i < word.length ; i++) {
        guessedWord.push("_")
    }
    return guessedWord
}

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





