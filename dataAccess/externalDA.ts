import axios from "axios";
import { Move } from "../entites/move";

export interface PokePokemon {
  moves: [{ move: { url: string } }];
}

const getPokemonFromPokeAPI = async (pokemonName: string) => {
  try {
    return await axios.get<PokePokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    );
  } catch (error) {
    throw `Pokemone with name: "${pokemonName}", doesn't exists.`;
  }
};

const getMoveFromPokeAPI = async (urls: string[]): Promise<Move[]> => {
  try {
    return Promise.all(
      urls.map(async (url) => {
        const res: Move = (await axios.get<Move>(url)).data;
        return res;
      })
    );
  } catch (error) {
    throw `Move not found.`;
  }
};

export default { getPokemonFromPokeAPI, getMoveFromPokeAPI };
