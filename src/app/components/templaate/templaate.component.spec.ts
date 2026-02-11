import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplaateComponent } from './templaate.component';

describe('TemplaateComponent', () => {
  let component: TemplaateComponent;
  let fixture: ComponentFixture<TemplaateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplaateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplaateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
