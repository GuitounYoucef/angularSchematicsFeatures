import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpRequestMethod } from './HttpRequestMethod';

/**
 * Use to configure the HTTP options for a request.
 */
export class HttpRequestOptions<T> {
  requestMethod: HttpRequestMethod;
  body?: T | null;
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe: 'body';
  params?: HttpParams | { [params: string]: string | string[] };
  reportProgress?: boolean;
  withCredentials?: boolean;
  requestUrl: string;
  responseType?: 'json';

  toString(): string {
    return `Method: ${this.requestMethod}`;
  }
}
