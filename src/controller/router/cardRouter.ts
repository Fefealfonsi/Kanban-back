import express from "express";
import { CardController } from "../CardController";

export const cardRouter = express.Router();

const cardController = new CardController();

cardRouter.post("/create", cardController.create);
cardRouter.put("/update/:id", cardController.update);
cardRouter.delete("/delete/:id", cardController.delete);