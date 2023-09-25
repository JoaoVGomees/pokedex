
const pokemonList = document.getElementById('pokemonList') //Pegando o Id do html.
const loadMoreButton = document.getElementById('loadMoreButton') //Para pegar do HTML o botão .

const maxRecords = 151 //Quantidade máxima de pokemons que vai aparecer
const limit = 10 //Limite de adicionar só mais 10 pokemons
let offset = 0; //Para começar no primeiro pokemon



function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { //Transformação da lista para HTML. Mais explicação nas descrições.
        const newHtml = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}" alt="${pokemon.name}"> 
                </div>
    
            </li>`).join('')
        pokemonList.innerHTML += newHtml //Para substituir a lista antiga dentro do Html.
    }) 
}

loadPokemonItens(offset, limit) //Para começar no primeiro pokemon

loadMoreButton.addEventListener('click', () => {
    offset += limit  //Para carregar 5 a mais quando apertar o botão
    
    const qtdRecordWithNextPage = offset + limit //A quantidade de 0 mais 5, irá aparecer os 5 próximos pokemons

    if(qtdRecordWithNextPage >= maxRecords){ //Se a quantidade de pokemons da próxima página ser maior que o máximo de pokemons, então a quantidade máxima sera subtraída da quantidade de pokemons que ja apareceram, logo vai mostrar a diferença. E vai apagar o botão
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit) //Se a quantidade não for maior, vai continuar normalmente até chegar na situação acima
    }
})
