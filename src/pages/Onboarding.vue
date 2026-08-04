<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// components
import FirstView from '../components/Onboarding/FirstView.vue'
import LastView from '../components/Onboarding/LastView.vue'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 2

const buttonText = computed(() => {
  return currentStep.value === 1 ? 'Continuar' : 'Empecemos'
})

const handleNext = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  } else {
    router.push('/pokedex')
  }
}
</script>

<template>
  <q-page class="flex flex-center bg-white q-pa-md">
    <div class="onboarding-card column justify-end">
      <q-carousel
        v-model="currentStep"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        swipeable
        height="100%"
        class="bg-transparent flex-1 q-mb-md"
      >
        <q-carousel-slide
          :name="1"
          class="column items-center justify-center text-center q-pa-none"
        >
          <FirstView />
        </q-carousel-slide>

        <q-carousel-slide
          :name="2"
          class="column items-center justify-center text-center q-pa-none"
        >
          <LastView />
        </q-carousel-slide>
      </q-carousel>

      <div class="column items-center q-gutter-y-lg">
        <!-- dots steps -->
        <div class="row items-center q-gutter-x-xs">
          <div
            v-for="step in totalSteps"
            :key="step"
            class="step-dot transition-generic"
            :class="currentStep === step ? 'step-dot--active bg-primary' : 'bg-blue-2'"
          />
        </div>

        <q-btn
          @click="handleNext"
          :label="buttonText"
          color="primary"
          unelevated
          rounded
          no-caps
          class="full-width text-btn"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.onboarding-card {
  width: 100%;
  max-width: 380px;
  min-height: 540px;
}

.step-dot {
  height: 8px;
  width: 8px;
  border-radius: 4px;
}

.step-dot--active {
  width: 24px;
}
</style>
