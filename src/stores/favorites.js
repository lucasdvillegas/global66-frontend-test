import { defineStore, acceptHMRUpdate } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    pokemons: [],
  }),

  getters: {
    // devuelve true si el ID del pokemon ya está en favoritos
    isFavorite: (state) => (id) => state.pokemons.some((p) => p.id === id),
  },

  actions: {
    toggleFavorite(pokemon) {
      const index = this.pokemons.findIndex((p) => p.id === pokemon.id)
      if (index !== -1) {
        this.pokemons.splice(index, 1) // Lo saca si ya existe
      } else {
        // agrega como favorito
        this.pokemons.push({ ...pokemon, isFavorite: true })
      }
    },
    removeFavorite(id) {
      const index = this.pokemons.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.pokemons.splice(index, 1)
      }
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavoritesStore, import.meta.hot))
}
