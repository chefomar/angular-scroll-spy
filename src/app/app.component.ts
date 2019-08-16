import { Component, AfterViewInit } from '@angular/core';
import { ScrollSpyService } from 'ng-spy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'scroll-spy';
  activeTarget: string;

  constructor(private spyService: ScrollSpyService) {}

  ngAfterViewInit() {
    this.spyService.spy({ thresholdBottom: 50 });
  }

  setActiveTarget(targetName) {
    this.activeTarget = targetName;
  }
}
