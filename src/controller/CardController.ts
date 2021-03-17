import { Request, Response } from "express";
import { CardInputDTO, CardUpdateDTO, CardDeleteDTO } from "../business/entities/Card";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { CardBusiness } from "../business/CardBusiness";
import { CardDatabase } from "../data/CardDatabase";
import { ChangeManager } from "../services/ChangeManager";
// import dayjs from 'dayjs';

// var customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

const cardBusiness = new CardBusiness(
  new IdGenerator(),
  new TokenManager(),
  new CardDatabase(),
  new ChangeManager()
);

export class CardController {
  async createCard(req: Request, res: Response) {
    try {
      const input: CardInputDTO = {
        subtitle: req.body.subtitle,
        content: req.body.content,
      };

      const token = req.headers.authorization as any;

      const result = await cardBusiness.createCard(input, token);

      res.status(200).send({ result});
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
  async getCard(req: Request, res: Response) {
   try {
   
     const token = req.headers.authorization as any;

     const result = await cardBusiness.getCard(token);

     res.status(200).send({ result });
   } catch (error) {
     res.status(error.statusCode || 400).send({ error: error.message });
   }
 }

  async updateCard(req: Request, res: Response) {
    try {
   

      const input: CardUpdateDTO = {
        id: req.params.id,
        subtitle: req.body.subtitle,
        content: req.body.content,
      };

      const token = req.headers.authorization as any;

      await cardBusiness.updateCard(input, token);

      res.status(200).send({ input });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  async deleteCard(req: Request, res: Response) {
    try {
      //  let editDate = dayjs(req.body.date, 'DD/MM/YYYY').format('YYYY/MM/DD')

      const input: CardDeleteDTO = {
        id: req.params.id,
      }

      const token = req.headers.authorization as any;

      const result = await cardBusiness.deleteCard(input, token);

      res.status(200).send({ result });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
