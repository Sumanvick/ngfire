import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    items: FirebaseListObservable<any[]>;
    chart: any;
    options: Object;
    addValue: any;
    chartData: Array<Object>;
    itemsRef;
    constructor(private db: AngularFireDatabase) {
        this.items = db.list('/items');
        this.showAllItems();
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
                text: 'Most favourite browser'
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

    addNewItem(nameBox): void {
        const item = nameBox.value
        this.items.push({
            name: item,
            value: 0
        })
        nameBox.value = ""
    }
    poleItem(item: any): void {
        this.db.object('/items/' + item.$key)
        .update({ value: (item.value + 1)});
    }
    deleteItem(item: any): void {
        this.db.object('/items/' + item.$key).remove();
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
