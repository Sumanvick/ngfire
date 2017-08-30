import { Component, Input } from '@angular/core';

@Component({
   selector: 'simple-chart-example',
   template: `
       <chart [options]="options"
       (load)="saveInstance($event.context)"></chart>
   `
})
export class SimpleChartExample {
   @Input() data: Array<Object>;
   constructor() {
    /* this.options = {
        chart: { type: 'spline' },
        title: { text : 'dynamic data example'},
        series: [{ data: [2,3,5,8,13] }]
      };
      setInterval(() => this.chart.series[0].addPoint(Math.random() * 10), 1000); */
   }
   ngOnInit(): void {
    this.options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: this.data
        }]
    };
   }
    chart: any;
    options: Object;
    saveInstance(chartInstance) {
        console.log('save instance called..');
        this.chart = chartInstance;
    }
}