import { Component, OnInit, Injectable } from '@angular/core';
import { FetchItemsHelper } from '../helpers/fetchitems.helper';
import { Http, Response } from '@angular/http';

// const FIH = new FetchItemsHelper();
@Injectable()

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  private items;
  private bricks = [
    {title: 'Brick 1'},
    {title: 'Brick 2'},
    {title: 'Brick 3'},
    {title: 'Brick 4'},
    {title: 'Brick 5'},
    {title: 'Brick 6'}
  ];
  constructor(private FIH: FetchItemsHelper) {
    FIH.fetchItems()
      .then((result) => {
        this.items = result.results;
        // console.log(typeof result.results);
        // console.log(result);
      });
  }
  searchWithQuery(query = '') {
    this.FIH.fetchItems(query)
      .then((result) => {
        this.items = result.results;
      });
  }

  ngOnInit() {
  }

}
