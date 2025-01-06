import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {NewsService} from '../news.service';



@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Ajoute ReactiveFormsModule ici
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
})
export class NewsFormComponent {
  newsForm: FormGroup;
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Options de mise en forme
      [{ list: 'ordered' }, { list: 'bullet' }], // Listes
      ['link'] // Liens
    ]
  };

  constructor(private fb: FormBuilder, private newsService: NewsService, private router: Router) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }


  submitForm(): void {
    if (this.newsForm.valid) {
      const newsData = {
        title: this.newsForm.get('title')?.value, // Titre
        content: this.newsForm.get('content')?.value, // Contenu
        creation_date: new Date().toISOString(), // Date actuelle en format ISO
        author_id: 1, // Remplace par l'ID de l'utilisateur connecté si applicable
      };

      this.newsService.createNews(newsData).subscribe({
        next: (response) => {
          console.log('News créée avec succès :', response);
          this.router.navigate(['/news']); // Redirection vers la liste des news
        },
        error: (error) => {
          console.error('Erreur lors de la création de la news :', error);
        },
      });
    }
  }


  updateContent(event: Event): void {
    const editorContent = (event.target as HTMLElement).innerHTML; // Inclut les balises HTML
    this.newsForm.get('content')?.setValue(editorContent);
  }

  formatText(command: string): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      document.execCommand(command, false, '');
    } else {
      console.error('Aucune sélection valide pour appliquer le style.');
    }
  }


}
