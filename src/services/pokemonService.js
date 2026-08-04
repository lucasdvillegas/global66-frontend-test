import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

/**
 * get a page of Pokémon from the API, with optional limit and offset parameters.
 */
export const fetchPokemonPage = ({ limit, offset, timeout } = {}) => {
  return axios
    .get(`${BASE_URL}/pokemon`, { params: { limit, offset }, timeout })
    .then((response) => response.data)
}

const fetchPokemonDetail = (url) => axios.get(url).then((response) => response.data)

const mapPokemonDetail = (detail) => ({
  id: detail.id,
  name: detail.name,
  image: detail.sprites.front_default,
  types: detail.types.map((t) => t.type.name),
  isFavorite: false,
})

/**
 * returns a promise that resolves to an array of Pokémon details, given an array of Pokémon results from the API.
 */
export const fetchPokemonDetails = (results) =>
  Promise.all(results.map((item) => fetchPokemonDetail(item.url).then(mapPokemonDetail)))
