import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Move } from "./move";

@Entity("pokemons")
export class Pokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Move, (move) => move.pokemon)
  @JoinColumn({
    name: "move_id",
  })
  move!: Move;
}
