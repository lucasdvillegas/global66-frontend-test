# Pokédex (vue-frontend-test)

Aplicación que consume [PokeAPI](https://pokeapi.co) para explorar Pokémones, filtrarlos por tipo o nombre, ver su detalle y marcarlos como favoritos.

## Tecnologías utilizadas

- **[Vue 3](https://vuejs.org/)** (Composition API + `<script setup>`)
- **[Quasar Framework 2](https://quasar.dev/)** — componentes UI, layouts responsivos y plugins (`Notify`, `Loading`)
- **[Vite](https://vitejs.dev/)** — build/dev server, integrado vía `@quasar/app-vite`
- **[Pinia](https://pinia.vuejs.org/)** + **[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)** — estado global de favoritos, persistido en `localStorage`
- **[Vue Router](https://router.vuejs.org/)** — ruteo entre onboarding, pokedex, detalle y favoritos
- **[Axios](https://axios-http.com/)** — consumo de PokeAPI
- **[Vitest](https://vitest.dev/)** + **[@vue/test-utils](https://test-utils.vuejs.org/)** + **jsdom** — tests unitarios/de componentes
- **CSS** — estilos custom sobre las variables de Quasar
- **ESLint** + **Prettier** — lint y formato de código

## Decisiones de diseño para soportar grandes volúmenes de datos

Aunque el alcance de la app es pequeño, PokeAPI trae más de 100 Pokémones, por lo que se evitó cargar todo de una sola vez:

- **Paginación con infinite scroll**: el listado se trae de a `limit=12` (`q-infinite-scroll`) en lugar de pedir todos los registros al entrar a la página.
- **Deduplicación de resultados**: cada página nueva se filtra contra los IDs ya cargados (`appendUnique`) para evitar Pokémon repetidos.
- **Detalle bajo demanda**: el detalle de cada Pokémon (sprite, tipos) se pide en paralelo (`Promise.all`) sólo para los ítems de la página actual, no para todo el dataset.
- **Filtros delegados al backend**: la búsqueda por nombre y el filtro por tipo golpean endpoints puntuales de PokeAPI (`/pokemon/:name`, `/type/:type`) en vez de traer todo y filtrar en el cliente.
- **Componentes desacoplados de la fuente de datos**: `PokedexGrid` sólo recibe props/emite eventos, por lo que se reutiliza tanto para el scroll infinito como para listas estáticas (ej. favoritos).
- **Favoritos persistidos localmente**: se guardan en `localStorage` vía `pinia-plugin-persistedstate`, evitando llamadas adicionales al backend o la pérdida de datos al recargar.
- **Feedback de estado**: loaders iniciales/incrementales y un `EmptyState` de error para que la UI responda de forma clara mientras se resuelven las peticiones asíncronas.

## Instalación de dependencias

```bash
pnpm install
# or: yarn/npm/bun install
```

### Iniciar la app en modo desarrollo

```bash
quasar dev
```

### Formatear y lintear los archivos

```bash
pnpm run lint
# or: yarn/npm/bun run lint
```

...o solo verificar formato y lint:

```bash
pnpm run lint:check
# or: yarn/npm/bun run lint:check
```

### Compilar la app para producción

```bash
quasar build
```

## Plus

La documentación en **[Quasar Framework 2](https://quasar.dev/quasar-cli-vite/testing-and-auditing)** sobre testing con vitest está desactualizada por lo que se tuvo que implementar de forma personalizada. Para esto se renegó un poco con Copilot - Claude Sonnet 5 y Chat GPT.

El test sólo se implemento en el Index.vue para corroborar que proceda correctamente tanto en el éxito como en la falla y, queda a modo de ejemplo para futuros usos en otros proyectos.

### Correr los tests

```bash
npx vitest run
```