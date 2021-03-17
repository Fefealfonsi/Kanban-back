
export class Card {
    constructor(
       public readonly id: string,
       public readonly author: string,
       public readonly subtitle: string,
       public readonly content: string,
       public readonly list: string
       
    ) { }
 
 
 
    public static toCardModel(user: any): Card {
       return new Card(
          user.id,
          user.author,
          user.subtitle,
          user.content,
          user.list,
          
       );
 
    }
    
 }

 
export interface CardInputDTO {
    subtitle: string,
    content: string,
   
 }

 export interface CardUpdateDTO {
   id:string,
   subtitle: string,
   content: string,
  
}
export interface CardDeleteDTO {
   id:string,
    
}

 export interface toCardModel {
   id:string,
   author:string,
   subtitle:string,
   content:string,
   list:string,
   
}
