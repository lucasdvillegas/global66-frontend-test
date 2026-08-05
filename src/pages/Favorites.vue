<script setup>
import { useFavoritesStore } from '@/stores/favorites'
import Card from '@/components/Pokedex/PokedexCard.vue'
import PokemonGrid from '@/components/Pokedex/PokedexGrid.vue'

const favoritesStore = useFavoritesStore()

// Permite quitar el favorito tocando el ícono de corazón dentro de la card
const toggleFavorite = (pokemon) => {
  favoritesStore.toggleFavorite(pokemon)
}

// Permite quitar el favorito deslizando la card (Slide Item)
const onSwipeRight = (pokemon, reset) => {
  favoritesStore.removeFavorite(pokemon.id)
  // Al eliminar el item de la lista, Vue re-renderiza,
  // pero llamamos a reset() por las dudas para limpiar el estado del slide
  reset()
}
</script>
<template>
  <q-page padding>
    <div v-if="favoritesStore.pokemons.length > 0" class="q-pa-lg">
      <div v-if="$q.screen.lt.sm" class="favorites-header q-mb-md">
        <q-btn flat round dense icon="arrow_back_ios" @click="$router.back()" />
        <div class="font-poppins text-h6 text-center">Favoritos</div>
      </div>

      <PokemonGrid
        :pokemons="favoritesStore.pokemons"
        :loading="false"
        :initial-loading="false"
        :has-more="false"
        :disable-infinite="true"
      >
        <template #default="{ pokemon }">
          <!-- 1. Retiramos "card-container" de aquí y usamos una nueva clase "swipe-item" -->
          <q-slide-item
            @right="({ reset }) => onSwipeRight(pokemon, reset)"
            right-color="negative"
            class="swipe-item bg-transparent"
            style="border-radius: 18px"
          >
            <template v-slot:right>
              <q-img
                src="../assets/images/ui/trash.svg"
                style="width: 40px; height: 40px"
                class="q-mr-md"
              />
            </template>

            <Card :pokemon="pokemon" @toggle-favorite="toggleFavorite" :favorite-enabled="false" />
          </q-slide-item>
        </template>
      </PokemonGrid>
    </div>

    <div v-else class="flex flex-center q-pa-md">
      <div class="column items-center full-width" style="max-width: 328px">
        <div class="flex flex-center q-mb-md">
          <img src="~@/assets/images/ui/magikarp_error.svg" alt="Onboarding 2 - Pokédex" />
        </div>

        <h1 class="title text-grey-10 q-ma-none q-mb-sm text-center">
          No has marcado ningún Pokémon como favorito
        </h1>

        <p class="description text-grey-7 q-ma-none text-center">
          Haz clic en el ícono de corazón de tus Pokémon favoritos y aparecerán aquí.
        </p>
      </div>
    </div>
  </q-page>
</template>
<style scoped>
.favorites-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.favorites-header .q-btn {
  position: absolute;
  left: 0;
}

.card-container {
  height: 115px;
  border-radius: 18px !important;
  transition: transform 0.15s ease-in-out;
}

.card-container:active {
  transform: scale(1.01);
}

.q-slide-item {
  border-radius: 12px;
}
</style>
