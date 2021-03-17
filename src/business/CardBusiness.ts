import { CardDatabase } from "../data/CardDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CustomError } from "./error/CustomError";
import { CardInputDTO, CardUpdateDTO,CardDeleteDTO } from "./entities/Card";
// import { stringify } from "uuid";

export class CardBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private cardDatabase: CardDatabase
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

      await this.cardDatabase.createCard(
        id,
        author.id,
        card.subtitle,
        card.content
      );

      return id;
    } catch (error) {
      throw new CustomError(error.statusCode || 400, error.message);
    }
  }

  async updateCard(card: CardUpdateDTO, token: string) {
    try {
      console.log("CARD-ID", card.id);

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

      const getAllcards = await this.cardDatabase.deleteCard(card.id);

      return getAllcards

    } catch (error) {
      throw new CustomError(error.statusCode || 400, error.message);
    }
  }
}
