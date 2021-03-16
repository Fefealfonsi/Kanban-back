import { Request, Response } from "express";
import { UserInputDTO } from "../business/entities/User";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator"
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
   new IdGenerator(),
   new HashManager(),
   new TokenManager(),
   new UserDatabase()
);

export class UserController {
   async signup(req: Request, res: Response) {
      try {

         const input: UserInputDTO = {
           
            name: req.body.name,
            nickname: req.body.nickname,
            email: req.body.email,
            password: req.body.password
            
         }

         const token = await userBusiness.createUser(input);

         res.status(200).send({ token });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   //login

}