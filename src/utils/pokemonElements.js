// src/utils/pokemonElements.js

const elementIcons = {
  bug: new URL('../assets/images/ui/elements/bug.svg', import.meta.url).href,
  dark: new URL('../assets/images/ui/elements/dark.svg', import.meta.url).href,
  dragon: new URL('../assets/images/ui/elements/dragon.svg', import.meta.url).href,
  electric: new URL('../assets/images/ui/elements/electric.svg', import.meta.url).href,
  fairy: new URL('../assets/images/ui/elements/fairy.svg', import.meta.url).href,
  fighting: new URL('../assets/images/ui/elements/fighting.svg', import.meta.url).href,
  fire: new URL('../assets/images/ui/elements/fire.svg', import.meta.url).href,
  flying: new URL('../assets/images/ui/elements/flying.svg', import.meta.url).href,
  ghost: new URL('../assets/images/ui/elements/ghost.svg', import.meta.url).href,
  grass: new URL('../assets/images/ui/elements/grass.svg', import.meta.url).href,
  ground: new URL('../assets/images/ui/elements/ground.svg', import.meta.url).href,
  ice: new URL('../assets/images/ui/elements/ice.svg', import.meta.url).href,
  normal: new URL('../assets/images/ui/elements/normal.svg', import.meta.url).href,
  poison: new URL('../assets/images/ui/elements/poison.svg', import.meta.url).href,
  psychic: new URL('../assets/images/ui/elements/psychic.svg', import.meta.url).href,
  rock: new URL('../assets/images/ui/elements/rock.svg', import.meta.url).href,
  steel: new URL('../assets/images/ui/elements/steel.svg', import.meta.url).href,
  water: new URL('../assets/images/ui/elements/water.svg', import.meta.url).href,
}

const typeTranslations = {
  grass: 'Planta',
  fire: 'Fuego',
  water: 'Agua',
  poison: 'Veneno',
  electric: 'Eléctrico',
  bug: 'Bicho',
  flying: 'Volador',
  normal: 'Normal',
  ground: 'Tierra',
  fairy: 'Hada',
  fighting: 'Lucha',
  psychic: 'Psíquico',
  rock: 'Roca',
  steel: 'Acero',
  ice: 'Hielo',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
}

export const getElementIcon = (typeName) => {
  if (!typeName) return null
  const cleanType = typeName.toLowerCase().trim()
  return elementIcons[cleanType] || null
}

export const getElementLabelES = (typeName) => {
  if (!typeName) return ''
  const cleanType = typeName.toLowerCase().trim()
  return typeTranslations[cleanType] || cleanType
}
