import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-config-prfm',
  templateUrl: './config-prfm.component.html',
  styleUrls: ['./config-prfm.component.scss']
})
export class ConfigPrfmComponent  implements OnInit {
  asked: any;
  tickets: any[] = [];
  isLoading: boolean = true;
  searchDescription: string = '';

  constructor (
    private cookieService: CookieService,
    private ticketsService: TicketsService
  ) {}

  setAsked(ticket: any) {
    this.asked = ticket;
  }

  askedRefControl = new FormControl('', [Validators.maxLength(10)]);

  ngOnInit() {
    this.fetchTickets();
  }

  onSearchChange() {
    this.isLoading = true;
    this.fetchTickets();
  }

  fetchTickets() {
    this.ticketsService.getAskedPrfmList(this.searchDescription).subscribe(
      (data) => {
        this.tickets = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur:', error);
        this.isLoading = false;
      }
    );
  }

  submit() {
    const user_uuid = this.cookieService.get('user_uuid');
    this.ticketsService.updateAskedPRFM(this.asked, this.asked.asked_uuid, user_uuid).subscribe(
      response => {
        this.asked = null;
        this.onSearchChange();
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  cancel() {
    this.asked = null;
  }

}