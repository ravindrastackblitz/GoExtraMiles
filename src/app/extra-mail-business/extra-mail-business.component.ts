import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {Router} from "@angular/router"
import { UserloginService } from '../services/userlogin.service';
declare var google: any;
@Component({
  selector: 'app-extra-mail-business',
  templateUrl: './extra-mail-business.component.html',
  styleUrls: ['./extra-mail-business.component.css']
})
export class ExtraMailBusinessComponent {

Terms!:boolean

popup(){
  this.Terms = true
}

Conditions(data:any){
this.Terms = false;
}

constructor(private _router:Router,private userloginService: UserloginService) { }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "660738226945-skgjmvqq9n8ao0vbv3b15tcn44hl1p7n.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignIn(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { size: "large", type: "standard", shape: "pill",theme:"filled_blue",text:"Continue_With" }  // customization attributes
    );


  }

  handleGoogleSignIn(response: any) {
    console.log(response.credential);

    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(JSON.parse(jsonPayload));
   
    var username = JSON.parse(jsonPayload).email;
    localStorage.setItem("Email",username);
    this.userloginService.setusername(username)
    
    console.log(username);
    this._router.navigate(['/phone']);
  }

 

}
