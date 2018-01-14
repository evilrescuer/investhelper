import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeStockDetailComponent } from './realtime-stock-detail.component';

describe('RealtimeStockDetailComponent', () => {
  let component: RealtimeStockDetailComponent;
  let fixture: ComponentFixture<RealtimeStockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeStockDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeStockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
