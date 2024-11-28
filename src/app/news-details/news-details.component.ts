import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';
import { CommonModule } from '@angular/common';

interface News {
  news_id: number;
  title: string;
  content: string;
  creation_date: string;
  last_update_date: string;
}

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
  providers: [NewsService]
})
export class NewsDetailsComponent implements OnInit {
  news: News | null = null;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const newsId = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getNewsById(newsId).subscribe((data) => {
      this.news = data;
    });
  }
}
