import { BaseDatabase } from "../data/BaseDatabase";
import moment from "moment";

export class ChangeManager extends BaseDatabase{

    public async impressChange( 
        id: string, 
        action: string
        ): Promise<void> {

        const result = await BaseDatabase.connection.raw(`
         SELECT * 
         FROM CARD_KANBAN 
         WHERE id = "${id}";
         `);

            const dateNow = moment().format('L , LTS')

           const mensagem = console.log (dateNow, " - Card", id,"-", result[0][0].subtitle, "-", action) 

            
        return mensagem;
     }
}

