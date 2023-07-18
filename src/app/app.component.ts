import { Component, OnInit } from '@angular/core';
import { CardsService } from './services/cards.service';
import { Card } from './models/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    cardExpiryMonth: 0,
    cardExpiryYear: 0,
    cvc: 0,
  }

  constructor (private cardsService: CardsService) {}

  ngOnInit(): void {
    this.getCards();
    // this.onSubmit();
  }

  getCards() {
    this.cardsService.getCards()
    .subscribe(res => {
      this.cards = res
    });
  }

  onSubmit () {
    if(this.card.id === '') {
    this.cardsService.addCard(this.card).subscribe(res => {
      this.getCards();
      this.card = {
        id: '',
        cardHolderName: '',
        cardNumber: '',
        cardExpiryMonth: 0,
        cardExpiryYear: 0,
        cvc: 0,
      }
    }
    );
  } else {
    this.onUpdate()
  }
  }

  onDelete (id: string) {
    this.cardsService.removeCard(id).subscribe(res => {
      console.log(res)
      this.getCards();
    })
  }

  onSelect (card: Card) {
    this.card = card
  }

  onUpdate (card: Card) {
    this.cardsService.updateCard(card).subscribe(res => {
      this.getCards();
      console.log(res, "card updated");
    })
  }
}
