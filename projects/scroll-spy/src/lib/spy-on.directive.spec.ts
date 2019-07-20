import { SpyOnDirective } from './spy-on.directive';
import { Component } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollSpyService } from './scroll-spy.service';

@Component({
  template: `
  <h1 spyOn="test" activeClass="red">test<h1>
  `
})
class TestComponent { }

class FakeSpyService {
  private activeSpyTarget$ = new Subject<string>();
  private isActive = false;

  get activeSpyTarget() {
    return this.activeSpyTarget$.asObservable();
  }

  handleEvents() {
    if (!this.isActive) {
      this.isActive = true;
      this.activeSpyTarget$.next('test');
    } else {
      this.activeSpyTarget$.next('something else');
    }
  }
}

describe('SpyOnDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let scrollSpyService: FakeSpyService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, SpyOnDirective ],
      providers: [
        { provide: ScrollSpyService, useClass: FakeSpyService }
      ]
    })
    .createComponent(TestComponent);
    scrollSpyService = TestBed.get(ScrollSpyService);

    fixture.detectChanges();
  });

  it('should be inactive', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

    expect(h1.classList.contains('red')).toEqual(false);
  });

  it('should change to active', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

    scrollSpyService.handleEvents();
    fixture.detectChanges();

    expect(h1.classList.contains('red')).toEqual(true);
  });

  it('should change to inactive', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

    scrollSpyService.handleEvents();
    fixture.detectChanges();

    expect(h1.classList.contains('red')).toEqual(true);

    scrollSpyService.handleEvents();
    fixture.detectChanges();

    expect(h1.classList.contains('red')).toEqual(false);
  });
});
