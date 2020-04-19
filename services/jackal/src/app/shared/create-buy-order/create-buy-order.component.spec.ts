import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuyOrderComponent } from './create-buy-order.component';

describe('CreateBuyOrderComponent', () => {
  let component: CreateBuyOrderComponent;
  let fixture: ComponentFixture<CreateBuyOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBuyOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
