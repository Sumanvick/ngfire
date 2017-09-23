import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'pole',
    templateUrl: './pole.component.html',
    styleUrls: ['./pole.component.css']
})
export class PoleComponent {
    title = 'Pole';
    items: FirebaseListObservable<any[]>;
    constructor(private db: AngularFireDatabase) {
        this.items = db.list('/items');
    }
    addNewItem(nameBox): void {
        const item = nameBox.value;
        this.items.push({
            name: item,
            value: 0
        });
        nameBox.value = '';
    }
    poleItem(item: any): void {
        this.db.object('/items/' + item.$key)
        .update({ value: (item.value + 1)});
    }
    deleteItem(item: any): void {
        this.db.object('/items/' + item.$key).remove();
    }
}
