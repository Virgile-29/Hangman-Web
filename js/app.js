import { Game } from "./game.js"
const startButton = document.getElementById("start")


startButton.onclick = ((e) => {
    init()
})

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

    const game = new Game(lives, WORD)
    while(game.isActive) {
        if(game.lives === 0) {
            game.isActive = false
        }



    }
    console.log(game)
}

function initHtml() {
    const game = document.getElementById("game")

}




