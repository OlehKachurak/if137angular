import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCalendarOfPricesRequestModel } from '../models/calendar-of-prices.model';
import {TicketsRequestParam} from "../models/cheapest-tickets.model";
import { map } from 'rxjs/operators';
import { DOCUMENT } from "@angular/common";

@Injectable()
export class FlightsInfoService {

  private baseUrl: string;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = this.document.location.origin;
  }


  exampleRequestGetChipTickets(): Observable<any> {
    const headerDict = {
      'x-access-token': 'PutYourTokenHere',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v2/prices/cheap?origin=LWO&destination=HKT&token=PutYourTokenHere',
      requestOptions
    );
  }
  RequestGetCalendarOfPrices() {
    const headerDict = {
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<GetCalendarOfPricesRequestModel>(
      '/v2/prices/week-matrix?currency=usd&origin=LED&destination=HKT&show_to_affiliates=true&depart_date=2022-01-17&return_date=2022-01-24&token=51b362c72de38be9bcfdc31c8339c019',
      requestOptions
    );
  }
  getSpecialOffers(cityOrign: string, locale: string, currency: string): Observable<any> {
    return this.http.get<any>(
      `/aviasales/v3/get_special_offers?origin=${cityOrign}&locale=${locale}&currency=${currency}&token=b482025a8bf39817b6b6f219686b4799`
    );
  }

  requestGetNonStopTickets(): Observable<any> {
    const headerDict = {
      'x-access-token': '4df3f89d6861e092b8f5d30e3d49cde8',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v1/prices/direct?origin=MOW&destination=LED&token=4df3f89d6861e092b8f5d30e3d49cde8',
      requestOptions
    );
  }


  getFlightPriceTrends(): Observable<any> {

  requestCheapestTickets(ticketsParam: TicketsRequestParam): Observable<any> {
    const baseURL: string = '/v1/prices/cheap'
    const myToken: string = 'f29a4f3a27eb2f3ea190c91cd4e15fa5'

    let myParamsURL = new HttpParams()
      .append('origin', ticketsParam.origin)
      .append('destination', ticketsParam.destination)
      .append('currency', ticketsParam.currency)
      .append('token', myToken)
    if(ticketsParam.departDate) myParamsURL.append('depart_date', ticketsParam.departDate)
    if(ticketsParam.returnDate) myParamsURL.append('depart_date', ticketsParam.returnDate)

    let myHeadersURL = new HttpHeaders()
      .append('x-access-token', myToken)

    return this.http.get(baseURL, { headers: myHeadersURL, params: myParamsURL }).pipe(
      map((response) => ({
        ...response,
        'origin': ticketsParam.origin,
        'destination': ticketsParam.destination,
      }))
    )
}
  getFlightPriceTrends(): Observable<any>{

    const headerDict = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v1/prices/calendar?depart_date=2021–11&origin=MOW&destination=BCN&calendar_type=departure_date&token=51b362c72de38be9bcfdc31c8339c019',
      requestOptions
    );
  }
}
