<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

// components
import Menu from '@/components/Menu.vue'

// icons
import HomeIcon from '../assets/images/ui/menu/home.svg'
import RegionsIcon from '../assets/images/ui/menu/regions.svg'
import FavoritesIcon from '../assets/images/ui/menu/favorites.svg'
import UserIcon from '../assets/images/ui/menu/user.svg'

const $q = useQuasar()

const linksList = [
  {
    label: 'Pokedex',
    caption: 'Página de la Pokedex',
    icon: HomeIcon,
    to: '/pokedex',
  },
  {
    label: 'Regions',
    caption: 'Pantalla de regiones',
    icon: RegionsIcon,
    to: '/regions',
  },
  {
    label: 'Favoritos',
    caption: 'Página de favoritos',
    icon: FavoritesIcon,
    to: '/favorites',
  },
  {
    label: 'Perfil',
    caption: 'Página de perfil',
    icon: UserIcon,
    to: '/profile',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

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

    <!-- mobile bottom bar -->
    <q-footer v-if="$q.screen.lt.sm" class="bg-white text-grey-8 custom-bottom-bar">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="mobile-bottom-nav"
      >
        <q-route-tab v-for="link in linksList" :key="link.label" :to="link.to" exact>
          <component :is="link.icon" class="tab-icon" />

          <div class="q-tab__label font-poppins">
            {{ link.label }}
          </div>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.custom-bottom-bar {
  border-radius: 24px 24px 0 0;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 77px;
}

.mobile-bottom-nav :deep(.q-tab) {
  min-height: 77px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mobile-bottom-nav :deep(.q-tab__label) {
  font-size: 11px;
  font-weight: 500;
  margin-top: 4px;
}

.tab-icon {
  width: 24px;
  height: 24px;
  color: currentColor;
}
</style>
