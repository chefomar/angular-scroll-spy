import { Injectable, Inject, ElementRef } from '@angular/core';

import { SpyTargetDirective } from './spy-target.directive';
import { fromEvent, Subject, Observable } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';
import { RESIZE_TIME_THRESHOLD } from './tokens/resize-threshold.token';
import { SCROLL_TIME_THRESHOLD } from './tokens/scroll-threshold.token';
import { WindowService } from './window.service';
import { SpyTarget } from './spy-target.model';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  private stopSpying$ = new Subject();
  private activeSpyTarget$ = new Subject<string>();
  private scrollEvent: Observable<Event>;
  private resizeEvent: Observable<Event>;
  private spyTargets: SpyTarget[] = [];

  constructor(private windowService: WindowService) {
      this.scrollEvent = this.windowService.scrollEvent.pipe(takeUntil(this.stopSpying$));
      this.resizeEvent = this.windowService.resizeEvent.pipe(takeUntil(this.stopSpying$));
  }

  spy() {
      this.scrollEvent.subscribe(() => this.handleEvents());
      this.resizeEvent.subscribe(() => this.handleEvents());

      this.handleEvents();
  }

  addTarget(target: SpyTarget) {
    this.spyTargets.push(target);
    this.handleEvents();
  }

  removeTarget(target: string) {
    const index = this.spyTargets.findIndex(spyTarget => target === spyTarget.name);

    if (index >= 0) {
      this.spyTargets.splice(index, 1);
      this.handleEvents();
    }
  }

  handleEvents() {
    for (const target of this.spyTargets) {
      if (this.isElementActive(target.element)) {
        this.activeSpyTarget$.next(target.name);
      }
    }
  }

  isElementActive(element: ElementRef) {
    const targetOffsetTop = this.windowService.getElementOffsetTop(element);
    const targetHeight = this.windowService.getElementHeight(element);
    const scrollTop = this.windowService.scrollTop;
    const viewportHeight = this.windowService.viewportHeight;

    // target bottom edge is below window top edge && target top edge is above window bottom edge
    return targetOffsetTop + targetHeight >= scrollTop && targetOffsetTop <= scrollTop + viewportHeight;
  }

  get activeSpyTarget() {
    return this.activeSpyTarget$.asObservable();
  }

  stopSpying() {
    this.activeSpyTarget$.complete();
    this.stopSpying$.next();
    this.spyTargets = [];
  }
}
