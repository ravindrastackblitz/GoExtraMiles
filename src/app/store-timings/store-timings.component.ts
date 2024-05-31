
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormBuilder ,FormControl,FormGroup, Validators} from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-store-timings',
  templateUrl: './store-timings.component.html',
  styleUrls: ['./store-timings.component.css']
})
export class StoreTimingsComponent {
  @Input() formdata:any

  @Output() timedata:EventEmitter<string> = new EventEmitter();
 timedata1!:string;
  Timedetails!:FormGroup;
  storetime:any = {Monday:null,Tueseday:null,Wednesday:null,Thusday:null,Friday:null,Saturday:null,Sunday:null}
  selectedOption: string = '';
  time!:boolean;
time1!:boolean;
  select(){
  this.time=true;
  }
  select1(){
    this.time=false;
  }
 
 
  //formdata =JSON.parse(JSON.stringify(localStorage.getItem('form-data')) || '{}');


  public storetimes! : FormGroup;
  Allclick:boolean=false;
  buttonClicked: boolean = false;
  buttonClicked1: boolean = false;
  buttonClicked2: boolean = false;
  buttonClicked3: boolean = false;
  buttonClicked4: boolean = false;
  buttonClicked5: boolean = false;
  buttonClicked6: boolean = false;

  constructor(private formbuilder:FormBuilder, private router:Router) {}
  ngOnInit(){
this.Timedetails=this.formbuilder.group(
  {
    radiotime:new FormControl('',Validators.required)
  }
)
    this.storetimes = this.formbuilder.group({
      Monopen: [''], 
      Monclose: [''],
      Tueopen: [''], 
      Tueclose: [''],
      Wedopen: [''], 
      Wedclose: [''],
      Thuopen: [''], 
      Thuclose: [''],
      Friopen: [''], 
      Friclose: [''],
      Satopen: [''], 
      Satclose: [''],
      Sunopen:[''],
      Sunclose:[''],
      Alldaysopen:[''],
      Alldaysclose:['']

    });

}
  onsubmit():void{
  }
close1(){
  this.timedata.emit(this.timedata1='');
}

  data(){
    if(this.Timedetails.valid)
      {
        var res=this.Timedetails.value
        if(res.radiotime=="Available 24/7")
          {
          this.timedata1 = res.radiotime;
          this.timedata.emit(this.timedata1);
        
          }
          else{
            if(this.storetime !=null){
              this.timedata1 = res.radiotime;
              this.timedata.emit(this.timedata1);
              localStorage.setItem("storetime1",JSON.stringify(this.storetime));
          
            }
            }
      }
      
  }

