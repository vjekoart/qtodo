import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { fromEvent, merge, of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataService, TodoModel, TodoModelsResponse } from '@app/data.service';
import { NotificationService } from '@app/notification.service';

import { CreateDialogComponent } from '@app/dialogs/create-dialog/create-dialog.component';
import { EditDialogComponent } from '@app/dialogs/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '@app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-homepage-view',
  templateUrl: './homepage-view.component.html',
  styleUrls: ['./homepage-view.component.scss']
})
export class HomepageViewComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'select',
    'id',
    'jobTitle',
    'jobDescription',
    'recordCreated',
    'actions'
  ];

  public selection = new SelectionModel<TodoModel>(true, []);

  public isLoading: boolean = true;
  public data: TodoModel[] = [];
  public dataLength: number = 0;
  public defaultLimit: number = 5;

  private refreshEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngAfterViewInit() {
    // Define events on which table should be updated
    const sortEvent = this.sort.sortChange;
    const paginatorEvent = this.paginator.page;
    const searchEvent = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged()
    );

    // On specific events, specific states should be normalized
    sortEvent.subscribe(() => this.paginator.pageIndex = 0);
    searchEvent.subscribe(() => this.paginator.pageIndex = 0);
    this.refreshEvent.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.searchInput.nativeElement.value = '';
    });

    // Merge all events into single event
    merge(this.refreshEvent, sortEvent, paginatorEvent, searchEvent)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;

          const offset = this.paginator.pageIndex * this.defaultLimit;
          const limit = this.defaultLimit;
          const search = (this.searchInput.nativeElement.value || '').trim();

          return this.dataService.getAll(
            offset,
            limit,
            this.sort.active,
            this.sort.direction,
            search
          );
        }),
        map((response: TodoModelsResponse) => {
          this.isLoading = false;
          this.dataLength = response.totalCount;

          return response.data;
        }),
        catchError(() => {
          this.isLoading = false;

          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  /**
   * Methods related to the table component
   */
  public isMultipleSelected(): boolean {
    return this.selection.selected.length > 1;
  }

  public isAllSelected(): boolean {
    return this.selection.selected.length === this.data.length;
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

  public formatDate(timestamp: string): string {
    return this.dataService.formatDate(timestamp);
  }

  /**
   * Methods for handling dialogs
   */
  public openCreateDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccess('Todo item successfully created.');
        this.refreshEvent.emit();
      }
    });
  }

  public openEditDialog(id: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '640px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccess('Todo item successfully updated.');
        this.refreshEvent.emit();
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
        this.refreshEvent.emit();
      }
    });
  }

  public openDeleteMultipleDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '640px',
      data: this.selection.selected.map(el => el.id)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationService.showSuccess('Todo items successfully deleted.');
        this.selection.clear();
        this.refreshEvent.emit();
      }
    });
  }
}
