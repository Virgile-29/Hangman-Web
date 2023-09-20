export function launchGame() {
    const startContainer = document.querySelector('.start-container')

    startContainer.style.display = 'none'
    gameContainer.style.display = 'flex'

}

// Validation 
export function validateInput(input) {
    let message = ''
    let color = ''
    if (!(input !== '' || input !== ' ') && !input.value.match(/[a-z]/i) && !input.value.length > 1) {
        message = 'Veuillez indiquer une réponse valide : une lettre ou un mot'
        color = '#f21b3f'
    }
    userFeedback.innerText = message
    userFeedback.style.color = color
    userFeedback.style.display = 'inline-block'
}

export function showWordLength(numberOfLetters) {
    for (const element of numberOfLetters) {
        const letter = document.createElement('p')
        letter.classList.add('letter')
        letterContainer.appendChild(letter)
    }
}

const inputUser = document.querySelector('#input')
const userFeedback = document.querySelector('.user-feedback')
const gameContainer = document.querySelector('.game-container')
const letterContainer = document.querySelector('.letter-container')

function guessWord() {
    let message = ''
    let color = ''
    if ((inputUser !== '' || inputUser !== ' ') && inputUser.value.match(/[a-z]/i) && inputUser.value.length > 1) {
        console.log('input word')
        // Validation input word
        const img = document.createElement('img')
        img.src = './assets/imgs/hangman_1.png'
        img.classList.add('animation-1', 'img-hangman')
        gameContainer.appendChild(img)
    } else if ((inputUser !== '' || inputUser !== ' ') && inputUser.value.match(/[a-z]/i) && inputUser.value.length == 1) {
        console.log('input letter')
        // Validation input letter
    } else {
        message = 'Veuillez indiquer une réponse valide : une lettre ou un mot'
        color = '#f21b3f'
    }
    userFeedback.innerText = message
    userFeedback.style.color = color
    userFeedback.style.display = 'inline-block'
}


