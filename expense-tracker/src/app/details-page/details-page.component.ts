import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { Transaction } from '../transaction';
import { TransactionServiceService } from '../transaction-service.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '../category';
import { CategoryServiceService } from '../category-service.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  providers: [TransactionServiceService]
})
export class DetailsPageComponent {

  @Input()
  transaction: Transaction;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  categories: Category[]

  constructor(private transactionSerive: TransactionServiceService, private route: ActivatedRoute, private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .then((categories: Category[]) => {
        this.categories = categories.map(category => {
          return category;
        });
      });
  }
  
  createTransaction(transaction: Transaction) {
    this.transactionSerive.createTransaction(transaction).then((newTransaction: Transaction) => {
      this.createHandler(newTransaction);
    });
  }

  updateTransaction(transaction: Transaction): void {
    this.transactionSerive.updateTransaction(transaction).then((updatedTransaction: Transaction) => {
      this.updateHandler(updatedTransaction);
    });
  }

  deleteTransaction(transactionId: String): void {
    this.transactionSerive.deleteTransaction(transactionId).then((deletedTransactionId: String) => {
      this.deleteHandler(deletedTransactionId);
    });
  }

}
