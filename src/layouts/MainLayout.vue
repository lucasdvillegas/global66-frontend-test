<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$q.screen.gt.xs" class="bg-transparent text-black">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="$q.screen.gt.xs" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <Menu v-for="link in linksList" :key="link.label" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="$q.screen.lt.sm" class="bg-white text-grey-8">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="mobile-bottom-nav"
      >
        <q-route-tab
          v-for="link in linksList"
          :key="link.label"
          :to="link.to"
          :label="link.label"
          :icon="`img:${link.icon}`"
          icon-size="20px"
          exact
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import Menu from '@/components/Menu.vue'

// import images
import homeIcon from '../assets/images/ui/menu/home.svg'
import regionsIcon from '../assets/images/ui/menu/regions.svg'
import favoritesIcon from '../assets/images/ui/menu/favorites.svg'
import userIcon from '../assets/images/ui/menu/user.svg'

const $q = useQuasar()

const linksList = [
  {
    label: 'Pokedex',
    caption: 'Página de la Pokedex',
    icon: homeIcon,
    to: '/pokedex',
  },
  {
    label: 'Regions',
    caption: 'Pantalla de regiones',
    icon: regionsIcon,
    to: '/regions',
  },
  {
    label: 'Favoritos',
    caption: 'Página de favoritos',
    icon: favoritesIcon,
    to: '/favorites',
  },
  {
    label: 'Perfil',
    caption: 'Página de perfil',
    icon: userIcon,
    to: '/profile',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.mobile-bottom-nav :deep(.q-tab__label) {
  font-size: 11px;
  font-weight: 500;
  margin-top: 2px;
}
</style>
