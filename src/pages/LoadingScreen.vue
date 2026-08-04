<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePokedexStore } from '@/stores/pokedex-store'
import { fetchPokemonPage } from '@/services/pokemonService'

import PokeLoader from '@/components/PokeLoader.vue'

const router = useRouter()
const pokedexStore = usePokedexStore()
const isLoading = ref(true)
const error = ref(null)

onMounted(() => {
  // verify if the store already has initial data
  fetchPokemonPage({ limit: 5, offset: 0, timeout: 5000 })
    .then((data) => {
      if (!data) {
        throw new Error('No data received from API')
      }

      // save the initial data to the store
      pokedexStore.setInitialData(data)
      pokedexStore.clearApiError()

      // redirect to the Pokedex page
      router.push({
        name: 'Pokedex',
      })
    })
    .catch((err) => {
      error.value = err.message
      pokedexStore.setApiError(err.message)

      router.push({
        name: 'Error',
      })
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <q-page class="flex flex-center">
    <div v-if="isLoading" class="column items-center q-gutter-y-md">
      <PokeLoader />
    </div>
  </q-page>
</template>

<style scoped></style>
