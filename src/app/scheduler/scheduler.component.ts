import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { blockData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel, View, GroupModel, TimelineViewsService, TimelineMonthService, DayService,
  ResizeService, DragAndDropService, ResourceDetails, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})

export class SchedulerComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent | undefined;
  public data: Record<string, any>[] = extend([], blockData, undefined, true) as Record<string, any>[];
  public selectedDate: Date = new Date();
  public currentView: View = 'TimelineDay';
  public employeeDataSource: Record<string, any>[] = [
    { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00' },
    { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff' },
    { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00' },
    { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff' },
    { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00' },
    { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff' }
  ];
  public group: GroupModel = { enableCompactView: false, resources: ['Employee'] };
  public allowMultiple = false;
  public eventSettings: EventSettingsModel = { dataSource: this.data };

  constructor() {
  }

  public getEmployeeName(value: ResourceDetails): string {
    const details = value as ResourceDetails;
    if (details.resource && details.resource.textField !== undefined) {
      return details.resourceData[details.resource.textField] as string;
    }
    return '';
  }

  public getEmployeeDesignation(value: ResourceDetails): string {
    const details = value as ResourceDetails;
    if (details.resource && details.resource.textField !== undefined) {
      const resourceName: string = details.resourceData[details.resource.textField] as string;
      return details.resourceData['Designation'] as string;
    }
    return ''; 
  }

  public getEmployeeImageName(value: ResourceDetails): string {
    return this.getEmployeeName(value).toLowerCase();
  }

}
