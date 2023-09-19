import { Game } from "./game.js"
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
    console.log(guessInput)
})

const game = new Game()

const words = [
        "pendu",
        "jouer",
        "perdu",
        "gagner"
    ]

function init() {
    // init game
    const rand = Math.floor(Math.random() * words.length)
    const WORD = words[rand]
    const lives = 7
    state.lives = lives
    state.word = WORD
    state.guessedWord = 
    document.getElementById("wordToGuess").innerHTML = WORD
}

function initHtml() {
    const game = document.getElementById("game")
}

function replaceLettersByUnderscore(word) {
    mutatedWord = word.replace
}

function guessLetter(input, word) {
    
    for (letters of input) {

    }
}





