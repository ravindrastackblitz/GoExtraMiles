

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


// enum catelogStatus{
    
//     Pending,
//     Approved,
//     rejected
   
// }

// catelouge
// ----------

// Isverified t/false(default)
// status ->catelogStatus-pending
// ishidden->false (default)//

// ScratchcardStatus
// -----------------
// Isverified t/false(default)
// status ->catelogStatus-pending



