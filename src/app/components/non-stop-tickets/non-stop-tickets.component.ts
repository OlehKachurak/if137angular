import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from 'src/app/models/formData.model';
import { faPlane, faPlaneDeparture, faPlaneArrival, faHryvnia, faMapMarker, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { NonStopInfo } from 'src/app/models/non-stop-tickets.model';
import { GetNonStopTickets } from "src/app/store/flight-info.action";
import { FlightInfoState } from "src/app/store/flight-info.state";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";


@UntilDestroy()
@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss'],
})
export class NonStopTicketsComponent implements OnInit {
  cityOrigin: string;
  cityArrival: string;
  faPlane = faPlane;
  faDeparture = faPlaneDeparture;
  faArrival = faPlaneArrival;
  faHryvnia = faHryvnia;
  faMap = faMapMarker;
  faMapAlt = faMapMarkerAlt;

  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;
  @Select(FlightInfoState.nonStopTickets) nonStopTickets$: Observable<NonStopInfo[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
   this.formData$.pipe(untilDestroyed(this)).subscribe((formData: FormDataModel) => {
     if (!formData.isFormValid) { return; }
     this.cityOrigin = formData.destinationFrom.name;
     this.cityArrival = formData.destinationTo.name;
     this.store.dispatch(new GetNonStopTickets(formData))
    });
  }
}
