import { CardDatabase } from "../data/CardDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CustomError } from "./error/CustomError";
import { CardInputDTO, CardUpdateDTO,CardDeleteDTO } from "./entities/Card";
import { ChangeManager } from "../services/ChangeManager";


export class CardBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private cardDatabase: CardDatabase,
    private changeManager: ChangeManager
  ) {}

  async createCard(card: CardInputDTO, token: string) {
    try {
      if (!card.subtitle || !card.content) {
        throw new CustomError(400, "invalid input to createCard");
      }

      if (!token) {
        throw new CustomError(401, "Unauthorized");
      }

      const author = this.tokenManager.getData(token);

      const id = this.idGenerator.generate();

      const result = await this.cardDatabase.createCard(
        id,
        author.id,
        card.subtitle,
        card.content
      );

      return result;
    } catch (error) {
      throw new CustomError(error.statusCode || 400, error.message);
    }
  }

  async getCard(token: string) {
   try {

      
     if (!token) {
       throw new CustomError(401, "Unauthorized");
     }

     this.tokenManager.getData(token);

     const result = await this.cardDatabase.getCard();

     return result;

   } catch (error) {
     throw new CustomError(error.statusCode || 400, error.message);
   }
 }

  async updateCard(card: CardUpdateDTO, token: string) {
    try {

     


      if (!card.subtitle || !card.content) {
        throw new CustomError(400, "invalid input to update Card");
      }

      if (!card.id) {
        throw new CustomError(404, "nonexistent id");
      }

      if (!token) {
        throw new CustomError(401, "Unauthorized");
      }


      this.tokenManager.getData(token);

      await this.cardDatabase.updateCard(card.id, card.subtitle, card.content);

      this.changeManager.impressChange(card.id, "Alterado");

    } catch (error) {
      throw new CustomError(error.statusCode || 400, error.message);
    }
  }

  async deleteCard(card: CardDeleteDTO, token: string) {
    try {
      
      if (!card.id) {
        throw new CustomError(404, "nonexistent id");
      }

      if (!token) {
        throw new CustomError(401, "Unauthorized");
      }

      this.tokenManager.getData(token);

      this.changeManager.impressChange(card.id, "Removido");

      const result = await this.cardDatabase.deleteCard(card.id);

      

      return result

    } catch (error) {
      throw new CustomError(error.statusCode || 400, error.message);
    }
  }
}
