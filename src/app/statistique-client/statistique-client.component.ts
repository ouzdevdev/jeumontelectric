import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { TicketsService } from '../services/tickets.service';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { InfosService } from '../services/infos.service';
import { CookieService } from 'ngx-cookie-service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any[];
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-statistique-client',
  templateUrl: './statistique-client.component.html',
  styleUrls: ['./statistique-client.component.scss']
})
export class StatistiqueClientComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  chartOptions!: ChartOptions;
  statistics: any = {};
  statisticsChart: any = {};
  selectedMode: 'number' | 'percent' = 'number';
  askedCount!: number;
  durationOptions: { label: string; value: number }[] = [
    { label: '1h', value: 1 },
    { label: '24h', value: 24 },
    { label: '48h', value: 48 },
    { label: '72h', value: 72 },
    { label: '1w', value: 168 },
    { label: '1m', value: 720 },
    { label: '1y', value: 8760 },
    { label: 'All', value: -1 }
  ];
  selectedDuration: number = -1;

  client: string = '';
  ship: string = '';

  constructor(
    private ticketsService: TicketsService,
    private infosService: InfosService,
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
  ) {}

  ngOnInit() {
    this.client = this.cookieService.get('user_uuid');
    this.sharedTitleService.changeTitle('statisticsTickets');
    this.getGlobalStatistics();
    this.updateChartData();

  }

  getGlobalStatistics() {
    this.ticketsService.getAskedDataStatisticsClient(this.client).subscribe(
      (data) => {
        console.log(data);
        this.statistics = data.statistics;
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }

  getGlobalStatisticsChart() {
    this.ticketsService.getAskedDataChartClient(this.selectedDuration, this.client, this.ship).subscribe(
      (data) => {
        this.statisticsChart = data.statistics;
        this.askedCount = data.askedCount;
        const maxCount = this.selectedMode === 'number' ? this.askedCount : 100;
        const seriesData = this.statisticsChart.map((item: any) => {
          return this.selectedMode === 'number' ? item.count : (item.percentage > maxCount ? maxCount : item.percentage);
        });

        this.chartOptions = {
          series: [{ name: "distibuted", data: seriesData }],
          chart: { height: 300, type: "bar", events: { click: function(chart, w, e) {}}},
          colors: ["#E30039", "#E30039", "#E30039", "#E30039", "#E30039", "#E30039"],
          plotOptions: { bar: { columnWidth: "45%", distributed: true }},
          dataLabels: { enabled: false },
          legend: { show: false },
          grid: { show: false },
          xaxis: {
            categories: this.statisticsChart.map((item: any) => item.status_label),
            labels: {
              style: {
                colors: "#000",
                fontSize: "14px",
              }
            }
          },
          yaxis: {
            max: maxCount,
            tickAmount: 5,
            labels: {
              style: {
                colors: "#000",
                fontSize: "14px",
                fontFamily: "font-inter",
                fontWeight: "bold"
              },
              formatter:  (value: any) => {
                if (this.selectedMode === 'number') {
                  return Math.floor(value).toString();
                } else {
                  return Math.floor(value).toString() + ' %';
                }
              }
            }
          }
        };

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  updateChartData() {
    if (this.selectedMode === 'number') {
      this.getGlobalStatisticsChart()
    } else if (this.selectedMode === 'percent') {
      this.getGlobalStatisticsChart()
    }
  }

  updateDuration(duration: number) {
    this.selectedDuration = duration;
    this.getGlobalStatisticsChart();
  }
}
