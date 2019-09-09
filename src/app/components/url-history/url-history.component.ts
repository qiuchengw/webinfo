import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-url-history',
  templateUrl: './url-history.component.html',
  styleUrls: ['./url-history.component.scss']
})
export class UrlHistoryComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  private _url: string;
  constructor() { }

  ngOnInit() {
  }

  onSearch(url: string) {
    this.search.emit(url);
  }
}

