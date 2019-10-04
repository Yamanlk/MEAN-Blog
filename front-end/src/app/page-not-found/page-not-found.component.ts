import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common'

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public location: Location) { }
  @Input('error-message') message: string;
  
  ngOnInit() {
  }

}
