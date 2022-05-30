const cards = document.querySelectorAll('.card');
document.querySelector('.reset Button').addEventListener('click', reset);

cards.forEach((card) => { card.addEventListener('click',flipCard)})

let hasFlippedCard = false;
let firtCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard || this === firtCard) {
        console.log("Test")
        return;
    }
    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firtCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false

    checkForMatch();
}

function checkForMatch(){
    if(firtCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return
    }

    unFlipCards();
}

function disableCards(){
    firtCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetVariables();
}

function unFlipCards(){
    lockBoard = true

    setTimeout(() => {
        firtCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetVariables();
    }, 500);
}



function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
}

function pokemonRequest(id){
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => {
        return {
            name: res.data.name,
            sprite: res.data.sprites.front_default
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

async function getPokemonData(){
    for (let index = 0; index < cards.length; index+=2) {
        const randomId = Math.floor((Math.random() * 150) + 1)
        const pokemonData = await pokemonRequest(randomId)
        
        for (let i = 0; i < 2; i++) {
            cards[index+i].dataset.card = pokemonData.name;
            cards[index+i].firstElementChild.src = pokemonData.sprite;
        }
    }
}

        
function resetVariables(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firtCard, secondCard] = [null, null]
}

function reset(){
    location.reload()   
}

resetVariables()
getPokemonData()
shuffle()


