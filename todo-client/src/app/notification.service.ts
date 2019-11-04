import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  private defaultDuration: number = 2000;

  public showSuccess(message: string) {
    this._snackBar.open(message, 'Success', {
      duration: this.defaultDuration,
    });
  }

  public showError(message: string) {
    this._snackBar.open(message, 'Error', {
      duration: this.defaultDuration,
    });
  }
}
