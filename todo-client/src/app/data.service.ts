import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { ApiService } from '@app/api.service';
import { NotificationService } from '@app/notification.service';

export interface TodoModel {
  id: string,
  jobTitle: string,
  jobDescription: string,
  recordCreated: string
}

export interface CreateTodoModel {
  jobTitle: string,
  jobDescription: string
}

export interface UpdateTodoModel {
  jobTitle: string,
  jobDescription: string
}

export interface TodoModelsResponse {
  totalCount: number,
  data: TodoModel[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  /**
   * Get single todo item based on the provided ID.
   * In case of error, message will be displayed.
   */
  public async getOne(id: string): Promise<TodoModel> {
    const response = await this.apiService.apiGet(`todo/${ id }`);

    if (response && response.status === 'ok')
      return response.data;

    this.notificationService.showError('Could not fetch single todo item!');
    return null;
  }

  /**
   * Get multiple todo items.
   * In case of error, host component should notify user.
   */
  public getAll(offset?: number, limit?: number, sortKey?: string, sortDir?: string, search?: string): Observable<any> {
    const responsePromise = this.apiService.apiGet('todo', {
      offset: offset || 0,
      limit: limit || 5,
      sortKey: sortKey || 'id',
      sortDir: sortDir || 'asc',
      search: search || ''
    });

    return from(responsePromise);
  }

  /**
   * Create todo item based on the provided data.
   * In case of error, message will be displayed.
   */
  public async createTodo(data: CreateTodoModel): Promise<TodoModel> {
    const response = await this.apiService.apiPost('todo', undefined, data);

    if (response && response.status === 'ok')
      return response.data;

    this.notificationService.showError('Could not create todo item!');
    return null;
  }

  /**
   * Update existing todo item based on the provided ID and data.
   * In case of error, message will be displayed.
   */
  public async updateTodo(id: string, data: UpdateTodoModel): Promise<TodoModel> {
    const response = await this.apiService.apiPut(`todo/${ id }`, undefined, data);

    if (response && response.status === 'ok')
      return response.data;

    this.notificationService.showError('Could not update todo item!');
    return null;
  }

  /**
   * Delete single or multiple todo items.
   * In case of error, message will be displayed.
   */
  public async deleteTodo(id: string[]): Promise<boolean> {
    const response = await this.apiService.apiDelete('todo', {
      id: id.join(',')
    });

    if (response && response.status === 'ok')
      return true;

    this.notificationService.showError('Could not delete todo items!');
    return null;
  }

  /**
   * Transform ISO string to locale datetime string.
   */
  public formatDate(timestamp: string): string {
    const date = new Date(timestamp);

    return date.toLocaleString('hr', { timeZone: 'UTC' });
  }
}
