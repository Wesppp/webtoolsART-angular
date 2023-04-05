import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() public pageSize!: number
  @Input() public count!: number

  @Output() eventLoadPage = new EventEmitter<number>();

  loadPage(pageNumber: number) {
    this.eventLoadPage.emit(pageNumber)
  }
}
