import express from "express";
import { CardController } from "../CardController";

export const cardRouter = express.Router();

const cardController = new CardController();

cardRouter.post("/create", cardController.create);