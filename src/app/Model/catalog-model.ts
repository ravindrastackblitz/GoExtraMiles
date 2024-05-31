import { CatalogImage } from "./catalog-image";

export interface CatalogModel {

    file: File | any;
    Itemname:string;
    Description:string;
    Country:string;
    Link:any;
    SellingPrice:number;
    Retailprice:number;
    registrationnumber:any;
     names: string[];
     status:catelogStatus;
     isVerified:Boolean;
    isHidden:boolean;
    urls: CatalogImage[];
    
}

enum catelogStatus{
    
    Pending,
    Approved,
    rejected
   
}