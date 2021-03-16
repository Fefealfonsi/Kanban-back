import { Request, Response } from "express";
import { CardInputDTO} from "../business/entities/Card";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { CardBusiness } from "../business/CardBusiness";
import { CardDatabase } from "../data/CardDatabase";
// import dayjs from 'dayjs';

// var customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

const cardBusiness = new CardBusiness(
   new IdGenerator(),
   new TokenManager(),
   new CardDatabase()
);

export class CardController {
   async create(req: Request, res: Response) {
      try {

        //  let editDate = dayjs(req.body.date, 'DD/MM/YYYY').format('YYYY/MM/DD')
        

         const input: CardInputDTO = {
            
            subtitle: req.body.subtitle,
            content: req.body.content,
            
        }

         const token = req.headers.authorization as any

         const id = await cardBusiness.createCard(input, token);

         res.status(200).send({id,input});

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }
}