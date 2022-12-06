<template>
  <div class="pokemon" v-if="(dataPokemon.data && dataEvolution)">
    <header>
      <h1>{{dataPokemon.data.species.name[0].toUpperCase() + dataPokemon.data.species.name.substring(1)}}</h1>
    </header>
    <div>
      <img :src="dataPokemon.data.sprites.front_default" alt="">
    </div>
    <div class="types">
      <div v-for="pokemonType in dataPokemon.data.types" :key="pokemonType.slot">
        <div :class="['type', pokemonType.type.name]">
          <p>{{pokemonType.type.name}}</p>
        </div>
      </div>
    </div>
    <div>
      <h3>Habilidades</h3>
      <div class="abilities">
        <div v-for="power in dataPokemon.data.abilities" :key="power.slot">
          <div class="ability">
            <p>{{power.ability.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3>Status Inicial</h3>
      <div class="stats">
        <div v-for="(data, index) in dataPokemon.data.stats" :key="index">
          <div class="stat">
            <p>
              <b>{{data.stat.name}}</b> : {{data.base_stat}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="(dataEvolution.length > 0)">
      <h3>Regressão / Evolução</h3>
      <div class="evolution">
        <div v-for="(evolution, index) in dataEvolution" :key="index">
          <div @click="isPokemon(getPokemonNumber(evolution.url))">
            <h4>{{evolution.name[0].toUpperCase() + evolution.name.substring(1)}}</h4>
            <img :src="imageUri + getPokemonNumber(evolution.url) + '.png'" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

  export default {
    name: 'PokemonDetails',
    data() {
      return {
        dataPokemon: '',
        dataEvolution: [],
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
        pokemonNumber: '',
      };
    },

    created() {
      this.getDetails(this.$route.params.pokemonId)
    },

    methods: {

      getDetails(id) {

        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((pokemonDetails) => {

          this.getPokemonSpecie(id);
          this.dataPokemon = pokemonDetails;
        })
        .catch((error) => {
            alert(`Não foi possivel recuperar os detalhes do pokemon: ${error}`);
        });
      },

      getEvolutionPokemon(url) {

        axios.get(url).then((pokemonEvolution) => {

          var evolution = pokemonEvolution.data.chain;

          while (evolution) {

            if (evolution) {

              if (evolution.species) {
  
                this.dataEvolution.push(evolution.species);
              }
              
              if (evolution.evolves_to) {
  
                evolution = evolution.evolves_to[0];
  
              }
            }
          }

          this.dataEvolution = this.dataEvolution.filter((element) => {
            return element.name != this.dataPokemon.data.name;
          })
        })
      },

      getPokemonSpecie(id) {

        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((pokemon) => {

          this.getEvolutionPokemon(pokemon.data.evolution_chain.url)
        })
        .catch((error) => {
          console.log(error)
        })
      },

      getPokemonNumber(pokemonUrl) {

        if (!pokemonUrl) {
          return;
        }

        var increment = pokemonUrl.substr(-5);

        var regexNumber = increment.match(/\d+/)[0];

        return regexNumber;
      },

      isPokemon(id) {

        this.$router.push({
            name: 'pokemon',
            params: {pokemonId: id}
        })

        this.getDetails(id)

        this.dataEvolution = []
      }
    },
  }

</script>

<style>

  .grass {
    background:rgb(3, 139, 44) !important;
  }
  .poison {
    background:rgb(74, 7, 105) !important;
  }
  .water {
    background:rgb(8, 135, 219) !important;
  }
  .dragon {
    background:rgb(27, 2, 68) !important;
  }
  .ice {
    background:rgb(78, 199, 255) !important;
  }
  .flying {
    background:rgb(145, 215, 255) !important;
  }
  .fire {
    background:rgb(238, 135, 17) !important;
  }
  .ghost {
    background:rgb(74, 52, 87) !important;
  }
  .fighting {
    background:rgb(122, 0, 0) !important;
  }
  .normal {
    background:rgb(104, 104, 104) !important;
  }
  .psychic {
    background:rgb(195, 0, 255) !important;
  }
  .bug {
    background:rgb(52, 87, 6) !important;
  }
  .dark {
    background:rgb(43, 43, 43) !important;
  }
  .steel {
    background:rgb(116, 116, 116) !important;
  }
  .fairy {
    background:rgb(248, 165, 237) !important;
  }
  .eletric {
    background:rgb(255, 217, 1) !important;
  }
  .rock {
    background:rgb(88, 95, 100) !important;
  }
  .ground {
    background:rgb(92, 70, 70) !important;
  }
  .types, .abilities, .moves {
    display: flex;
    justify-content: center;
  }
  .type, .ability, .move {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    width: 100px;
    height: 30px;
    border-radius: 7px;
    background-color: #bbbbbb;
    color: #fff;
  }
  h4 {
    margin: 0 !important;
  }
  .evolution {
    display: flex;
    justify-content: center;
  }
  .evolution > div > div {
    margin: 0 15px;
    padding: 5px 15px;
    border: 1px solid rgb(163, 161, 161);
    border-radius: 10px;
    cursor: pointer;
  }
</style>