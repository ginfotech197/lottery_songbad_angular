import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, Subject, tap} from "rxjs";
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ManualResultService {

  private BASE_API_URL = environment.BASE_API_URL;

  drawTimeSubject = new Subject<any[]>();
  rankSubject = new Subject<any[]>();
  manualResultSubject = new Subject<any[]>();
  drawTimes : any[] = [];
  rank : any[] = [];
  manualResult : any[] = [];

  message : any[] = [];
  messageSubject = new Subject<any[]>();

  getDrawTimeListener(){
    return this.drawTimeSubject.asObservable();
  }

  getRankListener(){
    return this.rankSubject.asObservable();
  }

  getManualResultistener(){
    return this.manualResultSubject.asObservable();
  }

  constructor(private http: HttpClient, private errorService: ErrorService) {
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

   
   
    this.http.get(this.BASE_API_URL + '/getGameMessage').subscribe((response => {
       // @ts-ignore
      this.message = response.data;
      this.messageSubject.next([...this.message]);
    }));

  }

  getDrawTime(){
    return [...this.drawTimes];
  }

  getRank(){
    return [...this.rank];
  }

  getManualResult(){
    return this.http.get<{ success: number, data: any[] }>(this.BASE_API_URL + '/getResults')
      .pipe(catchError(this.errorService.serverError), tap((response: { success: number, data: any[] }) => {
        this.manualResult = response.data;
        this.manualResultSubject.next([...this.manualResult]);
      }));
  }
  // getMesssage(){
  //   return this.http.get(this.BASE_API_URL + '/getGameMessage').subscribe((response => {
  //     this.message = response;
  //     console.log(this.message);
  //     this.messageSubject.next([...this.message]);
  //   }));
  // }

  getMesssageListener(){
    return this.messageSubject.asObservable();
  }

  saveManualResult(data: any){
    return this.http.post<any>(this.BASE_API_URL + '/saveManualResult', data)
      .pipe(catchError(this.errorService.serverError), tap(response => {
        this.manualResult.unshift(response.data);
        this.manualResultSubject.next([...this.manualResult]);
      }));
  }

  updateRank(data: any){
    return this.http.patch<any>(this.BASE_API_URL + '/updateRank', data)
      .pipe(catchError(this.errorService.serverError), tap(response => {
          const index = this.rank.findIndex(x => x.id === response.data.id);
          this.rank[index] = response.data;
          this.rankSubject.next([...this.rank]);
      }));
  }

  updateMessage(data: any){
    return this.http.patch<any>(this.BASE_API_URL + '/updateGameMessage', data)
      .pipe(catchError(this.errorService.serverError), tap(response => {
          const index = this.message.findIndex(x => x.id === response.data.id);
          this.message[index] = response.data;
          this.messageSubject.next([...this.message]);
      }));
  }

}
