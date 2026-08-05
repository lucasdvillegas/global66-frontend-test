<script setup>
defineProps({
  pokemons: {
    type: Array,
    required: true,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  initialLoading: {
    type: Boolean,
    default: false,
  },

  hasMore: {
    type: Boolean,
    default: false,
  },

  infinite: {
    type: Boolean,
    default: false,
  },

  disableInfinite: {
    type: Boolean,
    default: false,
  },

  scrollHeight: {
    type: String,
    default: '85vh',
  },
})

const emit = defineEmits(['load-more'])

const onLoad = (index, done) => {
  emit('load-more', index, done)
}
</script>

<template>
  <div v-if="initialLoading" class="row justify-center q-py-xl">
    <q-spinner size="60px" color="primary" />
  </div>

  <q-scroll-area
    v-else
    :style="{ height: scrollHeight }"
    :thumb-style="{ opacity: 0 }"
    :bar-style="{ opacity: 0 }"
  >
    <q-infinite-scroll
      v-if="infinite"
      :disable="disableInfinite || !hasMore"
      :offset="250"
      @load="onLoad"
    >
      <div class="row q-col-gutter-lg">
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="col-12 col-md-6">
          <slot :pokemon="pokemon" />
        </div>
      </div>

      <template #loading>
        <div class="row justify-center q-my-lg">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>

    <div v-else class="row q-col-gutter-lg">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="col-12 col-md-6">
        <slot :pokemon="pokemon" />
      </div>
    </div>
  </q-scroll-area>
</template>
