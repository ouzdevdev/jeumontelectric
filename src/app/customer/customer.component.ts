import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { SharedTitleService } from '../services/shared-title.service';
import { CookieService } from 'ngx-cookie-service';
import { InfosService } from '../services/infos.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  text='Documents related to client'
  customerUuid!: string | null;
  customer: any;
  fleets: any[] = [];
  ships: any[] = [];
  documents: any[] = [];
  messages: any[] = [];
  isLoading: boolean = true;
  shipName: string = '';
  shipDescription: string = '';
  user_uuid: string = '';
  ship_uuid: string = '';

  constructor(
    private route: ActivatedRoute,
    private infosService: InfosService,
    private customerService: CustomerService,
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user_uuid = this.cookieService.get('user_uuid');
    this.sharedTitleService.changeTitle('CLIENT INFORMATIONS');
    this.route.paramMap.subscribe(params => {
      this.customerUuid = params.get('customer_uuid');
      if (this.customerUuid) {
        this.fetchCustomerData();
      }
    });
    this.fetchDocuments();
    this.fetchMessagesClient();
  }

  setText(text: string) {
    this.text = text;
  }

  fetchCustomerData(): void {
    if (this.customerUuid !== null) {
      this.customerService.getCustomerById(this.customerUuid).subscribe(
        data => {
          this.customer = data;
          this.fetchCustomerFleets();
          this.fetchCustomerShips();
          this.isLoading = false;
        },
        error => {
          console.error('Error:', error);
          this.isLoading = false ;
        }
      );
    }
  }

  fetchDocuments(): void {
    this.infosService.getDocumentsByClient(this.user_uuid).subscribe(
      data => {
        this.documents = data; 
        this.isLoading = false;
      },
      error => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    );
  }

  fetchMessagesClient(): void {
    this.messageService.findMessagesByClient(this.user_uuid, this.ship_uuid).subscribe(
      data => {
        this.messages = data; 
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  fetchCustomerFleets(): void {
    this.customerService.getFleetByCustomer(this.customerUuid!).subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  fetchCustomerShips(): void {
    this.customerService.getShipByCustomer(this.customerUuid!).subscribe(
      data => {
        data.forEach((ship: any) => {
          if (ship.user_uuid = this.user_uuid) {
            this.ships.push(ship);
          }
        });
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  shipDesc(ship: any) {
    this.ship_uuid = ship.ship_uuid; 
    this.shipName = ship.ship_name;
    this.shipDescription = ship.ship_description;
    this.fetchMessagesClient();
  }
}
