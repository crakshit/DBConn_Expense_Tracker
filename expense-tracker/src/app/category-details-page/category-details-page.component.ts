import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { Category } from '../category';
import { CategoryServiceService } from '../category-service.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-category-details-page',
  templateUrl: './category-details-page.component.html',
  styleUrls: ['./category-details-page.component.css'],
  providers: [CategoryServiceService]
})
export class CategoryDetailsPageComponent {

  @Input()
  category: Category;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private categorySerive: CategoryServiceService, private route: ActivatedRoute) { }

  
  createCategory(category: Category) {
    this.categorySerive.createCategory(category).then((newCategory: Category) => {
      console.log(newCategory);
      this.createHandler(newCategory);
    });
  }

  updateCategory(category: Category): void {
    this.categorySerive.updateCategory(category).then((updatedCategory: Category) => {
      this.updateHandler(updatedCategory);
    });
  }

  deleteCategory(categoryId: String): void {
    this.categorySerive.deleteCategory(categoryId).then((deletedCategoryId: String) => {
      this.deleteHandler(deletedCategoryId);
    });
  }

}
