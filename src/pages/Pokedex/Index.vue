<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

// store
import { useFavoritesStore } from '@/stores/favorites'

// components
import Card from '@/components/Pokedex/PokedexCard.vue'
import PokemonGrid from '@/components/Pokedex/PokedexGrid.vue'
import PokedexFilters from '@/components/Pokedex/PokedexFilters.vue'
import EmptyState from '@/components/EmptyState.vue'

// image
import Magikarp from '@/assets/images/ui/magikarp_error.svg?url'

const $q = useQuasar()
const favoritesStore = useFavoritesStore()

const BASE_URL = 'https://pokeapi.co/api/v2'
const limit = 12

const pokemons = ref([])
const searchedPokemon = ref(null)
const hasError = ref(false)

const offset = ref(0)
const searchQuery = ref('')

const initialLoading = ref(true)
const loading = ref(false)
const hasMore = ref(true)

const selectedTypes = ref([])

// mapear la información del pokemon para las cards
const mapPokemonDetail = (detail) => ({
  id: detail.id,
  name: detail.name,
  image: detail.sprites.front_default,
  types: detail.types.map((t) => t.type.name),
  isFavorite: favoritesStore.isFavorite(detail.id),
})

// traer el detalle de un pokemon por url
function fetchPokemonDetail(url) {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error)
      return null
    })
}

function fetchPokemonByName(name) {
  const pokemonName = name.trim().toLowerCase()

  if (!pokemonName) {
    searchedPokemon.value = null
    return Promise.resolve()
  }

  $q.loading.show()

  return axios
    .get(`${BASE_URL}/pokemon/${pokemonName}`)
    .then((response) => {
      searchedPokemon.value = mapPokemonDetail(response.data)
    })
    .catch((error) => {
      searchedPokemon.value = null

      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'No se encontró el Pokémon ingresado.',
        icon: 'mdi-alert',
      })

      console.error(error)
    })
    .then(() => {
      $q.loading.hide()
    })
}

function fetchInitialData() {
  $q.loading.show()

  return axios
    .get(`${BASE_URL}/pokemon`, {
      params: {
        limit,
        offset: 0,
      },
    })
    .then((response) => {
      hasError.value = false

      return appendPage(response.data)
    })
    .catch((error) => {
      console.error(error)

      hasError.value = true
    })
    .then(() => {
      initialLoading.value = false
      $q.loading.hide()
    })
}

// cargar más pokemons al scrollear
function fetchMorePokemons(index, done) {
  if (!hasMore.value || loading.value || searchQuery.value) {
    done()
    return
  }

  loading.value = true

  return axios
    .get(`${BASE_URL}/pokemon`, {
      params: {
        limit,
        offset: offset.value,
      },
    })
    .then((response) => {
      return appendPage(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
    .then(() => {
      loading.value = false
      done()
    })
}

// agregar nuevos pokemons evitando duplicados
const appendUnique = (newPokemons) => {
  const ids = new Set(pokemons.value.map((pokemon) => pokemon.id))

  pokemons.value.push(...newPokemons.filter((pokemon) => !ids.has(pokemon.id)))
}

// procesar una página de resultados y agregar los detalles de cada pokemon
const appendPage = (data) => {
  hasMore.value = !!data.next

  return Promise.all(
    data.results.map((pokemon) => fetchPokemonDetail(pokemon.url).then(mapPokemonDetail)),
  ).then((newPokemons) => {
    offset.value += limit
    appendUnique(newPokemons)
  })
}

// agregar a favoritos o quitar de favoritos
const toggleFavorite = (pokemon) => {
  pokemon.isFavorite = !pokemon.isFavorite

  favoritesStore.toggleFavorite(pokemon)
}

const filteredPokemons = computed(() => {
  const list = searchedPokemon.value ? [searchedPokemon.value] : pokemons.value

  if (!selectedTypes.value.length) {
    return list
  }

  return list.filter((pokemon) => selectedTypes.value.every((type) => pokemon.types.includes(type)))
})

onMounted(() => {
  fetchInitialData()
})
</script>

<template>
  <q-page padding>
    <div v-if="!hasError">
      <PokedexFilters
        v-model:search-query="searchQuery"
        v-model:selected-types="selectedTypes"
        @search="fetchPokemonByName"
      />

      <PokemonGrid
        :pokemons="filteredPokemons"
        :loading="loading"
        :initial-loading="initialLoading"
        :has-more="hasMore"
        :disable-infinite="!!searchedPokemon"
        infinite
        @load-more="fetchMorePokemons"
      >
        <template #default="{ pokemon }">
          <Card :pokemon="pokemon" @toggle-favorite="toggleFavorite" />
        </template>
      </PokemonGrid>
    </div>

    <div v-else class="column justify-center items-center" style="min-height: calc(100vh - 180px)">
      <EmptyState
        :image="Magikarp"
        title="Algo salió mal..."
        description="No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde."
        button-label="Reintentar"
        @action="fetchInitialData"
      />
    </div>
  </q-page>
</template>
