import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {
  @Output() terms:EventEmitter<string> = new EventEmitter();
  close(){
    this.terms.emit();
  }
}

