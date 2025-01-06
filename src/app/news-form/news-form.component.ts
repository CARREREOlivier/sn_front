import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../news.service';



@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Ajoute ReactiveFormsModule ici
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
})
export class NewsFormComponent implements OnInit{
  newsForm: FormGroup;
  isEditMode: boolean = false;
  newsId: number | null = null;
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Options de mise en forme
      [{ list: 'ordered' }, { list: 'bullet' }], // Listes
      ['link'] // Liens
    ]
  };

  constructor(private fb: FormBuilder, private newsService: NewsService, private router: Router, private route: ActivatedRoute,) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.newsId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.newsId) {
      this.isEditMode = true;
      this.loadNewsData();
    }
  }


  submitForm(): void {
    if (this.newsForm.valid) {
      const newsData = this.newsForm.value;

      if (this.isEditMode && this.newsId) {
        this.newsService.updateNews(this.newsId, newsData).subscribe({
          next: (response) => {
            console.log('News mise à jour avec succès :', response);
            this.router.navigate(['/news']); // Redirection après la mise à jour
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de la news :', error);
          },
        });
      } else {
        this.newsService.createNews(newsData).subscribe({
          next: (response) => {
            console.log('News créée avec succès :', response);
            this.router.navigate(['/news']); // Redirection après la création
          },
          error: (error) => {
            console.error('Erreur lors de la création de la news :', error);
          },
        });
      }
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

  loadNewsData(): void {
    this.newsService.getNewsById(this.newsId!).subscribe({
      next: (data) => {
        this.newsForm.patchValue({
          title: data.title,
          content: data.content,
        });

        // Injecte le contenu dans l'éditeur
        const editor = document.getElementById('editor');
        if (editor) {
          editor.innerHTML = data.content;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données :', error);
      },
    });
  }


}
