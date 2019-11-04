// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Views
import { HomepageViewComponent } from './homepage-view/homepage-view.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';

// Dialogs
import { CreateDialogComponent } from './dialogs/create-dialog/create-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageViewComponent,
    DetailedViewComponent,
    CreateDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [
    CreateDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ]
})
export class AppModule {}
