
import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
//declare let toastr: any

@Injectable({
   providedIn: 'root',
})

export class toastersrc {

   constructor(private toastr: ToastrService) {}
   
   success(message: string, title?: string) {
      this.toastr.success(message, title, { timeOut: 2000 })
   }

   info(message: string, title?: string) {
      this.toastr.info(message, title, { timeOut: 2000 })
   }

   warning(message: string, title?: string) {
      this.toastr.warning(message, title, { timeOut: 2000 })
   }

   error(message: string, title?: string) {
      this.toastr.error(message, title, { timeOut: 2000 })
   }
}
