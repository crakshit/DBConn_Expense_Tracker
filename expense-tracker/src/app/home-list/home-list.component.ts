import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Transaction } from '../transaction';
import { TransactionServiceService } from '../transaction-service.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
  providers: [TransactionServiceService]
})
export class HomeListComponent implements OnInit {

  transactions: Transaction[]
  selectedTransaction: Transaction
  balanceAmount: Number

  constructor(private transactionService: TransactionServiceService) { }

  ngOnInit(): void {
    this.transactionService
      .getTransactions()
      .then((transactions: Transaction[]) => {
        this.transactions = transactions.map(transaction => {
          return transaction;
        });
      });
      this.balanceAmount = 0.00;

      this.transactionService
      .getBalanceAmount()
      .then((balanceAmount: Number) => {
        this.balanceAmount = balanceAmount;
      });
  }

  private getIndexofTransaction = (transactionId: String) => {
    return this.transactions.findIndex((transaction) => {
      return transaction._id === transactionId;
    });
  }

  selectTransaction(transaction: Transaction) {
    this.selectedTransaction = transaction
  }

  createNewTransaction() {
    var transaction: Transaction = {
      _id: '',
      type: '',
      category: '',
      description: '',
      date: '',
      amount: 0,
    };

    this.selectTransaction(transaction);

  }

  deleteTransaction = (transactionId: String) => {
    var idx = this.getIndexofTransaction(transactionId);
    if (idx !== -1) {
      this.transactions.splice(idx, 1);
      this.selectTransaction(null);
    }

    this.transactionService
      .getBalanceAmount()
      .then((balanceAmount: Number) => {
        this.balanceAmount = balanceAmount;
      });

    return this.transactions;
  }

  addTransaction = (transaction: Transaction) => {

    if (transaction.type != '' && transaction.amount != null) {
      this.transactions.push(transaction);
    }
    this.selectTransaction(transaction);

    this.transactionService
      .getBalanceAmount()
      .then((balanceAmount: Number) => {
        this.balanceAmount = balanceAmount;
      });

    return this.transactions;
  }

  updateTransaction = (transaction: Transaction) => {
    var idx = this.getIndexofTransaction(transaction._id);
    console.log(idx);
    if (idx !== -1) {
      this.transactions[idx] = transaction;
      this.selectTransaction(transaction);
    }

    this.transactionService
      .getBalanceAmount()
      .then((balanceAmount: Number) => {
        this.balanceAmount = balanceAmount;
      });
      
    return this.transactions;
  }

}
