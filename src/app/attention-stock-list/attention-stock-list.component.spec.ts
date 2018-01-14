import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionStockListComponent } from './attention-stock-list.component';

describe('AttentionStockListComponent', () => {
  let component: AttentionStockListComponent;
  let fixture: ComponentFixture<AttentionStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
