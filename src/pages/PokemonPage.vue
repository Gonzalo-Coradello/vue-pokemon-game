<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>
        <div class="score">
            <p>Puntaje actual: {{ currentScore }}</p>
            <p>Puntaje máximo: {{ highestScore }}</p>
        </div>
        <h1>¿Quién es este Pokémon?</h1>
        <PokemonPicture 
            :pokemon-id="pokemon.id" 
            :show-pokemon="showPokemon" 
        />
        <PokemonOptions 
            :pokemons="pokemonArr" 
            @selection="checkAnswer" 
        />

        <template v-if="showAnswer" class="fade-in">
            <h2>{{ message }}</h2>
            <h3 v-if="currentScore === 0">¡Acertaste {{ lastScore }}!</h3>
            <button @click="newGame">{{ currentScore === 0 ? 'Nuevo juego' : 'Siguiente' }}</button>
        </template>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
    components: { PokemonPicture, PokemonOptions },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
            currentScore: 0,
            lastScore: 0,
            highestScore: 0
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId) {
            this.showPokemon = true
            this.showAnswer = true

            if(selectedId === this.pokemon.id) {
                this.message = `Correcto, ${this.pokemon.name}`
                this.currentScore++
                if (this.currentScore > this.highestScore) {
                    this.highestScore = this.currentScore
                }
            } else {
                this.message = `Oops, era ${this.pokemon.name}`
                this.lastScore = this.currentScore
                this.currentScore = 0
            }
        },
        newGame() {
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.pokemon = null

            this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray()
    }
}

</script>

<style scoped>
.score {
    text-align: right;
    margin-bottom: 1rem;
}
</style>