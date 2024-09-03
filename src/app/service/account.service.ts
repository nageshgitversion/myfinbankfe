import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.apiUrl}/api/customer`;

  private apiIvestUrl = `${environment.apiUrl}/api/investments`;

  private apiAdminUrl = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) { }

  // Withdraw money from an account
  withdraw(accountNumber: number, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('accountId', accountNumber)
      .set('amount', amount.toString());

    return this.http.post(`${this.apiUrl}/withdraw`, null, { params });
  }

  // Deposit money into an account
  deposit(accountNumber: number, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('accountId', accountNumber)
      .set('amount', amount.toString());

    return this.http.post(`${this.apiUrl}/deposit`, null, { params });
  }

  // Transfer money between accounts
  transfer(fromAccountNumber: number, toAccountNumber: number, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('fromAccountId', fromAccountNumber)
      .set('toAccountId', toAccountNumber)
      .set('amount', amount.toString());

    return this.http.post(`${this.apiUrl}/transfer`, null, { params });
  }

  // Invest money into a specific investment type
  invest(accountNumber: number, amount: number, type: string): Observable<any> {
    const params = new HttpParams()
      .set('accountId', accountNumber)
      .set('investmentType', type)
      .set('amount', amount.toString());

    return this.http.post(`${this.apiIvestUrl}/invest`, null, { params });
  }

  // Calculate loan interest
  calculateLoanInterest(amount: number, interestRate: number, months: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate-loan`, { amount, interestRate, months });
  }

  // Get list of accounts
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiAdminUrl}/accounts`);
  }


  
  createAccount(accountNumber: string,customerId: number,initialDeposit: number): Observable<any> {
    const account: Account = {
      accountNumber: accountNumber,
      user: {
        id: customerId
      },
      balance: initialDeposit,
    };
    return this.http.post(`${this.apiAdminUrl}/accounts/create`, account);
  }

  deleteAccount(accountNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.apiAdminUrl}/accounts/delete`);
  }

  updateAccount(customerId: number,initialDeposit: number,id: number): Observable<void> {
    const account: Account = {
      id: id,
      user: {
        id: customerId
      },
      balance: initialDeposit,
    };
    return this.http.put<void>(`${this.apiAdminUrl}/accounts/update`, account);
  }

}
