import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private categoryUrl = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) { }

  //Get All
  getCategories(): Promise<void | Category[]> {
    return this.http.get(this.categoryUrl)
      .toPromise()
      .then(response => response as Category[])
      .catch(this.handleError);
  }

  //Get Single
  getSingleCategory(categoryId: string): Promise<void | Category> {
    return this.http.get(this.categoryUrl + '/' + categoryId)
      .toPromise()
      .then(response => response as Category)
      .catch(this.handleError);
  }

  //Create
  createCategory(newCategory: Category): Promise<void | Category> {
    return this.http.post(this.categoryUrl, newCategory)
      .toPromise()
      .then(response => response as Category)
      .catch(this.handleError);
  }

  //Delete
  deleteCategory(categoryId: String): Promise<void | String> {
    return this.http.delete(this.categoryUrl + '/' + categoryId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  updateCategory(putCategory: Category): Promise<void | Category> {
    var putUrl = this.categoryUrl + '/' + putCategory._id;
    return this.http.put(putUrl, putCategory)
      .toPromise()
      .then(response => response as Category)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log(error);
  }
}
