import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  server = 'http://localhost/apiAngular/';
  constructor(private http : HttpClient) { }


  Api(dados : any, api : string) {
    const httpOptions = {
     headers : new HttpHeaders ({'content-type' : 'application/json'})
    };
    const url = this.server + api;
    return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
  }

}


