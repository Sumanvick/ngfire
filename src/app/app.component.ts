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
  constructor(private db: AngularFireDatabase) {
    this.items = db.list('/items');
  }
  
  addNewItem(nameBox): void {
    const item = nameBox.value
    this.items.push({
      name: item
    })
    nameBox.value = ""
  }
  deleteItem(item: any): void {
    this.db.object('/items/' + item.$key).remove();
  }
}
