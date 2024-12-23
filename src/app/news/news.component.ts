import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import {DatePipe, NgForOf} from '@angular/common';

interface News {
  news_id: number;
  title: string;
  creation_date: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService],
  imports: [
    DatePipe,
    NgForOf
  ]
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe((data) => {
      this.newsList = data;
    });
  }

  readNews(newsId: number): void {
    this.router.navigate(['/news', newsId]);
  }
}
