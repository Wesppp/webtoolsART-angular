import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss']
})
export class FeedTogglerComponent implements OnInit {
  public url: string = '/articles'

  public items!: MenuItem[];
  public activeItem!: MenuItem;

  ngOnInit(): void {
    this.items = [
      { label: 'Your favorites articles', icon: 'pi pi-fw pi-heart-fill', routerLink: ['favorite-articles'] },
      { label: 'All articles', icon: 'pi pi-fw pi-book', routerLink: [''] },
    ];

    this.activeItem = this.items[1];
  }
}
