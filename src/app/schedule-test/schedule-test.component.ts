import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { OnCallService } from '../services/on-call.service';
import { UsersService } from '../services/users.service';
import { InfosService } from '../services/infos.service';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'app-schedule-test',
  templateUrl: './schedule-test.component.html',
  styleUrls: ['./schedule-test.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ScheduleTestComponent implements OnInit {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent | undefined;
  @Input() addToBackUp: any[] = [];
  @Input() addToEvents: Record<string, any>[] = [];
  public data: Record<string, any>[] = [];
  public selectedDate: Date = new Date();
  public employeeDataSource: Record<string, any>[] = [];
  weeks: any[] = [];
  years: any[] = [];
  idWeek: number = 0;
  idYear: number = 0;
  isAddEventVisible: boolean = false;
  isUpdateEventVisible: boolean = false;
  currentDate: Date = new Date();
  currentWeek: number = getISOWeek(this.currentDate);
  currentYear: number = this.currentDate.getFullYear();

  constructor(
    private infosService: InfosService, 
    private usersService: UsersService, 
    private onCallService: OnCallService,
  ) {}

  ngOnInit() {
    this.updateData();
    this.fetchWeeks();
    this.fetchYears();
  }
  
  fetchWeeks() {
    this.infosService.getWeeks().subscribe(
      data => {
        this.weeks = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  fetchYears() {
    this.infosService.getYears().subscribe(
      data => {
        this.years = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private updateData() {
    this.employeeDataSource = this.addToBackUp;
    this.data = extend([], this.addToEvents, undefined, true) as Record<string, any>[];
    this.eventSettings = { dataSource: this.data };
  }

  toggleAddEvent () {
    this.isAddEventVisible = !this.isAddEventVisible;
  }

  toggleUpdateEvent () {
    this.isUpdateEventVisible = !this.isUpdateEventVisible;
  }

  public allowInline = true;
  public group: GroupModel = { 
    resources: ['Employee'], 
    allowGroupEdit: true
  };
  public allowMultiple = false;
  public eventSettings: any;

  public getEmployeeName(value: any): string {
    const details = value;
    if (details.resource && details.resource.textField !== undefined) {
      return details.resourceData[details.resource.textField] as string;
    }
    return '';
  }

  public getEmployeeDesignation(value: any): string {
    const details = value;
    if (details.resource && details.resource.textField !== undefined) {
      const resourceName: string = details.resourceData[details.resource.textField] as string;
      return details.resourceData['Designation'] as string;
    }
    return ''; 
  }

  public getEmployeeImageName(value: any): string {
    return this.getEmployeeName(value).toLowerCase();
  }

  addNewEvent() {
    const newEvent = {
      EmployeeId: 'fa4a5716-6e0d-4a68-9908-1ea499569fab',
      Subject: 'Nouvel événement',
      StartTime: new Date(),
      EndTime: new Date(new Date().getTime() + (60 * 60 * 1000))
    };

    this.eventSettings.dataSource.push(newEvent);

    this.scheduleObj?.refresh();
  }
}