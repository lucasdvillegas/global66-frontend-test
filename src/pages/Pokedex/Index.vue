<script setup>
import { ref, computed, onMounted } from 'vue'
import Card from '@/components/Pokedex/Card.vue'
import { usePokedexStore } from '@/stores/pokedex-store'
import { fetchPokemonPage, fetchPokemonDetails } from '@/services/pokemonService'

const pokedexStore = usePokedexStore()

const limit = 5
const pokemons = ref([])
const offset = ref(0)
const searchQuery = ref('')
const initialLoading = ref(true)
const loading = ref(false)
const hasMore = ref(true)

const appendUnique = (newPokemons) => {
  const existingIds = new Set(pokemons.value.map((p) => p.id))
  pokemons.value.push(...newPokemons.filter((p) => !existingIds.has(p.id)))
}

const appendPage = (data) => {
  hasMore.value = !!data.next
  return fetchPokemonDetails(data.results).then((newPokemons) => {
    offset.value += limit
    appendUnique(newPokemons)
  })
}

const onLoadMore = (index, done) => {
  if (!hasMore.value || loading.value) {
    done()
    return
  }

  loading.value = true
  fetchPokemonPage({ limit, offset: offset.value })
    .then((data) => appendPage(data))
    .catch((error) => {
      console.error('Error fetching pokemons:', error)
    })
    .finally(() => {
      loading.value = false
      initialLoading.value = false
      done()
    })
}

onMounted(() => {
  if (pokedexStore.initialData) {
    appendPage(pokedexStore.initialData).finally(() => {
      initialLoading.value = false
      pokedexStore.clearInitialData()
    })
  } else {
    onLoadMore(0, () => {})
  }
})

const toggleFavorite = (pokemon) => {
  pokemon.isFavorite = !pokemon.isFavorite
}

const filteredPokemons = computed(() => {
  return pokemons.value.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.id.toString().includes(searchQuery.value),
  )
})
</script>
<template>
  <q-page>
    <div class="q-pa-md max-width-container">
      <div class="row items-center q-gutter-x-sm q-mb-md">
        <q-input
          v-model="searchQuery"
          placeholder="Buscar Pokémon..."
          outlined
          rounded
          dense
          class="col bg-slate-1 shadow-0"
          input-class="q-px-sm text-body1"
        >
          <template #prepend>
            <q-icon name="search" color="grey-6" />
          </template>
        </q-input>

        <q-btn outline round color="grey-5" icon="tune" size="md" class="shrink-0" />
      </div>

      <div v-if="initialLoading" class="row justify-center q-py-xl">
        <q-spinner color="primary" size="3em" />
      </div>

      <q-scroll-area v-show="!initialLoading" style="height: 85vh">
        <q-infinite-scroll @load="onLoadMore" :offset="100" :disable="!!searchQuery">
          <div class="column q-gutter-y-md q-pa-md">
            <Card
              v-for="pokemon in filteredPokemons"
              :key="pokemon.id"
              :pokemon="pokemon"
              @toggle-favorite="toggleFavorite"
            />
          </div>

          <template #loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<style scoped>
.max-width-container {
  max-width: 600px;
  margin: 0 auto;
}
.bg-slate-1 {
  background-color: #f8fafc;
}
</style>
