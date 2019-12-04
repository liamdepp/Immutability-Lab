import { Injectable } from '@angular/core';
import { VoteItem } from '../interfaces/vote-item';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private history:VoteItem[][] = [];
  private items:VoteItem[] = [];

  constructor() { }

  getItems():VoteItem[] {
    return this.items;
  }

  addItem(name:string):void {
    this.markHistoryBeforeChange();

    const newItem:VoteItem = { name, votes: 0 };
    // TODO - this needs to be immutable COMPLETE
    this.items = [...this.items, newItem];
  }

  removeItem(name:string):void {
    this.markHistoryBeforeChange();
    let index = this.items.findIndex(item => item.name === name);

    this.items = [...this.items.slice(0, index), ...this.items.slice(index +1)];
    
    // TODO find the item in the list and remove it immutably
  }

  upvote(name:string):void {
    this.markHistoryBeforeChange();
    // for(let item of this.items){
    //   if(name === item.name) {
    //     item.votes++;
    //   }
    // }
    
    let index = this.items.findIndex(item => item.name === name);
    let item = this.items[index];
    this.items = [
      ...this.items.slice(0, index),
      {
        ...item, votes: item.votes + 1
      },
      ...this.items.slice(index + 1)
    ];
    // TODO find the item in the list and add 1 to the votes
  }

  downvote(name:string):void {
    this.markHistoryBeforeChange();
    let index = this.items.findIndex(item => item.name === name);
    let item = this.items[index];
    this.items = [
      ...this.items.slice(0, index),
      {
        ...item, votes: item.votes - 1
      },
      ...this.items.slice(index + 1)
    ];
}
  undo() {
    if (this.history.length) {
      // Take the most recent history and use it to replace the list.
      this.items = this.history.pop();
    } else {
      throw new Error("No more undos available.");
    }
  }

  private markHistoryBeforeChange() {
    // Add a snapshot to the history.
    this.history.push(this.items);
  }
}
