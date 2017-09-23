import { Component, OnInit, PipeTransform } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrls: ['./bookroom.component.css']
})
export class BookroomComponent implements OnInit {
  timeSlots;
  letters;
  timeSlotsDb: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.timeSlotsDb = db.list('/bookedslots');
    this.timeSlots = {
      11: {
        id: 11,
        timeSlot: '10:10 AM',
        status: 0
      },
      12: {
        id: 12,
        timeSlot: '10:11 AM',
        status: 0
      },
      13: {
        id: 13,
        timeSlot: '10:12 AM',
        status: 0
      },
      14: {
        id: 14,
        timeSlot: '10:13 AM',
        status: 0
      },
      15: {
        id: 15,
        timeSlot: '10:14 AM',
        status: 0
      },
      16: {
        id: 16,
        timeSlot: '10:15 AM',
        status: 0
      },
      17: {
        id: 17,
        timeSlot: '10:16 AM',
        status: 0
      },
      18: {
        id: 18,
        timeSlot: '10:17 AM',
        status: 0
      },
      19: {
        id: 19,
        timeSlot: '10:18 AM',
        status: 0
      },
      20: {
        id: 20,
        timeSlot: '10:19 AM',
        status: 0
      }
    };
    this.letters = {
      0: 'a',
      1: 'b',
      2: 'c',
      length: 3,
      [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                const value = this[index];
                const done = index >= this.length;
                index++;
                return { value, done };
            }
        };
      }
    };
  }
  ngOnInit() {
    this.updateAllSlotStatus();
    console.log(this.timeSlots);
  }

  addNewSlot(slot): void {
    console.log(slot);
    this.timeSlotsDb.push({
      user: 'Simon Eric',
      userId: '12121',
      slotId: slot.id,
      timeSlot: slot.timeSlot
    }).then((result) => {
      this.updateSlotStatus(slot);
      console.log(slot);
      console.log('successfully saved.');
    });
  }
  updateAllSlotStatus(): void {
    /* this.db.database.ref('/bookedslots').on('value', (snapshot): any => {
      snapshot.forEach((slot): any => {
        console.log(slot.val());
        this.updateSlotStatus(this.timeSlots[slot.val().slotId]);
      });
    }); */
    this.timeSlotsDb.forEach((element: any): any => {
      for (let i = 0; i < element.length; i++) {
        console.log('it\'s calling');
        this.updateSlotStatus(this.timeSlots[element[i].slotId]);
      }
    });
  }
  updateSlotStatus(slot, val = 1): void {
    slot.status = val;
  }
}

