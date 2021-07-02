import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() end: Date;

  hours: number;
  minutes: number;
  seconds: number;
  intervalId: number;

  transform(duration: number) {
    this.hours = Math.floor((duration / (1000 * 60 * 60)));
    this.minutes = Math.floor((duration / (1000 * 60)) % 60);
    this.seconds = Math.floor((duration / 1000) % 60);
  }

  tick() {
    const now = new Date();
    this.transform(this.end as any - (now as any));
    if (this.finished) {
      clearInterval(this.intervalId);
    }
  }

  get finished() {
    if (this.hours < 0) { return true; }
    if (this.minutes < 0) { return true; }
    if (this.seconds < 0) { return true; }

    return false;
  }

  constructor() { }

  ngOnInit() {
    // Typescript tries to use NodeJS.Timer as the return type so hacking it via any.
    this.intervalId = setInterval(this.tick.bind(this), 1000) as any as number;
  }

}
