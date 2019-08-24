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

  isURL(str_url:string) {
    const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    const re = new RegExp(strRegex);
    return re.test(str_url);
  }

  onKeyEnter(url: string) {
    this._url = url;
    this.onSearch(url);
  }

  onSearch(url: string) {
    console.log('---> the val:', url);
    if (!this.isURL(url)) {
      // alert("Not a correct URL!");
      return;
    }
    // 发射事件
    this.search.emit(url);
  }
}
