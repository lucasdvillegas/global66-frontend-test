<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
      <img
        alt="Quasar logo"
        src="~@/assets/images/ui/Loader.svg"
        style="width: 200px; height: 200px"
      />
    </div>
  </q-page>
</template>
