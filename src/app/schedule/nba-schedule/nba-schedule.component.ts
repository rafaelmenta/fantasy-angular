import { Component, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { CalendarEvent, ViewPeriod } from 'calendar-utils';
import { Subject, Observable } from 'rxjs';
import { CalendarEventTimesChangedEvent } from 'angular-calendar';
import {
  startOfMonth, startOfWeek, startOfDay,
  endOfMonth, endOfWeek, endOfDay, addHours, isSameMonth, isSameDay } from 'date-fns';
import { NbaService, GameNba } from '../../services/nba.service';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-nba-schedule',
  templateUrl: './nba-schedule.component.html',
  styleUrls: ['./nba-schedule.component.css']
})
export class NbaScheduleComponent implements OnInit {
  view = 'month';
  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<GameNba>>>;
  activeDayIsOpen = false;

  events: CalendarEvent[];
  refresh: Subject<any> = new Subject();

  constructor(private nbaService: NbaService, private title: Title) { }

  fetchGames() {
    const getStart = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const startDate = getStart(this.viewDate);
    const endDate = getEnd(this.viewDate);
    this.events$ = this.nbaService.getGames(startDate, endDate).pipe(map(games => games.map(game => {
      return {
        start: new Date(game.game_time),
        end: new Date(addHours(game.game_time, 3)),
        title: `${game.home_team.symbol} x ${game.away_team.symbol}`,
        color: colors.red,
        cssClass: 'game-event',
      };
    })));

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    console.warn('should open modal');
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Calendário da NBA`);
    this.fetchGames();
  }

}
