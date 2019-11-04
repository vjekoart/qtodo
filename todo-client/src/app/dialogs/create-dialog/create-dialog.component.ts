import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { CreateTodoModel, DataService } from '@app/data.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  public createForm: FormGroup;
  public error: string;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    public dataService: DataService
  ) {
    this.createForm = new FormGroup({
      jobTitle: new FormControl('', [ Validators.required ]),
      jobDescription: new FormControl('', [ Validators.required ])
    });
  }

  public onCloseClick() {
    this.dialogRef.close();
  }

  public async onSubmitClick(): Promise<any> {
    this.error = '';

    const formValue = this.createForm.value;
    const status = await this.dataService.createTodo({
      jobTitle: formValue.jobTitle,
      jobDescription: formValue.jobDescription
    });

    if (status)
      this.dialogRef.close(true);
    else
      this.error = 'There was a network error!';
  }

  ngOnInit() {
    this.createForm.reset();
  }
}
