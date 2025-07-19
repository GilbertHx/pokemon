import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 5000,
});

export const getPokemons = async (limit: number = 50) => {
  try {
    const { data } = await api.get(`pokemon?limit=${limit}`);
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemons:', error);
    return [];
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