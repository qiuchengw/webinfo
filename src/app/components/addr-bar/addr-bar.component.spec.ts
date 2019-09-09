import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrBarComponent } from './addr-bar.component';

describe('AddrBarComponent', () => {
  let component: AddrBarComponent;
  let fixture: ComponentFixture<AddrBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
