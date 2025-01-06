import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';
import { CommonModule } from '@angular/common';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

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
  news: any = null;
  newsContent: SafeHtml | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('id');
    if (newsId) {
      this.newsService.getNewsById(+newsId).subscribe({
        next: (data) => {
          this.news = data; // Assigne les données de la news à la propriété `news`
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la news :', error);
        },
      });
    }
  }


}
