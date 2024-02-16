import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-customers-client',
  templateUrl: './customers-client.component.html',
  styleUrls: ['./customers-client.component.scss']
})
export class CustomersClientComponent  implements OnInit {
  searchForm!: FormGroup;
  isLoading = true; 
  ships: any[] = [];
  fleets: any[] = [];
  user_uuid: string = '';
  documents: any[] = [];
  shipName: string = '';
  client: any;
  shipDescription: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private infosService: InfosService,
    private customerService: CustomerService,    
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: [''] 
    });
  }

  ngOnInit() {
    this.sharedTitleService.changeTitle('searchClient');
    this.user_uuid = this.cookieService.get('user_uuid');
    this.fetchUserShips(); 
    this.fetchDocuments();
    this.findUserById();
  }

  findUserById(): void {
    this.usersService.findUserById(this.user_uuid).subscribe(
      data => {
        this.client = data;
      },
      error => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    );
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

  fetchUserShips(): void {
    this.customerService.getShipByUser(this.user_uuid).subscribe(
      data => {
        this.ships = data;
        data.forEach((ship:any) => {
          const isFleetRepeated = this.fleets.some(fleet => fleet.fleet_id === ship.Fleet.fleet_id);

          if (!isFleetRepeated) {
            this.fleets.push(ship.Fleet);
          }
        });
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  shipDesc(shipName: string, shipDescription : string) {
    this.shipName = shipName;
    this.shipDescription = shipDescription;
  }

}