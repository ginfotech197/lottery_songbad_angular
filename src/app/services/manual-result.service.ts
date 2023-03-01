import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManualResultService {

  private BASE_API_URL = environment.BASE_API_URL;

  drawTimeSubject = new Subject<any[]>();
  rankSubject = new Subject<any[]>();
  drawTimes : any[] = [];
  rank : any[] = [];

  getDrawTimeListener(){
    return this.drawTimeSubject.asObservable();
  }

  getRankListener(){
    return this.rankSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.http.get(this.BASE_API_URL + '/getDrawTime').subscribe((response: {success: number, data: any[]}) => {
      this.drawTimes = response.data;
      this.drawTimeSubject.next([...this.drawTimes]);
    });

    // @ts-ignore
    this.http.get(this.BASE_API_URL + '/getRanks').subscribe((response: {success: number, data: any[]}) => {
      this.rank = response.data;
      this.rankSubject.next([...this.rank]);
    });

  }
}
