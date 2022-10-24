import { Ioption } from './../option.interface';
import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'selected-tags',
  templateUrl: './selected-tags.component.html',
  styleUrls: ['./selected-tags.component.scss']
})
export class SelectedTagsComponent implements OnInit {
  @Input() item: Ioption = {} as Ioption;
  @Output() removeItem: EventEmitter<number> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  removeItemAction(){
    this.removeItem.emit(this.item.id);
  }

}
