import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  open(
    message: string,
    action: string = 'Dismiss',
    config: { duration: 3000 }
  ): MatSnackBarRef<TextOnlySnackBar> {
   return this.snackBar.open(message, action, config);
  }

}
