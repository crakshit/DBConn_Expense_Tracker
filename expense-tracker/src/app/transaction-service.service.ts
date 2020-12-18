import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  private transactionsUrl = 'http://localhost:3000/api/transaction';

  constructor(private http: HttpClient) { }

  //Get All
  getTransactions(): Promise<void | Transaction[]> {
    return this.http.get(this.transactionsUrl)
      .toPromise()
      .then(response => response as Transaction[])
      .catch(this.handleError);
  }

  //Get All JSON
  getTransactionsJSON(): Promise<void | JSON> {
    return this.http.get(this.transactionsUrl)
      .toPromise()
      .then(response => response as JSON)
      .catch(this.handleError);
  }

  //Get Balance
  getBalanceAmount(): Promise<void | Number>{
    return this.http.get('http://localhost:3000/api/getBalance')
    .toPromise()
    .then(response => response as Number)
    .catch(this.handleError);
  }

  //Get Income
  getIncomeAmount(): Promise<void | Number>{
    return this.http.get('http://localhost:3000/api/getIncome')
    .toPromise()
    .then(response => response as Number)
    .catch(this.handleError);
  }

  //Get Expense
  getExpenseAmount(): Promise<void | Number>{
    return this.http.get('http://localhost:3000/api/getExpense')
    .toPromise()
    .then(response => response as Number)
    .catch(this.handleError);
  }

  //Get Single
  getSingleTransaction(transactionId: string): Promise<void | Transaction> {
    return this.http.get(this.transactionsUrl + '/' + transactionId)
      .toPromise()
      .then(response => response as Transaction)
      .catch(this.handleError);
  }

  //Create
  createTransaction(newTransaction: Transaction): Promise<void | Transaction> {
    return this.http.post(this.transactionsUrl, newTransaction)
      .toPromise()
      .then(response => response as Transaction)
      .catch(this.handleError);
  }

  //Delete
  deleteTransaction(transactionId: String): Promise<void | String> {
    return this.http.delete(this.transactionsUrl + '/' + transactionId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  updateTransaction(putTransaction: Transaction): Promise<void | Transaction> {
    var putUrl = this.transactionsUrl + '/' + putTransaction._id;
    return this.http.put(putUrl, putTransaction)
      .toPromise()
      .then(response => response as Transaction)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log(error);
  }
}
