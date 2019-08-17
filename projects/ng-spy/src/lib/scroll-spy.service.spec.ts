import { ScrollSpyService } from './scroll-spy.service';
import { WindowService } from './window.service';
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
  describe('isElementActive', () => {

    it('should retrun true because element is exactly inside window', () => {
      const service = new ScrollSpyService(
        new FakeWindowService(1000, 0)
      );

      const target = new ElementRef({ offsetHeight: 1000, offsetTop: 0 });

      expect(service.isElementActive(target)).toBe(true);
    });

    it('should return false because element is below window', () => {
      const service = new ScrollSpyService(
        new FakeWindowService(1000, 0)
      );

      const target = new ElementRef({ offsetHeight: 50, offsetTop: 1050 });

      expect(service.isElementActive(target)).toBe(false);
    });

    it('should return false because element is above window', () => {
      const service = new ScrollSpyService(
        new FakeWindowService(1000, 0)
      );

      const target = new ElementRef({ offsetHeight: 50, offsetTop: -100 });

      expect(service.isElementActive(target)).toBe(false);
    });

    it('should return true because element is still active', () => {
      const service = new ScrollSpyService(
        new FakeWindowService(1000, 100)
      );

      const target = new ElementRef({ offsetHeight: 1200, offsetTop: 100 });

      expect(service.isElementActive(target)).toBe(true);
    });

    it('should return true for target-2 because it is last in the screen', () => {
      const service = new ScrollSpyService(
        new FakeWindowService(1000, 100)
      );

      const target1 = new ElementRef({ offsetHeight: 100, offsetTop: 0 });
      const target2 = new ElementRef({ offsetHeight: 100, offsetTop: 100 });

      expect(service.isElementActive(target2, null, target1)).toBe(true);
    });
  });
});
