import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { environment } from '../../environments/environment';

// const API_URL = environment.apiUrl;
// let token = environment.token;

@Injectable()
export class ApiServiceProvider {
  constructor(private http: HttpClient) {
    console.log('Hello ApiServiceProvider Provider');
  }
}