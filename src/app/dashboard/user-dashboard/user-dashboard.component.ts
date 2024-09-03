import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.sevice';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule]
})
export class UserDashboardComponent {
  activeTab: string = 'withdraw';

  emiResult: number | null = null;

  withdrawForm: FormGroup;
  depositForm: FormGroup;
  transferForm: FormGroup;
  investmentForm: FormGroup;
  loanForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private authService: AuthService) {
    this.withdrawForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]]
    });

    this.depositForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]]
    });

    this.transferForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      toAccount: ['', Validators.required]
    });

    this.investmentForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      type: ['recurring', Validators.required]
    });

    this.loanForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      interestRate: [null, [Validators.required, Validators.min(0)]],
      months: [null, [Validators.required, Validators.min(1)]]
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    this.authService.logout();  
  }
  onWithdraw() {
    if (this.withdrawForm.valid) {
      const amount = this.withdrawForm.value.amount;
      this.accountService.withdraw(1,amount).subscribe(
        response => console.log('Withdraw successful', response),
        error => console.error('Withdraw failed', error)
      );
    }
  }

  onDeposit() {
    if (this.depositForm.valid) {
      const amount = this.depositForm.value.amount;
      this.accountService.deposit(1,amount).subscribe(
        response => console.log('Deposit successful', response),
        error => console.error('Deposit failed', error)
      );
    }
  }

  onTransfer() {
    if (this.transferForm.valid) {
      const { amount, toAccount } = this.transferForm.value;
      this.accountService.transfer(1,2, amount).subscribe(
        response => console.log('Transfer successful', response),
        error => console.error('Transfer failed', error)
      );
    }
  }

  onInvest() {
    if (this.investmentForm.valid) {
      const { amount, type } = this.investmentForm.value;
      this.accountService.invest(1,amount, type).subscribe(
        response => console.log('Investment successful', response),
        error => console.error('Investment failed', error)
      );
    }
  }

  calculateLoanEMI(): void {
    const amount = this.loanForm.get('amount')?.value;
    const interestRate = this.loanForm.get('interestRate')?.value;
    const months = this.loanForm.get('months')?.value;

    const monthlyRate = interestRate / (12 * 100);
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    this.emiResult = emi;
  }
}
