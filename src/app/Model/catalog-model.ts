import { CatalogImage } from "./catalog-image";

export interface CatalogModel {

    // Itemname: this.Additemdetails.value.itemname,
    // Description: this.Additemdetails.value.description,
    // Country: this.Additemdetails.value.country,
    // Link: this.Additemdetails.value.link,
    // SellingPrice: this.Additemdetails.value.retailprice,
    // Retailprice: this.Additemdetails.value.sellingprice,

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
