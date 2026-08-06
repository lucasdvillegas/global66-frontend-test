<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// components
import PokeLoader from '@/components/PokeLoader.vue'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/onboarding')
  }, 2500) // redirect to onboarding after 2.5s
})
</script>

<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <PokeLoader />
    </div>
  </q-page>
</template>
