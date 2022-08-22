import { DataSource } from "typeorm";
import { Pokemon } from "../../entites/pokemon";
import { Move } from "../../entites/move";

const connectToDB = (): DataSource => {
  const myDataSource = new DataSource({
    type: "postgres",
    host: "pokeball.cbjuujfnqmmw.eu-central-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "Thisisapassword",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Pokemon, Move],
    subscribers: [],
    migrations: [],
  });

  myDataSource
    .initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => console.log(error));
  return myDataSource;
};

const myDataSource = connectToDB();
export default myDataSource;
