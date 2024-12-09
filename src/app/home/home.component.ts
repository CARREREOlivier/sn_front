import {Component, OnInit} from '@angular/core';
import {NewsService} from '../news.service';
import {DatePipe, NgForOf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RecitsService} from '../recits.service';



interface News {
  news_id: number;
  title: string;
  last_update_date: string;
  content: string;
  creation_date: string;

}

interface Recit {
  recit_id: number;
  title: string;
  description: string;
  author : string;
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
  providers: [NewsService, RecitsService, RecitsService],
})

export class HomeComponent  implements OnInit {
  latestNews: News | null = null;
  recits: Recit[] = [];

  constructor(private newsService: NewsService, private recitsService: RecitsService) {}
  ngOnInit(): void {
    this.newsService.getLatestNews().subscribe((news) => {
      this.latestNews = news;
    });
    this.recitsService.getRecits().subscribe((data) => {
      this.recits = data;
    });
  }

}
