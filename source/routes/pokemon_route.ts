import express from "express";
import controller from "../controllers/pokemon_controller";

const router = express.Router();

router.get("/:name", controller.getPokemon);
router.delete("/:name", controller.deletePokemon);

export = router;
