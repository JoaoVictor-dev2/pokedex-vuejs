<template>
    <div class="filters">
        <div>
            <label>Pesquisar</label>
            <input v-model="search" @keyup="onKeyUp" placeholder="Pesquise o nome" type="text" name="search">
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            search: '',
        };
    },

    methods: {

        onKeyUp() {

            this.$store.commit('filteredPokemons', this.search)
        }
    },
}
</script>

<style>

.filters > div {
    display: flex;
    margin: 20px 0;
}

.filters > div > label {
    padding: 0 25px;
}

select {
    height: 30px;
    width: 30%;
}

input {
    width: 30%;
    height: 25px;
}

</style>