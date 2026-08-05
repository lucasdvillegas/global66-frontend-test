<script setup>
import { typeStyles } from '@/utils/pokemonColors.js'
import { getElementIcon, getElementLabelES } from '@/utils/pokemonElements.js'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },

  favoriteEnabled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['toggle-favorite'])

const handleFavoriteClick = () => {
  emit('toggle-favorite', props.pokemon)
}
</script>

<template>
  <q-card
    flat
    class="card-container relative-position row no-wrap overflow-hidden"
    :style="{ backgroundColor: typeStyles[pokemon.types[0]]?.bgCard || typeStyles.default.bgCard }"
  >
    <!-- left side -->
    <div class="col column justify-between q-pa-md z-top">
      <div>
        <div class="text-caption text-bold text-grey-9 opacity-80 leading-tight">
          Nº{{ String(pokemon.id).padStart(3, '0') }}
        </div>
        <div class="text-card text-weight-bolder text-capitalize text-grey-10 q-mt-xs leading-none">
          {{ pokemon.name }}
        </div>
      </div>

      <div class="row q-gutter-x-xs items-center">
        <div
          v-for="t in pokemon.types"
          :key="t"
          class="badge-chip row items-center text-white text-caption text-weight-bold"
          :style="{ backgroundColor: typeStyles[t]?.bgBadge || typeStyles.default.bgBadge }"
        >
          <div class="badge-icon-bg row items-center justify-center shrink-0 q-mr-xs">
            <img :src="getElementIcon(t)" :alt="t" class="full-width full-height fit-contain" />
          </div>
          <span class="q-pr-xs">{{ getElementLabelES(t) }}</span>
        </div>
      </div>
    </div>

    <!-- right side (Pokemon image + type watermark) -->
    <div
      class="right-side relative-position row items-center justify-center overflow-hidden shrink-0"
      :style="{
        backgroundColor: typeStyles[pokemon.types[0]]?.bgRight || typeStyles.default.bgRight,
      }"
    >
      <img
        :src="getElementIcon(pokemon.types[0])"
        alt="Fondo tipo"
        class="absolute watermark-icon pointer-events-none select-none"
      />

      <q-btn
        round
        dense
        flat
        class="favorite-btn absolute-top-right q-ma-sm"
        :icon="pokemon.isFavorite ? 'favorite' : 'favorite_border'"
        :text-color="pokemon.isFavorite ? 'red-6' : 'white'"
        @click.stop="favoriteEnabled ? handleFavoriteClick() : null"
      />

      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-img fit-contain z-top" />
    </div>
  </q-card>
</template>

<style scoped>
.card-container {
  height: 115px;
  border-radius: 20px !important;
  transition: transform 0.15s ease-in-out;
}

.card-container:active {
  transform: scale(0.985);
}

.right-side {
  width: 140px;
  border-radius: 20px !important;
}

/* Insignias de Tipos */
.badge-chip {
  padding: 3px 10px 3px 3px;
  border-radius: 9999px;
  font-size: 0.75rem;
}

.badge-icon-bg {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #ffffff;
  padding: 3px;
}

.watermark-icon {
  width: 100px;
  height: 100px;

  filter: brightness(0) invert(1);
  opacity: 0.7;
  mask-image: linear-gradient(to top, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%);
  -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.125) 0%, rgba(0, 0, 0, 0.96) 100%);
}

.favorite-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.pokemon-img {
  width: 90px;
  height: 90px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.12));
}

.leading-none {
  line-height: 1;
}

.leading-tight {
  line-height: 1.25;
}
</style>
