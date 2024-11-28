import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Recit {
  recit_id: number;
  title: string;
  description: string;
  creation_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecitsService {
  private apiUrl = 'http://localhost/recits'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  getRecits(): Observable<Recit[]> {
    return this.http.get<Recit[]>(this.apiUrl);
  }
}
