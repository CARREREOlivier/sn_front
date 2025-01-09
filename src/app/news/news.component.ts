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

  confirmDelete(id: number): void {
    const confirmed = window.confirm('Voulez-vous vraiment effacer cette news ?');
    if (confirmed) {
      this.deleteNews(id);
    }
  }

  deleteNews(id: number): void {
    this.newsService.deleteNews(id).subscribe({
      next: () => {
        console.log('News supprimée avec succès.');
        this.loadNews(); // Recharge la liste des news
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la news :', error);
      },
    });
  }
  loadNews(): void {
    this.newsService.getAllNews().subscribe({
      next: (data) => {
        this.newsList = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des news :', error);
      },
    });
  }

  readNews(newsId: number): void {
    this.router.navigate(['/news', newsId]);
  }

  goToAddNews() {
    this.router.navigate(['/news/add']);
  }
  editNews(id: number): void {
    this.router.navigate([`/news/edit/${id}`]);
  }

}
