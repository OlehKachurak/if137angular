import { CalendarOfPricesPayload } from '../models/calendar-of-prices.model';
import { FilterModel } from '../models/filter.model';
import {FormDataModel} from "../models/formData.model";
import {CheapestTicketsResponseModel} from "../models/cheapest-tickets.model";

//-- Calendar State Actions --

export class CalendarOfPricesLoaded {
  static readonly type = '[FlightInfo] CalendarOfPricesLoaded';
  constructor(public payload: CalendarOfPricesPayload) {}
}

export class GetSpecialOffers {
  static readonly type = '[FlightInfo] Get Special Offers';
  constructor(
    public payload: {
      cityOrigin: string;
      cityDestination: string;
      language: string;
      currency: string;
    }
  ) {}
}

export class SetFilter {
  static readonly type = '[Filter] Set Filter Data';
  constructor(public payload: FilterModel) {}
}

export class StartLoading {
  static readonly type = '[Loading] Start Loading';
}

export class CheapestTicketsRequest {
  static readonly type = '[FlightInfo] Cheapest Tickets Request'
  constructor(public payload: FormDataModel) {  }
}

export class CheapestTicketsRequestSuccess {
  static readonly type = '[FlightInfo] Cheapest Tickets Request Success'
  constructor(public payload: CheapestTicketsResponseModel) {  }
}

export class CheapestTicketsRequestFail {
  static readonly type = '[FlightInfo] Cheapest Tickets Request Fail'
  constructor(public payload: string) {  }
}
