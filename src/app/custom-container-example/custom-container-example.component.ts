import { Component, OnInit, AfterViewInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ScrollSpyService } from 'ng-spy';

@Component({
  selector: 'app-custom-container-example',
  templateUrl: './custom-container-example.component.html',
  styleUrls: ['./custom-container-example.component.css'],
  providers: [ScrollSpyService]
})
export class CustomContainerExampleComponent implements OnInit, AfterViewInit {
  @Output() private activeTarget = new EventEmitter();
  @ViewChild('target5', {static: true}) target5: ElementRef;
  @ViewChild('target6', {static: true}) target6: ElementRef;

  constructor(private element: ElementRef, private scrollSpyService: ScrollSpyService) { }

  ngOnInit() {
    this.addTargets();
  }

  destroySpy() {
    this.scrollSpyService.stopSpying();
  }

  addTargets() {
    this.scrollSpyService.addTarget({ name: 'target-5', element: this.target5 });
    this.scrollSpyService.addTarget({ name: 'target-6', element: this.target6 });
  }

  spyAgain() {
    this.addTargets();
    this.scrollSpyService.spy({ scrollContainer: this.element });
  }

  ngAfterViewInit() {
    this.scrollSpyService.spy({ scrollContainer: this.element });
    this.scrollSpyService.activeSpyTarget.subscribe(target => this.activeTarget.emit(target));
  }
}
