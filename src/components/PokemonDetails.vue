<template>
    <div>
      <div class="modal-backdrop" v-if="dataPokemon.data">
          <div class="modal">
            <header>
              <slot name="header">
                <h1>{{dataPokemon.data.species.name[0].toUpperCase() + dataPokemon.data.species.name.substring(1)}}</h1>
                <a @click="$emit('close')">x</a>
              </slot>
            </header>
            <slot name="body">
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
            </slot>
          </div>
      </div>
    </div>
</template>

<script>

export default {

  props: ['dataPokemon'],

  methods: {
      close() {
          this.$emit('close')
      },
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

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    width: 500px;
    padding: 50px;
    justify-content: space-between;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 20px;
  }

  header h1 {
    margin: 0;
  }

  .modal a {
    background-color: red;
    border-radius: 100%;
    color: #fff;
    padding: 5px;
    font-size: 30px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    padding-top: 0;
    padding-bottom: 7px;
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
</style>