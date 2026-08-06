<script setup>
// components
import EmptyState from '@/components/EmptyState.vue'

// icons
import Magikarp from '@/assets/images/ui/jigglypuff_soon.svg?url'
</script>

<template>
  <q-page padding>
    <div class="column justify-center items-center" style="min-height: 70vh">
      <EmptyState
        :image="Magikarp"
        title="¡Muy pronto disponible!"
        description="Estamos trabajando para traerte esta sección. Vuelve más adelante para descubrir todas las novedades."
      />
    </div>
  </q-page>
</template>
