import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export const getPokemons = async (limit: number = 50, offset: number = 0) => {
  try {
    const { data } = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
    return {
      results: data.results,
      next: data.next,
      previous: data.previous,
      count: data.count,
    };
  } catch (error) {
    console.error('Error fetching Pokemons:', error);
    return {
      results: [],
      next: null,
      previous: null,
      count: 0,
    };
  }
};

export const getPokemonByName = async (name: string) => {
  try {
    const { data } = await api.get(`pokemon/${name}`);
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon "${name}":`, error);
    return null;
  }
};