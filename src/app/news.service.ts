import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface News {
  news_id: number;
  title: string;
  content: string; // Ajoute ce champ si nécessaire
  creation_date: string; // Ajoute ce champ si nécessaire
  last_update_date: string;
}
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost/news'; // Remplace cette URL par celle de ton back-end

  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }


  getNewsById(newsId: number): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${newsId}`);
  }

  getLatestNews(): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/latest`);
  }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  createNews(news: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, news);
  }

}

