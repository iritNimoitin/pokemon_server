import myDataSource from "../source/config/dbConnection";
import { Move } from "../entites/move";
import { DeleteResult, Repository } from "typeorm";

const movesRepository: Repository<Move> = myDataSource.getRepository(Move);

const getMoveById = (moveId: number): Promise<Move | null> => {
  return movesRepository.findOne({
    where: [
      {
        id: moveId,
      },
    ],
  });
};

const getMoveByName = (moveName: string): Promise<Move | null> => {
  return movesRepository.findOne({
    where: [
      {
        name: moveName,
      },
    ],
  });
};

const addMove = (move: Move): Promise<Move> => {
  return movesRepository.save(move);
};

const updateMove = (move: Move) => {
  return movesRepository.update(
    { id: move.id },
    {
      connectionsNumber: move.connectionsNumber,
    }
  );
};

const deleteMoveById = (moveId: number): Promise<DeleteResult> => {
  return movesRepository.delete(moveId);
};

export default {
  getMoveById,
  addMove,
  getMoveByName,
  updateMove,
  deleteMoveById,
};
