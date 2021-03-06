import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class CountryService {
  environment=environment.backendUrl;
  constructor(private http:HttpClient) { 

  }

  getContries():Observable<any>{
    return this.http.get(`${this.environment}/lang/es`);
  }

  getCountry(name:string):Observable<any>{
    return this.http.get(`${this.environment}/name/${name}?fullText=true`);
  }
}
