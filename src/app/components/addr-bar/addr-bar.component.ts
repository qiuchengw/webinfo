import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addr-bar',
  templateUrl: './addr-bar.component.html',
  styleUrls: ['./addr-bar.component.scss']
})
export class AddrBarComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {

  }

  onSearch(url: string) {
    this.search.emit(url);
  }
}
