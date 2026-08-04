import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokedexStore = defineStore('pokedex', () => {
  const initialData = ref(null)
  const apiError = ref(null)

  const setInitialData = (data) => {
    initialData.value = data
  }

  const setApiError = (error) => {
    apiError.value = error
  }

  const clearInitialData = () => {
    initialData.value = null
  }

  const clearApiError = () => {
    apiError.value = null
  }

  return {
    initialData,
    apiError,
    setInitialData,
    setApiError,
    clearInitialData,
    clearApiError,
  }
})
