import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestViewerComponent } from './test-viewer.component';

describe('TestViewerComponent', () => {
  let component: TestViewerComponent;
  let fixture: ComponentFixture<TestViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
