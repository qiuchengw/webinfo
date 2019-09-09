import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  isURL(str_url:string) {
    const strRegex = /^(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    const re = new RegExp(strRegex);
    return re.test(str_url);
  }

  onKeyEnter(url: string) {
    this.onSearch(url);
  }

  onSearch(url: string) {
    console.log('---> the val:', url);
    if (!this.isURL(url)) {
      alert('Not a correct URL!');
      return;
    }
    url = url.toLowerCase();
    if (!url.startsWith('http://') && !url.startsWith('https://')){
      url = 'http://' + url;
    }
    // 发射事件
    this.search.emit(url);
  }
}
