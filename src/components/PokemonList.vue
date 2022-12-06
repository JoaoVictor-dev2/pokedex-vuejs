<template>
    <div class="grid">
        <div v-for="(pokemon) in $store.state.pokemons.results" :key="pokemon.url" class="card">
            <img :src="baseUrlPokemonImage + pokemonNumber(pokemon) + '.png'" :alt="pokemon.name"/>
            <p>{{'N°' + pokemonNumber(pokemon, true)}}</p>
            <h1>{{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}}</h1>
            <button @click="isPokemon" :id="pokemonNumber(pokemon)">Mais Detalhes</button>
        </div>
    </div>
    <button @click="$store.dispatch('loadMorePokemons')" class="more-pokemon">Ver Mais</button>
</template>

<script>

import axios from 'axios';

    export default {

        data() {
            return {
                pokemonId: '',
                dataPokemonDetails:'',
                baseUrlPokemonImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
            };
        },

        created() {
            this.$store.dispatch('getPokemons')
        },

        methods: {

            pokemonNumber(pokemon, strPad = false) {

                var increment = pokemon.url.substr(-5);

                var regexNumber = increment.match(/\d+/)[0];

                if (strPad) {

                    regexNumber = regexNumber.padStart(3, 0);
                }

                return regexNumber
            },

            getDetails(id) {

                this.pokemonId = id;

                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((pokemonDetails) => {

                    this.dataPokemonDetails = pokemonDetails;
                })
                .catch((error) => {
                    alert(`Não foi possivel recuperar os detalhes do pokemon: ${error}`);
                });
            },

            isPokemon(event) {

                this.pokemonId = event.path[0].getAttribute('id');

                this.$router.push({
                    name: 'pokemon',
                    params: {pokemonId: this.pokemonId}
                })
            }
        },
    }

</script>

<style>

.card {
    border: 1px solid #000;
    border-radius: 20px;
    flex-basis: 33%;
    padding: 15px 0;
    justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
  padding: 20px 20px;
}

.card button {
    border: 0;
    border-radius: 10px;
    font-size: 17px !important;
    background-color: rgb(97, 97, 204);
    color: #fff;
    padding: 10px;
}

.more-pokemon {
    font-size: 30px;
    border-radius: 10px;
    background-color: rgb(97, 97, 204);
    color: #fff;
    border: none;
    padding: 10px 30px;
}

</style>