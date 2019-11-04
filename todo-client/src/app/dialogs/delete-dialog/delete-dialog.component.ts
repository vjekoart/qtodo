import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataService } from '@app/data.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  public error: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {}

  public onCloseClick() {
    this.dialogRef.close();
  }

  public async onSubmitClick(): Promise<any> {
    this.error = '';

    try {
      const status = await this.dataService.deleteTodo(this.data);

      if (status)
        this.dialogRef.close(true);
      else
        this.error = 'There was a network error! Could not execute delete action.';
    } catch (error) {
      this.error = 'There was a network error! Could not execute delete action.';
    }
  }

  ngOnInit() {}
}
