import externalDA, { PokePokemon } from "../dataAccess/externalDA";
import pokemonDA from "../dataAccess/pokemonDA";
import movesDA from "../dataAccess/movesDA";
import { Pokemon } from "../entites/pokemon";
import { Move } from "../entites/move";

const getPokemon = async (pokemonName: string): Promise<Pokemon> => {
  const pokemon: Pokemon = (await pokemonDA.getPokemonByName(
    pokemonName
  )) as Pokemon;
  if (pokemon) {
    return pokemon;
  }
  return await fetchPokemon(pokemonName);
};

const fetchPokemon = async (pokemonName: string): Promise<Pokemon> => {
  const pokePokemon: PokePokemon = (
    await externalDA.getPokemonFromPokeAPI(pokemonName)
  ).data;
  if (!pokePokemon) {
    throw `Cann't find pokemon with name: "${pokemonName}"`;
  }
  const bestMove: Move = await getBestMove(pokePokemon);
  const moveFromDB: Move = await checkIfMoveExistsAndUpdate(bestMove);
  const pokemon: Pokemon = new Pokemon();
  pokemon.name = pokemonName;
  pokemon.move = moveFromDB;
  return (await pokemonDA.addPokemon(pokemon)) as Pokemon;
};

const getBestMove = async (pokemon: PokePokemon): Promise<Move> => {
  let bestMove: Move = new Move();
  let bestPower: number = 0;
  const pokeMoves: Move[] = await externalDA.getMoveFromPokeAPI(
    pokemon.moves.map((move) => move.move.url)
  );
  for (const move of pokeMoves) {
    if (move.power && move.power > bestPower) {
      bestPower = move.power;
      bestMove.name = move.name;
      bestMove.power = move.power;
    }
  }
  return bestMove;
};

const checkIfMoveExistsAndUpdate = async (move: Move): Promise<Move> => {
  let moveFromDB: Move = (await movesDA.getMoveByName(move.name)) as Move;
  if (moveFromDB) {
    moveFromDB.connectionsNumber++;
    await movesDA.updateMove(moveFromDB);
  } else {
    move.connectionsNumber = 1;
    moveFromDB = await movesDA.addMove(move);
  }
  return moveFromDB;
};

const deletePokemon = async (pokemonName: string): Promise<string> => {
  const pokemon: Pokemon = (await pokemonDA.getPokemonByName(
    pokemonName
  )) as Pokemon;
  if (pokemon) {
    await pokemonDA.deletePokemon(pokemonName);
    if (pokemon.move.connectionsNumber === 1) {
      await movesDA.deleteMoveById(pokemon.move.id);
    } else {
      pokemon.move.connectionsNumber--;
      await movesDA.updateMove(pokemon.move);
    }
  } else {
    throw `Can't find pokemon with name: "${pokemonName}"`;
  }
  return `Pokemon with name: "${pokemonName}", was deleted`;
};

export default { getPokemon, deletePokemon };
