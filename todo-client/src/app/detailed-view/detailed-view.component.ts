import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DataService, TodoModel } from '@app/data.service';
import { NotificationService } from '@app/notification.service';

import { EditDialogComponent } from '@app/dialogs/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '@app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit {
  public itemId: string;
  public item: TodoModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.itemId = params.get('id');
      await this.updateView();
    });
  }

  private async updateView() {
    this.item = await this.dataService.getOne(this.itemId);
    this.item.recordCreated = this.dataService.formatDate(this.item.recordCreated);
  }

  public openEditDialog(id: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '640px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccess('Todo item successfully updated.');
        this.updateView();
      }
    });
  }

  public openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '640px',
      data: [ id ]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccess('Todo item successfully deleted.');
        this.openDashboard();
      }
    });
  }

  public openDashboard() {
    this.router.navigate(['/']);
  }
}
