import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomContainerExampleComponent } from './custom-container-example.component';

describe('CustomContainerExampleComponent', () => {
  let component: CustomContainerExampleComponent;
  let fixture: ComponentFixture<CustomContainerExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomContainerExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomContainerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
