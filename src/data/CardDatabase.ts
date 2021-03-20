import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../business/error/CustomError";
// import {Card} from "../business/entities/card";

export class CardDatabase extends BaseDatabase {
  private static TABLE_NAME = "CARD_KANBAN";

  public async createCard(
    id: string,
    author: string,
    subtitle: string,
    content: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .raw(`INSERT INTO ${CardDatabase.TABLE_NAME}(id, author,  subtitle, content)
         VALUES( 
         "${id}",
         "${author}",
         "${subtitle}",
         "${content}"
         )
        
         `);

         const result = await BaseDatabase.connection.raw(`
         SELECT * 
         FROM ${CardDatabase.TABLE_NAME}
         WHERE id = "${id}";
         `);

         return (result[0])


    } catch (error) {
      console.log(error);
      throw new CustomError(
        500,
        "An unexpected error ocurred in CardDatabase "
      );
    }
  }
  public async getCard( ): Promise<void> {
   try {
      const result = await BaseDatabase.connection.raw(`
      SELECT * 
      FROM ${CardDatabase.TABLE_NAME};
      `);

      return (result[0])
   
   } catch (error) {
     console.log(error);
     throw new CustomError(
       500,
       "An unexpected error ocurred in CardDatabase "
     );
   }
 }

  public async updateCard(
    id: string,
    subtitle: string,
    content: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection.raw(`UPDATE ${CardDatabase.TABLE_NAME}
       SET subtitle = "${subtitle}", content = "${content}" 
       WHERE id = "${id}";
      
       `);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        500,
        "An unexpected error ocurred in CardDatabase "
      );
    }
  }

  public async deleteCard(id: string): Promise<void> {
    try {
      await BaseDatabase.connection.raw(`
      DELETE FROM ${CardDatabase.TABLE_NAME}
      WHERE id = '${id}'
    `);

      const result = await BaseDatabase.connection.raw(`
        SELECT * 
        FROM ${CardDatabase.TABLE_NAME}
    `);

      return (result[0])

    } catch (error) {
      console.log(error);
      throw new CustomError(
        500,
        "An unexpected error ocurred in CardDatabase "
      );
    }
  }

  public async updateList(
    id: string,
    list: string,
   
  ): Promise<void> {
    try {
      await BaseDatabase.connection.raw(`UPDATE ${CardDatabase.TABLE_NAME}
       SET list = "${list}"
       WHERE id = "${id}";
      
       `);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        500,
        "Accepted list values are 'ToDo', 'Doing' and 'Done'. "
      );
    }
  }
}
