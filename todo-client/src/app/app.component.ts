import { Component, OnInit } from '@angular/core';

import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public ready: boolean = false;
  public error: string;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    const response = await this.apiService.init();

    if (!response) {
      this.error = 'Could not initialize API service!';
    } else if (!response.status) {
      this.error = response.message;
    }

    this.ready = true;
  }
}
