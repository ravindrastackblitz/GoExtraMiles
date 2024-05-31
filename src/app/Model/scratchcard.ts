

export interface Scratchcard {  
 isApproved:boolean;
 status:ScratchcardStatus
  productKey:string;
  scratchcardCode:string;

}
 export enum ScratchcardStatus{   
  Pending = 0,
    Approved = 1,
    Deleted = 2  
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



