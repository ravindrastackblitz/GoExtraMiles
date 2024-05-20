import { CatalogImage } from "./catalog-image";

export interface CatalogModel {


    file: File | any;
    Itemname:string;
    Description:string;
    Country:string;
    Link:any;
    SellingPrice:number;
    Retailprice:number;
    isApproved:boolean;
    registrationnumber:any;
     names: string[];
     
    urls: CatalogImage[];
    
    
    

}
