import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/Card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  baseUrl = "https://localhost:7237/api/Cards"; 
  constructor(private http: HttpClient) { }

    getCards() {
      return this.http.get<Card[]>(this.baseUrl)
    }

    addCard(card: Card): Observable<Card> {
      card.id = '00000000-0000-0000-0000-000000000000';
      return this.http.post<Card>(this.baseUrl, card);
    }

    updateCard(card: Card): Observable<Card> {
      return this.http.put<Card>(`${this.baseUrl}/${card.id}`, card)
    }

    removeCard(id: string): Observable<Card> {
      return this.http.delete<Card>(`${this.baseUrl}/${id}`);
    }
}
