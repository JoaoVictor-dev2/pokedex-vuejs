<template>
  <div class="home">
  <PokemonFilter/>
  <PokemonList/>
  </div>
</template>

<script>

import PokemonFilter from '@/components/PokemonFilter.vue';
import PokemonList from '@/components/PokemonList.vue';

export default {
  name: 'HomeView',
  components: {
    PokemonList,
    PokemonFilter
}
}
</script>
