export abstract class ApiResponse<T> {
  sucess: boolean;
  statusCode: number;
  message: string;
  timestamp: Date;
}

export class SuccessApiResponse<T> extends ApiResponse<T> {
  results: T;
}

export class ErrorApiReponse<T> extends ApiResponse<T> {
  responseError: ApiErrorMessage;
}

export enum ApiMessageSeverity {
  Information = 'Information',
  Warning = 'Warning',
  Error = 'Error',
}

export class ApiErrorMessage {
  id?: string;
  statusCode?: number;
  message: string;
  isDisplayable: boolean;
  error: any;
  /**
   * ApiErrorMessage
   * @param message The error message.
   * @param statusCode  status code.
   */
  constructor(
    message: string,
    statusCode: number | null,
    error: any | null = null
  ) {
    this.message = message;
    if (error) {
      this.error = error;
    }
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
