
import {  HttpClient, HttpContext, HttpContextToken, HttpHeaders,} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {  map, Observable, takeUntil, tap,  } from 'rxjs';

import {ApiResponse,SuccessApiResponse,} from './ApiResponse';
import { HttpRequestMethod } from './HttpRequestMethod';
import { HttpRequestOptions } from './HttpRequestOptions';
import { UrlImage } from '../../Posts/Posts.Domain/Posts.Models/UrlImage';


export const IS_RETRY_ENABLED = new HttpContextToken<boolean>(() => true);

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  createOptions<T>(
    method: HttpRequestMethod,
 //   headers: HttpHeaders,
    url: string,
    body: T | null,
    withCredentials: boolean = true,
    query: any = null,
    reportProgress = false
  ): HttpRequestOptions<T> {
    let options = new HttpRequestOptions<T>();
    options.requestMethod = method;
 //   options.headers = headers;
    options.reportProgress = reportProgress;
    if (reportProgress) {
      let event: any = 'events';
      options.observe = event;
    }
    options.requestUrl = url;
    options.body = body;
    options.params = query;
    options.withCredentials = withCredentials;
    return options;
  }

  createHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    let token =
      localStorage.getItem('yib_tk') || localStorage.getItem('yibo_token');
    headers = headers.set(
      'Authorization',
      `Bearer ${token?.split('"').join('')}`
    );
    return headers;
  }
  
  execute<T>(
    requestOptions: HttpRequestOptions<T>,
    retry: boolean = true
  ): Observable<ApiResponse<T>> {
    console.log("http call execute");
        return this.httpClient
      .request<T>(
        requestOptions.requestMethod.toString(),
        requestOptions.requestUrl,
        {
          body: requestOptions.body,
          context: new HttpContext().set(IS_RETRY_ENABLED, retry),
          headers: requestOptions.headers,
          reportProgress: requestOptions.reportProgress,
          observe: requestOptions.observe,
          params: requestOptions.params,
          responseType: requestOptions.responseType,
          withCredentials: requestOptions.withCredentials,
        }
      )
      .pipe(
        tap((item)=>console.log("http respense execute")),
        map((item) => {
          let response = new SuccessApiResponse<T>();
          response.results = item;
          return response;
        })
      );
  }

  upload<T>(requestOptions: HttpRequestOptions<T>): Observable<UrlImage> {
    return this.httpClient.post(
      requestOptions.requestUrl,
      requestOptions.body,
      {
        headers: requestOptions.headers,
        reportProgress: requestOptions.reportProgress,
        observe: requestOptions.observe,
        params: requestOptions.params,
        responseType: requestOptions.responseType,
        withCredentials: requestOptions.withCredentials,
      }
    );
  }
}