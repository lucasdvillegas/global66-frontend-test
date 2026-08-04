<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-black">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <!-- <q-toolbar-title> Quasar App </q-toolbar-title> -->

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <Menu v-for="link in linksList" :key="link.label" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import Menu from '@/components/Menu.vue'

const linksList = [
  {
    label: 'Onboarding',
    caption: 'Página de onboarding',
    icon: 'check_circle',
    to: '/onboarding',
  },
  {
    label: 'Splash Screen',
    caption: 'Pantalla de inicio',
    icon: 'image',
    to: '/splash',
  },
  {
    label: 'Dashboard',
    caption: 'Panel principal',
    icon: 'dashboard',
    to: '/dashboard',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
