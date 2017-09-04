import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'pole-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent {
    // title = 'app';
    items: FirebaseListObservable<any[]>;
    chart: any;
    options: Object;
    addValue: any;
    chartData: Array<Object>;
    itemsRef;
    constructor(private db: AngularFireDatabase) {
        this.items = db.list('/items');
        this.itemsRef = db.database.ref('/items');
        this.itemsRef.on('child_added', (data) => {
            this.addChartPoint(data);
        });
        this.itemsRef.on('child_changed', (data) => {
            this.updateChartData(data);
        });
        this.itemsRef.on('child_removed', (data) => {
            this.deleteChartPoint(data);
        });
        this.options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Pole Report'
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
                data: []
            }]
        };
    }
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    showAllItems() {
        console.log("items : ", this.items);
    }
    addChartPoint(data){
        this.chart.series[0].addPoint({
            name: data.val().name,
            y: data.val().value
        })
    }
    updateChartData(data){
        const index = this.chart.series[0].data.findIndex(x => x.name==data.val().name);
        this.chart.series[0].data[index].update({ y: data.val().value });
    }
    deleteChartPoint(data){
        const index = this.chart.series[0].data.findIndex(x => x.name==data.val().name);
        this.chart.series[0].removePoint(index);
    }
}
