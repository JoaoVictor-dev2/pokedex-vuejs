<template>
  <PokemonFilter/>
  <PokemonList/>
</template>

<script>
import PokemonList from './components/PokemonList.vue'
import PokemonFilter from './components/PokemonFilter.vue'

export default {
  name: 'App',
  components: {
    PokemonList,
    PokemonFilter,
  },
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
