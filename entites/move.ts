import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Pokemon } from "./pokemon";

@Entity("moves")
export class Move extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  power!: number;

  @Column()
  connectionsNumber!: number;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.move)
  pokemon!: Pokemon[];
}
