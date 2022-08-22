import { NextFunction, Request, Response } from "express";
import pokemon_service from "../../services/pokemon_service";

const getPokemon = async (req: Request, res: Response, next: NextFunction) => {
  const pokemonName = req.params.name;
  try {
    const result = await pokemon_service.getPokemon(pokemonName.toLowerCase());
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deletePokemon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pokemonName = req.params.name;
  try {
    const result = await pokemon_service.deletePokemon(
      pokemonName.toLowerCase()
    );
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default { getPokemon, deletePokemon };
