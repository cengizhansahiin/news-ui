import { ArticleDTO } from './article.dto';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article';
@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiServerUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){ }
    public getAllNews(): Observable<Article[]>{ return this.http.get<Article[]>(`${this.apiServerUrl}/getNews`);}
    public deleteNewsById(id: number): Observable<void>{ return this.http.delete<void>(`${this.apiServerUrl}/deleteNews/${id}`);}
    public getArticleById(id: number): Observable<Article>{ return this.http.get<Article>(`${this.apiServerUrl}/getNews/${id}`);}
    public addArticle(article: ArticleDTO): Observable<ArticleDTO>{
        console.log(article.title);
        return this.http.post<ArticleDTO>(`${this.apiServerUrl}/createNews`, article);
    }
    public updateArticle(article: Article): Observable<Article>{ return this.http.put<Article>(`${this.apiServerUrl}/updateNews`, article);}
    public deleteAllNews(): Observable<void>{ return this.http.delete<void>(`${this.apiServerUrl}/deleteNews`);}
}