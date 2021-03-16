import { CardDatabase } from "../data/CardDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CustomError } from "./error/CustomError";
import { CardInputDTO } from "./entities/Card";
// import { stringify } from "uuid";


export class CardBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private tokenManager: TokenManager,
      private cardDatabase: CardDatabase,
   ) { }

   async createCard(card: CardInputDTO, token: string) {

      

      if(!card.subtitle ||
         !card.content 
        ){
         throw new CustomError(417, "invalid input to createCard");
      }

      // this.authenticator.getData(token)

      const author = this.tokenManager.getData(token) 

      const id = this.idGenerator.generate();
          

      await this.cardDatabase.createCard(
         id,
         author.id,
         card.subtitle,
         card.content,
         
         
      );

      return id
   }

}