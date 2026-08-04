<script setup></script>

<template>
  <div class="column items-center full-width">
    <div class="image-wrapper flex flex-center">
      <img src="~@/assets/images/ui/hilda.svg" alt="Onboarding 2 - Pokédex" class="img-main" />
    </div>

    <h1 class="text-h5 text-weight-bold text-grey-10 q-ma-none q-mb-sm leading-snug">
      Mantén tu Pokédex actualizada
    </h1>

    <p class="text-body2 text-grey-7 description-text q-ma-none">
      Regístrate y guarda tu perfil, Pokémon favoritos, configuraciones y mucho más en la aplicación
    </p>
  </div>
</template>

<style scoped>
.image-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
}

.img-main {
  width: 200px;
  height: 220px;
  object-fit: contain;
}

.description-text {
  max-width: 280px;
  line-height: 1.4;
}

.leading-snug {
  line-height: 1.25;
}
</style>
