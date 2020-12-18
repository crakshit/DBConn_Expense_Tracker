import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Category } from '../category';
import { CategoryServiceService } from '../category-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryServiceService]
})
export class CategoryListComponent implements OnInit {

  categories: Category[]
  selectedCategory: Category

  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .then((categories: Category[]) => {
        this.categories = categories.map(category => {
          return category;
        });
      });
  }

  private getIndexofCategory = (categoryId: String) => {
    return this.categories.findIndex((category) => {
      return category._id === categoryId;
    });
  }

  selectCategory(category: Category) {
    this.selectedCategory = category
  }

  createNewCategory() {
    var category: Category = {
      _id: '',
      category: '',
    };

    this.selectCategory(category);

  }

  deleteCategory = (categoryId: String) => {
    var idx = this.getIndexofCategory(categoryId);
    if (idx !== -1) {
      this.categories.splice(idx, 1);
      this.selectCategory(null);
    }
    return this.categories;
  }

  addCategory = (category: Category) => {

    if (category.category != '') {
      this.categories.push(category);
    }
    this.selectCategory(category);
    return this.categories;
  }

  updateCategory = (category: Category) => {
    var idx = this.getIndexofCategory(category._id);
    if (idx !== -1) {
      this.categories[idx] = category;
      this.selectCategory(category);
    }
    return this.categories;
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-category-list',
//   templateUrl: './category-list.component.html',
//   styleUrls: ['./category-list.component.css'],
//   providers: 
// })
// export class CategoryListComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
