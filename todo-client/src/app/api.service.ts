import { Injectable } from '@angular/core';

export interface InitResponse {
  status: boolean,
  message?: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string;

  constructor() {}

  public async init(): Promise<InitResponse> {
    // Fetch local configuration.json file
    try {
      const response = await fetch("assets/configuration.json").then(response => response.json());
      const api = response.api;

      if (!api && !api.length)
        return {
          status: false,
          message: 'Local configuration is misconfigured!'
        }

      this.api = api;
    } catch (error) {
      return {
        status: false,
        message: 'Could not fetch local configuration!'
      };
    }

    // Check if API is online
    try {
      const pingResponse = await fetch(this.api).then(response => response.json());

      if (pingResponse && pingResponse.status === 'ok')
        return { status: true }
    } catch (error) {
      return {
        status: false,
        message: 'Could not connect to the API!'
      }
    }
  }

  /**
   * Get full endpoint URL with params.
   */
  private createUrl(endpoint, params): string {
    const base = this.api + endpoint;
    const urlParameters = [];

    for (const key in params)
      urlParameters.push(`${ key }=${ params[key] }`);

    if (urlParameters.length)
      return `${ base }?${ urlParameters.join('&') }`;

    return `${ base }`;
  }

  /**
   * Send GET request to the API.
   */
  public async apiGet(endpoint: string, params?: any): Promise<any> {
    const url = this.createUrl(endpoint, params);

    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json());

      resolve(response);
    });
  }

  /**
   * Send POST request to the API.
   */
  public apiPost(endpoint: string, params?: any, body?: any): Promise<any> {
    const url = this.createUrl(endpoint, params);

    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => response.json());

      resolve(response);
    });
  }

  /**
   * Send PUT request to the API.
   */
  public apiPut(endpoint: string, params?: any, body?: any): Promise<any> {
    const url = this.createUrl(endpoint, params);

    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => response.json());

      resolve(response);
    });
  }

  /**
   * Send DELETE request to the API.
   */
  public apiDelete(endpoint: string, params?: any): Promise<any> {
    const url = this.createUrl(endpoint, params);

    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json());

      resolve(response);
    });
  }
}
