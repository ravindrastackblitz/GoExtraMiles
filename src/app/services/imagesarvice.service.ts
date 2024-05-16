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

  private imagedata :string | null = null;
 private imagedata1 :string | null = null;
 private imagedata2 :string | null = null;
 private imagedata3 :string | null = null;

 setfile(data:any){
  this.selectedFiles = data;
 }
 
  setImageData(data:string){
    this.imagedata= data;
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
 getImageData() : string | null{
  return this.imagedata

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
