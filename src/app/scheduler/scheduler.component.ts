import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { DayPilot, DayPilotSchedulerComponent } from "daypilot-pro-angular";
import { startOfMonth, endOfMonth } from 'date-fns';
import { DataService } from "./data.service";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

export class SchedulerComponent implements AfterViewInit {

  @ViewChild("scheduler") scheduler!: DayPilotSchedulerComponent;
  currentDate = new Date();
  selectedYear = this.currentDate.getFullYear();
  selectedMonth = this.currentDate.getMonth() + 1;
  events: any[] = [];
  filter = { text: "", eventsOnly: false };

  config: DayPilot.SchedulerConfig = {
    locale: 'fr',
    timeHeaders: [
      { groupBy: "Month", format: "MMMM yyyy" },
      { groupBy: "Day", format: "d" }
    ],
    eventHeight: 40,
    scale: "Day",
    days: 31,
    startDate: `${this.selectedYear}-${this.pad(this.selectedMonth, 2)}-01`,
    treeEnabled: true,
    durationBarVisible: false,
    onRowFilter: args => {
      if (args.row.name.toLowerCase().indexOf(args.filterParam.text.toLowerCase()) < 0) {
        args.visible = false;
      }
      if (args.filterParam.eventsOnly && args.row.events.all().length === 0) {
        args.visible = false;
      }
    }
  };

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  constructor(
    private ds: DataService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    var demoElement = document.querySelector('.scheduler_default_corner');

    if (demoElement) {
      demoElement.remove();
      
      var demoElementHorizontal = document.querySelector('.scheduler_default_divider_horizontal');

      if ( demoElementHorizontal ) {
        demoElementHorizontal.remove();

        var demoElementDemo = document.querySelector('.scheduler_default_main');

        if (demoElementDemo) {
          var firstChild = demoElementDemo.firstElementChild;

          if (firstChild) {
            var newDiv = document.createElement('div');

            newDiv.style.height= '60px';

            firstChild.insertBefore(newDiv, firstChild.firstChild);
          }
        }
      }
    }

    this.ds.getResources().subscribe(result => this.config.resources = result);

    const from = new DayPilot.Date(startOfMonth(new Date(this.selectedYear, this.selectedMonth - 1)));
    const to = new DayPilot.Date(endOfMonth(new Date(this.selectedYear, this.selectedMonth - 1)));

    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  changeText(text: string): void {
    this.filter.text = text;
    this.applyFilter();
  }

  changeWithEvents(val: boolean): void {
    this.filter.eventsOnly = val;
    this.applyFilter();
  }

  changeMonth(): void {
    this.config.startDate = `${this.selectedYear}-${this.pad(this.selectedMonth, 2)}-01`;
    const from = new DayPilot.Date(startOfMonth(new Date(this.selectedYear, this.selectedMonth - 1)));
    const to = new DayPilot.Date(endOfMonth(new Date(this.selectedYear, this.selectedMonth - 1)));
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  applyFilter(): void {
    this.scheduler.control.rows.filter(this.filter);
  }

  clearFilter(): boolean {
    this.filter.text = "";
    this.filter.eventsOnly = false;
    this.applyFilter();
    return false;
  }
}
