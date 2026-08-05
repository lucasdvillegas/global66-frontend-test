<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['close'])

const selectedTypes = defineModel({
  default: [],
})

const temporaryTypes = ref([])
const types = [
  { value: 'normal', label: 'Normal' },
  { value: 'fighting', label: 'Lucha' },
  { value: 'flying', label: 'Volador' },
  { value: 'poison', label: 'Veneno' },
  { value: 'ground', label: 'Tierra' },
  { value: 'rock', label: 'Roca' },
  { value: 'bug', label: 'Bicho' },
  { value: 'ghost', label: 'Fantasma' },
  { value: 'steel', label: 'Acero' },
  { value: 'fire', label: 'Fuego' },
  { value: 'water', label: 'Agua' },
  { value: 'grass', label: 'Planta' },
  { value: 'electric', label: 'Eléctrico' },
  { value: 'psychic', label: 'Psíquico' },
  { value: 'ice', label: 'Hielo' },
  { value: 'dragon', label: 'Dragón' },
  { value: 'dark', label: 'Siniestro' },
  { value: 'fairy', label: 'Hada' },
]

watch(
  selectedTypes,
  (value) => {
    temporaryTypes.value = [...value]
  },
  { immediate: true },
)

const applyFilters = () => {
  selectedTypes.value = [...temporaryTypes.value]
  emit('close')
}

const cancelFilters = () => {
  temporaryTypes.value = [...selectedTypes.value]
  emit('close')
}
</script>

<template>
  <q-card
    class="rounded-top bg-white"
    style="
      width: 100%;
      max-width: 480px;
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
    "
  >
    <q-card-section>
      <q-btn flat round dense icon="close" @click="cancelFilters" />

      <div class="font-poppins text-h6 q-mt-md text-center">Filtra por tus preferencias</div>
    </q-card-section>

    <q-card-section>
      <div class="font-poppins text-subtitle1 text-weight-medium q-mb-md q-ml-md">Tipo</div>

      <q-separator />

      <q-scroll-area
        style="height: 320px"
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
      >
        <q-list>
          <q-item v-for="type in types" :key="type.value" clickable tag="label">
            <q-item-section class="font-poppins text-body2">
              {{ type.label }}
            </q-item-section>

            <q-item-section side>
              <q-checkbox v-model="temporaryTypes" :val="type.value" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical class="q-pa-md">
      <q-btn
        color="primary"
        rounded
        unelevated
        no-caps
        label="Aplicar"
        class="text-btn q-pb-md"
        @click="applyFilters"
      />

      <q-btn
        flat
        rounded
        no-caps
        label="Cancelar"
        class="text-btn bg-grey-4"
        @click="cancelFilters"
      />
    </q-card-actions>
  </q-card>
</template>
