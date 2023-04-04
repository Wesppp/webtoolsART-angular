import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  @Input() categories!: string[]

  constructor(private router: Router) {
  }

  handleTagClick(category: string): void {
    this.router.navigate(['/article-categories', category])
  }
}
