import { Game } from "./game.js"
const startButton = document.getElementById("start")


startButton.onclick = ((e) => {
    init()
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
    let lives = 7
    game = new Game(lives, WORD)
}

function initHtml() {
    const game = document.getElementById("game")

}




