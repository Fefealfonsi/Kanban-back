
export class User {
    constructor(
       public readonly id: string,
       public readonly name: string,
       public readonly nickname: string,
       public readonly email: string,
       public readonly password: string
       
    ) { }
 
 
 
    public static toUserModel(user: any): User {
       return new User(
          user.id,
          user.name,
          user.nickname,
          user.email,
          user.password,
          
       );
 
    }
    
 }

 export interface LoginInputDTO {
    nickname: string;
    password: string;
 }

export interface UserInputDTO {
    name: string;
    nickname: string;
    email: string;
    password: string;
 }


export interface AuthenticationData {
    id: string;
    nickname:string;
 }