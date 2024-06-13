
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormBuilder ,FormControl,FormGroup, Validators} from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Storetimings } from '../Model/storetimings';
import { StoretimingService } from '../services/storetiming.service';
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
  storingTimings!:Storetimings
  storetime:any = {Monday:null,Tueseday:null,Wednesday:null,Thusday:null,Friday:null,Saturday:null,Sunday:null}
  selectedOption: string = '';
  phone:any = localStorage.getItem('phoneNumber')
  time!:boolean;

  store :any; 
storetable :any;
  
time1!:boolean;
togMon!:boolean;
togTue!:boolean;
togWed!:boolean;
togThu!:boolean;
togFri!:boolean;
togSat!:boolean;
togSun:boolean = true;

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

  constructor(private formbuilder:FormBuilder, private router:Router, private timings:StoretimingService) {
    this.store =JSON.parse(JSON.stringify(localStorage.getItem('timetable')));
    if(this.store !== undefined){
      this.storetable =JSON.parse(this.store);
    }
  }
  ngOnInit(){
this.Timedetails=this.formbuilder.group(
  {
    radiotime:new FormControl('',Validators.required)
  }
)
    this.storetimes = this.formbuilder.group({
      Mondayopen: [''], 
      Mondayclose: [''],
      Tuesdayopen: [''], 
      Tuesdayclose: [''],
      Wednesdayopen: [''], 
      Wednesdayclose: [''],
      Thursdayopen: [''], 
      Thursdayclose: [''],
      Fridayopen: [''], 
      Fridayclose: [''],
      Saturdayopen: [''], 
      Saturdayclose: [''],
      Sundayopen:[''],
      Sundayclose:[''],
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
            if(this.storeTimings !=null){
              this.timedata1 = res.radiotime;
              this.timedata.emit(this.timedata1);
              localStorage.setItem("timetable",JSON.stringify(this.storeTimings));
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
    this.togMon = false;
  }
  onClick1() {
    this.buttonClicked1 = true;
    this.togTue = false;
  }
  onClick2() {
    this.buttonClicked2 = true;
    this.togWed = false;
  }
  onClick3() {
    this.buttonClicked3 = true;
    this.togThu = false;
  }
  onClick4() {
    this.buttonClicked4 = true;
    this.togFri = false;
  }
  onClick5() {
    this.buttonClicked5 = true;
    this.togSat = false;
  }
  onClick6() {
    this.buttonClicked6 = true;
    this.togSun = true;
  }
  // Montog(){
  //   this.buttonClicked = false;
  // }
  Montog() {
    this.buttonClicked = false;
    this.togMon = !this.togMon; // Toggle the value of togMon
    if (this.togMon) {
        this.storetimes.patchValue({
            Mondayopen: '',
            Mondayclose: ''
        });
    }
}
// Tuetog()
// {
//   this.buttonClicked1=false;
// }
  Tuetog(){
    this.buttonClicked1 = false;
    this.togTue=!this.togTue;
    if(this.togTue)
      {
        this.storetimes.patchValue({
          Tuesdayopen: '',
          Tuesdayclose: ''
        });
      }
  }
  // Wedtog()
  // {
  //   this.buttonClicked2=false;
  // }
  Wedtog(){
    this.buttonClicked2 = false;
    this.togWed=!this.togWed;
    if(this.togWed)
      {
        this.storetimes.patchValue({
          Wednesdayopen: '',
          Wednesdayclose: '',
        })
      }
  }
  // Thutog()
  // {
  //   this.buttonClicked3=false;
  // }
  Thutog(){
    this.buttonClicked3 = false;
    this.togThu=!this.togThu;
    if(this.togThu)
      {
        this.storetimes.patchValue({
          Thursdayopen: '', 
          Thursdayclose: '',
        })
      }
  }
  // Fritog()
  // {
  //   this.buttonClicked4=false;
  // }
  Fritog(){
    this.buttonClicked4 = false;
    this.togFri=!this.togFri;
    if(this.togFri)
      {
        this.storetimes.patchValue({
          Fridayopen: '', 
          Fridayclose: '',
        })
      }
  }
  // Sattog()
  // {
  //   this.buttonClicked5=false;
  // }
  Sattog(){
    this.buttonClicked5 = false;
    this.togSat=!this.togSat;
    if(this.togSat)
      {
        this.storetimes.patchValue({
          Saturdayopen: '', 
          Saturdayclose: '',
        })
      }
  }
  // Suntog()
  // {
  //   this.buttonClicked6=false;
  // }
  Suntog(){
    this.buttonClicked6 = false;
    this.togSun=!this.togSun;
    if(this.togSun)
      {
        this.storetimes.patchValue({
          Sundayopen:'',
          Sundayclose:'',
        })
      }
  }

  storeTimings: Storetimings[] = [];
  close(): void {
    if(this.Allclick == true){
      const daystime=this.storetimes.value.Alldaysopen +' - ' +this.storetimes.value.Alldaysclose;
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    //  const storeTimings: Storetimings[] = [];
      days.forEach((day:any) => {
          const storeTiming: Storetimings = {
              Day: day,
              StartTime: this.storetimes.value.Alldaysopen,
              Closetime: this.storetimes.value.Alldaysclose,
              RegistrationNumber: this.phone
          };
         this.storeTimings.push(storeTiming);
      });
     // console.log("3222222222",this.storeTimings);
      this.Allclick=false;
      this.data();
    }
    else {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
      days.forEach((day: string) => {
          var openTime = this.storetimes.value[`${day}open`] || "00:00";
          var closeTime = this.storetimes.value[`${day}close`] || "00:00";
          
          if(day == 'Sunday'){
            if(openTime == "00:00" && closeTime == "00:00"){
              openTime = 'Closed';
              closeTime = 'Closed';
            }
          }
          const storeTiming: Storetimings = {
              Day: day,
              StartTime: openTime,
              Closetime: closeTime,
              RegistrationNumber: this.phone
          };
          this.storeTimings.push(storeTiming);
      });
      this.data()
    }
  }
  ngOnChanges():void
  {
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
         this.togSun = false;
         if(this.storetable != undefined  ){
          this.storetimes.patchValue({
            Mondayopen: this.storetable[0].StartTime, 
            Mondayclose: this.storetable[0].Closetime,
            Tuesdayopen:this.storetable[1].StartTime , 
            Tuesdayclose: this.storetable[1].Closetime,
            Wednesdayopen: this.storetable[2].StartTime, 
            Wednesdayclose: this.storetable[2].Closetime,
            Thursdayopen: this.storetable[3].StartTime, 
            Thursdayclose: this.storetable[3].Closetime,
            Fridayopen: this.storetable[4].StartTime, 
            Fridayclose: this.storetable[4].Closetime,
            Saturdayopen: this.storetable[5].StartTime, 
            Saturdayclose:this.storetable[5].Closetime,
            Sundayopen:this.storetable[6].StartTime,
            Sundayclose:this.storetable[6].Closetime,
          })
         }
         
          
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

