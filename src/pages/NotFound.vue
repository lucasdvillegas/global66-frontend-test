<script setup>
import Magikarp from '@/assets/images/ui/magikarp_error.svg?url'
import EmptyState from '@/components/EmptyState.vue'
</script>

<template>
  <q-page padding>
    <div class="column justify-center items-center" style="min-height: 70vh">
      <EmptyState
        :image="Magikarp"
        title="Página no encontrada"
        description="Lo sentimos, no pudimos encontrar la página que buscas."
      />
    </div>
  </q-page>
</template>
