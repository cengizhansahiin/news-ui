import { ArticleDTO } from './article/article.dto';
import { ArticleService } from './article/article.service';
import { Article } from './article/article';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'news-ui';
  articles: Article[] = []
  deleteArticle!: Article;
  editArticle!: Article;
  viewArticle!: Article;
  constructor(private articleService: ArticleService){}
  ngOnInit(): void {
    this.getArticles();
  }
  public getArticles(): void{
    this.articleService.getAllNews().subscribe(
      (response: Article[]) => {
        this.articles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public searchArticles(key: string): void {
    const results: Article[] = [];
    for (const article of this.articles) {
      if (article.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || article.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || article.publishedAt.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || article.id.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(article);
      }
    }
    this.articles = results;
    if (results.length === 0 || !key) {
      this.getArticles();
    }
  }
  public scrollToElement(el: HTMLElement): void{
    el.scrollIntoView();
  }
  public onOpenModal(article: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'view') {
      this.viewArticle = article;
      button.setAttribute('data-bs-target', '#viewArticleModal');
    }
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addArticleModal');
    }
    if (mode === 'edit') {
      this.editArticle = article;
      button.setAttribute('data-bs-target', '#updateArticleModal');
    }
    if (mode === 'delete') {
      this.deleteArticle = article;
      button.setAttribute('data-bs-target', '#deleteArticleModal');
    }
    if (mode === 'deleteAll') {
      button.setAttribute('data-bs-target', '#deleteAllArticlesModal');
    }
    container!.appendChild(button);
    button.click();
  }
  public onDeleteArticle(id: number): void{
    this.articleService.deleteNewsById(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getArticles();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  public onUpdateArticle(article: Article): void{
    this.articleService.updateArticle(article).subscribe(
      (response: Article) => {
        console.log(response);
        this.getArticles();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  public onDeleteAllArticles(): void{
    this.articleService.deleteAllNews().subscribe(
      (response: void) => {
        console.log(response);
        this.getArticles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddArticle(addForm: NgForm): void {
    document.getElementById('add-article-form')!.click();
    this.articleService.addArticle(addForm.value).subscribe(
      (response: ArticleDTO) => {
        console.log(response);
        this.getArticles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
