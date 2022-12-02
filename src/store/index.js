import { createStore } from 'vuex'
import axios from 'axios'
import { toRaw } from 'vue';

export default createStore({
  state: {
    pokemons: {
      results: [],
      nextPage: [],
    },
    pokemonBackup: {
      results: [],
    }
  },

  getters: {
},

  mutations: {

    filteredPokemons(state, search) {

      if (!search) {
        state.pokemons.results = state.pokemonBackup.results
        return
      }

      var list = state.pokemons.results.filter(item => {
        return item.name.indexOf(search) > -1;
      })

      state.pokemons.results = list

    },

    AddPokemons (state, list) {

      for (var pokemon of list.data.results) {

        state.pokemons.results.push(pokemon);
        state.pokemonBackup.results.push(pokemon);
      }

      state.pokemons.nextPage.push(list.data.next);
    },
  },

  actions: {

    getPokemons({ commit }) {

      axios.get('https://pokeapi.co/api/v2/pokemon').then((pokemons) => {

          commit('AddPokemons', pokemons)
      })
      .catch((error) => {
              alert(`Não foi possivel recuperar a lista de pokemons: ${error}`);
      });
    },

    loadMorePokemons(context) {

      var nextPageUrl = context.state.pokemons.nextPage;

      axios.get(toRaw(nextPageUrl[nextPageUrl.length - 1])).then((morePokemons) => {

        context.commit('AddPokemons', morePokemons)
      })
      .catch((error) => {
          alert(`Não foi possivel recuperar a próxima lista de pokemons: ${error}`);
      })
    }
  },
})
