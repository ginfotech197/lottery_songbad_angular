import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManualResultService {

  private BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) {
    this.http.get(this.BASE_API_URL + '/getDrawTime').subscribe((response) => {
      console.log(response);
      // this.resultList = response.data;
      // this.resultSubject.next([...this.resultList]);
    });
  }
}
