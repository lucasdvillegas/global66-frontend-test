<script setup></script>

<template>
  <div class="column items-center full-width">
    <div class="image-wrapper flex flex-center">
      <img src="~@/assets/images/ui/hilda.svg" alt="Onboarding 2 - Pokédex" class="img-main" />
    </div>

    <h1 class="title text-grey-10 q-ma-none q-mb-sm">Mantén tu Pokédex actualizada</h1>

    <p class="description text-grey-7 q-ma-none">
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

.leading-snug {
  line-height: 1.25;
}
</style>
