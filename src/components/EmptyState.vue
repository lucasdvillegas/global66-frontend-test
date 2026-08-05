<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
  buttonLabel: String,
})

defineEmits(['action'])
</script>

<template>
  <div class="column items-center justify-center text-center" style="max-width: 400px">
    <div class="flex flex-center q-mb-md">
      <img :src="image" :alt="title" />
    </div>

    <h1 class="title text-grey-10 q-ma-none q-mb-sm text-center">
      {{ title }}
    </h1>

    <p class="description text-grey-7 q-ma-none text-center">
      {{ description }}
    </p>

    <div v-if="buttonLabel" class="column items-center q-mt-md full-width">
      <q-btn
        color="primary"
        unelevated
        rounded
        no-caps
        class="full-width text-btn"
        :label="buttonLabel"
        @click="$emit('action')"
      />
    </div>
  </div>
</template>
