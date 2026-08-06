import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

import axios from 'axios'

import IndexPage from '@/pages/Pokedex/Index.vue'
import PokedexGrid from '@/components/Pokedex/PokedexGrid.vue'
import EmptyState from '@/components/EmptyState.vue'

// Mockeamos axios para evitar realizar peticiones reales a la API.
// Los tests controlan manualmente qué responde cada request.
vi.mock('axios')

const BASE_URL = 'https://pokeapi.co/api/v2'

// Simulamos la respuesta que devolvería la API al consultar
// el detalle de un Pokémon.
const pokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  types: [{ type: { name: 'grass' } }],
}

// Creamos un router en memoria.
// Algunos componentes internos usan Vue Router (ej: navegación al detalle),
// por lo que necesitamos proveer una instancia durante el test.
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: {
        template: '<div />',
      },
    },
  ],
})

// Función reutilizable para montar la página.
//
// En la aplicación real IndexPage vive dentro de un QLayout de Quasar.
// Aquí recreamos esa estructura para que QPage funcione correctamente.
const mountPage = () =>
  mount(
    {
      components: {
        IndexPage,
      },
      template: `
        <q-layout>
          <q-page-container>
            <q-page>
              <IndexPage />
            </q-page>
          </q-page-container>
        </q-layout>
      `,
    },
    {
      global: {
        // Pinia: requerido porque la página usa stores.
        // Router: requerido por componentes que navegan entre rutas.
        plugins: [createPinia(), router],

        // Evitamos probar la lógica interna de filtros en este test.
        // Ese componente debería tener sus propios tests.
        stubs: {
          PokedexFilters: true,
        },
      },
    },
  )

// Antes de cada test limpiamos los mocks.
// Así cada prueba empieza con un estado independiente.
beforeEach(() => {
  vi.clearAllMocks()
})

describe('Pokedex Index', () => {
  it('muestra los pokemons cuando la petición es exitosa', async () => {
    // Simulamos las respuestas de axios.
    //
    // Primera llamada:
    // GET /pokemon
    // Devuelve la lista inicial de Pokémon.
    //
    // Segunda llamada:
    // GET /pokemon/1/
    // Devuelve el detalle del Pokémon.
    axios.get.mockImplementation((url) => {
      if (url === `${BASE_URL}/pokemon`) {
        return Promise.resolve({
          data: {
            results: [{ url: `${BASE_URL}/pokemon/1/` }],
            next: null,
          },
        })
      }

      return Promise.resolve({
        data: pokemonDetail,
      })
    })

    // Montamos la página y dejamos que se ejecuten
    // las llamadas async realizadas en mounted/onMounted.
    const wrapper = mountPage()

    await router.isReady()

    // Esperamos que todas las promesas pendientes (axios, stores, etc.)
    // terminen antes de hacer las comprobaciones.
    await flushPromises()

    // Buscamos el componente encargado de mostrar la lista.
    const grid = wrapper.findComponent(PokedexGrid)

    // Verificamos que la pantalla renderizó el listado.
    expect(grid.exists()).toBe(true)

    // Verificamos que IndexPage transformó correctamente
    // la respuesta de la API al formato esperado por PokedexGrid.
    expect(grid.props('pokemons')).toEqual([
      {
        id: 1,
        name: 'bulbasaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['grass'],
        isFavorite: false,
      },
    ])

    // Si la carga fue exitosa no debería aparecer
    // el componente de estado vacío/error.
    expect(wrapper.findComponent(EmptyState).exists()).toBe(false)
  })

  it('muestra la pantalla de magikarp error cuando la petición falla', async () => {
    // Simulamos que cualquier llamada a la API falla.
    // Esto permite probar el comportamiento de error
    // sin depender de internet.
    axios.get.mockRejectedValue(new Error('Network Error'))

    const wrapper = mountPage()

    await router.isReady()

    // Esperamos que la promesa rechazada sea procesada
    // por la lógica del componente.
    await flushPromises()

    // Buscamos el componente mostrado cuando no se puede
    // cargar la información.
    const emptyState = wrapper.findComponent(EmptyState)

    // Esperamos que la UI cambie al estado de error.
    expect(emptyState.exists()).toBe(true)

    // Verificamos que el mensaje mostrado sea el esperado.
    expect(wrapper.text()).toContain('Algo salió mal...')
  })
})
