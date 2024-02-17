import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { InfosService } from '../services/infos.service';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-prfm',
  templateUrl: './create-prfm.component.html',
  styleUrls: ['./create-prfm.component.scss']
})
export class CreatePrfmComponent implements OnInit {
  selectedFiles: File[] = [];
  form!: FormGroup;
  selectedOptionSupport: string = '';
  customers: any[] = [];
  fleets: any[] = [];
  ships: any[] = [];
  pieces: any[] = [];
  sides: any[] = [];
  prfss: any[] = [];
  loading: boolean = false;
  text:string = 'Your ticket has been successfully created.';
  attachments: Array<{ name: string, size: string }> = [];
  numberOfAttachments: number = 0;
  isVisible = false;
  prfssAdded: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private infosService: InfosService,
    private ticketsService: TicketsService,
    private sharedTitleService: SharedTitleService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sharedTitleService.changeTitle('PRFM CREATION');
    this.form = this.fb.group({
      asked_description: new FormControl('', [Validators.required, Validators.minLength(32)]),
      customer_uuid: [''],
      prfm_resume: new FormControl('', [Validators.required, Validators.minLength(32)]),
      fleet_id: [''],
      ship_uuid: [''],
      asked_uuid: [''],
      prfm_item_piece: [''],
      side_id: 0,
      effect_id: 0,
      prfm_document: false,
      urgency: new FormControl(false),
      user_uuid: this.cookieService.get('user_uuid')
    });
    this.fetchCustomers();
    this.fetchSides();
    this.fetchPieces();
    this.fetchPRFS();
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    const files = event.target.files;
    this.handleFiles(files);
  }

  removeAsked(index: number) {
    this.prfssAdded.splice(index, 1);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  handleFiles(files: File[]) {
    for (const file of files) {
      this.attachments.push({ name: file.name, size: this.formatFileSize(file.size) });
    }
    this.numberOfAttachments = this.attachments.length;
  }

  addAskedToTable() {
    const asked_uuid = this.form.get('asked_uuid');
    if (asked_uuid && !this.prfssAdded.includes(asked_uuid.value)) {
      this.ticketsService.getOneAskedPRFSData(asked_uuid.value).subscribe(
        response => {
          this.prfssAdded.push(response);
        },
        error => {
          console.error('Erreur:', error);
        }
      );

      this.form.get('asked_uuid')?.setValue('');
    }
  }

  formatFileSize(size: number): string {
    const megabytes = size / (1024 * 1024);
    return megabytes.toFixed(2) + ' Mo';
  }

  changeUser(): void {
    const customerUuidControl = this.form.get('customer_uuid');
    const fleetIdControl = this.form.get('fleet_id');
    const ShipUuidControl = this.form.get('ship_uuid');

    if (customerUuidControl) {
      const customerUuidValue = customerUuidControl.value;
      this.fetchFleetsByCustomer(customerUuidValue);
    }

    if (fleetIdControl) { fleetIdControl.setValue('') }
    if (ShipUuidControl) { ShipUuidControl.setValue('') }
  }

  changeFleet(): void {
    const fleetIdControl = this.form.get('fleet_id');
    const ShipUuidControl = this.form.get('ship_uuid');

    if (fleetIdControl) {
      const fleetIdValue = fleetIdControl.value;
      this.fetchShipsByFleet(fleetIdValue);
    }

    if (ShipUuidControl) { ShipUuidControl.setValue('') }
  }

  private fetchPieces() {
    this.infosService.getPieces().subscribe(
      data => {
        this.pieces = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchPRFS(): void {
    this.ticketsService.getAskedPRFS().subscribe(
      data => {
        this.prfss = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchSides() {
    this.infosService.getSides().subscribe(
      data => {
        this.sides = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchFleetsByCustomer(customer_uuid: string): void {
    this.infosService.getFleetsByCustomer(customer_uuid).subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  get askedDescriptionControl() { return this.form.get('asked_description')! }
  get prfmResumeControl() { return this.form.get('prfm_resume')! }

  private fetchShipsByFleet(fleet_id: number): void {
    this.infosService.getShipsByFleet(fleet_id).subscribe(
      data => {
        this.ships = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchCustomers(): void {
    this.infosService.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  uploadFile(askedUuid: string, userUuid: string) {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.ticketsService.uploadFile(formData, askedUuid, userUuid, 3).subscribe(
        (response) => {
          console.log('Successfully:', response);
        },
        (error) => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  submitForm() {
    this.loading = true;
    const formData = this.form.value;

    if (this.form.valid) {
      this.ticketsService.createAskedPRFM(formData).subscribe(
        response => {
          this.text = `Your ticket #${response.prfm.asked_ref} has been successfully created.`;
          this.openPopup();

          for (const prfs of this.prfssAdded) {

            const dataRelatedPrfsToPrfm = {
              asked_prfs_uuid: prfs.asked_uuid,
              asked_prfm_uuid: response.prfm.asked_uuid,
              asked_prfs_ref: prfs.asked_ref,
              asked_prfm_ref: response.prfm.asked_ref
            }

            this.addRelated(dataRelatedPrfsToPrfm);
          }

          const user_uuid = this.cookieService.get('user_uuid');

          this.uploadFile(response.prfm.asked_uuid, user_uuid);

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000);
        },
        error => {
          alert(error.message);
          console.error('Erreur:', error);
          this.loading = false;
        }
      );
    } else {
      this.form.markAllAsTouched();
      this.loading = false;
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  openPopup() {
    this.isVisible = true;
  }

  addRelated (data: any) {
    this.ticketsService.related(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }
}
