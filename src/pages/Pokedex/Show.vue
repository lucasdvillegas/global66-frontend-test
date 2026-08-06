<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import axios from 'axios'
import { useFavoritesStore } from '@/stores/favorites'
import { typeStyles } from '@/utils/pokemonColors.js'
import { getElementIcon, getElementLabelES } from '@/utils/pokemonElements.js'

// icons
import Category from '@/assets/images/ui/show/category.svg?url'
import Skill from '@/assets/images/ui/show/skill.svg?url'
import Weight from '@/assets/images/ui/show/weight.svg?url'
import Height from '@/assets/images/ui/show/height.svg?url'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const favoritesStore = useFavoritesStore()

const pokemon = ref(null)
const speciesData = ref(null)
const weaknesses = ref([])
const loading = ref(true)

const BASE_URL = 'https://pokeapi.co/api/v2'

const fetchPokemonDetails = async () => {
  const idOrName = route.params.id
  $q.loading.show()

  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${idOrName}`)
    const data = response.data

    const speciesResponse = await axios.get(data.species.url)
    speciesData.value = speciesResponse.data

    fetchWeaknesses(data.types.map((t) => t.type.name))

    pokemon.value = {
      id: data.id,
      name: data.name,
      image:
        data.sprites.versions?.['generation-vi']?.['x-y']?.front_default ||
        data.sprites.front_default,
      types: data.types.map((t) => t.type.name),
      weight: data.weight / 10,
      height: data.height / 10,
      ability: data.abilities[0]?.ability.name || 'Desconocida',
      isFavorite: favoritesStore.isFavorite(data.id),
    }
  } catch (error) {
    console.error('Error al cargar detalles del Pokémon:', error)
    $q.notify({ color: 'negative', message: 'No se pudo cargar la información del Pokémon.' })
  } finally {
    $q.loading.hide()
    loading.value = false
  }
}

const fetchWeaknesses = async (types) => {
  try {
    const typePromises = types.map((t) => axios.get(`${BASE_URL}/type/${t}`))
    const responses = await Promise.all(typePromises)

    const weakSet = new Set()
    responses.forEach((res) => {
      res.data.damage_relations.double_damage_from.forEach((w) => {
        weakSet.add(w.name)
      })
    })
    weaknesses.value = Array.from(weakSet)
  } catch (err) {
    console.error('Error al calcular debilidades', err)
  }
}

const toggleFavorite = () => {
  if (!pokemon.value) return
  pokemon.value.isFavorite = !pokemon.value.isFavorite
  favoritesStore.toggleFavorite(pokemon.value)
}

const getDescription = () => {
  if (!speciesData.value) return 'Cargando descripción...'
  const entry = speciesData.value.flavor_text_entries.find((entry) => entry.language.name === 'es')
  return entry ? entry.flavor_text.replace(/[\n\f]/g, ' ') : 'Sin descripción disponible.'
}

const getCategory = () => {
  if (!speciesData.value) return 'Pokémon'
  const genera = speciesData.value.genera.find((g) => g.language.name === 'es')
  return genera ? genera.genus : 'Pokémon'
}

const getGenderRates = () => {
  if (!speciesData.value || speciesData.value.gender_rate === -1) return null
  const femaleRate = (speciesData.value.gender_rate / 8) * 100
  const maleRate = 100 - femaleRate
  return { male: maleRate, female: femaleRate }
}

onMounted(() => {
  fetchPokemonDetails()
})
</script>

<template>
  <q-page v-if="!loading && pokemon" class="bg-white">
    <!-- Header curvo con color dinámico según el tipo -->
    <div
      class="header-curved relative-position flex flex-center q-pb-xl"
      :style="{
        backgroundColor: $q.screen.lt.sm
          ? 'transparent'
          : typeStyles[pokemon.types[0]]?.bgBadge || typeStyles.default.bgCard,
      }"
    >
      <svg
        v-if="$q.screen.lt.sm"
        class="mobile-header-bg"
        viewBox="0 0 360 271"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        :style="{
          color: typeStyles[pokemon.types[0]]?.bgBadge || typeStyles.default.bgCard,
        }"
      >
        <circle cx="186" cy="22" r="249" fill="currentColor" />
      </svg>

      <!-- Botones superiores -->
      <div class="absolute-top row justify-between items-center q-pa-md z-top">
        <q-btn flat round dense icon="arrow_back_ios_new" color="white" @click="router.back()" />
        <q-btn
          flat
          round
          dense
          class="favorite-top-btn"
          :icon="pokemon.isFavorite ? 'favorite' : 'favorite_border'"
          :color="pokemon.isFavorite ? 'red-6' : 'white'"
          @click="toggleFavorite"
        />
      </div>

      <!-- header image content -->
      <div
        class="relative-position flex flex-center z-top q-mt-xl"
        style="width: 180px; height: 180px"
      >
        <!-- watermark -->
        <img
          :src="getElementIcon(pokemon.types[0])"
          alt="Watermark"
          class="absolute watermark-bg pointer-events-none select-none"
        />

        <!-- pokemon sprite -->
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="pokemon-hero-img relative-position"
          style="width: 142px; height: 154px; z-index: 1"
        />
      </div>
    </div>

    <!-- info content -->
    <div class="q-pa-lg">
      <div class="font-poppins text-h4 text-weight-bolder text-capitalize text-grey-10">
        {{ pokemon.name }}
      </div>
      <div class="font-poppins text-subtitle1 text-weight-bold text-grey-7 q-mb-md">
        Nº{{ String(pokemon.id).padStart(3, '0') }}
      </div>

      <!-- types badges -->
      <div class="font-poppins row q-gutter-x-sm items-center q-mb-md">
        <div
          v-for="t in pokemon.types"
          :key="t"
          class="badge-chip row items-center text-white text-caption text-weight-bold"
          :style="{ backgroundColor: typeStyles[t]?.bgBadge || typeStyles.default.bgBadge }"
        >
          <div class="badge-icon-bg row items-center justify-center shrink-0 q-mr-xs">
            <img :src="getElementIcon(t)" :alt="t" class="full-width full-height fit-contain" />
          </div>
          <span class="q-pr-sm">{{ getElementLabelES(t) }}</span>
        </div>
      </div>

      <!-- desc -->
      <div class="font-poppins text-body2 text-grey-8 q-mb-lg" style="line-height: 1.6">
        {{ getDescription() }}
      </div>

      <q-separator class="q-my-md" />

      <!-- atts -->
      <div class="font-poppins row q-col-gutter-md q-mb-lg">
        <!-- weight -->
        <div class="col-6">
          <div class="row items-center text-grey-7 text-caption q-mb-sm">
            <img :src="Weight" alt="Peso" class="q-mr-xs" />
            <span>PESO</span>
          </div>

          <q-card
            flat
            bordered
            class="q-pa-sm"
            style="border-radius: 16px; border: 1px solid #e0e0e0"
          >
            <div class="text-subtitle1 text-weight-medium text-grey-10 text-center">
              {{ pokemon.weight }} kg
            </div>
          </q-card>
        </div>

        <!-- height -->
        <div class="col-6">
          <div class="row items-center text-grey-7 text-caption q-mb-sm">
            <img :src="Height" alt="Altura" class="q-mr-xs" />
            <span>ALTURA</span>
          </div>

          <q-card
            flat
            bordered
            class="q-pa-sm"
            style="border-radius: 16px; border: 1px solid #e0e0e0"
          >
            <div class="text-subtitle1 text-weight-medium text-grey-10 text-center">
              {{ pokemon.height }} m
            </div>
          </q-card>
        </div>

        <!-- category -->
        <div class="col-6">
          <div class="row items-center text-grey-7 text-caption q-mb-sm">
            <img :src="Category" alt="Categoría" class="q-mr-xs" />
            <span>CATEGORÍA</span>
          </div>

          <q-card
            flat
            bordered
            class="q-pa-sm"
            style="border-radius: 16px; border: 1px solid #e0e0e0"
          >
            <div class="text-subtitle2 text-weight-medium text-grey-10 text-uppercase text-center">
              {{ getCategory() }}
            </div>
          </q-card>
        </div>

        <!-- ability -->
        <div class="col-6">
          <div class="row items-center text-grey-7 text-caption q-mb-sm">
            <img :src="Skill" alt="Habilidad" class="q-mr-xs" />
            <span>HABILIDAD</span>
          </div>

          <q-card
            flat
            bordered
            class="q-pa-sm"
            style="border-radius: 16px; border: 1px solid #e0e0e0"
          >
            <div class="text-subtitle2 text-weight-medium text-grey-10 text-capitalize text-center">
              {{ pokemon.ability }}
            </div>
          </q-card>
        </div>
      </div>

      <!-- gender -->
      <div v-if="getGenderRates()" class="q-mb-lg">
        <div class="font-poppins text-subtitle2 text-weight-medium text-grey-9 text-center q-mb-sm">
          GÉNERO
        </div>
        <div class="row bg-grey-3 overflow-hidden" style="height: 10px; border-radius: 5px">
          <div
            class="bg-blue-6"
            :style="{ width: `${getGenderRates().male}%`, height: '100%' }"
          ></div>
          <div
            class="bg-pink-4"
            :style="{ width: `${getGenderRates().female}%`, height: '100%' }"
          ></div>
        </div>
        <div
          class="row justify-between text-caption text-weight-medium font-poppins text-grey-8 q-mt-xs"
        >
          <span>♂ {{ getGenderRates().male }}%</span>
          <span>♀ {{ getGenderRates().female }}%</span>
        </div>
      </div>

      <!-- weakness -->
      <div class="q-mb-xl">
        <div class="font-poppins text-h6 text-weight-medium text-grey-10 q-mb-md">Debilidades</div>
        <div class="row q-gutter-x-sm q-gutter-y-xs">
          <div
            v-for="w in weaknesses"
            :key="w"
            class="badge-chip row items-center text-white text-caption text-weight-bold"
            :style="{ backgroundColor: typeStyles[w]?.bgBadge || typeStyles.default.bgBadge }"
          >
            <div class="badge-icon-bg row items-center justify-center shrink-0 q-mr-xs">
              <img :src="getElementIcon(w)" :alt="w" class="full-width full-height fit-contain" />
            </div>
            <span class="q-pr-sm">{{ getElementLabelES(w) }}</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.header-curved {
  position: relative;
  overflow: hidden;
  min-height: 380px;
}

@media (min-width: 600px) {
  .header-curved {
    min-height: 330px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    background-image: none;
  }
}

.mobile-header-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 80%;
  object-fit: fill;
  z-index: 0;
}

.z-top {
  z-index: 1;
}

.watermark-bg {
  width: 220px;
  height: 220px;
  filter: brightness(0) invert(1);
  opacity: 0.7;
  mask-image: linear-gradient(to top, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%);
  -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.125) 0%, rgba(0, 0, 0, 0.96) 100%);
  right: -20px;
  bottom: -20px;
}

.pokemon-hero-img {
  width: 180px;
  height: 180px;
  margin-top: 100px;
  object-fit: contain;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.18));
}

.favorite-top-btn {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  border: 1.5px solid rgba(255, 255, 255, 0.5);
}

.badge-chip {
  padding: 4px 12px 4px 4px;
  border-radius: 9999px;
  font-size: 0.75rem;
}

.badge-icon-bg {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ffffff;
  padding: 4px;
}
</style>
