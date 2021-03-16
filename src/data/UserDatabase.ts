import { BaseDatabase } from "./BaseDatabase";
import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {

   private static TABLE_NAME = "USER_KANBAN";

   private static toUserModel(user: any): User {
      return new User(
         user.id,
         user.name,
         user.nickname,
         user.email,
         user.password
         
      );
   }

   public async createUser(
      id: string,
      name: string,
      nickname: string,
      email: string,
      password: string
      
   ): Promise<void> {
      try {
         await BaseDatabase.connection.raw(`
         INSERT INTO ${UserDatabase.TABLE_NAME} (id, name, nickname, email, password)
         VALUES ("${id}","${name}","${nickname}","${email}","${password}");
        `)

        

      } catch (error) {
         throw new CustomError(500, ` Nickname '${nickname}'or e-mail '${email}' already exists`);
      }
   }

  //login
}