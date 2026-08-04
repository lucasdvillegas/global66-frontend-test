<script setup></script>

<template>
  <div class="column items-center full-width">
    <div class="image-wrapper flex flex-center">
      <img src="~@/assets/images/ui/young.svg" alt="Onboarding 1 - Joven" class="img-young" />
      <img src="~@/assets/images/ui/adult.svg" alt="Onboarding 1 - Adulto" class="img-adult" />
    </div>

    <h1 class="title text-grey-10 q-ma-none q-mb-sm">Todos los Pokémon en un solo lugar</h1>

    <p class="description text-grey-7 q-ma-none">
      Accede a una amplia lista de Pokémon de todas las generaciones creadas por Nintendo
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
</style>
