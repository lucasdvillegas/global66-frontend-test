import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  // Rutas sin layout
  const noLayoutRoutes = [
    {
      path: '/',
      component: () => import('@/layouts/SimpleLayout.vue'),
      children: [
        {
          path: '',
          name: 'Splash',
          component: () => import('@/pages/SplashScreen.vue'),
        },
        {
          path: '/onboarding',
          name: 'Onboarding',
          component: () => import('@/pages/Onboarding.vue'),
        },
      ],
    },
  ]

  // Rutas con layout
  const layoutRoutes = [
    {
      path: '/main',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/pokedex',
          name: 'Pokedex',
          component: () => import('@/pages/Pokedex/Index.vue'),
        },
        {
          path: '/pokedex/:id',
          component: () => import('@/pages/Pokedex/Show.vue'),
        },
        {
          path: '/regions',
          name: 'Regions',
          component: () => import('@/pages/Regions.vue'),
        },
        {
          path: '/favorites',
          name: 'Favorites',
          component: () => import('@/pages/Favorites.vue'),
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () => import('@/pages/Profile.vue'),
        },
        {
          path: '/not-found',
          name: 'NotFound',
          component: () => import('@/pages/NotFound.vue'),
        },
      ],
    },
  ]

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: [
      ...noLayoutRoutes,
      ...layoutRoutes,

      // 404 not found
      {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found',
      },
    ],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  return Router
})
