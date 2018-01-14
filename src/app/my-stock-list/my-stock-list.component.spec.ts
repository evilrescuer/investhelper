import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStockListComponent } from './my-stock-list.component';

describe('MyStockListComponent', () => {
  let component: MyStockListComponent;
  let fixture: ComponentFixture<MyStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
