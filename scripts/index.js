var sprite = 'front_default';
var random = false;
var url;
const fetchPokemon = () => {

    let id = document.getElementById("pokemonId").value;
    if (!isValidPokemonId(id)){
        console.log(!isValidPokemonId(id));
        alert("invalid Pokemon ID!");
        return;
    }
    if (!random){
        url = `https://pokeapi.co/api/v2/pokemon/${id}`; // get the api(poke api)

    }
    fetch(url).then( //take the data from the api then do something 
        (result) =>{ 
            return result.json();//returns a file that has the index etc
        }
    ).then(
        (data) =>{         
            console.log(data);   
            const pokemon = {//gets the pokemons relevant details
                id: data.id,
                name: data.name,
                image: data.sprites[sprite],
                type: data.types.map(
                    (type) => type.type.name
                ).join(', ')
            }

            console.log(pokemon);
            displayPokemon(pokemon);//displays pokemon to page
  
        }
    )
}

function randomFalse(){
    random = false;
}
function normal(){
    sprite = 'front_default';
}
function shinyChance(){
    
    if(sprite === 'front_shiny'){
        sprite = 'front_default';
    }
    else{
        sprite = 'front_shiny';
    }
    
  
    fetchPokemon();

}

function randomize(){
    random = true;
    url = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898) + 1 }`;
    fetchPokemon();
}


const displayPokemon = (pokemon) =>{//the display method 
    
    const pokemonHTMLString = //print the data into html
    `
    <div class="card">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">Type: ${pokemon.type}</p>
    </div>
    `;
    const pokemonCard = document.getElementById("pokemonCard");//calls the html id
    pokemonCard.innerHTML = pokemonHTMLString; //makes the html in pokemon card = to the html we wrote here
}
function isValidPokemonId(id) {
    var n = Math.floor(Number(id));
    return n < 899 && String(n) === id && n > 0;
}