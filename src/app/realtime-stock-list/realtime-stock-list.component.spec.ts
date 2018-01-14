import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeStockListComponent } from './realtime-stock-list.component';

describe('RealtimeStockListComponent', () => {
  let component: RealtimeStockListComponent;
  let fixture: ComponentFixture<RealtimeStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
