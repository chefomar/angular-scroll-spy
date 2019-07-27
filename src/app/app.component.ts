import { Component, AfterViewInit } from '@angular/core';
import { ScrollSpyService } from 'scroll-spy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'scroll-spy';

  constructor(private spyService: ScrollSpyService) {}

  ngAfterViewInit() {
    this.spyService.spy({ thresholdTop: 50 });
  }
}
