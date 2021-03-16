import { BaseDatabase } from "./src/data/BaseDatabase"

export class MySqlSetup extends BaseDatabase{
    public async createTable(): Promise<void> {
    try {
        
        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS USER_KANBAN (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                nickname VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `)

        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS CARD_KANBAN (
                id VARCHAR(255) PRIMARY KEY,
                author VARCHAR(255) NOT NULL ,
                subtitle VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                list VARCHAR(255) NOT NULL DEFAULT "To Do",
                FOREIGN KEY (author) REFERENCES USER_KANBAN(id)
            )
        `)

                
        console.log("MySql setup completed!")

        } catch (error) {
            console.log(error)
        }finally{
            BaseDatabase.connection.destroy()
        } 
    }
}

new MySqlSetup().createTable()