  Click()
  {
    this.Allclick=true;
  }
  onClick() {
    this.buttonClicked = true;
  }
  onClick1() {
    this.buttonClicked1 = true;
  }
  onClick2() {
    this.buttonClicked2 = true;
  }
  onClick3() {
    this.buttonClicked3 = true;
  }
  onClick4() {
    this.buttonClicked4 = true;
  }
  onClick5() {
    this.buttonClicked5 = true;
  }
  onClick6() {
    this.buttonClicked6 = true;
  }
  close(): void {
    if(this.Allclick == true){
      const daystime=this.storetimes.value.Alldaysopen +' - ' +this.storetimes.value.Alldaysclose;
      this.storetime.Monday=" "+daystime;
      this.storetime.Tueseday=" "+daystime;
      this.storetime.Wednesday=" "+daystime;
      this.storetime.Thusday=" "+daystime;
      this.storetime.Friday=" "+daystime;
      this.storetime.Saturday=" "+daystime;
      this.storetime.Sunday=" "+daystime;
      this.Allclick=false;
      this.data();
    }
    else{
      const mon1 = this.storetimes.value.Monopen;
      const mon2 = this.storetimes.value.Monclose;
      if(mon1 == "" && mon2 ==""){
        this.storetime.Monday = " " + "00:00"+ '  -  ' +"00:00"
      }else{
        this.storetime.Monday = " " + mon1+ '  -  ' +mon2 
      }
      
     // console.log(this.storetime.Monday);
      this.buttonClicked = false;
    
      const tue1 = this.storetimes.value.Tueopen;
      const tue2 = this.storetimes.value.Tueclose;
      //console.log("Tue : "+tue1+ '  '+tue2+);
      if(tue1 == "" && tue2 ==""){
        this.storetime.Tueseday  = " " + "00:00"+ '  -  ' +"00:00"
      }else{
        this.storetime.Tueseday  = " "+tue1+ '  -  '+tue2
      }
     
      this.buttonClicked1 = false;
   
      const wed1 = this.storetimes.value.Wedopen;
      const wed2 = this.storetimes.value.Wedclose;
      //console.log("Wed : "+wed1+ '  '+wed2+);
      if(wed1 == "" && wed2 ==""){
        this.storetime.Wednesday  = " " + "00:00"+ '  -  ' +"00:00"
      }else{
        this.storetime.Wednesday = " "+wed1+ '  -  '+wed2
      }
 
      this.buttonClicked2 = false;
    
      const thu1 = this.storetimes.value.Thuopen;
      const thu2 = this.storetimes.value.Thuclose;
      //console.log("Thu : "+thu1+ '  '+thu2+);
      if(thu1 == "" && thu2 ==""){
        this.storetime.Thusday = " " + "00:00"+ '  -  ' +"00:00"
      }else{
        this.storetime.Thusday = " "+thu1+ '  -  '+thu2
      }

      this.buttonClicked3 = false;
    
      const fri1 = this.storetimes.value.Friopen;
      const fri2 = this.storetimes.value.Friclose;
     // console.log("Fri : "+fri1+ '  '+fri2+);
     if(fri1 == "" && fri2 ==""){
      this.storetime.Friday = " " + "00:00"+ '  -  ' +"00:00"
    }else{
      this.storetime.Friday  = " "+fri1+ '  -  '+fri2
    }
   
      this.buttonClicked4 = false;
    
      const sat1 = this.storetimes.value.Satopen;
      const sat2 = this.storetimes.value.Satclose;
      //console.log("Sat : "+sat1+ '  '+sat2+);
      if(sat1 == "" && sat2 ==""){
        this.storetime.Saturday = " " + "00:00"+ '  -  ' +"00:00"
      }else{
        this.storetime.Saturday  = " "+sat1+ '  -  '+sat2
      }
      
      this.buttonClicked5 = false;
   
      const sun1 = this.storetimes.value.Sunopen;
      const sun2 = this.storetimes.value.Sunclose;
     // console.log("Sun : "+sun1+ '  '+sun2+);
     if(sun1 == "" && sun2 ==""){
      this.storetime.Sunday = " Closed "; 
    }else{
      this.storetime.Sunday  = " "+sun1+ '  -  '+sun2
    }
     
      this.buttonClicked6 = false;
    this.data()
    }
  }
  ngOnChanges():void
  {
    console.log(this.formdata);
   // this.Timedetails?.controls['radiotime'].setValue(this.formdata);
    if(this.formdata != ""){
      if(this.formdata == "Pick Days")
        {
          this.Timedetails.controls['radiotime'].setValue(this.formdata);
          this.time=true;
         this.buttonClicked = true;
         this.buttonClicked1 = true;
         this.buttonClicked2 = true;
         this.buttonClicked3 = true;
         this.buttonClicked4 = true;
         this.buttonClicked5 = true;
         this.buttonClicked6 = true;

          this.storetimes.patchValue({
            Monopen: [''], 
            Monclose: [''],
            Tueopen: [''], 
            Tueclose: [''],
            Wedopen: [''], 
            Wedclose: [''],
            Thuopen: [''], 
            Thuclose: [''],
            Friopen: [''], 
            Friclose: [''],
            Satopen: [''], 
            Satclose: [''],
            Sunopen:[''],
            Sunclose:[''],

          })
          
      }
     else if(this.formdata == "Available 24/7"){
      this.Timedetails.controls['radiotime'].setValue(this.formdata);
      this.time=false;
     }
     else{
      this.Timedetails.controls['radiotime'].setValue('');
     }
    }
  }

}

