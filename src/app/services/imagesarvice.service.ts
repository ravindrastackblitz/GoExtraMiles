import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesarviceService {

  private IsEdit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get getuserrole$(): Observable<boolean> { return this.IsEdit.asObservable(); };

  setdata(IsEdit: boolean) {
    this.IsEdit.next(IsEdit)
  }
  setFile(data:any)
  {
    this.selectedFiles=data;
  }

  private selectedFiles?: FileList |undefined;

  private  selectedgstFile ?:FileList | undefined;

  private imagedata :string | null = null;
  private imageData4: any | string | ArrayBuffer | null = null;
 private imagedata1 :string | null = null;
 private imagedata2 :string | null = null;
 private imagedata3 :string | null = null;

 setfile(some:any){
  this.selectedFiles = some;
 }
 setfile1(some:any){
  this.selectedgstFile = some;
 }
 
  setImageData(data:string){
    this.imagedata= data;
  }
  setImageData4(data:string){
    this.imageData4= data;
  }
  getFile()
  {
    return this.selectedFiles
    }
  setImageData1(data:string){
    this.imagedata1= data;

  }
  setImageData2(data:string){
    this.imagedata2= data;

  }
  setImageData3(data:string){
    this.imagedata3= data;

  }

  getfile(){
return this.selectedFiles
  }
  getfile1(){
    return this.selectedgstFile
      }
 getImageData() : string | null{
  return this.imagedata

 }
 getImageData4() : string | null{
  return this.imageData4

 }
 getImageData1() : string | null{
  return this.imagedata1
 }
 getImageData2() : string | null{
  return this.imagedata2

 }
 getImageData3() : string | null{
  return this.imagedata3

 }
}
