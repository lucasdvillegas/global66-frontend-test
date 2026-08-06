<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  label: String,
  icon: Object,
  to: String,
})

const isActive = computed(() => {
  return route.path === props.to
})

function handleClick() {
  if (props.to) {
    router.push(props.to)
  }
}
</script>

<template>
  <q-item
    clickable
    :tag="props.to ? 'div' : 'a'"
    :href="props.href"
    :target="props.href ? '_blank' : undefined"
    @click="handleClick"
  >
    <q-item-section v-if="props.icon" avatar class="q-pr-none">
      <component
        :is="props.icon"
        :class="isActive ? 'text-primary' : 'text-grey-7'"
        style="width: 24px; height: 24px"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="isActive ? 'text-primary' : 'text-grey-7'">{{
        props.label
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
