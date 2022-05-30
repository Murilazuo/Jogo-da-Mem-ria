# Jogo da Memoia

Esse é um desafio de projeto desenvolvido para o bootcamp  TQI Fullstack Developer. Além do projeto base apresentado no curso, utilizei o [Axios](https://axios-http.com) (uma biblioteca do javascript que posibilita a comunicação entre APIs) e a [PokeAPI](https://pokeapi.co)(uma API que possíbilita requests de dados de pokemons).

## PokeAPI

Na função abaixo recebe um parâmetro id, com esse parâmetro é feito uma requesição para a PokeAPI de acordo com o número do pokemon. Então, é retornado um objeto com apenas o nome e uma sprite da resposta. O nome é utilizado para a identificação e checagem da carta, e o sprite é utilizado para a imagem da carta.

```javascript
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
```

Como a requisição retorna uma promise, é necessário usar uma async function, para que a função para sua execução até que a requisição esteja completa utilizando a palavra chave await. É feito um for com um numero de execução igual ao numero total de cartas, porém o acrécimo do index é de +2. Dentro desse for, há outro for que copia as informações na carta do index e no carta com o próximmo index. Isso é feito para que todas as cartas tenham ao menos uma duplicata.

```javascript
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
```