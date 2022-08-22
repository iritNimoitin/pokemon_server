import myDataSource from "../source/config/dbConnection";
import { Pokemon } from "../entites/pokemon";
import { Repository } from "typeorm";

const pokemonRepository: Repository<Pokemon> =
  myDataSource.getRepository(Pokemon);

const getPokemonByName = (pokemonName: string): Promise<Pokemon | null> => {
  return pokemonRepository.findOne({
    where: [
      {
        name: pokemonName,
      },
    ],
    relations: ["move"],
  });
};

const addPokemon = (pokemon: Pokemon): Promise<Pokemon | null> => {
  return pokemonRepository.save(pokemon);
};

const deletePokemon = (pokemonName: string) => {
  return pokemonRepository.delete({ name: pokemonName });
};

export default { getPokemonByName, addPokemon, deletePokemon };
