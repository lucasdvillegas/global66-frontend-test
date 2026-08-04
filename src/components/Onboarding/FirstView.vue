<script setup></script>

<template>
  <div class="column items-center full-width">
    <div class="image-wrapper flex flex-center">
      <img src="~@/assets/images/ui/young.svg" alt="Onboarding 1 - Joven" class="img-young" />
      <img src="~@/assets/images/ui/adult.svg" alt="Onboarding 1 - Adulto" class="img-adult" />
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

.img-young {
  position: absolute;
  z-index: 0;
  width: 180px;
  height: 220px;
  object-fit: contain;
  transform: translate(-48px, 8px);
}

.img-adult {
  position: relative;
  z-index: 10;
  width: 190px;
  height: 240px;
  object-fit: contain;
  transform: translateX(24px);
}

.description-text {
  max-width: 280px;
  line-height: 1.4;
}

.leading-snug {
  line-height: 1.25;
}
</style>
