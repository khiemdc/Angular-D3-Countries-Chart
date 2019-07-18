import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  chartData: Data[] = [];
constructor(private http: HttpClient) { }

public getBarchatData(): Observable<Data[]> {
  return this.http.get<Data[]>('../../assets/data.json');
}

}
