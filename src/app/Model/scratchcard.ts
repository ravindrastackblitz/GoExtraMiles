

export interface Scratchcard {  
 isApproved:boolean;
 status:ScratchcardStatus
  productKey:string;
  scratchcardCode:string;
  registrationnumber:string;
}
 export enum ScratchcardStatus{   
  Pending = "Pending",
    Approved = "Appproved",
    Deleted = "Deleted"  
}
