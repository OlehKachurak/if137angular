import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import {
  CalendarOfPricesModel,
  CalendarOfPricesPayload,
} from 'src/app/models/calendar-of-prices.model';
import { FormDataModel } from 'src/app/models/formData.model';
import { CalendarOfPricesLoaded } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-calendar-of-prices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-of-prices.component.scss'],
  templateUrl: './calendar-of-prices.component.html',
})
export class CalendarOfPricesComponent implements OnInit {
  formData: CalendarOfPricesPayload;
  events: CalendarEvent<CalendarOfPricesModel>[];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.calendarOfPrices)
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.events = state;
        this.cdRef.detectChanges();
      });

    this.store
      .select(RequestDataState.formData)
      .pipe(
        untilDestroyed(this),
        filter((state: any) => state.isFormValid),
        map((state: FormDataModel) => ({
          origin: state.destinationFrom.name,
          destination: state.destinationTo.name,
          originCode: state.destinationFrom.code,
          destinationCode: state.destinationTo.code,
          return_date: state.endDate.toISOString().split('T')[0],
          depart_date: state.startDate.toISOString().split('T')[0],
        }))
      )
      .subscribe((data: CalendarOfPricesPayload) => {
        this.store.dispatch([new CalendarOfPricesLoaded(data)]);
        this.formData = data;
      });
  }

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: any;
  };

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.dialog.open(CalendarDialogComponent, {
      data: {
        ...event,
        ...this.formData,
      },
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
