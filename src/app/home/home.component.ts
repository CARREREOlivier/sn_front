import {Component, OnInit} from '@angular/core';
import {NewsService} from '../news.service';
import {DatePipe, NgForOf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';



interface News {
  news_id: number;
  title: string;
  last_update_date: string;
  content: string;
  creation_date: string;

}
@Component({
  imports: [
    DatePipe,
    NgForOf,
    RouterLink,
    SlicePipe
  ],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
  providers: [NewsService],
})

export class HomeComponent  implements OnInit {
  latestNews: News | null = null;

  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.newsService.getLatestNews().subscribe((news) => {
      this.latestNews = news;
    });
  }

}
