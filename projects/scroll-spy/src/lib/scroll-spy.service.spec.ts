import { TestBed } from '@angular/core/testing';

import { ScrollSpyService } from './scroll-spy.service';
import { WindowService } from './window.service';
import { Subject } from 'rxjs';
import { ElementRef } from '@angular/core';

class FakeWindowService extends WindowService {

  private height: number;
  private windowScrollTop: number;

  constructor(height: number, scrollTop: number) {
    super({}, 300, 10);
    this.height = height;
    this.windowScrollTop = scrollTop;
  }

  getElementOffsetTop(element: ElementRef) {
    return element.nativeElement.offsetTop;
  }

  getElementHeight(element: ElementRef) {
    return element.nativeElement.offsetHeight;
  }

  get scrollTop() {
    return this.windowScrollTop;
  }

  set scrollTop(scrollTop: number) {
    this.windowScrollTop = scrollTop;
  }

  get viewportHeight() {
    return this.height;
  }

  set viewportHeight(height: number) {
    this.height = height;
  }
}

describe('ScrollSpyService', () => {
  let service: ScrollSpyService;

  beforeEach(() => {
    service = new ScrollSpyService(
      new FakeWindowService(1000, 0)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isElementActive', () => {

    it('should retrun true because element is exactly inside window', () => {
      const target = new ElementRef({ offsetHeight: 1000, offsetTop: 0 });

      expect(service.isElementActive(target)).toBe(true);
    });

    it('should return false because element is below window', () => {
      const target = new ElementRef({ offsetHeight: 50, offsetTop: 1050 });

      expect(service.isElementActive(target)).toBe(false);
    });

    it('should return false because element is above window', () => {
      const target = new ElementRef({ offsetHeight: 50, offsetTop: -100 });

      expect(service.isElementActive(target)).toBe(false);
    });
  });
});
