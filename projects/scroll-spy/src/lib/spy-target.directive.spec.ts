import { SpyTargetDirective } from './spy-target.directive';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ScrollSpyService } from './scroll-spy.service';

@Component({
  template: `
  <h1 spyTarget="test">test<h1>
  `
})
class TestComponent { }

class FakeSpyService {

  addTarget(target: SpyTargetDirective) {
    return;
  }

  removeTarget(target: SpyTargetDirective) {
    return;
  }
}

describe('TargetDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, SpyTargetDirective ],
      providers: [
        { provide: ScrollSpyService, useClass: FakeSpyService }
      ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should create an a component with id="test', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

    expect(h1.id).toEqual('test');
  });
});

