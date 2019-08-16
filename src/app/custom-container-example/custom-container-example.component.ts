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

  constructor(private element: ElementRef, private scrollSpyService: ScrollSpyService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollSpyService.spy({ scrollContainer: this.element });
    this.scrollSpyService.activeSpyTarget.subscribe(target => this.activeTarget.emit(target));
  }
}
