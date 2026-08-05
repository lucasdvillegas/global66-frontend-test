<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="column items-center full-width" style="max-width: 328px">
      <div class="flex flex-center q-mb-md">
        <img src="~@/assets/images/ui/magikarp_error.svg" alt="Onboarding 2 - Pokédex" />
      </div>

      <h1 class="title text-grey-10 q-ma-none q-mb-sm text-center">Algo salió mal...</h1>

      <p class="description text-grey-7 q-ma-none text-center">
        No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente
        más tarde.
      </p>

      <div class="column items-center q-mt-md full-width">
        <q-btn
          color="primary"
          unelevated
          rounded
          no-caps
          class="full-width text-btn"
          label="Reintentar"
          to="/pokedex"
        />
      </div>
    </div>
  </q-page>
</template>
