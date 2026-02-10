import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSignatureComponent } from './send-signature.component';

describe('SendSignatureComponent', () => {
  let component: SendSignatureComponent;
  let fixture: ComponentFixture<SendSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendSignatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
