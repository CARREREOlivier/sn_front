import { Component, OnInit } from '@angular/core';
import { RecitsService } from '../recits.service';
import { NgForOf, DatePipe } from '@angular/common';

interface Recit {
  recit_id: number;
  title: string;
  description: string;
  creation_date: string;
}

@Component({
  selector: 'app-recits',
  standalone: true,
  imports: [NgForOf, DatePipe],
  templateUrl: './recits.component.html',
  styleUrls: ['./recits.component.css'],
  providers: [RecitsService]
})
export class RecitsComponent implements OnInit {
  recits: Recit[] = [];

  constructor(private recitsService: RecitsService) {}

  ngOnInit(): void {
    this.recitsService.getRecits().subscribe((data) => {
      this.recits = data;
    });
  }
}
