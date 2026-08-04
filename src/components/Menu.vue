<template>
  <q-item
    clickable
    :tag="props.to ? 'div' : 'a'"
    :href="props.href"
    :target="props.href ? '_blank' : undefined"
    @click="handleClick"
  >
    <q-item-section v-if="props.icon" avatar class="q-pr-none">
      <q-img :src="icon" style="width: 24px; height: 24px" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  label: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  href: {
    type: String,
    default: null,
  },

  to: {
    type: String,
    default: null,
  },

  icon: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: null,
  },
})

function handleClick() {
  if (props.to) {
    router.push(props.to)
  }
}
</script>
