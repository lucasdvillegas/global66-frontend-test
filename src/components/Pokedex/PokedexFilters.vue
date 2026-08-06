<script setup>
import { ref } from 'vue'

// components
import PokedexTypesFilters from '@/components/Pokedex/PokedexTypesFilters.vue'

const emit = defineEmits(['search', 'apply'])

const searchQuery = defineModel('searchQuery', {
  type: String,
  default: '',
})

const selectedTypes = defineModel('selectedTypes', {
  type: Array,
  default: () => [],
})

const filtersDialog = ref(false)

function searchPokemon() {
  emit('search', searchQuery.value.trim())
}
</script>

<template>
  <div class="row items-center q-col-gutter-sm q-mb-lg">
    <div class="col">
      <q-input
        v-model="searchQuery"
        outlined
        rounded
        dense
        clearable
        placeholder="Buscar Pokémon..."
        @keyup.enter="searchPokemon"
      >
        <template #prepend>
          <q-btn flat round dense icon="search" @click="searchPokemon" />
        </template>
      </q-input>
    </div>

    <div class="col-auto">
      <q-btn outline round icon="search" color="grey-5" @click="filtersDialog = true" />

      <q-dialog v-model="filtersDialog" position="bottom">
        <PokedexTypesFilters
          v-model="selectedTypes"
          @apply="emit('apply')"
          @close="filtersDialog = false"
        />
      </q-dialog>
    </div>
  </div>
</template>
