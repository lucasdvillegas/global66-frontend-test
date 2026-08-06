<script setup>
//store
import { useFavoritesStore } from '@/stores/favorites'

//components
import Card from '@/components/Pokedex/PokedexCard.vue'
import PokemonGrid from '@/components/Pokedex/PokedexGrid.vue'
import EmptyState from '@/components/EmptyState.vue'

//image
import Magikarp from '@/assets/images/ui/magikarp_error.svg?url'
import Trash from '@/assets/images/ui/trash.svg?url'

const favoritesStore = useFavoritesStore()

// Permite quitar el favorito tocando el ícono de corazón dentro de la card
const toggleFavorite = (pokemon) => {
  favoritesStore.toggleFavorite(pokemon)
}

// Permite saca el favorito deslizando la card (Slide Item)
const onSwipeRight = (pokemon, reset) => {
  favoritesStore.removeFavorite(pokemon.id)
  // Al eliminar el item de la lista, Vue re-renderiza,
  // pero llamamos a reset() por las dudas para limpiar el estado del slide
  reset()
}
</script>
<template>
  <q-page padding>
    <div v-if="$q.screen.lt.sm && favoritesStore.pokemons.length" class="favorites-header q-mb-md">
      <q-btn flat round dense icon="arrow_back_ios" @click="$router.back()" />
      <div class="font-poppins text-h6 text-center">Favoritos</div>
    </div>

    <PokemonGrid
      v-if="favoritesStore.pokemons.length"
      :pokemons="favoritesStore.pokemons"
      :loading="false"
      :initial-loading="false"
      :has-more="false"
      :disable-infinite="true"
    >
      <template #default="{ pokemon }">
        <q-slide-item
          @right="({ reset }) => onSwipeRight(pokemon, reset)"
          right-color="negative"
          class="swipe-item"
          style="border-radius: 20px"
        >
          <template v-slot:right>
            <q-img :src="Trash" style="width: 40px; height: 40px" class="q-mr-md" />
          </template>

          <Card :pokemon="pokemon" @toggle-favorite="toggleFavorite" :favorite-enabled="false" />
        </q-slide-item>
      </template>
    </PokemonGrid>

    <div v-else class="column justify-center items-center" style="min-height: 70vh">
      <EmptyState
        :image="Magikarp"
        title="No has marcado ningún Pokémon como favorito"
        description="Haz clic en el ícono de corazón de tus Pokémon favoritos y aparecerán aquí."
      />
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
  border-radius: 20px !important;
  transition: transform 0.15s ease-in-out;
}

.card-container:active {
  transform: scale(1.01);
}

.q-slide-item {
  border-radius: 20px;
}

.swipe-item {
  border-radius: 20px;
}

.swipe-item :deep(.q-slide-item__content) {
  border-radius: 20px;
  overflow: hidden;
}
</style>
