
const pokeApi = {} //Basicamente criando uma função no arquivo separado para o código ser mais organizado.

function convertPokeApiDetailToPokemon (pokemonDetail) { //Conversão do modelo da PokeApi para uma modelo mais simples, pois lá tem muita coisa desnecessária.
    const pokemon = new Pokemon()

    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types        //Esse type é a primeira posição do array 
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}



pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) //Fazendo a requisição dos pokemons para json.
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` 

    return fetch(url) //Requisição HTTP
        .then((response) => response.json()) // Função que converte a promessa do body para json.
        .then((jsonBody) => jsonBody.results) //Quando for convertido, irá pegar do jsonBody os resultados, que é a lista de pokemons.
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) //Transformando em uma lista de busca de detalhes.
        .then((detailRequests) => Promise.all(detailRequests)) //Requisição de detalhes e esperando todas as requisições acabarem.
        .then((pokemonsDetails) => pokemonsDetails) //E quando acabar as requisições, vamos ficar com elas para usar. 

}



