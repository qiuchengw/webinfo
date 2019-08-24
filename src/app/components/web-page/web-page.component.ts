import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.scss']
})
export class WebPageComponent implements OnInit {
  @Input("url") url:string;
  
  constructor() { }

  ngOnInit() {
  }

}
