import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../business/error/CustomError";
// import {Card} from "../business/entities/card";

export class CardDatabase extends BaseDatabase {

   private static TABLE_NAME = "CARD_KANBAN";

   public async createCard(
      id: string,
      author: string,
      subtitle: string,
      content:string,
      

   ): Promise<void> {
      try {

         await BaseDatabase.connection.raw(`INSERT INTO ${CardDatabase.TABLE_NAME}(id, author,  subtitle, content)
         VALUES( 
         "${id}",
         "${author}",
         "${subtitle}",
         "${content}"
         )
        
         `)

         

         
      } catch (error) {
         console.log(error)
         throw new CustomError(500, "An unexpected error ocurred in CardDatabase ");
      }
   }
}