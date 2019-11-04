import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UpdateTodoModel, DataService } from '@app/data.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  public updateForm: FormGroup;
  public error: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.updateForm = new FormGroup({
      id: new FormControl({
        value: '',
        disabled: true
      }, [ Validators.required ]),
      jobTitle: new FormControl('', [ Validators.required ]),
      jobDescription: new FormControl('', [ Validators.required ]),
      recordCreated: new FormControl({
        value: '',
        disabled: true
      }, [ Validators.required ])
    });
  }

  public onCloseClick() {
    this.dialogRef.close();
  }

  public async onSubmitClick(): Promise<any> {
    this.error = '';

    const formValue = this.updateForm.value;
    const id = this.updateForm.get('id').value;

    try {
      const status = await this.dataService.updateTodo(id, {
        jobTitle: formValue.jobTitle,
        jobDescription: formValue.jobDescription
      });

      if (status)
        this.dialogRef.close(true);
      else
        this.error = 'There was a network error! Could not update todo item.';
    } catch (error) {
      this.error = 'There was a network error! Could not fetch todo item.';
    }
  }

  async ngOnInit() {
    this.updateForm.reset();

    const item = await this.dataService.getOne(this.data);

    if (!item) {
      this.error = 'Could not fetch todo item!';
      return;
    }

    this.updateForm.patchValue({
      id: item.id,
      jobTitle: item.jobTitle,
      jobDescription: item.jobDescription,
      recordCreated: item.recordCreated
    });
  }
}
